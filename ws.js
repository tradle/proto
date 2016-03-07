
module.exports = `
  message Packet {
    optional string from = 1;
    optional string to = 2;
    required bytes data = 3;
  }
`
