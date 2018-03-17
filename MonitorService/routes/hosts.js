'use strict';

var express = require('express');
var router = express.Router();
var Host = require('../models/hostModel');

router.get('/', (req, res) => {
    Host.find((err, hosts) => {
        if (err)
            return res.json({ error: 'get hosts error' });
        else {
            let eles = hosts.map((host) => {
                return { id: host.id, name: host.name };
            });
            return res.json(eles);
        }
        
    });
});

router.get('/:id', (req, res) => {
    Host.findById(req.params.id, (err, host) => {
        if (err)
            return res.json({ error: 'get host error' });
        else
            return res.json({
                id: host.id,
                name: host.name
            });
    });
});

router.delete('/:id', (req, res) => {
    Host.findByIdAndRemove(req.params.id, (err, host) => {
        if (err)
            return res.json({ error: 'delete host error' });
        else
            return res.json({ message: 'delete host succeed' });
    });
});

router.post('/', (req, res) => {
    Host.create({ name: req.body.name }, (err, host) => {
        if (err)
            return res.json({ error: 'create host error' });
        else
            return res.json({
                id: host.id,
                name: host.name
            });
    });
});

module.exports = router;