const mongoose = require("mongoose");
const { Schema } = mongoose;

const patientsSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  mobile: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
});

const Patients = mongoose.model("Patients", patientsSchema);
module.exports = Patients;
