const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(cors()); // Allow cross-origin requests (needed for GitHub Pages)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/submit', (req, res) => {
  const { name, email } = req.body;
  console.log(`Received: ${name}, ${email}`);
  // You can add logic to save this data to a file or database
  res.json({ message: 'Form submitted successfully' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

