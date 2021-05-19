// https://stackoverflow.com/a/23095731/12705420
// Encodes random values for each color channel
export function getRandomRgb() {
	var num = Math.round(0xffffff * Math.random());
	var r = num >> 16;
	var g = (num >> 8) & 255;
	var b = num & 255;
	return "rgb(" + r + ", " + g + ", " + b + ")";
}
