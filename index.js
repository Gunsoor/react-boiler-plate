const express = require('express');
const app = express();
const port = 5000;
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config/key');
const { User } = require('./models/User');

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

mongoose
	.connect(config.mongoURI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log('MongoDB Connected...'))
	.catch((e) => console.error(e));

app.get('/', (req, res) => {
	res.send('Hello World123123!');
});

app.post('/register', (req, res) => {
	const user = new User(req.body);
	user.save((err, userInfo) => {
		if (err) return res.json({ success: false, err });

		return res.status(200).json({
			success: true,
		});
	});
});

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
