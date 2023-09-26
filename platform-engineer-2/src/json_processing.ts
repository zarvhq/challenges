import * as https from 'https'
import * as http from 'http'
import { __maxDownloadableSize } from './constants';
import * as fs from 'fs'

export function saveToFile(data: Buffer, url: URL, imgFolderRoot: string): string {
	//File was downloaded, lets create the appropriate directories and save the data.
	//For large files it would be better to do this at the start and go saving the data in a listener,
	//but since the max size we will be downloading is 1MB, we don't really need to bother with it.
	let localPath = imgFolderRoot + "/" + url.hostname;

	if (!fs.existsSync(localPath)) {
		fs.mkdirSync(localPath, { recursive: true });
	}

	localPath = localPath + "/" + url.pathname.split("/").pop();

	if (localPath.endsWith("/")) {
		let counter = 1;

		while (fs.existsSync(localPath + "Imagem " + counter + ".jpg"))
			counter++;

		localPath = localPath + "Imagem " + counter + ".jpg";
	}

	fs.writeFileSync(localPath, data);
	return localPath;
}

export function getImageSize(url: string): Promise<number> {
	return new Promise<number>((resolve, reject) => {
		if (url === "" || url == undefined || url == null)
			reject("Invalid URL");

		else {
			const req = https.get(url, (response: http.IncomingMessage) => {
				//basic check if the request was successful. This could be extended to answer better to specific problems
				if (response.statusCode != 200)
					reject("Request Returned Error " + response.statusCode);

				else if (response.headers["content-type"]?.toString().startsWith("image"))
					resolve(parseInt(response.headers["content-length"] as string));

				else
					reject("URL does not point to image file.");
			}).on("error", (error: Error) => {
				reject("Failed to connect to site " + url + ", Error: " + error.message);
			}).on("timeout", () => {
				reject("Failed to connect to site " + url + ", connection timed out");
			});
		}
	});
}

export function validateImageForDownload(url: string): Promise<void> {
	return new Promise((resolve, reject) => {
		getImageSize(url).then((size: number) => {
			if (size > __maxDownloadableSize)
				reject("Warning: Image " + url + "is bigger than " + __maxDownloadableSize + "bytes, skipping.");
			else
				resolve();
		}).catch((reason: string) => {
			reject(reason)
		});
	});
}

export function downloadImage(url: string, imgFolderRoot: string): Promise<string> {
	return new Promise<string>((resolve, reject) => {
		if (url === "" || url == undefined || url == null) {
			console.log("Invalid URL");
			resolve("");
		}

		else {
			const parsedUrl = new URL(url);
			https.get(parsedUrl, (response: http.IncomingMessage) => {
				if (response.statusCode != 200) {
					console.log("Request Returned Error " + response.statusCode);
					resolve("");
				}

				let data = Buffer.from("");

				response.on("data", (chunk: Buffer) => {
					data = Buffer.concat([data, chunk]);
				});

				response.on("end", () => {
					//basic check if the request was successful. This could be extended to answer better to specific problems
					if (data.length > 0)
						resolve(saveToFile(data, parsedUrl, imgFolderRoot));
					else
						resolve("");
				}).on("error", (error: Error) => {
					console.log("Failed to connect to site " + url + ", Error: " + error.message);
					resolve("");
				}).on("timeout", () => {
					console.log("Failed to connect to site " + url + ", connection timed out");
					resolve("");
				});
			});
		}
	});
}

//starts the processing of each URL independently
export function processUrl(url: string, imgFolderRoot: string): Promise<string> {
	return new Promise<string>((resolve) => {
		validateImageForDownload(url).then(() => {
			resolve(downloadImage(url, imgFolderRoot));
		}).catch((reason: string) => {
			//We don't reject here because that would make the external Promise.all "reject everything". So we resolve it, but logging
			//on the console that it failed and return an empty string to be removed later.
			console.log(reason);
			resolve("");
		});
	});
}

export function processJsonFile(jsonFilePath: string, imgFolderPath: string): Promise<string[]> | undefined {
	if (fs.existsSync(jsonFilePath)) {
		const json = JSON.parse(fs.readFileSync(jsonFilePath).toString());

		if (Array.isArray(json.images)) {
			return Promise.all((json.images as Array<string>).map((item) => { return processUrl(item, imgFolderPath) })).then((results): string[] => {
				return results.filter((item) => { return (item != "") })
			});
		}

		else
			console.log("File " + jsonFilePath + " does not contains a proper JSON object, or does not contains the array field 'images'");
	}

	else
		console.log("JSON file " + jsonFilePath + "not found");

	return undefined;
}