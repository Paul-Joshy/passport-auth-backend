const Router = require('express').Router;

const router = new Router();

router.get('/', (req, res) => {
    return res.json({
        success: true,
        body: []
    })
})

module.exports = router;