const router = require('express').Router()
const { Stop, Route, Location } = require('../models');

//Get location page and load with all routes and stops with given id
router.get('/:location_id', async (req, res) => {
    try {
        const stopData = await Stop.findAll({
            where: { location_id: req.params.location_id }
        })
        const stops = await stopData.map((stop) => stop.get({ plain:true }));

        const routeData = await Route.findAll({
            where: { location_id: req.params.location_id }
        })
        const routes = await routeData.map((route) => route.get({ plain:true }))

        const locationData = await Location.findByPk(req.params.location_id)
        const location = locationData.get({ plain: true })

        res.render('locationpage', { stops, routes, location, logged_in: req.session.logged_in })

    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router