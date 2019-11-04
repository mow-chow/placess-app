//using serialized data 
document.addEventListener('DOMContentLoaded', init)
const userForm = document.querySelector('#user-form')
const userDiv = document.querySelector('#user-info')
const usersUl = document.querySelector('#users-list')
const userName = document.querySelector('#user-name')
const userAvatar = document.querySelector('#user-avatar')
const userBio = document.querySelector('#user-bio')
const userProfile = document.querySelector('#user-profile-show')
//toggle comment submission form
const commentBtn = document.querySelector('#comment-submission')
const commentForm = document.querySelector('#comment-form')

// userProfile.addEventListener('click', (e) => fetchUsers(e))


function init(){
    // on page load run function that posts users information to database
    // fetch post request 
    // add event listener to form 
    userForm.addEventListener('submit', (e) => postUser(e))
    userProfile.addEventListener('click', (e) => fetchUsers(e))
    // commentBtn.addEventListener('click', )
    // fetch comments and places
    fetchPlaces()
    
}

function postUser(e){
  e.preventDefault(e)
  // console.log(e.target.image.value)
  // console.log('username', form[0].value, 'bio', form[1].value, 'image', form[2].value)
  fetch('http://localhost:3000/users', {
    method:"POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "username": e.target.username.value,
      "bio": e.target.bio.value,
      "image": e.target.image.value
    })
  })  

}

function fetchUsers(){
  fetch('http://localhost:3000/users/')
  .then(resp => resp.json())
  .then(users => renderListOfUsers(users))
}

function renderListOfUsers(users){
  // console.log(users)
  users.forEach(user => {
    const usersLi = document.createElement('li')
    usersLi.innerText = user.username
    usersLi.id = 'user-list-element'
    usersLi.dataset.id = user.id
    usersLi.addEventListener('click', (e) => renderUsersProfile(e, user))
    usersUl.append(usersLi) 
  })
}



function renderUsersProfile(e, user){
  const id = e.target.dataset.id
  // console.log(user, id)
  userName.innerText = user.username
  userName.dataset.id = user.id

  userAvatar.src = user.image
  userBio.innerText = user.bio
  // console.log('commmentform', commentForm)
  commentForm.addEventListener('submit', (e) => postComment(e, id))

  userDiv.append(userName, userAvatar, userBio)
}

// function showUserProfile(){
//   userAvatar.innerText = user.image
//   userBio.innerText = user.bio
// }

function fetchPlaces(){
  fetch('http://localhost:3000/places')
  .then(resp => resp.json())
  .then(places => places.forEach(place => renderPlaces(place)))
}
//fetch places
//render list of places
//add button to rendered list of places
//add event listener to button to add comments to a place
//toggle comment form
//fetch post comments

function renderPlaces(place){
  // console.log(place.id)
  const placesUl = document.querySelector('#places')
  const placeLi = document.createElement('li')
  const commentsBtn = document.createElement('button')
  commentsBtn.innerText = 'add a comment'
  commentsBtn.dataset.id = place.id
  commentsBtn.addEventListener('click', (e) => buildCommentForm(e))
  placeLi.innerText = place.name
  placeLi.dataset.id = place.id
  placeLi.append(commentsBtn)
  placesUl.append(placeLi)

  placeLi.addEventListener('click', (e) => fetchComments(e))

}

function buildCommentForm(e){
  commentForm

  console.log(e.target.dataset.id)
  fetch('http://localhost:3000/comments', {
    method:"POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "content": e.target.username.value,
      "bio": userForm[1].value,
      "image": userForm[2].value
    })
  })  
}

function fetchComments(e){
  console.log(e.target.dataset.id)
  const place_id = e.target.dataset.id
  fetch('http://localhost:3000/comments/')
  .then(resp => resp.json())
  .then(comments => comments.forEach(comment => renderComments(comment, place_id)))
}

function renderComments(comment, place_id){
  const id = parseInt(place_id)
  console.log(comment.place_id, id)
  const commentUl = document.querySelector('#comments')
  const commentLi = document.createElement('li')
  // const likes = document.createElement('p')

  if (comment.place_id === id){
  commentLi.innerText = comment.content
  // likes.innerText = comment.likes
  commentUl.append(commentLi)
  } else{
  alert('this place has no comments')
  }
}

function postComment(e, id){
    e.preventDefault(e)
    console.log(e.target.dataset.id)
// console.log(commentForm[0].value)
    fetch('http://localhost:3000/comments/'+ id, {
      method:"POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "content": commentForm[0].value,
        'user_id': id,
        'places_id': e.target.dataset.id
      })
    })   
  }



















//populate dropdown menu
// var select = document.getElementById("selectNumber"); 
// var options = ["1", "2", "3", "4", "5"]; 

// for(var i = 0; i < options.length; i++) {
//     var opt = options[i];
//     var el = document.createElement("option");
//     el.textContent = opt;
//     el.value = opt;
//     select.appendChild(el);
// }​










