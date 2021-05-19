import app from "./server/server";

const { PORT } = process.env;

app.listen(PORT, () => {
	console.log("Server up..");
});
