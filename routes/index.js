const express = require('express');
const router = express.Router();
const passport = require('../config/passport-local-strategy');

const homeController = require('../controllers/home_controller');

router.get('/home',passport.checkAuthentication ,homeController.home);

router.get('/', homeController.CandidatesignUp);
router.get('/sign-in-candidate', homeController.CandidatesignIn);
router.get('/sign-out', homeController.signOut);

router.use('/users', require('./users'));
router.use('/candidate', require('./candidate'));
router.use('/employer',require('./employer'));

module.exports = router;