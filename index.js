const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

const {CLIENT} = require('pg');
const client = new CLIENT({
	connectionString: process.env.DATABASE_URL,
	ssl: {
		rejectUnauthorize: false
	}
});
client.connect();


app.post('/submit', async (req, res) => {
	const {Name, Vorname, Mail} = req.body;
	// I am not sure if there is a missing semicolon in l 26
	try {
		await client.query(
			'INSERT INTO user_info (name, vorname, mail) VALUES ($1, $2, $3)', 
			[Name, Vorname, Mail]
		);
	} catch (err) {
		console.error('Error adding new entries to the db.')
	}
});


app.get('/submission-count', async (req, res) => {
	try {
		const result = await client.query('SELECT COUNT(*) FROM user_info');
		console.log(result);
		res.json({ result });
	} catch (err) {
		console.error('Error counting rows of the table.');
	}
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
