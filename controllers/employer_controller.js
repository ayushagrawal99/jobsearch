const epmJobs = require('../models/employer_jobs');
const Candidate = require('../models/candidate');
const AllJobs = require('../models/all_jobs');

module.exports.createJob = async function(req,res){
    try {
        return res.render('employer_create_jobs',{
            title : "CREATE JOBS"
        })
    } catch (error) {
        console.log("error in job creattion");
        return;
    }
}

module.exports.newCreateJob = async function(req,res){
    try {
        if(req.user.id == req.params.id && req.user.usertype == 'employer'){
            let job = await AllJobs.create(req.body);
            console.log("JOB",job);
            let candidate = await epmJobs.findOne({employer: req.params.id});
            console.log("CANDIDATE",candidate);
            if(candidate){
                console.log("IF")
                candidate.jobs.push(job.id);
                candidate.save();
            } else {
                console.log("ELSE")
                let empjob = await epmJobs.create({
                    employer : req.params.id
                });
                empjob.jobs.push(job.id);
                empjob.save();
            }
            return res.redirect('back');
        } else {
            console.log("Invalid Identity");
            return res.redirect('back');
        }
    } catch (error) {
        console.log("error in new job creattion");
        return;
    }
}

module.exports.allJobs = async function(req,res){
    try {
        let user = await Candidate.findById(req.params.id);
        if(user.usertype == 'employer'){
            let job = await epmJobs.findOne({employer : req.params.id});
        
               job = await job.populate('jobs').execPopulate();
            return res.render('employer_all_jobs',{
                title : "ALL JOBS",
                job : job
            })
        }
    } catch (error) {
        console.log("error in job shown");
        return;
    }
}