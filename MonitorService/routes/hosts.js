'use strict';

var express = require('express');
var router = express.Router();
var nmap = require('node-nmap');
var hosts = require('../config/host');

router.post('/', (req, res) => {
    console.log(req.body);
    console.log(typeof req.body.address);

    if (typeof req.body.address != 'string') {
        let error = 'address is not a string type';
        console.log(err);
        res.json({ error: error });
        return;
    }

    //    Accepts array or comma separated string of NMAP acceptable hosts 
    let quickscan = new nmap.QuickScan(req.body.address);

    quickscan.on('complete', function (data) {
        console.log(data);
        res.json({
            name: data[0].hostname,
            ip: data[0].ip,
            status: (data.length == 1) ? "UP" : "DOWN"
        });
    });

    quickscan.on('error', function (error) {
        console.log(error);
        res.json({ error: error });
    });

    quickscan.startScan();
});

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