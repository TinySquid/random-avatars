import app from "./server/server";
import apiRouter from "./routes";

const { PORT } = process.env;

app.use("/api", apiRouter);

app.listen(PORT, () => {
	console.log("Server up..");
});
