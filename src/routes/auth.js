const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const multer = require('multer');
const guestMiddleware = require('../middleware/guestMiddleware');
const validationRegister = require('../middleware/validationsRegister');
const validationsLogin = require('../middleware/validationsLogin');
const authMiddleware = require('../middleware/authMiddleware');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images/user')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

var upload = multer({ storage: storage })

router.get("/login", authController.login);
router.post("/login", validationsLogin, authController.postLogin);

router.get("/register", guestMiddleware, authController.register);
router.post('/update/:id', authMiddleware, authController.updateUser);
router.post("/create", upload.single('userImage'), validationRegister, authController.createRegister);

router.get("/profile/:id", authMiddleware, authController.profile);
router.get('/logout', authMiddleware, authController.logout)
router.get('/users', authMiddleware, authController.getUsers)
router.post('/setAdmin/:id', authController.promoteAdmin)
router.post('/setUser/:id', authController.promoteUser)

module.exports = router;
