﻿'use strict';

var express = require('express');
var router = express.Router();
var nmap = require('node-nmap');
var timestamp = require('time-stamp');

router.post('/', (req, res) => {
    console.log(req.body);

    let host = req.body.host;
    let address = host.name;
    if (typeof address != 'string') {
        let error = 'address is not a string type';
        console.log(err);
        res.json({ error: error });
        return;
    }

    //    Accepts array or comma separated string of NMAP acceptable hosts 
    let quickscan = new nmap.QuickScan(address);

    quickscan.on('complete', function (data) {
        console.log('service onComplete');
        console.log(data);
        res.json({
            name: (data.length == 0) ? "" : data[0].hostname,
            ip: (data.length == 0) ? "" : data[0].ip,
            status: (data.length == 1) ? "UP" : "DOWN",
            timestamp: timestamp('YYYY/MM/DD HH:mm:ss')
        });
    });

    quickscan.on('error', function (error) {
        console.log('service onError');
        console.log(error);
        res.json({
            status: 'UNKNOWN',
            timestamp: timestamp('YYYY/MM/DD HH:mm:ss')
        });
    });

    quickscan.startScan();
});

module.exports = router;