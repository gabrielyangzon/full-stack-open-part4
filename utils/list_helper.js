const lodash = require('lodash')

const dummy = (blogs) => {
    return blogs.length
}

const totalLikes = (blogsList) => {
    if(blogsList){
       return blogsList
          .map(blog => blog.likes)
          .reduce((a,b) => a + b )
    }

    return 0
}

const favoriteBlog = (blogsList) => {   
    if(blogsList){
      const favorite = blogsList.sort((a,b) => b.likes - a.likes)[0]
    
      return favorite
    }

    return {}
}

const mostBlogs = (blogsList) => {
    if(blogsList){
        return most(blogsList , 'blogs' , false)
    }

    return {}
}

const mostLikes = (blogsList) => {
    if(blogsList){
        return most(blogsList , 'likes' , true)
    }

    return {}
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}

function most(p , key , isAdd){

    if(!p) return {}

    let mostResult = []

    for(let i = 0; i<p.length; i++){
      const rIndex = mostResult.findIndex(e => e.author === p[i].author)

      if(rIndex > -1){
        mostResult[rIndex][key] += isAdd ? p[i][key] : 1
      }else{
        mostResult.push({author: p[i].author , [key]: isAdd ? p[i][key] : 1 })
      }
    }

    return mostResult.sort((a,b) => b[key] - a[key])[0]
}