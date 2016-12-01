var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');
var config = require('./config');
var path = require('path');
var cors = require('cors')
var ip = require('ip');


// APP CONFIGURATION
//-------------------
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// configure our app to handle CORS requests
app.use(cors());


//log API PaperTrail - Console
var winston = require('winston');

require('winston-papertrail').Papertrail;

var winstonPapertrail = new winston.transports.Papertrail({
    host: 'logs4.papertrailapp.com',
    port: 31389
})

winstonPapertrail.on('error', function (err) { });

var logger = new winston.Logger({
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
    write: function (message, encoding) {
        if (message.includes('api'))
            logger.info(message);
    }
};

app.use(morgan('{"remote_addr": ":remote-addr", "date": ":date[clf]", "method": ":method", "url": ":url",  "status": ":status", "result_length": ":res[content-length]", "user_agent": ":user-agent", "response_time": ":response-time"}', { stream: logger.stream }));


// connect to our database
mongoose.Promise = require('bluebird');


var connectWithRetry = function () {
    return mongoose.connect(config.database)
        .then(function () {
            console.log("DB CONNECTED (LOCAL)")
        })
        .catch(function (err) {
            console.log("RETRY DB CONNECT in 5 seg")
            setTimeout(connectWithRetry, 5000);
        });
};

var connectRemote = function () {
    mongoose.connect(config.database2)
        .then(function () {
            console.log("DB CONNECTED (REMOTE)")
        })
        .catch(function (err) {
            console.log("RETRY DB CONNECT in 5 seg")
            setTimeout(connectRemote, 5000);
        });
}

if (config.database2) {
    connectRemote();
} else {
    connectWithRetry();
}
// set static files location
// used for requests that our frontend will make
app.use(express.static(__dirname + '/public'));


// API ROUTES
//------------------------
var apiRoutesAuth = require('./app/routes/api_auth')(app, express);
var apiRoutesUser = require('./app/routes/api_user')(app, express);
var apiRoutesMovement = require('./app/routes/api_movement')(app, express);
var apiRoutesSet = require('./app/routes/api_set')(app, express);
var apiRoutesExercise = require('./app/routes/api_exercise')(app, express);
var apiRoutesSession = require('./app/routes/api_session')(app, express);


app.use('/api', apiRoutesAuth);
app.use('/api', apiRoutesUser);
app.use('/api', apiRoutesMovement);
app.use('/api', apiRoutesSet);
app.use('/api', apiRoutesExercise);
app.use('/api', apiRoutesSession);


// MAIN CATCHALL ROUTE ---------------
// SEND USERS TO FRONTEND ------------
app.use(express.static(__dirname + '/public'));

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname + '/public/index.html'));
});

// START THE SERVER
//------------------
app.listen(process.env.PORT || config.port, function () {
    console.log('Express server ' + ip.address() + ' listening on port 80');
});

module.exports = app; // for testing
