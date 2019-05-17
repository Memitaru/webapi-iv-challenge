const express = require('express');

const PostsRouter = require('./posts/posts-router');

const server = express();

server.use(express.json());
server.use('/api/posts', PostsRouter);

server.get('/', (req,res) => {
    res.send('Welcome to the Blog API');
})

module.exports = server;
