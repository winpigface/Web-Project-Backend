const express = require("express");
const path = require("path");

const app = express();
// app.use(express.static((__dirname +'')));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "", "Std_Admin.html"));
  // res.send("FUCK");
});
app.get("/login/:Username", (req, res) => {
  res.json(user);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server is running on " + PORT);
});
