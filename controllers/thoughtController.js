const {ObjectId} = require('mongoose').Types;
const {user, thought, reaction} = require('../models');

module.exports = {

    async getThoughts(req, res) {
        try {
            const thoughts = await thought.find();
            res.json(thoughts);
        } catch (err) {
            console.error(err);
            return res.status(500).json(err);
        }
    },

    async getSingleThought(req, res) {
        try {
            const thought = await thought.findOne({ _id: req.params.thoughtId}).select('-__v');

            thought
            ? res.json(thought)
            : res.status(404).json({ message: "No thought found with ID"});
        } catch (err) {
            console.error(err);
            return res.status(500).json(err);
        }
    },

    async createThought(req, res) {
        try {
            const thought = await thought.create(req.body);
            const updateUser = await user.findOneAndUpdate(
                {username: req.body.username},
                {$push: {thoughts: thought._id}},
                {new: true}
            );

            updateUser
            ? res.json(thought)
            : res.status(400).json({message: 'Associated user not found'})

        } catch (err) {
            console.error(err);
            res.status(500).json(err);
        }
    },

    async updateThought(req,res) {
        try{
            const thought = await thought.findOneAndUpdate(
                {_id: req.params.thoughtId},
                {$set: req.body},
                {runValidators: true, new: true}

            );
        } catch (err) {
            console.error(err);
            res.status(500).json(err);
        }
    },
    
    async deleteThought(req, res) {
        try{
            const deletedThought = await thought.findOneAndDelete({_id: req.params.thoughtId});

            deletedThought
            ? res.status(200).json({message: "thought delted successfully", deletedThought})
            : res.status(404).json({message: "no thought exist"});
        } catch (err) {
            console.error(err);
            res.status(500).json(err);
        }
    },

    async createReaction(req,res) {
        try{
            const thought = await thought.findOneAndUpdate(
                {_id: req.params.thoughtId},
                {$addToSet: {reactions: req.body}},
                {runValidators: true, new: true}
            );

            thought
            ? res.status(200).json(thought)
            : res.status(404).json({message: "no thought exist"});
        } catch (err) {
            console.error(err);
            res.status(500).json(err);
        }
    },

    async deleteReaction(req, res) {
        try{
            const thought = await thought.findOneAndUpdate(
                {_id: req.params.thoughtId},
                {$pull: {reaction: {reactionId: req.params.reactionId}}},
            );

            thought
            ? res.status(200).json(thought)
            : res.status(404).json({message: "no thought exist"});

        } catch (err) {
            console.error(err);
            res.status(500).json(err);
        }
    },
};

