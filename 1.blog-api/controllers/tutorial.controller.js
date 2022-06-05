const { Op } = require('sequelize');
const db = require('../models');
const Tutorial = db.tutorials;

/** Get All Tutorials */
const getAllTutorials = async (req, res) => {
    const tutorials = await Tutorial.findAll();
    res.send(tutorials);
}

/** Get Published Tutorials */
const getPublishedTutorials = async (req, res) => {
    const tutorials = await Tutorial.findAll({ where: { published: true } });
    res.send(tutorials);
}

/** Search For Tutorials */
const searchForTutorial = async (req, res) => {

    const searchValue = req.params.search;

    const tutorial = await Tutorial.findAll({
        where: {
            title: {
                [Op.like]: `%${searchValue}%`
            }
        }
    });

    res.send(tutorial);
}

/** Get Tutorial By ID */
const getTutorialByID = async (req, res) => {

    const ID = req.params.id;

    const tutorial = await Tutorial.findOne({ where: { id: ID } });

    if (!tutorial) {
        return res.json({ message: 'No tutorial with this ID' });
    }

    res.send(tutorial);

}

/** Create New Tutorial */
const createTutorial = async (req, res) => {

    // Validate Request (Very Static!!)
    if (!req.body.title) {
        res.status(400).json({ error: 'You must type title' });
        return;
    };

    // Create Tutorial
    const tutorial = {
        title: req.body.title,
        description: req.body.description,
        published: req.body.published ? req.body.published : false
    };

    // Save Tutorial in the database
    await Tutorial.create(tutorial)
        .then(data => res.send(data))
        .catch(err => res.status(500)
            .send({
                message: err.message || 'Something went wrong please try again later'
            }));
}

/** Update Tutorial By ID */
const updateTutorial = async (req, res) => {

    const ID = req.params.id;

    const tutorial = await Tutorial.findOne({ where: { id: ID } });

    if (!tutorial) {
        return res.json({ message: 'No tutorial with this id' });
    }

    await tutorial.update(req.body, {
        where: {
            id: ID
        }
    });

    res.send(tutorial);
}

/** Delete Tutorial By ID */
const deleteTutorial = async (req, res) => {
    const ID = req.params.id;
    const tutorial = await Tutorial.findOne({ where: { id: ID } });
    if (!tutorial) {
        return res.json({ message: 'No tutorial with this id' });
    }
    await tutorial.destroy({ where: { id: ID } }).then(data => {
        res.json({ message: 'Tutorial is deleted', tutorial: data });
    }).catch(err => res.json({ message: err.message }));
}

module.exports = {
    getAllTutorials,
    getPublishedTutorials,
    searchForTutorial,
    getTutorialByID,
    createTutorial,
    updateTutorial,
    deleteTutorial
};