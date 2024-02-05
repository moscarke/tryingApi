const app = require('express')();
const PORT = 8080;

app.get("/tshirt", (req, res) => {
	res.status(200).send({
		color: "blue",
		size: "large"
	})
});