const express = require("express");
const app = express();
const engine = require("ejs");
const path = require("path");
const Patients = require("./models/patients");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));
const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost:27017/patients", {
    useUnifiedTopology: true,
    useCreateIndex: true,
    useNewUrlParser: true,
  })
  .then(() => console.log("database connected"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/book", async (req, res) => {
  await Patients.insertMany(req.body);
  res.send("Appointment booked!");
});

app.listen(3000, () => {
  console.log("On port 3000.");
});
