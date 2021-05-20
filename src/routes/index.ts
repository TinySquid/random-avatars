import fs from "fs";
import path from "path";
import express from "express";
import { createCanvas } from "canvas";
import { nanoid } from "nanoid";
import { getRandomRgb } from "../utils/getRandomRgb";

const PUBLIC_DIR = path.dirname(__dirname) + "/public";

const router = express.Router();

router.get("/", (req, res) => {
	// Dimensions
	const [cSizeX, cSizeY] = [64, 64];
	const [originX, originY, radius] = [32, 32, 32];

	const canvas = createCanvas(cSizeX, cSizeY);
	const ctx = canvas.getContext("2d");

	// Draw circle
	ctx.fillStyle = getRandomRgb();
	ctx.beginPath();
	ctx.arc(originX, originY, radius, 0, 2 * Math.PI);
	ctx.fill();

	// Pipe image data to png file and send
	const imageId = nanoid();
	const generatedPath = `${PUBLIC_DIR}/${imageId}.png`;

	const out = fs.createWriteStream(generatedPath);

	const stream = canvas.createPNGStream();

	stream.pipe(out);

	out.on("finish", () => {
		res.sendFile(generatedPath);

		// Delete image after 3 minutes
		setTimeout(() => {
			fs.unlink(generatedPath, (err) => {
				if (err) console.log(err);
			});
		}, 1000 * 60 * 3);
	});

	out.on("error", (e) => res.sendStatus(500));
});

export default router;
