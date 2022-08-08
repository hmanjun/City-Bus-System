const router = require('express').Router()

const homeRoutes = require('./homeRoutes')
const loginRoutes = require('./loginRoutes')
const stopPageRoutes = require ('./stopPageRoutes')
const apiRoutes = require('./api')
const locationPageRoutes = require('./locationPageRoutes')
const routePageRoutes = require('./routePageRoutes')
const managepageRoutes = require('./managePageRoutes')


router.use('/', homeRoutes)
router.use('/login', loginRoutes)
router.use('/stop', stopPageRoutes)
router.use('/location', locationPageRoutes)
router.use('/route', routePageRoutes)
router.use('/manage', managepageRoutes)

router.use('/api', apiRoutes)


module.exports = router;