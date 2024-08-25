const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json()); // Enable JSON parsing

// POST endpoint (route: /bfhl)
app.post("/bfhl", (req, res) => {
  const data = req.body.data;
  const userId = "karthik";
  const email = "krishnamsai.karthik2021@vitstudent.ac.in";
  const rollNumber = "21BIT0390";

  const numbers = [];
  const alphabets = [];
  let highestLowercaseAlphabet = "";

  data.forEach((item) => {
    if (!isNaN(item)) {
      numbers.push(item);
    } else if (item.toLowerCase() === item) {
      // Check for lowercase alphabets
      alphabets.push(item);
      if (highestLowercaseAlphabet < item) {
        highestLowercaseAlphabet = item;
      }
    }
  });

  const response = {
    is_success: true,
    user_id: userId,
    email: email,
    roll_number: rollNumber,
    numbers: numbers,
    alphabets: alphabets,
    highest_lowercase_alphabet: [highestLowercaseAlphabet],
  };

  res.json(response);
});

// GET endpoint (route: /bfhl)
app.get("/bfhl", (req, res) => {
  const response = {
    operation_code: 1,
  };
  res.json(response);
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
