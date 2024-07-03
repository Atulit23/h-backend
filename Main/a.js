const axios = require("axios");

// axios.post("http://localhost:8000/update-details", {
//     userId: "66815b41610e320fcb3cf6b3",
//     mobileNumber: "9999999999",
//     email: "jane233@gmail.com",
//     pincode: 110070,
//     medicalConditions: [
//       {
//         conditionName: "",
//         diagnosedDate: new Date,
//         severity: "",
//         medications: [],
//         notes: "",
//       }
//     ],
//     family: [
//         {name: "Jill", bloodGroup: "B+", relationship: "Daughter", dob: new Date, mobileNumber: "90990929093", email: 'jill@gmail.com', records: [{
//             url: "abc",
//             type: "report",
//             recordFor: "Me",
//             date: new Date,
//             tags: [],
//             reportData: [],
//         },]},
//         {name: "Cain", bloodGroup: "B+", relationship: "Son", dob: new Date, mobileNumber: "90910929093", email: 'Cain@gmail.com', records: [{
//             url: "a2bc",
//             type: "report",
//             recordFor: "Me",
//             date: new Date,
//             tags: [],
//             reportData: [],
//         },]},
//     ],
//     records: [
//         {
//             url: "abc",
//             type: "report",
//             recordFor: "Me",
//             date: new Date,
//             tags: [],
//             reportData: [],
//         },
//     ]
// }).then((res) => {
//     console.log(res)
// }).catch(err => {
//     console.log(err)
// })

axios.post("http://localhost:8000/signup", {
  name: "Jenna",
  dob: new Date("1990-01-01"),
  mobileNumber: "8964655645645",
  gender: "Male",
  email: "johndoe@example.com",
  pincode: "12345",
  photo: "http://example.com/photo.jpg",
  hasPurchased: true,
  bloodGroup: "O+",
  pin: "026874",
  records: [], 
}).then((response) => {
  console.log("Response:", response.data);
}).catch((error) => {
  console.error("Error:", error.response.data);
});

// axios.post("http://localhost:8000/login", {
//     mobileNumber: "9999999999",
//     pin: "2345",
// }).then((res) => {
//     console.log(res)
// }).catch((err) => {
//     console.log(err)
// })

// axios.get("http://localhost:8000/get-current-user?userId=66815b41610e320fcb3cf6b3").then((res) => {
//     console.log(res.data.data)
// }).catch((err) => {
//     console.log(err)
// })

// axios.get("http://localhost:8000/get-current-record?userId=66815b41610e320fcb3cf6b3&recordId=66815b778e781c485671b837").then((res) => {
//     console.log(res.data.data)
// }).catch((err) => {
//     console.log(err)
// })

// axios.post("http://localhost:8000/edit-single-record", {
//     userId: "66815b41610e320fcb3cf6b3",
//     recordId: "66815b778e781c485671b837",
//     newRecord: {
//             url: "absccszac",
//             type: "repsccort",
//             recordFor: "record update",
//             date: new Date,
//             tags: ["sfdf", "scdvbv"],
//             reportData: [],
//         },

// }).then((res) => {
//     console.log(res)
// }).catch(err => {
//     console.log(err)
// })

// axios.post("http://localhost:8000/delete-record", {
//     userId: "6676817ebb5d94bd68cd0664",
//     recordId: "6676821e0880988a0eddf47a",
// }).then((res) => {
//     console.log(res)
// }).catch(err => {
//     console.log(err)
// })

// axios.get("http://localhost:8000/get-family-member?userId=6676a49b143abcaab86093fa&familyMemberId=6676a4bbc41ebc73138ea148").then((res) => {
//     console.log(res.data.data)
// }).catch(err => {
//     console.log(err)
// })

// axios.post("http://localhost:8000/delete-family-member", {
//     userId: "6676a49b143abcaab86093fa",
//     familyMemberId: "6676a4bbc41ebc73138ea146"
// }).then((res) => {
//     console.log(res.data)
// }).catch(err => {
//     console.log(err)
// })

// axios
//   .post("http://localhost:8000/add-family-member-record", {
//     userId: "6676a49b143abcaab86093fa",
//     familyMemberId: "6676a7f0d9b37d7b0569cb1d",
//     memberRecord: {
//       url: "new record",
//       type: "repsccort",
//       recordFor: "record update",
//       date: new Date(),
//       tags: ["sfdf"],
//       reportData: [],
//     },
//   })
//   .then((res) => {
//     console.log(res.data);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// axios
//   .post("http://localhost:8000/edit-family-member-record", {
//     userId: "6676a49b143abcaab86093fa",
//     familyMemberId: "6676a7f0d9b37d7b0569cb1d",
//     familyMemberRecordId: "6676cb74e82bc5efbe304236",
//     memberRecord: {
//       url: "enchante ",
//       type: "repsccosfdvfbgnrt",
//       recordFor: "recosffbgnrd update",
//       date: new Date(),
//       tags: ["sfdf", "sincjkc"],
//       reportData: [],
//     },
//   })
//   .then((res) => {
//     console.log(res.data);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// axios
//   .post("http://localhost:8000/delete-family-member-record", {
//     userId: "6676a49b143abcaab86093fa",
//     familyMemberId: "6676a7f0d9b37d7b0569cb1d",
//     familyMemberRecordId: "6676cb74e82bc5efbe304236",
//   })
//   .then((res) => {
//     console.log(res.data);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// axios
//   .post("http://localhost:8000/edit-medical-conditions", {
//     userId: "6676a49b143abcaab86093fa",
//     medicalConditionId: "6677b4ec4fd69d75f445b285",
//     condition: {
//       conditionName: "Diabetes",
//       diagnosedDate: new Date(),
//       severity: "",
//       medications: [],
//       notes: "",
//     },
//   })
//   .then((res) => {
//     console.log(res.data);
//   })
//   .catch((err) => {
//     console.log(err);
//   });
