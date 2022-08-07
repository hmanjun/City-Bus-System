const router = require('express').Router();
const { Route, Stop } = require('../models');

router.get('/:route_id', async (req, res) => {
    try {
        const routeData = await Route.findByPk(req.params.route_id,{
            include: [{ model: Stop}]
        })
        const route = await routeData.get({ plain:true });

        res.render('routepage', { route, logged_in: req.session.logged_in })
        
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router