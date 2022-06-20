// install and import express
const exprese = require("express");
const path = require("path");

const DB = require("./assets/user.json");
let app = exprese();

// Code here
app.use(exprese.json());

app.get("/", async (req, res) => {
  try {
  res.sendFile(path.join(__dirname, "/assets/users.html"));
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});
app.get("/users", async (req, res) => {
  try {
    return res.status(200).json({ user: DB });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});
app.get("/users/:id", async (req, res) => {
  try {
    const user = DB.filter((user) => user.id === Number(req.params.id));
    if (user.length === 0) {
      return res.status(404).json({ message: "User Not Found" });
    }
    return res.status(200).json({ user: user });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});
app.post("/users", async (req, res) => {
  try {
    const newuser = req.body;
    DB.push(newuser);
    return res.status(200).json({ updatedDB: DB });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

app.listen(8000, () => {
  console.log("list 8000");
});

// Note: Do not remove this export statement
module.exports = app;
