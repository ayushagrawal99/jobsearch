const Candidate = require('../models/candidate');
const Cand_self = require('../models/Cand_self');
const All_jobs = require('../models/all_jobs');

module.exports.profile = async function(req,res){
    try {
        return res.render('candidate_profile',{
            title : "CANDIDATE || PROFILE"
        })
    } catch (error) {
        console.log("error in cand-profile",err);
        return;
    }
}

module.exports.resume = async function(req,res){
    try {
        let candinfo = await Cand_self.findOne({cand : req.user.id});
        console.log(candinfo)
        return res.render('cand_resume',{
            title : "Resume",
            candidate : candinfo
        })
    } catch (error) {
        console.log("error in cand-resume",error);
        return;
    }
}

module.exports.liveJob = async function(req,res){
    try {
        let job = await All_jobs.find({});
        return res.render('cand_livejob',{
            title : "All Jobs",
            all_job : job
        })
    } catch (error) {
        console.log("error in live job",error);
        return;
    }
}

// when user accept the job
module.exports.acceptJobPage = async function(req,res){
    try {
        let jobId = req.params.id;
        let jobinfo  = await All_jobs.findById(jobId);
        let candidate = await Cand_self.findOne({cand : req.user.id});

        candidate.acceptJob.push(jobinfo.id);
        candidate.save();

    } catch (error) {
        console.log("error in accept job",error);
        return;
    }
}