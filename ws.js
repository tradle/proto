
module.exports = `
  message Packet {
    optional string from = 1;
    optional string to = 2;
    optional bytes data = 3;
    optional string fromDevice = 4;
    optional string toDevice = 5;
  }
`
