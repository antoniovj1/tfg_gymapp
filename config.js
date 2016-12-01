// CONFIG
//-------
module.exports = {
'port': process.env.PORT || 80,
'database2': process.env.MONGODB_URI,
'database': 'mongodb://' + process.env.MONGODB_PORT_27017_TCP_ADDR + ':' + process.env.MONGODB_PORT_27017_TCP_PORT + '/mydb',//process.env.MONGODB_URI,
'secret': 'clave_secreta'
};
