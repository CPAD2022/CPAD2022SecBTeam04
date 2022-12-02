const recognize = require('../../vision');
const client = require('https');
const fs = require('fs');
const download = require('image-downloader');
const Axios = require('axios');

exports.upload_get = (req,res,next) => {
    res.status(200).json({
        message: 'handling post req to /upload'
    })
};

exports.upload_post = async (req, res, next) => {
    const url = req.body.url;
    const number = Math.floor(Math.random() * 32525345668);
    var photoName = 'Image' + number.toString() + '.png';
    var filepath = `./uploadedImages/${photoName}`;
    await downloadImage(url, filepath);
    const expiryDate = await recognize(filepath);
    const expiryYYYY = expiryDate.format("DD/MM/YYYY")
    res.status(200).json({
        message: expiryYYYY
    })
};

async function downloadImage(url, filepath) {
    const response = await Axios({
        url,
        method: 'GET',
        responseType: 'stream'
    });
    return new Promise((resolve, reject) => {
        response.data.pipe(fs.createWriteStream(filepath))
            .on('error', reject)
            .once('close', () => resolve(filepath)); 
    });
}



