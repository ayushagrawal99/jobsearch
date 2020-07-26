const mongoose = require('mongoose');
const JobSchema = new mongoose.Schema({

            jobtitle : {
                type : String,
                required : true
            },
            joblocation :  {
                type : String,
                required : true
            },
            jobstatus : {
                type : String,
                required : true
            },
            jobdescription : {
                type : String,
                required : true
            },
            jobsalary : {
                type : String,
                required : true
            },
            companyname : {
                type : String,
                required : true
            },
            jobexprequire : {
                type : String,
                required : true
            },
            jobdepartment : {
                type : String,
                required : true
            },
            jobid : {
                type : String,
                required : true,
                unique : true
            }
        
},{
    timestamps : true
});

const AllJobs = mongoose.model('AllJobs', JobSchema);
module.exports = AllJobs;