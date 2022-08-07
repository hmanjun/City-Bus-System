const router = require('express').Router()

const homeRoutes = require('./homeRoutes')
const loginRoutes = require('./loginRoutes')
const stopPageRoutes = require ('./stopPageRoutes')
const apiRoutes = require('./api')


router.use('/', homeRoutes)
router.use('/login',loginRoutes)
router.use('./stopPageRoutes')
router.use('/api',apiRoutes)

module.exports = router;