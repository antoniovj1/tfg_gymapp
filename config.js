// CONFIG
//-------
module.exports = {
  port: process.env.PORT || 80,
  database3: 'mongodb://localhost:27017/iv',
  database2: process.env.MONGODB_URI,
  database: `mongodb://${process.env.MONGODB_PORT_27017_TCP_ADDR}:${
    process.env.MONGODB_PORT_27017_TCP_PORT
  }/mydb`, // process.env.MONGODB_URI,
  secret: process.env.SECRET,

  // For testing
  token:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ'
};
