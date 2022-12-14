const router = require('express').Router();
const { Location } = require('../models');

//Get login/sign up page
router.get('/', async (req, res) => {
    try {
        const locationData = await Location.findAll()
        const locations = await locationData.map((location) => location.get({ plain:true }));
        res.render('loginpage', { locations, logged_in: req.session.logged_in })
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router
