const Router = require('express').Router();

Router.post('/', (req,res) => {
    const userData = req.body
    console.log(userData)
})

module.exports = Router;