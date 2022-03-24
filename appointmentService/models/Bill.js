const mongoose = require('mongoose');
const medicineSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    price:{
        type: Number,
        required: true,
    },
    quantity:{
        type: Number,
        required: true,
    }
  });
const billSchema = new mongoose.Schema({
  total:{
    type: Number,
    required: true
  },
  appointment_id: { type: mongoose.Schema.Types.ObjectId, ref: "Appointment" },
  medication:[{medicineSchema}]

});

module.exports = mongoose.model('bill', billSchema);