const _url = require('url');

const getFolderName = (url) => {
    const hostname = _url.parse(url).hostname;
    return hostname.replace("www.", "").replace(".com", "")
}

const getImageName = (url) => {
    const urlParts = url.split("/")
    return urlParts[urlParts.length - 1]
}

module.exports = { getFolderName, getImageName };