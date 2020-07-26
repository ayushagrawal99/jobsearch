const mongoose = require('mongoose');

const Cand_selfSchema = new mongoose.Schema({
    cand : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Candidate'
    },
    phone : {
        type : String
    },
    city : {
        type : String
    },
    gender : {
        type : String
    },
    dob : {
        type : String
    },
    aboutyou : {
        type : String
    },
    address : {
        type : String
    },
    jobtitle : {
        type : String
    },
    companyname : {
        type : String
    },
    companylocation : {
        type : String
    },
    salary : {
        type : String
    },
    aboutcompany : {
        type : String
    },
    dateofjoining : {
        type : String
    },
    duration : {
        type : String
    },
    industryskill : {
        type : String
    },
    otherskill : {
        type : String
    },
    acceptJob : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'AllJobs'
        }
    ]
},{
    timestamps : true
});

const Cand_self = mongoose.model('Cand_self', Cand_selfSchema);
module.exports = Cand_self;