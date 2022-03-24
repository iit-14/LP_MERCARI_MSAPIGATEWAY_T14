var express=require("express");
var router=express.Router();
var Patient= require('../models/Patient');

// @route    GET patient/profile
// @desc     fetching user info using its token
// @access   Private
router.get(
    '/profile/',
    async (req, res) => {
      try {
          let _token=req.headers.token;
        const patient = await Patient.findOne({
         token: _token
        });
       

  
        if (!patient) return res.status(400).json({ msg: 'Patient not found' });
  
        return res.json(patient);
      } catch (err) {
        console.error(err.message);
        return res.status(500).json({ msg: 'Server error' });
      }
    }
  );

 // @route    Put patient/signup
// @desc      updating token into database using nhid
// @access   Private
  router.post('/signup', async(req,res)=>{
     
      try{

          const token=req.body.token;
          const nhid=req.body.nhid;
          const name=req.body.name;
          const gender=req.body.gender;
          const age=req.body.age;
          const address=req.body.address;
          const number=req.body.number;
          const newPatient = new Patient({
           token: token,
           nhid: nhid,
           name: name,
           gender: gender,
           age: age,
           address: address,
           number: number
          });
    
          const patient = await newPatient.save();
          
           res.json(patient);
      }
      catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Server error' });
      }

  });

  module.exports= router;