const iForm = document.getElementById('sign-up')
const uForm = document.getElementById('sign-in')
const cForm = document.getElementById('post-form')
const placesDiv = document.getElementById('places')
const userName = document.getElementById('user-name')
const commentDiv = document.getElementById('card') 
var usersArr
var currentUserName
var currentUserObject 
var userNames = []
var commentsArr 
var likeCount 


document.addEventListener('DOMContentLoaded', init)

function init() {    
  toggleForms()
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
  e.preventDefault(e)
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

}

function toggleSignIn() {
  //show signin form
  uForm.style.display='block'
  //add submit event listener to form
  uForm.addEventListener('submit', (e) => fetchUser(e))
  //might want to change to a click event and have a psudo  form?
}

function fetchUser(e) {
  e.preventDefault(e)
  uForm.style.display='none'
  currentUserName = e.target.username.value
  currentUserObject = {username: currentUserName}
 
  //get request to optain user information
  fetch('http://localhost:3000/users')
  .then(resp => resp.json())
  .then(users => usersArr = users)
  .then(() => checkUser(usersArr, currentUserName, currentUserObject))

}

function checkUser(usersArr, currentUserName, userNames) {
  
  userNames = usersArr.map(user => {
      return user.username
    }
  )

  if (!userNames.includes(currentUserName)){
    alert('user doesnt exist! please signup first!')
  }
  usersArr.map(user => {
    if (user.username === currentUserName) {
      renderUserProfile(user)      
    }
  })
}

function renderUserProfile(user) {
  //populate user profile with user info
  const userProfile = document.getElementById('user-info')
  const userAvatar = document.getElementById('user-avatar')
  const userBio = document.getElementById('user-bio')
  const addCommentBtn = document.createElement('button')
  addCommentBtn.innerText = 'New Post'
  addCommentBtn.addEventListener('click', handleAddCommentBtn)
  const showCommentFeed = document.createElement('button')
  showCommentFeed.id = 'show-button'
  showCommentFeed.innerText = 'Show All Comments'
  showCommentFeed.addEventListener('click', handleShowCommentBtn)
 
  userName.innerText = user.username
  userName.dataset.id = user.id
  userAvatar.src  = user.image
  userBio.innerText = user.bio

  userProfile.append(addCommentBtn, showCommentFeed)


}

function handleAddCommentBtn() {
  cForm.style.display = 'block'
  fetchPlaces()
}

function handleShowCommentBtn() {
  document.getElementById('card').innerHTML=''
  fetchComments()
}

function fetchPlaces() {
  fetch('http://localhost:3000/places')
  .then(resp => resp.json())
  .then(places => buildListOfPlaces(places))

  const header = document.createElement('h3')
  header.innerText = 'Where have you read?'
  placesDiv.append(header)
}

function buildListOfPlaces(places) {
  placesDiv.innerHTML=''
  places.forEach(place => placesList(place))
}

function placesList(place) {
  const placesUl = document.createElement('ul')

  const placeLi = document.createElement('li')
  placeLi.innerText = place.name
  placeLi.dataset.id = place.id
  placeLi.addEventListener('click', (e) => toggleCommentForm(e))

  placesDiv.append(placesUl)
  placesUl.append(placeLi)

}

function toggleCommentForm(e) {
  e.preventDefault(e)
  placesDiv.innerHTML=''
  placeId = e.target.dataset.id
  cForm.style.display='block'
  cForm.addEventListener('submit', (e) => submitComment(e, placeId))
 

}

function submitComment(e, placeId) {
  e.preventDefault(e)
  cForm.style.display = 'none'
  const id = parseInt(placeId)
  const userId = parseInt(userName.dataset.id)
  // const id = user.id
  var obj
  fetch('http://localhost:3000/comments/', {
    method:"POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'likes': 0,
      'content': e.target.content.value,
      'user_id': userId,
      'place_id': id,
    })
  })
  document.getElementById('post-form').content.value = ''

}

function fetchComments() {
  fetch('http://localhost:3000/comments/')
  .then(resp => resp.json())
  .then(comments => commentsArr = comments)
  .then(() => renderComments(commentsArr))
  
}


function renderComments(commentsArr) {
  
  const commentHeader = document.createElement('h2')
  commentHeader.innerText = 'Your Comments'

  commentsArr.forEach(comment => {
    buildCommentCard(comment)
  })
}

function buildCommentCard(comment) {

const singleComment = document.createElement('div')
singleComment.id = 'single-comment'
singleComment.dataset.id = comment.id
singleComment.addEventListener('click', (e) => handleCommentDeleteBtn(e))

const commentContent = document.createElement('p')
commentContent.innerText = comment.content


const commentDelete = document.createElement('button')
commentDelete.innerText = 'Delete'
commentDelete.dataset.id = comment.id

const commentPlace = document.createElement('h5')
commentPlace.innerText = (`I read in ${comment.place.name}...`)

const commentUserName = document.createElement('h3')
commentUserName.innerText = comment.user.username

const commentUserImage = document.createElement('img')
commentUserImage.src = comment.user.image

singleComment.append(commentUserName, commentUserImage, commentPlace, commentContent, commentDelete)
commentDiv.append(singleComment)
}

function handleCommentDeleteBtn(e) {
const id = e.target.dataset.id
  fetch('http://localhost:3000/comments/'+ id, {
    method: 'DELETE'
  })
 const comment = document.getElementById('single-comment')

 if (comment.dataset.id === e.target.dataset.id) {
   comment.remove()
 }
}






