var config = {};

var isProductionEnv = process.env.NODE_ENV === 'production';
var isTestEnv = process.env.NODE_ENV === 'test';

config.MONGODB_URI = process.env.MONGODB_URI;
config.FRONTEND_SERVER = process.env.FRONTEND_SERVER;

if (isTestEnv) {
  config.MONGODB_URI = process.env.MONGODB_URI_STAGING;
  config.FRONTEND_SERVER = process.env.FRONTEND_SERVER;
} else if (isProductionEnv) {
  config.MONGODB_URI = process.env.MONGODB_URI_PRODUCTION;
  config.FRONTEND_SERVER = process.env.FRONTEND_SERVER;
}

config.SENTRY_DSN = process.env.SENTRY_DSN;

module.exports = config;