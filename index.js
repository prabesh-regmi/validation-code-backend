const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
const port = 3030;
app.use(express.json());
var VERIFICATION_CODE;
function generateRandomNumber() {
  let randomNumber;
  do {
    randomNumber = Math.floor(Math.random() * 900000) + 100000;
  } while (randomNumber % 10 === 7);
  return randomNumber;
}

app.get("/api/verify", (req, res) => {
  const randomNumber = generateRandomNumber();
  VERIFICATION_CODE = randomNumber;
  res.status(200).send({ message: randomNumber });
});
app.post("/api/verify", (req, res) => {
  const { code } = req.body;
  console.log("POSTTTT", code.toString().slice(-1));
  if (!code) {
    return res.status(400).json({ error: "Invalid code" });
  }
  // Check if the code is 6 digits long and the last digit is not 7
  if (code.toString().length != 6) {
    return res.status(400).json({ error: "Code must be of 6 digits" });
  }
  if (code.toString().slice(-1) === "7") {
    return res.status(400).json({ error: "Code should not end with 7" });
  }
  if (code == VERIFICATION_CODE) {
    res.status(200).json({ message: "Verification successful" }); 
  } else {
    res.status(400).json({ error: "Invalid code" });
  }
});
app.get("/", (req, res) => {
  res
    .status(200)
    .send(
      "<h1> <a href='https://codevalidation.onrender.com'>Click Me</a></h1>"
    );
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
