const iForm = document.getElementById('sign-up')
const uForm = document.getElementById('sign-in')
const cForm = document.getElementById('comment-form')
const placesUl = document.getElementById('places-list')
const placesDiv = document.getElementById('places')
const userName = document.getElementById('user-name')
const userProfDiv = document.getElementById('user-profile')
const commentsDiv = document.getElementById('comments')
const placeLi = document.getElementsByClassName('place')
var usersArr
var currentUserId
var currentUserName
var currentUserObject 
var userNames = []
var commentsArr 
var placeId


document.addEventListener('DOMContentLoaded', init)
document.addEventListener('click', (e) => handleClickEvent(e))

function init() {    
  toggleForms()

}

function handleClickEvent(e) {
  if (e.target.id === 'new-post-bttn') {
    fetchPlaces(e)
  }else if(e.target.id === 'news-feed-bttn') {
    fetchComments()
  }else if(e.target.className === 'place') {
    renderCommentForm(e)
    while (placesUl.firstChild) placesUl.removeChild(placesUl.firstChild)
    placeId = parseInt(e.target.dataset.id)
  }else if(e.target.id === 'delete-comment-bttn'){
    currentUserId = parseInt(e.target.dataset.id)
    deleteComment(e, currentUserId)
  }else if(e.target.id === 'logout'){
   location.reload()
  }
}


function toggleForms() {
  const signUp = document.getElementById('up')
  const signIn = document.getElementById('in')

  signUp.addEventListener('click', toggleSignUp)
  signIn.addEventListener('click', toggleSignIn)
}

function toggleSignUp() {
  //show signup form
  iForm.style.display='block'
  //add submit event listener to the form 
  iForm.addEventListener('submit', (e) => postUser(e))
}

function postUser(e){
  // post request to send user information to backend
  e.preventDefault()
  iForm.style.display = 'none'
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
  location.reload()

}

function toggleSignIn() {
  while (commentsDiv.firstChild) commentsDiv.removeChild(commentsDiv.firstChild)
  while (userProfDiv.firstChild) userProfDiv.removeChild(userProfDiv.firstChild)


    //show signin form
    uForm.style.display='block'
    //add submit event listener to form
    uForm.addEventListener('submit', (e) => fetchUser(e))
    //might want to change to a click event and have a psudo  form?
}

function fetchUser(e) {
  e.preventDefault()
  
  uForm.style.display='none'
  currentUserName = e.target.username.value
 
  //get request to optain user information
  fetch('http://localhost:3000/users')
  .then(resp => resp.json())
  .then(users => usersArr = users)
  .then(() => checkUser(usersArr, currentUserName))

}

function checkUser(usersArr, currentUserName, userNames) {
  
  userNames = usersArr.map(user => {
      return user.username
    }
  )
  if (!userNames.includes(currentUserName)){
    alert('user doesnt exist! please signup first!')
  }
  usersArr.forEach(userObj => {
    if (userObj.username === currentUserName) {
      renderUserProfile(userObj)    
    }
  })
}

function renderUserProfile(userObj) {
  const user = new User(userObj)
  
  userProfDiv.insertAdjacentHTML('afterbegin', user.render())
  userProfDiv.dataset.id = user.id
}

function fetchPlaces(e) {
  fetch('http://localhost:3000/places')
  .then(resp => resp.json())
  .then(places => places.forEach(placeObj => {
    renderListOfPlaces(placeObj, e)
  }))
}

function renderListOfPlaces(placeObj, e) {
  
  const place = new Place(placeObj)
  placesDiv.dataset.id = e.target.dataset.id

  placesUl.insertAdjacentHTML('afterbegin', place.render())

  
}



function renderCommentForm(){
  cForm.style.display = 'block'
  cForm.addEventListener('submit', (e) => handleCommentSubmit(e))
}

function handleCommentSubmit(e) {
  e.preventDefault(e)
  cForm.style.display='none'
  const id = parseInt(placesDiv.dataset.id)

  const commentObj = {
    'content': e.target.content.value, 
    'user_id': id,
    'place_id': placeId,
  }
debugger
  const reqObj = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(commentObj)
  }

  fetch('http://localhost:3000/comments', reqObj)
  
  
}

function fetchComments() {
 fetch('http://localhost:3000/comments')
 .then(resp => resp.json())
 .then(comments => comments.forEach(commentObj => {
   renderCommentCard(commentObj)
 }))
}

function renderCommentCard(commentObj) {
  const comment = new Comment(commentObj)
  commentsDiv.insertAdjacentHTML('afterbegin', comment.render()) 
}

function deleteComment(e) {


  const currentUser = parseInt(userProfDiv.dataset.id)
  const userId = parseInt(e.target.dataset.id)
  const id = parseInt(e.target.parentElement.dataset.id)
  
  if (userId == currentUser ){
    fetch('http://localhost:3000/comments/'+ id, {
      method: 'DELETE'
    })
    e.target.parentElement.remove()
  }else{
    alert('you are not authorized to delete this comment')
  }
  
}