export default () => ({
  NODE_ENV: process.env.NODE_ENV,
  ENVS: {
    DEVELOPMENT: 'development',
    PRODUCTION: 'production',
    DEVELOPER: 'developer',
  },
});
