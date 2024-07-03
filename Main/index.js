const connectToMongo = require("./connections");
const express = require("express");
var cors = require("cors");
const axios = require("axios");
const UserDetails = require("../Models/UserDetails");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const mongoose = require("mongoose");
const { v4: uuidv4 } = require('uuid');

connectToMongo();
const app = express();
const port = 8000;

app.use(express.json());
app.use(cors());

// login
app.post("/login", async (req, res) => {
  const data = req.body;
  const user = await UserDetails.findOne({ mobileNumber: data.mobileNumber });

  if (!user) {
    return res.status(400).send({ message: "Invaild mobile number" });
  }
  const currentUser = await UserDetails.findOne({
    mobileNumber: data.mobileNumber,
    pin: data.pin,
  });

  if (!currentUser) {
    return res.status(400).send({ message: "Incorrect pin" });
  }
  return res.status(200).send({ message: "Login successful" });
});

// signup
app.post("/signup", async (req, res) => {
  const data = req.body;
  console.log(data);

  try {
    const existingUser = await UserDetails.findOne({ mobileNumber: data.mobileNumber });

    if (existingUser) {
      return res.status(400).json({ message: "Phone number already exists, please login!" });
    }
    const records = data.records || [];

    const newUser = new UserDetails({
      name: data.name,
      dob: data.dob,
      mobileNumber: data.mobileNumber,
      gender: data.gender,
      email: data.email,
      pincode: data.pincode || "",
      photo: data.photo || "",
      hasPurchased: data.hasPurchased || false,
      bloodGroup: data.bloodGroup || "",
      pin: data.pin || "",
      records: records,
      medicalConditions: data.medicalConditions || [],
      familyMedicalConditions: data.familyMedicalConditions || [],
      familyHistory: data.familyHistory || [],
    });

    await newUser.save();
    res.status(201).json({ message: "User created successfully" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// update current user details
app.post("/update-details", async (req, res) => {
  const data = req.body;
  try {
    const user = await UserDetails.findOne({ _id: data.userId });

    if (!user) {
      return res.status(400).json({ message: "User doesn't exist!" });
    }

    const updateData = {};

    if (data.photo) updateData.photo = data.photo;
    if (data.mobileNumber) updateData.mobileNumber = data.mobileNumber;
    if (data.email) updateData.email = data.email;
    if (data.pincode) updateData.pincode = data.pincode;
    if (data.family) updateData.family = data.family;
    if (data.records) updateData.records = data.records;
    if (data.bloodGroup) updateData.bloodGroup = data.bloodGroup;
    if (data.medicalConditions)
      updateData.medicalConditions = data.medicalConditions;
    if (data.familyMedicalConditions)
      updateData.familyMedicalConditions = data.familyMedicalConditions;
    if (data.appointmentHistory)
      updateData.appointmentHistory = data.appointmentHistory;
    if (data.orderHistory) updateData.orderHistory = data.orderHistory;
    if (data.familyHistory) updateData.familyHistory = data.familyHistory;
    if (data.medications) updateData.medications = data.medications;
    if (data.hasPurchased) updateData.hasPurchased = data.hasPurchased;

    await UserDetails.findOneAndUpdate({ _id: data.userId }, updateData);

    res.status(200).json({ message: "User details updated successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// get current user details
app.get("/get-current-user", async (req, res) => {
  const userId = req.query.userId;
  const user = await UserDetails.findOne({ _id: userId });

  if (!user) {
    return res.status(400).send({ message: "User doesn't exist!" });
  }
  return res.status(200).json({ data: user });
});

// get current record details
app.get("/get-current-record", async (req, res) => {
  const userId = req.query.userId;
  const recordId = req.query.recordId;
  const user = await UserDetails.findOne({ _id: userId });

  if (!user) {
    return res.status(400).send({ message: "User doesn't exist!" });
  }

  const record = user.records.filter((item, index) => {
    return item._id.toString() === recordId;
  });
  return res.status(200).json({ data: record });
});

// edit user record (report etc.)
app.post("/edit-single-record", async (req, res) => {
  try {
    const data = req.body;
    const userId = data.userId;
    const recordId = data.recordId;
    
    const result = await UserDetails.findOneAndUpdate(
      { _id: userId, "records._id": recordId },
      {
        $set: {
          "records.$.url": data.newRecord?.url || records[curr].url,
          "records.$.type": data.newRecord?.type || records[curr].type,
          "records.$.recordFor": data.newRecord?.recordFor || records[curr].recordFor,
          "records.$.date": data.newRecord?.date || records[curr].date,
          "records.$.tags": data.newRecord?.tags || records[curr].tags,
          "records.$.reportData": data.newRecord?.reportData || records[curr].reportData,
        }
      },
      { new: true }
    );

    if (!result) {
      return res.status(404).send({ message: "Record not found" });
    }

    res.send({ message: "Record updated successfully", data: result });
  } catch (err) {
    console.error("Error updating record:", err);
    res.status(500).send({ message: "Internal server error" });
  }
});


// delete user record (report etc.)
app.post("/delete-record", async (req, res) => {
  const data = req.body;

  const userId = data.userId;
  const recordId = data.recordId;

  const user = await UserDetails.findOne({ _id: userId });

  if (!user) {
    return res.status(400).send({ message: "User doesn't exist!" });
  }
  let records = user.records;

  records = records.filter((item, index) => {
    return item._id.toString() !== recordId;
  });

  await UserDetails.findOneAndUpdate(
    { _id: userId },
    { records: records }
  ).then((result, err) => {
    if (err) {
      res.send(err);
    } else {
      res.send({ message: "Record deleted successfully" });
    }
  });
});

// get family members
app.get("/get-complete-family", async (req, res) => {
  const userId = req.query.userId;
  const user = await UserDetails.findOne({ _id: userId });

  if (!user) {
    return res.status(400).send({ message: "User doesn't exist!" });
  }
  return res.status(200).json({ data: user.family });
});

// get a single family memeber
app.get("/get-family-member", async (req, res) => {
  const userId = req.query.userId;
  const familyMemberId = req.query.familyMemberId;
  const user = await UserDetails.findOne({ _id: userId });

  if (!user) {
    return res.status(400).send({ message: "User doesn't exist!" });
  }
  const member = user.family.filter((item, index) => {
    return item._id.toString() === familyMemberId;
  });
  return res.status(200).json({ data: member });
});

// delete family member
app.post("/delete-family-member", async (req, res) => {
  const userId = req.body.userId;
  const familyMemberId = req.body.familyMemberId;
  const user = await UserDetails.findOne({ _id: userId });

  if (!user) {
    return res.status(400).send({ message: "User doesn't exist!" });
  }
  const members = user.family.filter((item, index) => {
    return item._id.toString() !== familyMemberId;
  });

  await UserDetails.findOneAndUpdate({ _id: userId }, { family: members }).then(
    (result, err) => {
      if (err) {
        res.send(err);
      } else {
        res.send({ message: "Family member deleted successfully" });
      }
    }
  );
});

// add family member record
app.post("/add-family-member-record", async (req, res) => {
  const body = req.body;
  const userId = body.userId;
  const familyMemberId = body.familyMemberId;
  const memberRecord = body.memberRecord;

  let user = await UserDetails.findOne({ _id: userId });

  if (!user) {
    res.status(400).send({ message: "User doesn't exist" });
  }

  let family = user.family;

  family.map((item, index) => {
    if (item._id.toString() === familyMemberId) {
      family[index].records.push(memberRecord);
    }
  });

  try {
    const result = await UserDetails.findOneAndUpdate(
      { _id: userId },
      { family: family },
      { new: true }
    );

    return res
      .status(200)
      .json({ message: "Family details updated successfully!", data: result });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Internal server error" });
  }
});

// edit family memeber record
app.post("/edit-family-member-record", async (req, res) => {
  const body = req.body;
  const userId = body.userId;
  const familyMemberId = body.familyMemberId;
  const familyMemberRecordId = body.familyMemberRecordId;
  const memberRecord = body.memberRecord;

  let user = await UserDetails.findOne({ _id: userId });

  if (!user) {
    res.status(400).send({ message: "User doesn't exist" });
  }

  let family = user.family;

  family.map((item, index) => {
    if (item._id.toString() === familyMemberId) {
      // family[index].records.push(memberRecord)
      item.records.map((elem, curr) => {
        if (elem._id.toString() === familyMemberRecordId) {
          family[index].records[curr].url = memberRecord?.url ? memberRecord?.url : family[index].records[curr].url
          family[index].records[curr].type = memberRecord?.type ? memberRecord?.type : family[index].records[curr].type
          family[index].records[curr].recordFor = memberRecord?.recordFor ? memberRecord?.recordFor : family[index].records[curr].recordFor
          family[index].records[curr].date = memberRecord?.date ? memberRecord?.date : family[index].records[curr].date
          family[index].records[curr].tags = memberRecord?.tags ? memberRecord?.tags : family[index].records[curr].tags
          family[index].records[curr].reportData = memberRecord?.reportData ? memberRecord?.reportData : family[index].records[curr].reportData
        }
      });
    }
  });
  try {
    const result = await UserDetails.findOneAndUpdate(
      { _id: userId },
      { family: family },
      { new: true }
    );
    return res
      .status(200)
      .json({ message: "Family member details updated successfully!", data: result });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Internal server error" });
  }
});

// delete family memeber record
app.post("/delete-family-member-record", async (req, res) => {
  const { userId, familyMemberId, familyMemberRecordId } = req.body;

  try {
    const user = await UserDetails.findOne({ _id: userId });
    if (!user) {
      return res.status(400).send({ message: "User doesn't exist" });
    }

    const familyMember = user.family.find(member => member._id.toString() === familyMemberId);
    if (!familyMember) {
      return res.status(400).send({ message: "Family member doesn't exist" });
    }

    familyMember.records = familyMember.records.filter(record => record._id.toString() !== familyMemberRecordId);

    const result = await UserDetails.findOneAndUpdate(  
      { _id: userId },
      { family: user.family },
      { new: true }
    );

    return res.status(200).json({ message: "Family member details updated successfully!", data: result });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Internal server error" });
  }
});

// get user's medical condtition
app.get("/get-medical-conditions", async (req, res) => {
  const userId = req.query.userId 

  const user = await UserDetails.findOne({_id: userId})

  if (!user) {
    return res.status(400).send({message: "User doesn't exist"})
  }
  return res.status(200).json({data: user.medicalConditions})
})

// edit user's medical condition
app.post("/edit-medical-conditions", async (req, res) => {
  const { userId, medicalConditionId, condition } = req.body;

  if (!userId || !medicalConditionId || !condition) {
    return res.status(400).send({ message: "Invalid input data" });
  }

  try {
    const user = await UserDetails.findById(userId);

    if (!user) {
      return res.status(400).send({ message: "User doesn't exist" });
    }

    const updateFields = {};
    if (condition.conditionName) updateFields['medicalConditions.$.conditionName'] = condition.conditionName;
    if (condition.diagnosedDate) updateFields['medicalConditions.$.diagnosedDate'] = condition.diagnosedDate;
    if (condition.severity) updateFields['medicalConditions.$.severity'] = condition.severity;
    if (condition.medications) updateFields['medicalConditions.$.medications'] = condition.medications;
    if (condition.notes) updateFields['medicalConditions.$.notes'] = condition.notes;

    if (Object.keys(updateFields).length === 0) {
      return res.status(400).send({ message: "No valid fields provided for update" });
    }

    const result = await UserDetails.findOneAndUpdate(
      { _id: userId, 'medicalConditions._id': medicalConditionId },
      { $set: updateFields },
      { new: true }
    );

    if (!result) {
      return res.status(400).send({ message: "Medical condition not found" });
    }

    return res.status(200).json({ message: "Medical condition updated successfully!", data: result });

  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Internal server error" });
  }
});

// get user's family medical condtition
app.get("/get-family-medical-conditions", async (req, res) => {
  const userId = req.query.userId 

  const user = await UserDetails.findOne({_id: userId})

  if (!user) {
    return res.status(400).send({message: "User doesn't exist"})
  }
  return res.status(200).json({data: user.familyMedicalConditions})
})

// get family history
app.get("/get-family-history", async (req, res) => {
  const userId = req.query.userId 

  const user = await UserDetails.findOne({_id: userId})

  if (!user) {
    return res.status(400).send({message: "User doesn't exist"})
  }
  return res.status(200).json({data: user.familyHistory})
})

// apis for order history 

// apis for appointment history

app.get("/", (req, res) => {
  res.send("Hi!");
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});

module.exports = app;
