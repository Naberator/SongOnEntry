const mongoose = require('mongoose'),
      UserModel = require('@SoeModels/user');

const models = {
    User: mongoose.model('User')
}

module.exports = models;