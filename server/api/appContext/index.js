'use strict';

var express = require('express');
var controller = require('./appContext.controller');

var router = express.Router();

router.get('/', controller.show);
router.get('/:role', controller.show);
router.delete('/', controller.logout);
// router.post('/', controller.create);
// router.put('/:id', controller.update);
// router.patch('/:id', controller.update);
// router.delete('/:id', controller.destroy);

module.exports = router;
