const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');

module.exports = {

  // GET all users
  async getUsers(req, res) {

    try {

      const users = await User.find();

      res.json(users);

    } catch (err) {
      
      console.error(err);
      return res.status(500).json(err);

    }
  },

  // GET single user by _id and populated thought and friend data
  async getSingleUser(req, res) {

    try {

      const user = await User.findOne({ _id: req.params.userId }).select('-__v');

      user 
        ? res.json(user) 
        : res.status(404).json({ message: 'No user found with that ID' });

    } catch (err) {

      console.error(err);
      return res.status(500).json(err);

    }
  },

  // POST a new user
  async createUser(req, res) {

    try {

      const user = await User.create(req.body);

      res.json(user);

    } catch (err) {

      console.error(err);
      res.status(500).json(err);

    }
  },

  // PUT to update a user by _id
  async updateUser(req, res) {

    try {

      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      user 
        ? res.json(user) 
        : res.status(404).json({ message: 'No user found with that ID' });

    } catch (err) {

      console.error(err);
      res.status(500).json(err);

    }
  },

  // DELETE to remove user by _id
  async deleteUser(req, res) {

    try {

      const deletedUser = await User.findOneAndDelete({ _id: req.params.userId });

      if (!deletedUser) {
        return res.status(404).json({ message: 'No such user exists' });
      }

      // [BONUS] remove a user's associated thoughts when deleted
      await Thought.deleteMany({ username: deletedUser.username });

      res.status(200).json({
        message: 'User and associated thoughts deleted successfully',
        deletedUser
      });

    } catch (err) {

      console.error(err);
      res.status(500).json(err);

    }
  },

  // POST to add a new friend to a user's friend list
  async addFriend(req, res) {

    try {

      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.body.friendId || req.params.friendId } },
        { new: true }
      );

      user 
        ? res.status(200).json(user) 
        : res.status(404).json({ message: 'No such user exists' });

    } catch (err) {

      console.error(err);
      res.status(500).json(err);

    }
  },

  // DELETE to remove a friend from a user's friend list
  async removeFriend(req, res) {

    try {

      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId } },
        { new: true }
      );

      if (!user) {
        return res.status(404).json({ message: 'No such user exists' });
      }
      
      const friend = !user.friends.includes(req.params.friendId);

      friend
        ? res.status(200).json({ message: 'Friend removed from friendlist', user })
        : res.json({ message: 'Something went wrong' });

    } catch (err) {

      console.error(err);
      res.status(500).json(err);
      
    }
  },
};