const express = require('express');
const router = express.Router();
const { getNodesAndEdges } = require('../controllers/nodeController');

// Ruta principal
router.get('/', getNodesAndEdges);

module.exports = router;
