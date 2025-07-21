const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const FILE_PATH = path.join(__dirname, 'submissions.json');

app.post('/submit', (req, res) => {
	const { name, vorname, email } = req.body;
	console.log(req.body);
	console.log('this is a test');

	const newEntry = {
		name,
		vorname,
		email,
	};

	// Read existing data (if file exists)
	fs.readFile(FILE_PATH, 'utf8', (err, data) => {
		let submissions = [];
		if (!err && data) {
			try {
				submissions = JSON.parse(data);
			} catch (e) {
				console.error('Error parsing existing JSON:', e);
			}
		}

		// Add new entry
		submissions.push(newEntry);

		// Write back to file
		fs.writeFile(FILE_PATH, JSON.stringify(submissions, null, 2), err => {
			if (err) {
				console.error('Error writing file:', err);
				return res.status(500).json({ message: 'Error saving submission' });
			}
			res.json({ message: 'Submission saved successfully' });
		});
	});
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

