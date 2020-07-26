const express = require('express');
const router = express.Router();
const passport = require('../config/passport-local-strategy');

const employerController = require('../controllers/employer_controller');
router.get('/create-jobs/:id',passport.checkAuthentication, employerController.createJob);
router.post('/create-new-job/:id',passport.checkAuthentication, employerController.newCreateJob);
router.get('/all-jobs/:id',passport.checkAuthentication, employerController.allJobs);

module.exports = router;