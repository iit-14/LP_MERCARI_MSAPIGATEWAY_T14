const mongoose = require("mongoose");

const AppointmentSchema = new mongoose.Schema({
  patient_id: { type:Number, required: true},
  doctor_id: {
    type: Number,
    required: true,
  },
  symptoms: {
    type: String,
    required: true,
  },
  slot_start: {
   type: Date
  },
  slot_end: { type: Date  },
  bill: { type: mongoose.Schema.Types.ObjectId, ref: "Bill" }
});

module.exports = mongoose.model("appointment", AppointmentSchema);
