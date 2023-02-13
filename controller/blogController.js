const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/users')
const jwt = require('jsonwebtoken')
const tokeHelper = require("../utils/token_helper");
const config = require("../utils/config");


blogRouter.get("/" , async ( require, response) => {
  const blogs = await Blog
   .find({}).populate('user')

    if(blogs){
       response.status(200).json(blogs)
      }else{
       response.status(404).end()
      }

})

/// get blog by id
blogRouter.get("/:id" , async ( require, response  ) => {
 const resultBlog = await Blog
   .findById(require.params.id).populate('user')

  if(resultBlog){
       response.status(200).json(resultBlog)
      }else{
       response.status(404).json("user not found")
      }
})

/// add blog
blogRouter.post('/' , async ( request ,response ) => {

    const body = request.body

    const userRequesting = request.user


    if(!userRequesting.id){
        response.status(401).json({error : 'invalid token'})
    }

    const user = await User.findById(userRequesting.id)

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user : user.id
  })

  const savedBlog =  await  blog
   .save()
    if(savedBlog){

        user.blogs = user.blogs.concat(savedBlog.id)

        await user.save()
      response.status(201).json(savedBlog)
    }else{
      response.status(401).send('something wrong happened')
    }
})


///delete blog
blogRouter.delete('/:id', async (request, response) => {

    const idToDelete = request.params.id

    const user = request.user

    if(!user.id){
        response.status(401).json({error : 'invalid token'})
    }

    const blog = await Blog.findById(idToDelete)

    if(user.id.toString() !== blog.user.toString()){
       return response.status(401).json({error : "cannot delete by this user"})
    }

    await Blog.findByIdAndDelete(idToDelete)

   response.status(204).send({message : "blog deleted"})
   
})


/// edit blog
blogRouter.put('/:id' , async (request , response) => {
    const blogId = request.params.id

    const {id, ...blogToEdit } = request.body 

   
   const result = await Blog
     .findByIdAndUpdate(blogId , blogToEdit ,
      { new : true , runValidators : true , context : 'query' })
     
      response.status(200).send({ message : result })
     
})


blogRouter.post('/test' , async (request, response) => {

    response.status(200).json(request.user)
})


module.exports = blogRouter