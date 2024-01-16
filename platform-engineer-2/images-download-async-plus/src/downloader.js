const axios = require("axios");
const fs = require("fs");
const { getFolderName, getImageName } = require('./url-decoder');

const maxBytes = 100000; // 1mb

const downloader = (imageList, output) => {
    return axios.all(imageList.map(async (url) => getAndWriteStream(url, output)))
};

const getAndWriteStream  = async(url, output) => {
    const subDir = getFolderName(url)
    const folderPath = output + "/" + subDir
    if (!fs.existsSync(folderPath)){
        fs.mkdirSync(folderPath, { recursive: true });
    }

    const filename = getImageName(url)
    const writer = fs.createWriteStream(folderPath + "/" + filename);
 
    return axios({
        method: 'get',
        url: url,
        responseType:'stream',      // to be able to pipe the response
    }).then(response => {

        const contentLenth = response.headers['content-length'];

        if (contentLenth > maxBytes) {
            return new Error("exploded");
        }

        return new Promise((resolve, reject) => {
            // pipe to writestream
            response.data.pipe(writer);
            
            let error = null;

            // if error close the writer
            writer.on('error', err => {
                error = err;
                writer.close();
                reject(err); // and reject the promise
            });

            // no need the reject here
            // it will have been called in the 'error' stream
            writer.on('close', () => {
                if (!error) {
                    resolve(filename);
                }
            });
        })
    })
}

module.exports = { downloader };