var config = {};

config.server = {};
config.server.ip = process.env.SERVER_LISTENER||'0.0.0.0';
config.server.port = process.env.SERVER_PORT||9423;
config.serverURL = process.env.PAYFIELD_URL||'http://192.168.23.55:9423';

module.exports = config;