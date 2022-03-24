var express=require("express");
var router=express.Router();
var Appointment= require('../models/Appointment');

router.get(
    '/doctor/:id',
    async (req, res) => {
      try {
          let doctor_id=req.params.id;
        const appointment = await Appointment.find({
         doctor_id: doctor_id
        });
        if (!appointment.length) return res.status(400).json({ msg: 'Appointment not found' });
        return res.json(appointment);
      } catch (err) {
        console.error(err.message);
        return res.status(500).json({ msg: 'Server error' });
      }
    }
  );
  router.get(
    '/patient/:id',
    async (req, res) => {
      try {
          let patient_id=req.params.id;
        const appointment = await Appointment.find({
         patient_id: patient_id
        });
        if (!appointment.length) return res.status(400).json({ msg: 'Appointment not found' });
  
        return res.json(appointment);
      } catch (err) {
        console.error(err.message);
        return res.status(500).json({ msg: 'Server error' });
      }
    }
  );
  router.get(
    '/:id',
    async (req, res) => {
      try {
          let _id=req.params.id;
        const appointment = await Appointment.findById(_id).exec();
        if (!appointment) return res.status(400).json({ msg: 'Appointment not found' });
  
        return res.json(appointment);
      } catch (err) {
        console.error(err.message);
        return res.status(500).json({ msg: 'Server error' });
      }
    }
  );
  router.delete('/:id',async(req,res)=>{
    try {
        let id=req.params.id;
      const appointment = await Appointment.findOneAndRemove({ _id: id }).exec();
      if (!appointment) return res.status(400).json({ msg: 'Appointment not found' });

      return res.send('Appointment deleted');
    } catch (err) {
      console.error(err.message);
      return res.status(500).json({ msg: 'Server error' });
    }
  })
  
  router.post('/post', async(req,res)=>{
      try{
        const {patient_id,doctor_id,symptoms,slot_start,slot_end,bill}=req.body;
          
          const newAppointment = new Appointment({
          patient_id: patient_id,
          doctor_id: doctor_id,
          symptoms: symptoms,
          slot_start: slot_start,
          slot_end: slot_end,
          });
    
          const appointment = await newAppointment.save();
          
           res.json(appointment);
      }
      catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Server error' });
      }

  });

  module.exports= router;