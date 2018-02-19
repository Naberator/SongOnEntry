const models = require('@Soe/app/setup');

module.exports = (app) => {
    const api = app.SoeAPI.app.api.auth;

    app.route('/')
        .get((req, res) => res.send('Soe API'));

    app.route('/api/v1/auth')
        .post(api.login(models.User));
}