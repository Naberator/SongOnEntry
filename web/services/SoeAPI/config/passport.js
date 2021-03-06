
const PassportJWT = require('passport-jwt'),
      ExtractJWT = PassportJWT.ExtractJwt,
      Strategy = PassportJWT.Strategy,
      config = require('./index.js'),
      models = require('@Soe/app/setup');

    module.exports = (passport) => {
        const User = models.User;
        
        const parameters = {
            secretOrKet: config.secret,
            jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken()
        };
        console.log(parameters.secretOrKet)
        passport.use(new Strategy(parameters, (payload, done) => {
            User.findOne({ id: payload.id }, (error, user) => {
                if (error) return done(error, false);
                if (user) done(null, user);
                else done(null, false);
            });
        }));
    }