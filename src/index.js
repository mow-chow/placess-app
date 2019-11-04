import 'bootstrap'
//using serialized data 
document.addEventListener('DOMContentLoaded', init)
const userForm = document.querySelector('#user-form')
const userDiv = document.querySelector('#user-info')
const usersUl = document.querySelector('#users-list')
const userName = document.querySelector('#user-name')
const userAvatar = document.querySelector('#user-avatar')
const userBio = document.querySelector('#user-bio')
const userProfile = document.querySelector('#user-profile-show')
const placesLiist = document.querySelector('#places-list')

//toggle comment submission form
const commentBtn = document.querySelector('#comment-submission')
const commentForm = document.querySelector('#comment-form')


//fetch users, method: post
//build method to send a user to the backend



function init(){
  // on page load run function that posts users information to database
  // fetch post request 
  // add event listener to form 
  userForm.addEventListener('submit', (e) => postUser(e))
  // userProfile.addEventListener('click', fetchUsers)
  // fetch comments and places
  // fetchPlaces()
  fetchUsers()
}

function postUser(e){
  e.preventDefault()
  
  // console.log(e.target)
  // console.log('username', form[0].value, 'bio', form[1].value, 'image', form[2].value)
  fetch('http://localhost:3000/users', {
    method:"POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "username": e.target.username.value,
      "bio": userForm[1].value,
      "image": userForm[2].value
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


  // debugger
  })
}


function renderUsersProfile(e, user){
  const id = e.target.dataset.id
  // console.log(user)
  // console.log(user.username)
  console.log(id) 
  userName.innerText = user.username
  userName.dataset.id = user.id

  userAvatar.src = user.image
  userBio.innerText = user.bio

  commentForm.addEventListener('submit', (e) => postComment(e))
  placesLiist.addEventListener('click', (e) => showPlaces(e, id))
  // commentForm.addEventListener('submit', (e) => fetchCommentsAndPosts(e) )


  userDiv.append(userName, userAvatar, userBio)

  fetchCommentsAndPosts(id)
}

//fetch users, method: post
//build method to add comments and place to a user

function postComment(e){
    e.preventDefault()
    console.log('yes',e.target.content.value)
    fetch('http://localhost:3000/comments/', {
      method:"POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "content": e.target.content.value,
      })
    })   
  }

  function fetchCommentsAndPosts(e, id){
    e.preventDefault()
    console.log(e.target.dataset.id)
    fetch('http://localhost:3000/users/' + id)
  }

  function showPlaces(e, id){
    // console.log(parseInt(id),'target',e.target)
    const user_id = parseInt(id)
    fetch('http://localhost:3000/users/' + user_id)
    .then(resp => resp.json())
    .then(user => console.log('user', user))
    

  }

//fetch users, method: get
//build methods to:
  //render list of users
  //render user profile
  //render comments
  //render places 

