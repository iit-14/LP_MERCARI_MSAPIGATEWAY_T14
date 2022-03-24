var express=require("express");
var router=express.Router();
var Prescription= require('../models/Prescription');

router.post('/',async(req,res)=>{
    try{
        const {appointment_id,analysis}=req.body;
          
          const newPrescrip = new Prescription({
          appointment_id: appointment_id,
          analysis: analysis
          });
    
          const prescription = await newPrescrip.save();
          
           res.json(prescription);
      }
      catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Server error' });
      }
})
router.get('/:id',async(req,res)=>{
    //getting prescription by appointment id
    try{
       const findPrescrip=await Prescription.findOne({appointment_id: req.params.id}).populate("report");
       res.json(findPrescrip);
      }
      catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Server error' });
      }
})

module.exports= router;
