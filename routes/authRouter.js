const router = require('express').Router()
const authCtrl = require('../controllers/authCtrl')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')
const uploadAvatar = require('../middleware/uploadAvatar')
const uploadAvatarCtrl = require('../controllers/uploadAvatarCtrl')


router.post('/register', authCtrl.register)

// router.post('/activation', authCtrl.activateEmail)

router.post('/login', authCtrl.login)

router.post('/logout', authCtrl.logout)

router.post('/refresh_token', authCtrl.generateAccessToken)

// router.post('/forgot', authCtrl.forgotPassword)

// router.post('/reset',auth, authCtrl.resetPassword)

router.get('/infor', auth, authCtrl.getUserInfor)

router.get('/all_infor', auth, authAdmin, authCtrl.getUsersAllInfor)

router.patch('/update', auth, authCtrl.updateUser)

router.patch('/update_role/:id', auth, authAdmin, authCtrl.updateUsersRole)

router.delete('/delete/:id', auth, authAdmin, authCtrl.deleteUser)

router.post('/upload_avatar', uploadAvatar, uploadAvatarCtrl.uploadAvatar)


module.exports = router