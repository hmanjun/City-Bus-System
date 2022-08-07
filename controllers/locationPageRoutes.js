const router = require('express').Router()
const { Stop, Route } = require('../models');

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

        res.render('locationpage', { stops, routes, logged_in: req.session.logged_in })

    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router