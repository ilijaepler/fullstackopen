const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

beforeEach(async () => {
    await Blog.deleteMany({})

    const blogObjects = helper.initialBlogs
        .map(blog => new Blog(blog))
    
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
}, 100000)

test('there are correct number of notes', async() => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('unique identifier is named id', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body[0].id).toBeDefined()
})

test('a valid blog can be added', async () => {
    const newBlog = {
        title: "Test",
        author: "TestAuthor",
        url: "http://www.test.com",
        likes: 12
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()

    console.log(blogsAtEnd)

    const titles = blogsAtEnd.map(b=>b.title)

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
    expect(titles).toContain('Test')
})

test('a blog without likes can be added with value 0', async () => {
    const newBlog = {
        title: "TestWithoutLikes",
        author: "TestAuthorWithoutLikes",
        url: "http://www.testwithoutlikes.com"
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()

    const titles = blogsAtEnd.map(b=>b.title)

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
    expect(titles).toContain('TestWithoutLikes')
})

test('a blog without title and url cannot be added to the DB', async () => {
    const newBlog = {
        author: "TestAuthorWithoutTitleAndUrl",
        likes: 12
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
})

test('a blog can be updated', async () => {
    const id = helper.initialBlogs[0]._id

    const newBlog = {
        title: "UpdatedTest",
        author: "UpdatedAuthor",
        url: "http://www.updatetest.com",
        likes: 50
    }

    await api.put(`/api/blogs/${id}`).send(newBlog)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)

    const titles = blogsAtEnd.map(b=>b.title)
    console.log(`Titles ${titles}`)

    expect(titles).toContain('UpdatedTest')
})

test('a blog can be deleted', async () => {
    const id = helper.initialBlogs[0]._id

    await api
        .delete(`/api/blogs/${id}`)
        .expect(204)
    
    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)

    const titles = blogsAtEnd.map(b=>b.title)

    expect(titles).not.toContain(helper.initialBlogs[0].title)
})

afterAll(() => {
    mongoose.connection.close()
})