const express = require('express');
const router = express.Router();  
const postsAPI = require('../../../controllers/api/v1/posts_api');

router.get('/', postsAPI.index);
router.delete('/:id', postsAPI.destroyPost);

module.exports = router;