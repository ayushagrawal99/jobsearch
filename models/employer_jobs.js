const mongoose = require('mongoose');

const empJobSchema = new mongoose.Schema({
    // which employer create a job
    employer : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Candidate'
    },
    // this will store job id
    jobs : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'AllJobs'
        }
    ]
},{
    timestamps : true
});

const epmJobs = mongoose.model('empJobs', empJobSchema);
module.exports = epmJobs;