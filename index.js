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
	console.log(req.body);
	try {
		await pool.query(
			'INSERT INTO user_info (name, vorname, mail) VALUES ($1, $2, $3)', 
			[Name, Vorname, Mail]
		);
		res.redirect('https://vini101.github.io');
	} catch (err) {
		console.error('Error adding new entries to the db.')
	}
});


app.get('/submission-count', async (req, res) => {
	try {
		const result = await pool.query('SELECT COUNT(*) FROM user_info');
		res.json({ result });
	} catch (err) {
		console.error('Error counting rows of the table.');
	}
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
