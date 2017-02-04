// CONFIG
//-------
module.exports = {
'port': process.env.PORT || 8080,
'database3' : 'mongodb://localhost:27017/iv',
'database2': process.env.MONGODB_URI,
'database': 'mongodb://' + process.env.MONGODB_PORT_27017_TCP_ADDR + ':' + process.env.MONGODB_PORT_27017_TCP_PORT + '/mydb',//process.env.MONGODB_URI,
'secret': process.env.SECRET
};
