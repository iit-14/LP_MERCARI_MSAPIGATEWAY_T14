const mongoose = require('mongoose');

const PatientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  nhid:{
      type:Number,
      required: true,
      unique: true,
      index: { unique: true } 
  },
  gender:{
      type: String,
      required: true
  },
 age:{
     type: Number,
     required: true
 },
 address:{
     type:String,
     required: true,
 },
 number:{
     type:Number,
     required:true,
     unique:true
 },
 token:{
     type:String,
     index: { unique: true } 
 }
});

module.exports = mongoose.model('patient', PatientSchema);