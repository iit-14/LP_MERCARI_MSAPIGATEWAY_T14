var express=require("express");
var router=express.Router();
var Prescription= require('../models/Prescription');
var Report=require('../models/Report');
router.post('/:id',async(req,res)=>{
    try{
        const {link,description,finding}=req.body;
        let _id=req.params.id;
        console.log(req.params.id);
        const found= await Prescription.findOne({appointment_id:_id}).populate("report");
        //const found= await Prescription.findById(_id).exec();
        console.log(found);
          
          const newReport = new Report({
         link:link,
         description: description,
         finding: finding
          });
          

          found.report.push(newReport);
          const prescription = await found.save();
          
           res.json('Ok');
      }
      catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Server error' });
      }
})

module.exports= router;