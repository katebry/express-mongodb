let router = require('express').Router();

router.get('/', function(req, res) {
    res.json({
        status: 'API Works',
        message: 'First API Res'
    });
});

router.get('/books', function(req, res) {
    console.log(req.body, ': /books request')
    res.json({
        status: '200',
        message: 'GET allBooks'
    });
});

router.get(`/books/:title`, function(req, res) {
    console.log(req.body, ': /books/:title request')
    res.json({
        status: '200',
        message: 'GET bookByTitle'
    });
});

router.post('/addBook', function(req, res) {
    console.log(req.body, ': /addBook request')
    res.json({
        status: '201',
        message: 'POST addBook'
    });
});

module.exports = router;