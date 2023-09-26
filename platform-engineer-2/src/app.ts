import { __appRoot } from './constants';
import { processJsonFile } from './json_processing';

const prom = processJsonFile(__appRoot + "/images.json", __appRoot + "/static/images");

if (prom != undefined) {
	prom.then((downloadedImages) => {
		console.log(downloadedImages);
	});
}