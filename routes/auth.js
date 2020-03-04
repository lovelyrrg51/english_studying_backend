const httpStatus = require('http-status');
const express = require('express');
const { RateLimiterMemory } = require('rate-limiter-flexible');

const router = express.Router();

const jwt = require('jsonwebtoken');
const passport = require('passport');
const auth = require('../controllers/auth');
const { getIp, reducedUserData, errorResponse } = require('../modules/utils');

const rateLimiter = new RateLimiterMemory({
  points: 25,
  duration: 60 * 15,
});

const limiterMiddleware = (req, res, next) => {
  const ip = getIp(req);
  rateLimiter.consume(ip)
    .then(() => {
      next();
    })
    .catch(() => { 
      console.log(ip);
      res.status(httpStatus.TOO_MANY_REQUESTS).send('Too many requests');
    });
};

router.post('/register', (req, res, next) => {
  passport.authenticate('local-signup', (err, user, info) => {
    if(err) { return next(err); }
    if(!user) { return errorResponse(res, info.message); }
    // const token = jwt.sign(JSON.stringify(user), 'secret');
    const token = jwt.sign({ id: user.id }, 'secret');
    return res.status(httpStatus.OK).json({ status: 'ok', data: { user: reducedUserData(user), token } });
  })(req, res, next);
});

router.post('/login', limiterMiddleware, (req, res, next) => {
  passport.authenticate('local-signin', (err, user, info) => {
    if(err) { return next(err); }
    if(!user) {
      return errorResponse(res, info.message);
    }
    // const token = jwt.sign(JSON.stringify(user), 'secret');
    const token = jwt.sign({ id: user.id }, 'secret');
    return res.status(httpStatus.OK).json({ status: 'ok', data: { user: reducedUserData(user), token } });
  })(req, res, next);
});

router.get('/logout', (req, res) => {
  if(!req.isAuthenticated()) {
    return res.status(httpStatus.UNAUTHORIZED).json({ status: 'error', message: 'Not authorized' });
  }
  return req.session.destroy(() => res.redirect('/'));
});

// apis
router.get('/confirmemail', auth.confirmEmail);
router.post('/resendconfirmation', auth.resendConfirmEmail);
router.post('/forgot-password', auth.forgotPassword);
router.post('/reset-password', auth.resetPassword);

module.exports = router;
