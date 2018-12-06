const Router = require('express').Router;
const to = require('await-to-js').to;
const AuthCtrl = require('./auth.controller');
const { validateBody, schemas } = require('../../helpers/routeHelpers');
const passport = require('passport');
const passportConf = require('../../services/passport');
const passportSignIn = passport.authenticate('local', { session: false });

const router = new Router();

router.get('/', (req, res) => {
return res.json({
        success: true,
        body: []
    })
})

router.post('/signup', validateBody(schemas.authSchema), (req, res, next) => {
    AuthCtrl.signup(req, res, next)
});

router.route('/signin')
.post(validateBody(schemas.authSchema), passportSignIn, (req, res, next) => AuthCtrl.signin(req, res, next));

router.route('/oauth/google')
.post(passport.authenticate('googleToken', { session: false }), (req, res, next) => AuthCtrl.signin(req, res, next));

router.route('/oauth/facebook')
.post(passport.authenticate('facebookToken', { session: false }), (req, res, next) => AuthCtrl.signin(req, res, next));


module.exports = router;