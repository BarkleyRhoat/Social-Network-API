const { ObjectId } = require('mongoose').Types;
const { User, Thought, Reaction } = require('../models');

module.exports = {

  // GET all thoughts
  async getThoughts(req, res) {

    try {

      const thoughts = await Thought.find();

      res.json(thoughts);

    } catch (err) {

      console.error(err);
      return res.status(500).json(err);

    }
  },

  // GET single thought by _id
  async getSingleThought(req, res) {

    try {

      const thought = await Thought.findOne({ _id: req.params.thoughtId }).select('-__v');

      thought 
        ? res.json(thought) 
        : res.status(404).json({ message: 'No thought found with that ID' });

    } catch (err) {

      console.error(err);
      return res.status(500).json(err);

    }
  },

  
  async createThought(req, res) {

    try {

      const thought = await Thought.create(req.body);

      const updatedUser = await User.findOneAndUpdate(
        { username: req.body.username },
        { $push: { thoughts: thought._id } },
        { new: true }
      );

      updatedUser
        ? res.json(thought)
        : res.status(404).json({ message: 'Associated user not found' });

    } catch (err) {
      
      console.error(err);
      res.status(500).json(err);

    }
  },

  // PUT to update a thought 
  async updateThought(req, res) {

    try {

      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      thought 
        ? res.json(thought) 
        : res.status(404).json({ message: 'No such thought exists!' });

    } catch (err) {

      console.error(err);
      res.status(500).json(err);

    }
  },

  // DELETE to remove thought by _id
  async deleteThought(req, res) {

    try {

      const deletedThought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });

      deletedThought
        ? res.status(200).json({ message: 'Thought deleted successfully', deletedThought })
        : res.status(404).json({ message: 'No such thought exists' });

    } catch (err) {

      console.error(err);
      res.status(500).json(err);

    }
  },

  // POST to create a reaction 
  async createReaction(req, res) {

    try {

      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } },
        { runValidators: true, new: true }
      );

      thought 
        ? res.status(200).json(thought) 
        : res.status(404).json({ message: 'No such thought exists' });

    } catch (err) {

      console.error(err);
      res.status(500).json(err);

    }
  },

  // DELETE to pull and remove a reaction
  async deleteReaction(req, res) {

    try {
      
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { runValidators: true, new: true }
      );

      thought 
        ? res.status(200).json(thought) 
        : res.status(404).json({ message: 'No such thought exists' });

    } catch (err) {

      console.error(err);
      res.status(500).json(err);
      
    }
  },

};