const router = require('express').Router();
const { Route, Stop } = require('../models');

router.get('/:stop_id', async (req, res) => {
    try {
        const stopData = await Stop.findByPk(req.params.stop_id,{
            include: [{ model: Route}]
        })
        const stop = await stopData.get({ plain:true });

        res.render('stoppage', { stop, logged_in: req.session.logged_in })
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router
