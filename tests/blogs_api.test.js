const mongoose = require('mongoose')
const supertest = require('supertest')
const { response } = require('../app')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./helper_blogs_api.test')


beforeEach(async () => {
  await Blog.deleteMany({})
  
  for(let blog of helper.initialBlogs){
    const newBlog = new Blog(blog)
    await newBlog.save()
  }

})


describe("when there is an initial blog data" , () => {

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


test('the first blog is about React patterns' , async () => {
    const response = await api.get('/api/blogs')

    const contents = response.body.map(r => r.title)

    expect(contents).toContain('React patterns')
})

})


describe("testing blog addition" , () => {
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


})

describe("if blog can be viewed" , () => {

test('a specific blog can be viewed' , async () => {

    const blogAtStart = await helper.blogsInDb()

    const blogToView = blogAtStart[0]

   

    const resultBlog = await api
      .get(`/api/blogs/${blogToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

     
      expect(resultBlog.body).toEqual(blogToView)
})


})

describe("deletion of blog" , () => {
  test("a blog can be deleted with status 204" , async () => {

    const blogAtStart = await helper.blogsInDb()

    const blogToDelete = blogAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

  
    const blogsAfterDelete = await helper.blogsInDb()

    expect(blogsAfterDelete).toHaveLength(
        helper.initialBlogs.length - 1
    )


    const contents = blogsAfterDelete.map(r => r.title)

    expect(contents).not.toContain(blogsAfterDelete.title)

  })
})

describe("test values of objects" , ()=>{

test('all id is id' , async () => {
  const response = await api
        .get('/api/blogs/')
        .expect(200)
        .expect('Content-Type', /application\/json/)

 
 const resultBlogs = response.body
 resultBlogs.forEach(r => expect(r.id).toBeDefined())

})

test("likes should not be missing" , async () => {

  const newBlog = {   
      "title" : "test title",
      "author": "String2",
      "url": "String3",
    }

    const response = await api
      .post('/api/blogs',newBlog)
      .expect(400)


})

})

describe("blog can be modified" , () => {
  test("blog should be modified" , async () => {

  const blogsInStart = await helper.blogsInDb()

  const blogToEdit = blogsInStart[0]
  blogToEdit.likes = 100

  const blogToEditId = blogsInStart[0].id
  
  const result = await api
      .put(`/api/blogs/${blogToEditId}` )
      .send(blogToEdit)
      .expect(200)


    const blogsAfterEdit = await helper.blogsInDb()
   
    console.log(blogsAfterEdit[0])

    expect(blogsAfterEdit[0].likes).toEqual(100)

  })

})


afterAll(async () => {
    await mongoose.connection.close()
})