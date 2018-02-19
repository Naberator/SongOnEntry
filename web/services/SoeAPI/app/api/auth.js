const mongoose = require('mongoose'),
      jwt = require('jsonwebtoken'),
      config = require('@config');

// Empty API Object. We'll be adding methods to this object
const api = {};

// Login method
api.login = (User) => (req, res) => {
    User.findOne({ username: req.body.username }, (error, user) => {
        if (error) throw error;

        if (!user) res.status(401).send({ success: false, message: "Auth fail. User not found."});
        else {
            user.comparePassword(req.body.password, (error, matches) => {
                if (matches && !error) {
                    const token = jwt.sign({ user }, config.secret);
                    res.json({ success: true, message: 'Token granted', token });
                } else {
                    res.status(401).send({ success: false, message: 'Auth fail. Wrong password.' });
                }
            });
        }
    });
}

// Verification method - get the token and parse it
api.verify = (headers) => {
    if (headers && headers.authorization) {
        const split = headers.authorization.split(' ');

        if (split.length === 2) return split[1];
        else return null;
    } else return null;
}

module.exports = api;