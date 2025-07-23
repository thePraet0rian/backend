const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const { Pool } = require('pg');
const pool = new Pool({
	connectionString: process.env.DATABASE_URL,
	ssl: {
		rejectUnauthorize: false
	}
});
pool.connect();


app.post('/submit', async (req, res) => {
	const {Name, Vorname, Mail} = req.body;
	// I am not sure if there is a missing semicolon in l 26
	try {
		await pool.query(
			'INSERT INTO user_info (name, vorname, mail) VALUES ($1, $2, $3)', 
			[Name, Vorname, Mail]
		);
	} catch (err) {
		console.error('Error adding new entries to the db.')
	}
});


app.get('/submission-count', async (req, res) => {
	try {
		const result = await pool.query('SELECT COUNT(*) FROM user_info');
		console.log(result);
		res.json({ result });
	} catch (err) {
		console.error('Error counting rows of the table.');
	}
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
