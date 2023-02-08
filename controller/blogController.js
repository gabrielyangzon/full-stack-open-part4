const blogRouter = require('express').Router()
const Blog = require('../models/blog')


blogRouter.get("/" , async ( require, response) => {
  const blogs = await Blog
   .find({})

    if(blogs){
       response.status(200).json(blogs)
      }else{
       response.status(404).end()
      }

})

/// get blog by id
blogRouter.get("/:id" , async ( require, response  ) => {
 const resultBlog = await Blog
   .findById(require.params.id)


  if(resultBlog){
       response.status(200).json(resultBlog)
      }else{
       response.status(404).json("user not found")
      }

 

})

/// add blog
blogRouter.post('/' , async ( request ,response ) => {

  const blog = new Blog(request.body)

  const savedBlog =  await  blog
   .save()
    if(savedBlog){
      response.status(201).json(savedBlog)
    }else{
      response.status(401).send('something wrong happened')
    }

})


///delete blog
blogRouter.delete('/:id', async (request, response) => {

   const idToDelete = request.params.id

   await Blog.findByIdAndDelete(idToDelete)

   response.status(204).end(`blog deleted `)
   
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


module.exports = blogRouter