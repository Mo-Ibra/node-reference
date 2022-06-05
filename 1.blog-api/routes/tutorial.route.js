const express = require('express');

const router = express.Router();

const testingMiddleware = require('../middleware/testing.middleware');

const {
    getAllTutorials,
    getPublishedTutorials,
    searchForTutorial,
    getTutorialByID,
    createTutorial,
    updateTutorial,
    deleteTutorial } = require('../controllers/tutorial.controller');

/**
 * Define Middleware in whole router
 * 
 * For example: you can use it for Auth or Check if isAdmin
*/
router.use(testingMiddleware);

/** Get All Tutorials */
router.get('/tutorials', getAllTutorials);

/** Get Published Tutorials */
router.get('/tutorials/published', getPublishedTutorials);

/** Search For Tutorials */
router.get('/tutorials/search/:search', searchForTutorial);

/** Get Tutorial By ID */
router.get('/tutorials/id/:id', getTutorialByID);

/** Create New Tutorial */
router.post('/tutorials', createTutorial);

/** Update Tutorial By ID */
router.put('/tutorials/:id', updateTutorial);

/** Delete Tutorial By ID */
router.delete('/tutorials/:id', deleteTutorial);

module.exports = router;