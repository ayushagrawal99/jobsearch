const Candidate = require('../models/candidate');
const  Cand_self = require('../models/Cand_self');
const fs = require('fs');
const path = require('path');

// create the new user
module.exports.createCandidate = function(req,res){
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }
    Candidate.findOne({email : req.body.email}, function(err, candidate){
        if(err){
            console.log("error");
            return;
        }
        if(!candidate){
            Candidate.create(req.body, function(err,candidate){
                if(err){
                    console.log("error");
                    return;
                }
                return res.redirect('/sign-in-candidate');
            })
        } else {
            return res.redirect('back');
        }
    })
}

// after login the user, user will go home page
module.exports.createSessionCandidate = function(req,res){
    return res.redirect('/home')
}

// user can update their profile
module.exports.update = async function(req,res){
    try {
        if(req.user.id == req.params.id){
            let cand_self = await Cand_self.findOne({cand : req.params.id});
            if(cand_self){
                
            } else{
                let cad = await cand_self.create(req.body);
                console.log("cad",cad);
                return res.redirect('back');
            }
            return res.redirect('back');
        } else{
            return res.redirect('back');
        }

    } catch (error) {
        console.log("error in candidtae update", error);
        return;
    }
}

// if(req.user.id == req.params.id){
//     let candidate = await Candidate.findById(req.params.id);
//     Candidate.uploadedAvatar(req,res,function(err){
//     if(err){
//         console.log('*****Multer error',err);
//     }
//     // console.log(req.file);
    
//     req.body

//     if(req.file){
//         if(candidate.avatar && fs.existsSync(path.join(__dirname , ".." , candidate.avatar))){
//             fs.unlinkSync(path.join(__dirname , ".." , candidate.avatar));
//         }
//         candidate.avatar = candidate.avatarPath + '/' + req.file.filename;
//     }
//     candidate.save();
//     return res.redirect('back');
//  })
// } else{
//     return res.redirect('back');
// }
