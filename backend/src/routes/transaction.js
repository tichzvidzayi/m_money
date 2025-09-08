const router = require('express').Router();
const { create, getAll } = require('../controllers/transaction');
const authMiddleware = require('../middleware/auth');

router.post('/', authMiddleware, create);
router.get('/', authMiddleware, getAll);

module.exports = router;