const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./helper_blogs_api.test')


beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(helper.initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(helper.initialBlogs[1])
  await blogObject.save()
})


test('blogs are returned as json' , async () => {
    await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
},100000)


test('there are two blogs' , async () =>  {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialBlogs.length)
})


test('the first blog is about' , async () => {
    const response = await api.get('/api/blogs')

    const contents = response.body.map(r => r.title)

    expect(contents).toContain('React patterns')
})


test('a valid blog can be added' , async () => {
    const newBlog = {
      "title": "Test title",
      "author": "String2",
      "url": "String3",
      "likes": 10
    }

    await api
     .post('/api/blogs')
     .send(newBlog)
     .expect(201)
     .expect('Content-Type', /application\/json/)

     const response = await api.get('/api/blogs')

     const contents = response.body.map(r => r.title)

     expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
     expect(contents).toContain(
     'Test title'
  )

})


test('a blog witout title is not added' , async () => {
    const newBlog = {     
      "author": "String2",
      "url": "String3",
      "likes": 10
    }

    await api
     .post('/api/blogs')
     .send(newBlog)
     .expect(400)
     

     const response = await api.get('/api/blogs')

     expect(response.body).toHaveLength(helper.initialBlogs.length)
    

})


test('a specific blog can be viewed' , async () => {

    const blogAtStart = await helper.blogsInDb()

    const blogToView = blogAtStart[0]

    console.log(blogToView)

    const resultBlog = await api
      .get(`/api/blogs/${blogToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

      
      expect(resultBlog.body).toEqual(blogToView)
})

afterAll(async () => {
    await mongoose.connection.close()
})