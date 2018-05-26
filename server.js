const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const config = require('./config');
const path = require('path');
const cors = require('cors');
const ip = require('ip');

const app = express();

// HMR
//---

if (process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'test') {
  const webpack = require('webpack');
  const webpackConfig = require('./webpack.config');

  const compiler = webpack(webpackConfig);

  app.use(
    require('webpack-dev-middleware')(compiler, {
      logLevel: 'debug',
      publicPath: webpackConfig.output.publicPath
    })
  );

  app.use(
    require('webpack-hot-middleware')(compiler, {
      log: console.log,
      path: '/__webpack_hmr',
      heartbeat: 10 * 1000
    })
  );
}

// APP CONFIGURATION
//-------------------
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// configure our backend to handle CORS requests
app.use(cors());

// log API PaperTrail - Console
const winston = require('winston');
require('winston-papertrail').Papertrail;

const winstonPapertrail = new winston.transports.Papertrail({
  host: 'logs4.papertrailapp.com',
  port: 31389
});

winstonPapertrail.on('error', () => {});

const logger = new winston.Logger({
  transports: [
    winstonPapertrail,
    new winston.transports.Console({
      level: 'debug',
      handleExceptions: true,
      json: false,
      colorize: true
    })
  ],
  exitOnError: false
});

logger.stream = {
  write: message => {
    if (message.includes('api')) logger.info(message);
  }
};

// LOG
if (process.env.NODE_ENV === 'production') {
  app.use(
    morgan(
      '{"remote_addr": ":remote-addr", "date": ":date[clf]", "method": ":method", "url": ":url",  "status": ":status", "result_length": ":res[content-length]", "user_agent": ":user-agent", "response_time": ":response-time"}',
      { stream: logger.stream }
    )
  );
}

// connect to our database
mongoose.Promise = require('bluebird');

const connectWithRetry = () => {
  mongoose
    .connect(config.database3)
    .then(() => {
      console.log('DB CONNECTED (LOCAL)');
    })
    .catch(() => {
      console.log('RETRY DB CONNECT in 5 seg');
      setTimeout(connectWithRetry, 5000);
    });
};

const connectRemote = () => {
  mongoose
    .connect(config.database2)
    .then(() => {
      console.log('DB CONNECTED (REMOTE)');
    })
    .catch(() => {
      console.log('RETRY DB CONNECT in 5 seg');
      setTimeout(connectRemote, 5000);
    });
};

if (config.database2) {
  connectRemote();
} else {
  connectWithRetry();
}

// API ROUTES
//------------------------
const apiRoutesAuth = require('./backend/routes/api_auth')(app, express);
const apiRoutesUser = require('./backend/routes/api_user')(app, express);
const apiRoutesMovement = require('./backend/routes/api_movement')(app, express);
const apiRoutesSet = require('./backend/routes/api_set')(app, express);
const apiRoutesExercise = require('./backend/routes/api_exercise')(app, express);
const apiRoutesSession = require('./backend/routes/api_session')(app, express);
const apiRoutesStats = require('./backend/routes/api_stats')(app, express);

app.use('/api', apiRoutesAuth);
app.use('/api', apiRoutesUser);
app.use('/api', apiRoutesMovement);
app.use('/api', apiRoutesSet);
app.use('/api', apiRoutesExercise);
app.use('/api', apiRoutesSession);
app.use('/api', apiRoutesStats);

// MAIN CATCHALL ROUTE ---------------
// SEND USERS TO FRONTEND ------------
app.use(express.static(path.join(__dirname, '/frontend')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/frontend/index.html'));
});

// START THE SERVER
//------------------
let server = app.listen(config.port, () => {
  console.log(`Express server ${ip.address()} listening on port ${config.port}`);
});

server = require('http-shutdown')(server);

module.exports = server; // for testing
