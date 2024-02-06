const app = require('express')();

app.get("/tshirt", (req, res) => {
	res.status(200).send({
		color: "blue",
		size: "large"
	})
});

app.listen(process.env.PORT || 3000, () => console.log(`App avaiable on http://localhost:3000`))
