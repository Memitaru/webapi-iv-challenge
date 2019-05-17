const express = require('express');

const Posts = require('../data/db.js');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const posts = await Posts.find(req.body);
      
        res.status(200).json(posts);
        
    } catch(error) {
        console.log(error);
        res.status(500).json({
            message: "The posts information could not be retrieved."
        })
    }
})

router.get('/:id', async(req, res) => {
    try {
        const post = await Posts.findById(req.params.id);

        if (post) {
            res.status(200).json(post);
        } else {
            res.status(404).json({message: "The post with the specified ID does not exist."})
        }
    } catch(error){
        console.log(error);
        res.status(500).json({
            error: "The post information could not be retrieved."
        })
    }
})

router.post('/', async (req, res) => {
    try {
        const post = await Posts.insert(req.body);
        if (post) {
            res.status(201).json(post);
        } else {
            res.status(400).json({errorMessage: "Please provide title and conents for the post."})
        }
    } catch(error) {
        console.log(error);
        res.status(500).json({
            error: "There was an error while saving the post to the database."
        })
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const post = await Posts.remove(req.params.id);
        if (post) {
            res.status(200).json(post)
        } else {
            res.status(404).json({message: "The post with the specified ID does not exist."})
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error deleting post."
        })
    }
})



router.put('/:id', async (req, res) => {
    try {
        const newPost = await Posts.update(req.params.id, req.body);
        if (newPost) {
            res.status(200).json(newPost)
        } else if (!req.body){
            res.status(400).json({errorMessage: "Please provide a title and contents."})
        } else {
            res.status(404).json({errorMessage: "No post with that ID exists."})
        }
    } catch(error){
        console.log(error);
        res.status(500).json({message: "Error updating post."})
    }
})

module.exports = router;