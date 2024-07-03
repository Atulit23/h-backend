const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserDetailsSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  mobileNumber: {
    type: String,
    required: true,
    unique: true,
  },
  gender: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  pincode: {
    type: String,
    required: false,
    default: "",
  },
  photo: {
    type: String,
    required: false,
    default: "",
  },
  pin: {
    type: String,
    required: true,
  },
  records: {
    type: [
      {
        url: { type: String, default: "" },
        type: { type: String, default: "" },
        recordFor: { type: String, default: "" },
        date: { type: Date, default: Date.now },
        tags: { type: [String], default: [] },
        reportData: { type: Array, default: [] },
      },
    ],
  },
  family: [
    {
      name: { type: String },
      email: { type: String },
      records: [
        {
          url: { type: String },
          type: { type: String },
          recordFor: { type: String },
          date: { type: Date, default: Date.now },
          tags: { type: [String], default: [] },
          reportData: { type: Array, default: [] },
        },
      ],
      relationship: { type: String },
      bloodGroup: { type: String },
      dob: { type: Date },
      mobileNumber: { type: String },
    },
  ],
  bloodGroup: {
    type: String,
    required: false,
    default: "",
  },
  medicalConditions: [
    {
      conditionName: { type: String },
      diagnosedDate: { type: Date, required: false },
      severity: { type: String, required: false },
      medications: { type: [String], default: [] },
      notes: { type: String, required: false },
    },
  ],
  familyMedicalConditions: [
    {
      familyMember: { type: String },
      conditionName: { type: String },
      diagnosedDate: { type: Date, required: false },
      severity: { type: String, required: false },
      notes: { type: String, required: false },
    },
  ],
  appointmentHistory: {
    type: Array,
    required: false,
    default: [],
  },
  orderHistory: {
    type: Array,
    required: false,
    default: [],
  },
  hasPurchased: {
    type: Boolean,
    required: false,
    default: false,
  },
  medications: {
    type: Array,
    required: false,
    default: [],
  },
  familyHistory: [
    {
      relationship: { type: String },
      condition: { type: String },
      diagnosedDate: { type: Date, required: false },
      notes: { type: String, required: false },
      name: { type: String, required: false },
    },
  ],
});

const UserDetails = mongoose.model("userDetails", UserDetailsSchema);
module.exports = UserDetails;
