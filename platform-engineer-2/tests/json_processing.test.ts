import { getImageSize, validateImageForDownload, processUrl, processJsonFile } from '../src/json_processing';
import { __appRoot } from '../src/constants';

const testFolder = __appRoot + "/static/images";

describe('Retrieve a remote image size', () => {
	test('the promise should be rejected if the url is empty or undefined', () => {
		getImageSize("").catch(reason => {
			expect(reason).toBeTruthy();
		});
	});

	test('An invalid URL should be rejected', () => {
		getImageSize("alguma URL inválida aqui").catch(reason => {
			expect(reason).toBeTruthy();
		});
	});

	test("An image that doesn't exists in a valid location should be rejected", () => {
		getImageSize("https://www.w3schools.com/w3css/banana_nao_existe.jpg").catch(reason => {
			expect(reason).toBeTruthy();
		});
	});

	test('A known image should return the expected size', async () => {
		const size = await getImageSize("https://www.w3schools.com/w3css/img_lights.jpg");
		expect(size).toBe(20461);
	});
});

describe('Processing each URL', () => {
	test('Empty urls should resolve to an empty string', () => {
		processUrl("", testFolder).then((filePath: string) => {
			expect(filePath).toBe("");
		});
	});

	test('Invalid urls should resolve to an empty string', () => {
		processUrl("alguma URL inválida aqui", testFolder).then((filePath: string) => {
			expect(filePath).toBe("");
		});
	});
});

describe('Validate the images that should be downloaded', () => {
	test('the promise should be rejected if the url is empty or undefined', () => {
		validateImageForDownload("").catch(reason => {
			expect(reason).toBeTruthy();
		});
	});

	test('An invalid URL should be rejected', () => {
		validateImageForDownload("alguma URL inválida aqui").catch(reason => {
			expect(reason).toBeTruthy();
		});
	});

	test("An image that doesn't exists in a valid location should be rejected", () => {
		validateImageForDownload("https://www.w3schools.com/w3css/banana_nao_existe.jpg").catch(reason => {
			expect(reason).toBeTruthy();
		});
	});

	test("An image that that is bigger than 1MB should not be validated", () => {
		validateImageForDownload("https://www.learningcontainer.com/wp-content/uploads/2020/07/Large-Sample-Image-download-for-Testing.jpg").catch(reason => {
			expect(reason).toBeTruthy();
		});
	});

	test("An image that that is smaller than 1MB should be validated", () => {
		validateImageForDownload("https://www.w3schools.com/w3css/img_lights.jpg").then((nothing) => {
			expect(nothing).toBeUndefined();
		});
	});
})

describe('Parse the JSON file', () => {
	test('Nonexisting files should return undefined', () => {
		expect(processJsonFile("/this/file/does/not/exists.json", testFolder)).toBeUndefined();
	});

	test("Files that aren't JSON should return undefined", () => {
		expect(processJsonFile(__appRoot + "src/app.ts", testFolder)).toBeUndefined();
	});

	test("The test JSON should work for all items", () => {
		processJsonFile(__appRoot + "/images.json", testFolder)?.then((result) => {
			expect(result).toContainEqual([
				testFolder + "/www.w3schools.com/img_lights.jpg",
				testFolder + "/www.w3schools.com/img_forest.jpg",
				testFolder + "/www.w3schools.com/img_mountains.jpg",
				testFolder + "/www.w3schools.com/img_snowtops.jpg"
			]);
		})
	});
})