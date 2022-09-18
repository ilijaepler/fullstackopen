const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  if(request.body.likes === undefined){
    const blogWithLikes = {
      title: request.body.title,
      author: request.body.author,
      url: request.body.url,
      likes: 0
    }

    const blog = new Blog(blogWithLikes)
    const result = await blog.save()
    response.status(201).json(result)

  }else if(request.body.title === undefined && request.body.url === undefined){
    response.status(400).send({error: 'Bad Request'})
  }else{
    const blog = new Blog(request.body)
    const result = await blog.save()
    response.status(201).json(result)

  }
})

module.exports = blogsRouter