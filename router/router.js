const Router = require('express')
const userController = require('../controllers/userController')
const animeController = require('../controllers/animeController')
const commentController = require('../controllers/commentController')
const router = new Router()

router.use('/user', userController)
router.use('/anime', animeController)
router.use('/comment', commentController)



module.exports = router