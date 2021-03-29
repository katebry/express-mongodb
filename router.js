let router = require('express').Router();

router.get('/', function(req, res) {
    res.json({
        status: 'API Works',
        message: 'First API Res'
    });
});

router.get('/books', function(req, res) {
    res.json({
        status: '200',
        message: 'GET allBooks'
    });
});

router.get(`/books/:title`, function(req, res) {
    res.json({
        status: '200',
        message: 'GET bookByTitle'
    });
});

module.exports = router;