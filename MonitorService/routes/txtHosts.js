'use strict';

var express = require('express');
var router = express.Router();
var shortid = require('shortid');

const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('localdb.txt');
const db = low(adapter);
db.defaults({ hosts: [] }).write();


//var Host = require('../models/hostModel');

router.get('/', (req, res) => {
    let hosts = db.get('hosts').value();
    res.json(hosts);
});

router.get('/:id', (req, res) => {
    let host = db.get('hosts').find({ id: req.params.id }).value();
    res.json(host);
});

router.delete('/:id', (req, res) => {
    db.get('hosts').remove({ id: req.params.id }).write();
    return res.json({ message: 'delete host succeed' });
});

router.post('/', (req, res) => {
    let newHost = {
        id: shortid.generate(),
        name: req.body.name
    };
    // Add a post
    db.get('hosts').push(newHost).write();
    res.json(newHost);
});

module.exports = router;