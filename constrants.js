const RAILS_SERVER = process.env.RAILS_SERVER;
const API = `${RAILS_SERVER}/api`;
const SIGNING_SECRET = process.env.SLACK_SIGNING_SECRET;
const TOKEN = process.env.SLACK_BOT_TOKEN;

exports.RAILS_SERVER;
exports.API;
exports.SIGNING_SECRET;
exports.TOKEN;
