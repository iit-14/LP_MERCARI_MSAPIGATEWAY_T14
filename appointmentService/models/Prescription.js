const mongoose = require("mongoose");

const PrescriptionSchema = new mongoose.Schema({
    appointment_id: { type: mongoose.Schema.Types.ObjectId, ref: "appointment"},
    analysis:{
        type: String
    },
    report:[{ type: mongoose.Schema.Types.ObjectId, ref: "report"}]
});

module.exports = mongoose.model("prescription", PrescriptionSchema);
