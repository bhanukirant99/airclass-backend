const express = require('express');

const router = express.Router();
const adminController = require('../../controllers/admin.controller');
const adminCheckAuth = require('../../middlewares/adminCheckAuth')
const uploadImage = require('../../middlewares/multerUploadImage')
const uploadVideo = require('../../middlewares/multerUploadVideo')
const setFolderName = require('../../middlewares/setFolderName')

router.use('/admin/', express.static('public'));
router.post('/admin/login', adminController.admin_login)
router.get('/admin/logout', adminController.admin_logout)
router.get('/admin/newCourse', adminCheckAuth, adminController.get_newCourse_page)
router.post('/admin/newCourse', adminCheckAuth, uploadImage.single('img'), adminController.create_newCourse)
router.get('/admin/addContent', adminCheckAuth, adminController.get_addContent_page);
router.post('/admin/addContent', adminCheckAuth, adminController.create_newContent)
router.get('/admin/uploadVideo/:courseID', adminCheckAuth, adminController.get_uploadVideo_page)
router.post('/admin/uploadVideo/:courseID', adminCheckAuth, setFolderName, uploadVideo, adminController.create_uploadVideo)

module.exports = router;