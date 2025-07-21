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
	const { Name, Vorname, Mail} = req.body;

	const newEntry = {
		Name, 
		Vorname,
		Mail,
	};

	fs.readFile(FILE_PATH, 'utf8', (err, data) => {
		let submissions = [];
		if (!err && data) {
			try {
				submissions = JSON.parse(data);

			} catch (e) {
				console.error('Error parsing existing JSON:', e);
			}
		}

		submissions.push(newEntry);
		console.log(submissions);

		fs.writeFile(FILE_PATH, JSON.stringify(submissions, null, 2), err => {
			if (err) {
				console.error('Error writing file:', err);
				return res.status(500).json({ message: 'Error saving submission' });
			}
			res.json({ message: 'Submission saved successfully' });
		});

	});
});

app.get('/submission-count', async (req, res) => {
	fs.readFile(FILE_PATH, 'utf8', (err, data) => {
		let submissions = JSON.parte(data);
		console.log('data');
		console.log(data);
		console.log(submissions);
		res.json({ data });
	});
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

