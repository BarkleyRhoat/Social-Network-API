const {ObjectId} = require('mongoose').Types;
const {user, thought} = require('../models');

module.exports = {

    async getUsers(req, res) {
        try{
            const users = await user.find();
            res.json(users);
        } catch (err) {

            console.error(err);
            return res.status(500).json(err);
        }
    },

    async getSingleUser(req, res) {
        try{
            const user = await user.findOne({_id: req.params.userId}).select('-__v');

            user
            ? res.json(user)
            : res.status(400).json({message: "no user found with id"});
        } catch (err) {
            
            console.error(err);
            return res.status(500).json(err);
        }
    },

    async createUser(req, res) {
        try {
            const user = await user.create(req.body);
            res.json(user);
        } catch (err) {
            
            console.error(err);
            res.status(500).json(err);
        }
    },

    async updateUser(req, res) {
        try{
            const user = await user.findOneAndUpdate(
                {_id: req.params.userId},
                {$set: req.body},
                {runValidators: true, new: true}
            );

            user
            ? res.json(user)
            : res.status(400).json({message: "no user found with id"});
        } catch (err) {

            console.error(err);
            res.status(500).json(err);
        }
    },

    async deleteUser(req, res) {
        try{
            const deletedUser = await user.findOneAndDelete({_id: req.params.userId});

            if (!deletedUser) {
                return res.status(404).json({message: "no such user exist"});
            }

            await thought.deleteMany({username: deletedUser.username});

            res.status(200).json({
                message:"user and thoughts deleted successfully", deletedUser
            });
        } catch (err) {

            console.error(err);
            res.status(500).json(err);
        }
    },

    async addFriend(req, res) {
        try{
            const user = await user.findOneAndUpdate(
                {_id: req.params.userId},
                {$addToSet: {friends: req.body.friendId || req.params.friendId}},
                {new: true}
            );

            user
            ? res.status(200).json(user)
            : res.status(404).json({message: "no user exist"});
        } catch (err) {

            console.error(err);
            res.status(500).json(err);
        }
    },

    async removeFriend(req, res) {
        try{
            const user = await user.findOneAndDelete(
                {_id: req.params.userId},
                {$pull: {friends: req.params.friendId}},
                {new: true}
            );

            if (!user) {
                return res.status(404).json({message: "no user exist"});
            }

            const friend = !user.friends.includes(req.params.friendId);

            friend
            ? res.status(200).json({message: "friend removed", user})
            : res.json({message: "something went wrong"});
        } catch (err) {

            console.error(err);
            res.status(500).json(err);
        }
    },
};