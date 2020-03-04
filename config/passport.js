const bcrypt = require('bcrypt-nodejs');
const uuidV4 = require('uuid/v4');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const utils = require('../modules/utils');
const config = require('../config');
const { sendEmailTemplate } = require('../modules/utils');
const models = require('../models');

module.exports = function(passport, User) {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
      if(user) {
        done(null, user.get());
      } else {
        done(user.errors, null);
      }
    });
  });

  passport.use('local-signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  }, (req, email, password, done) => {
    // other request fields handle
    if(!utils.validateEmail(email)) {
      return done(null, false, {
        message: 'Invalid email format'
      });
    }

    const generateHash = pwd => (bcrypt.hashSync(pwd, bcrypt.genSaltSync(8), null));

    return User.findOne({
      where: {
        email: {
          $eq: email
        }
      }
    }).then(async (user) => {
      if(user) {
        return done(null, false, {
          message: 'Email already taken!'
        });
      }
      const userPassword = generateHash(password);
      const emailConfirmationToken = uuidV4();
      const referralCode = uuidV4().substring(0, 8);

      let referrer = null;
      if(req.query.referral_id) {
        referrer = await models.user.findOne({ where: { referralCode: req.query.referral_id } });
        if(referrer) {
          referrer = referrer.id;
        } else {
          referrer = null;
        }
      }

      return User.create({
        email,
        password: userPassword,
        emailConfirmationToken,
        referralCode,
        referrer
      }).then((newUser) => {
        if(!newUser) {
          return done(null, false, {
            message: 'create failure'
          });
        }

        // send register mail
        const subject = 'Confirm your email for XXX';
        const link = `${config.frontendBaseUrl}/api/v1/auth/confirmemail?token=${emailConfirmationToken}`;

        sendEmailTemplate(newUser, subject, 'email-verification', { link });

        return done(null, newUser.get());
      });
    });
  }));

  passport.use('local-signin', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  }, (req, email, password, done) => {
    const isValidPassword = (userpass, pwd) => (bcrypt.compareSync(pwd, userpass));
    User.findOne({
      where: {
        email: {
          $eq: email
        }
      }
    }).then((user) => {
      if(!user) {
        return done(null, false, {
          message: 'Account does not exist. Please click the link below to register.'
        });
      }

      if(!user.emailConfirmed) {
        return done(null, false, {
          message: 'Email is not verified'
        });
      }

      if(!isValidPassword(user.password, password)) {
        return done(null, false, {
          message: 'Incorrect password'
        });
      }

      return done(null, user.get());
    }).catch((err) => {
      console.log('Error: ', err);
      return done(null, false, {
        message: 'Something went wrong'
      });
    });
  }));

  const opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  opts.secretOrKey = 'secret'; // TODO: Change based on environment from config.json
  passport.use(new JwtStrategy(opts, (jwtPayload, done) => {

    // find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
    User.findOne({
      where: {
        id: {
          $eq: jwtPayload.id
        }
      },
      attributes: { exclude: ['password'] }
    }).then((user) => {
      if(user) {
        return done(null, user.get());
      }
      return done(null, false, {
        message: 'User not found'
      });
    }).catch(err => done(err));
  }));
};
