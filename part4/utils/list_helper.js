const User = require('../models/user')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    let totalLikes = blogs.reduce((sum, blog)=>{
        return sum + blog.likes
    }, 0)

    return totalLikes
}

const favoriteBlog = (blogs) => {
    let favouriteBlog;
    let maxLikes = 0;
    for(let i = 0; i < blogs.length; i++){
        if(blogs[i].likes > maxLikes){
            favouriteBlog = blogs[i]
            maxLikes = blogs[i].likes
        }
    }

    return {
        title: favouriteBlog.title,
        author: favouriteBlog.author,
        likes: favouriteBlog.likes
    }
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}