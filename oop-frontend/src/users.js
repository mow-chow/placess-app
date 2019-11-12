class User {
    constructor(userObj){
      this.id = userObj.id
      this.username = userObj.username
      this.bio = userObj.bio
      this.image = userObj.image
    }
  
    render(){
      return(`<h3>${this.username}</h3><img src='${this.image}'></img><p>${this.bio}</p><button id='new-post-bttn' data-id='${this.id}'>Create New Post</button>
      <button id='news-feed-bttn' data-id='${this.id}'>News Feed</button> <button id='logout'>LogOut</button>`)
    }
  }