const express = require('express');
const router = express.Router();

const candidateController = require('../controllers/candidate_controller');
router.get('/profile/:id' , candidateController.profile);
router.get('/livejob', candidateController.liveJob);
router.get('/resume/:id',candidateController.resume);
router.get('/accept_job/:id', candidateController.acceptJobPage);
module.exports = router;