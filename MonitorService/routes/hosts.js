'use strict';

var express = require('express');
var router = express.Router();
var hosts = require('../config/host');

router.get('/', (req, res) => {
    res.json(hosts);
});

router.get('/:id', (req, res) => {
    let results = hosts.filter(e => e.id == req.params.id);
    if (results.length > 0) {
        res.json(results[0]);
    }
    else {
        res.json({ error: 'invalid host id' });
    }    
});

module.exports = router;