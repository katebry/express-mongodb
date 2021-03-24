let router = require('express').Router();

router.get('/', function(req, res) {
    res.json({
        status: 'API Works',
        message: 'First API Res'
    });
});

module.exports = router;