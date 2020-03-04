// const passport = require('passport');
const authRouter = require('./auth');
const monitorRouter = require('./monitor');
const profileRouter = require('./profile');
const userRouter = require('./user');
const idiomRouter = require('./idiom');
const classifyRouter = require('./classify');
const historyRouter = require('./history');

module.exports = function(app) {
  app.use('/api/v1/auth', authRouter);
  app.use('/api/v1/monitor', monitorRouter);
  app.use('/api/v1/profile', profileRouter);
  app.use('/api/v1/user', userRouter);
  app.use('/api/idiom', idiomRouter);
  app.use('/api/classify', classifyRouter);
  // TODO -- use this middleware for authentication
  // passport.authenticate('jwt', { session: false })
  app.use('/api/v1/history', historyRouter);
};
