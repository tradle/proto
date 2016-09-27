
const schema = require('protocol-buffers')(`
  message Packet {
    optional string from = 1;
    optional string to = 2;
    optional bytes data = 3;
    // optional string fromDevice = 4;
    // optional string toDevice = 5;
  }

  message Challenge {
    required bytes challenge = 1;
  }

  message Response {
    required bytes response = 1;
    // sign(concat(challenge, response))
    required bytes sig = 2;
  }

  enum ErrorType {
    InvalidPacket = 1;
    RecipientNotFound = 2;
  }

  message Error {
    required ErrorType type = 1;
    optional bytes packet = 2;
    optional string recipient = 3;
  }
`)

const CODERS = [
  schema.Packet,
  schema.Error
]

function encode (coder, data) {
  const tag = CODERS.indexOf(coder)
  if (tag === -1) throw new Error('unsupported type')

  const buf = new Buffer(coder.encodingLength(data) + 1)
  buf[0] = tag
  coder.encode(data, buf, 1)
  return buf
}

function decode (data) {
  const dec = decoderFor(data)
  if (!dec) throw new Error('unsupported type')

  return dec.decode(data, 1)
}

function decoderFor (data) {
  return CODERS[data[0]]
}

module.exports = {
  schema: schema,
  encode: encode,
  decode: decode,
  decoderFor: decoderFor
}
