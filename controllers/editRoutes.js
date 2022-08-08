const router = require('express').Router()
const {Stop, Route} = require('../models')

router.get('/stop', async (req,res) =>{
    try {
        res.render('addstoppage')
    } catch (err){
        res.status(500).json(err)
    }
})

module.exports = router