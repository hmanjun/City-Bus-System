const router = require('express').Router()

const userRoutes = require('./userRoutes')
const stopRoutes = require('./stopRoutes')
const routeRoutes = require('./routesRoutes')

router.use('/user', userRoutes)
router.use('/stop', stopRoutes)
router.use('/route', routeRoutes)

module.exports = router