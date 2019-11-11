class Comment {
    constructor(commentObj){
      this.id = commentObj.id
      this.content = commentObj.content
      this.user_id = commentObj.user_id
      this.palce_id = commentObj.palce_id
      this.place = commentObj.place.name
      this.username = commentObj.user.username
      this.image = commentObj.user.image
    }
  
    render(){
      return(`<div data-id=${this.id}><h3>${this.username}</h3><img src='${this.image}'></img><p>${this.content}</p><button id='delete-comment-bttn' data-id=${this.user_id}>Delete</button></div>`)
    }
  }
//   ...