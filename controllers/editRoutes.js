const router = require('express').Router()
const {Stop, Route} = require('../models')

router.get('/stop', async (req,res) =>{
    try {
        res.render('addstoppage', {logged_in: req.session.logged_in, location_id: req.session.location_id})
    } catch (err){
        res.status(500).json(err)
    }
})

router.get('/route', async (req,res) => {
    try {
        const stopData = await Stop.findAll({
            where: { location_id: req.session.location_id}
        })
        const stops = await stopData.map((stop) => stop.get({ plain:true }));
        
        res.render('addroutepage', {stops, logged_in: req.session.logged_in, location_id: req.session.location_id})
    } catch (err) {
        res.status(500).json(err)
    }
})

module.exports = router