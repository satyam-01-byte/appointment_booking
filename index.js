const express = require("express");
const app = express();
const engine = require("ejs");
const dotenv = require("dotenv");
dotenv.config();
const path = require("path");
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);
const Patients = require("./models/patients");
const dburl = `mongodb+srv://${process.env.ADMIN}:${process.env.PASSWORD}@patients.o0e6i.mongodb.net/${process.env.DATABASE}?retryWrites=true&w=majority`;
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));
const mongoose = require("mongoose");
mongoose
  .connect(dburl, {
    useUnifiedTopology: true,
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
  })
  .then(() => console.log("database connected"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/book", async (req, res) => {
  await Patients.insertMany(req.body);
  const name = req.body.name;
  const message = `Name: ${req.body.name}, 
  Mobile: ${req.body.mobile}, 
  Address: ${req.body.address}, 
  Gender: ${req.body.gender}, 
  Age: ${req.body.age}`;
  client.messages
    .create({
      body: message,
      from: `${process.env.TWILIO_PHONE_NO}`,
      to: `${process.env.RECEPTIONIST}`,
    })
    .then((message) => console.log(message.sid))
    .catch((err) => console.log(err));
  res.render("close", { name });
});

app.listen(3000, () => {
  console.log("On port 3000.");
});
