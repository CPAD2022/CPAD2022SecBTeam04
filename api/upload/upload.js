const express = require('express');
const router = express.Router();
const multer = require('multer');
// const checkAuth = require("../middleware/check-auth");
const UploadController = require('../controller/upload');
var photoName;

const storage = multer.diskStorage({
    destination : function (req, file, cb) {
        cb(null,'uploadedImages')
    },
    filename : function (req,file, cb) {
        const number = Math.floor(Math.random() * 32525345668);
        photoName = 'Image' + number.toString() + '.png';
        cb(null, photoName );
    }
});
const fileFilter = (req ,file ,cb) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
        cb(null,true);
    } else {
        var error = new Error('Wrong Format');
        error.status  = 500;
        cb(error,false);
    }
} 
const upload = multer({storage: storage,fileFilter:fileFilter});


router.get('/', UploadController.upload_get);
router.post('/',UploadController.upload_post);

module.exports = router;