export default () => ({
  filename: `logs/app_log-%DATE%.log`,
  zippedArchive: false,
  maxSize: '20m',
  maxFiles: '1d',
});
