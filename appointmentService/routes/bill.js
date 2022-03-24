var express=require("express");
var router=express.Router();
var Appointment= require('../models/Appointment');
var Bill=require('../models/Bill');
router.get('/', async(req,res)=>{
    try{
        let _id=req.params.id;
        const appointment = await Appointment.findById(_id).populate("bill").exec();
      
         res.json(appointment.bill);
    }
    catch (err) {
      console.error(err.message);
      res.status(500).json({ msg: 'Server error' });
    }

})
router.post('/', async(req,res)=>{
    try{
        let _id=req.params.id;
        const appointment = await Appointment.findById(_id).exec();
      const {total,appointment_id,medication}=req.body;
        
        const newBill = new Bill({
       total: total,
       appointment_id: appointment_id,
       medication: medication
        });
  
        const bill = await newBill.save();
        appointment.bill=bill;
        appointment.save();
         res.json(appointment);
    }
    catch (err) {
      console.error(err.message);
      res.status(500).json({ msg: 'Server error' });
    }

});
module.exports= router;