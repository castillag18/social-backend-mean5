'use strict'

const path = require('path');
const config = require('../config/config');

const dbPublication = require('../model/publication');

exports.find_pub = function (req, res, next) {

  dbPublication.findOne({ _id: req.params.id, user: req.user.sub }, (err, data) => {
    if (err) return res.status(500).send(config.resJson(config.resMsg.publicationNotFound, 500));
    if (data == null || data == undefined) return res.status(400).send(config.resJson(config.resMsg.publicationNotFound, 400))
    if (data.file && data.file != null) return res.status(400).send(config.resJson(config.resMsg.public_fileExist, 400));
    next();    
  });

}
