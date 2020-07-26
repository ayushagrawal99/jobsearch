const express = require('express');
const router = express.Router();
const passport = require('../config/passport-local-strategy');

const userController = require('../controllers/users_controller');

router.post('/create', userController.createCandidate);
router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect : '/sign-in-candidate'}
), userController.createSessionCandidate);

router.post('/update/:id' , userController.update)

// router.post('/createRecuiter',userController.createRecuiter);
// router.post('/create-session-recuiter',passport.authenticate(
//     'local',
//     {failureRedirect : '/sign-in-client'}
// ),userController.createSessionRecuiter);

module.exports = router;