recallSavedContent()
const replyBtn = document.querySelectorAll(".reply")
const comment = document.querySelectorAll(".comment")
const userName = document.querySelectorAll(".user-name")
const replySection = document.querySelectorAll(".reply-section")
const aside = document.querySelector("aside")
const yesBtn = document.getElementById("yes-btn")
const noBtn = document.getElementById("no-btn")
const mainSendBtn = document.getElementById("send-btn")
const vote = document.querySelectorAll(".vote")
let editBtn = document.querySelectorAll(".edit")
let subComment = document.querySelectorAll(".sub-comment")
let editedUserName = ""
let myComments 
let indexed
let indexer

const replyBtnArray = Array.from(replyBtn)
const commentArray = Array.from(comment)
const userNameArray = Array.from(userName)
const voteArray = Array.from(vote)
let subCommentArray = Array.from(subComment)
let editBtnArray = Array.from(editBtn)

replySectionResize()

const mainComments = commentArray.filter(item => subCommentArray.includes(item) === false)

let commentIndex = 0

const commentReply = document.createElement("div")

commentReply.innerHTML =  `
  <textarea class="new-comment-input" placeholder="Add a comment..."></textarea>
  <img src="avatars/image-juliusomo.png" alt="juliusomo">
  <button class="send-btn" type="button">SEND</button>
  `
commentReply.setAttribute("class", "new-comment")

const sendBtn = commentReply.lastElementChild

replyBtnArray.map((item, index) => {
  item.addEventListener("click", function() {
    this.parentElement.insertAdjacentElement("afterend", commentReply)
    commentReply.firstElementChild.value = `@${userName[index].textContent} `
    commentReply.firstElementChild.focus()
    commentIndex = index

    if (subCommentArray.includes(this.parentElement)) {
      commentReply.style.width = "90%"
      commentReply.style.marginTop = "1em"
    } else {
      commentReply.style.width = "100%"
    }
    saveContent()
  })
})

mainSendBtn.addEventListener("click", function() {
  const submittedComment = document.createElement("div")
  submittedComment.setAttribute("class", "comment my-comment added-comment")
  submittedComment.innerHTML = `
      <div class="user-info my-info">
        <img src="avatars/image-juliusomo.png" alt="juliusomo">
        <p class="user-name">juliusomo</p>
        <p class="tag">you</p>
        <p class="time">${currentDate()}</p>
      </div>
      <p class="comment-text sub-comment-text">${this.parentElement.firstElementChild.value}</p>
      <div class="vote">
        <svg width="11" height="11" xmlns="http://www.w3.org/2000/svg" class="vote-btn">
          <path d="M6.33 10.896c.137 0 .255-.05.354-.149.1-.1.149-.217.149-.354V7.004h3.315c.136 0 .254-.05.354-.149.099-.1.148-.217.148-.354V5.272a.483.483 0 0 0-.148-.354.483.483 0 0 0-.354-.149H6.833V1.4a.483.483 0 0 0-.149-.354.483.483 0 0 0-.354-.149H4.915a.483.483 0 0 0-.354.149c-.1.1-.149.217-.149.354v3.37H1.08a.483.483 0 0 0-.354.15c-.1.099-.149.217-.149.353v1.23c0 .136.05.254.149.353.1.1.217.149.354.149h3.333v3.39c0 .136.05.254.15.353.098.1.216.149.353.149H6.33Z" fill="#C5C6EF"/>
        </svg>
        <p class="current-vote">0</p>
        <svg width="11" height="3" xmlns="http://www.w3.org/2000/svg" class="vote-btn">
          <path d="M9.256 2.66c.204 0 .38-.056.53-.167.148-.11.222-.243.222-.396V.722c0-.152-.074-.284-.223-.395a.859.859 0 0 0-.53-.167H.76a.859.859 0 0 0-.53.167C.083.437.009.57.009.722v1.375c0 .153.074.285.223.396a.859.859 0 0 0 .53.167h8.495Z" fill="#C5C6EF"/>
        </svg>
      </div>
      <div class="my-comment-actions">
        <div class="delete">
          <img src="icon-delete.svg" alt="delete">
          <p class="delete-text">Delete</p>
        </div>
        <div class="edit">
          <img src="icon-edit.svg" alt="edit">
          <p class="edit-text">Edit</p>
        </div>
      </div>
    `
    if (this.parentElement.firstElementChild.value.trim() !== null && this.parentElement.firstElementChild.value.trim() !== "") {
      submittedComment.style.width = "100%"
      this.parentElement.firstElementChild.value = null
      this.parentElement.insertAdjacentElement("beforeBegin", submittedComment)
      refreshValues()
      editBtnRefresh()
      voteFunction()
      saveContent()
    } else {}
})

sendBtn.addEventListener("click", function() {
  const submittedComment = document.createElement("div")
  submittedComment.setAttribute("class", "comment sub-comment my-comment added-comment")
  const newCommentReplyvalue = commentReply.firstElementChild.value.replace(`@${userName[commentIndex].textContent}`, "")
  const submittedUserName = `<span class="receiver-name" href="#${userName[commentIndex].textContent}">@${userName[commentIndex].textContent}</span>`
  submittedComment.innerHTML = `
      <div class="user-info my-info">
        <img src="avatars/image-juliusomo.png" alt="juliusomo">
        <p class="user-name">juliusomo</p>
        <p class="tag">you</p>
        <p class="time">${currentDate()}</p>
      </div>
      <p class="comment-text sub-comment-text">${submittedUserName} ${newCommentReplyvalue}</p>
      <div class="vote">
        <svg width="11" height="11" xmlns="http://www.w3.org/2000/svg" class="vote-btn">
          <path d="M6.33 10.896c.137 0 .255-.05.354-.149.1-.1.149-.217.149-.354V7.004h3.315c.136 0 .254-.05.354-.149.099-.1.148-.217.148-.354V5.272a.483.483 0 0 0-.148-.354.483.483 0 0 0-.354-.149H6.833V1.4a.483.483 0 0 0-.149-.354.483.483 0 0 0-.354-.149H4.915a.483.483 0 0 0-.354.149c-.1.1-.149.217-.149.354v3.37H1.08a.483.483 0 0 0-.354.15c-.1.099-.149.217-.149.353v1.23c0 .136.05.254.149.353.1.1.217.149.354.149h3.333v3.39c0 .136.05.254.15.353.098.1.216.149.353.149H6.33Z" fill="#C5C6EF"/>
        </svg>
        <p class="current-vote">0</p>
        <svg width="11" height="3" xmlns="http://www.w3.org/2000/svg" class="vote-btn">
          <path d="M9.256 2.66c.204 0 .38-.056.53-.167.148-.11.222-.243.222-.396V.722c0-.152-.074-.284-.223-.395a.859.859 0 0 0-.53-.167H.76a.859.859 0 0 0-.53.167C.083.437.009.57.009.722v1.375c0 .153.074.285.223.396a.859.859 0 0 0 .53.167h8.495Z" fill="#C5C6EF"/>
        </svg>
      </div>
      <div class="my-comment-actions">
        <div class="delete">
          <img src="icon-delete.svg" alt="delete">
          <p class="delete-text">Delete</p>
        </div>
        <div class="edit">
          <img src="icon-edit.svg" alt="edit">
          <p class="edit-text">Edit</p>
        </div>
      </div>
    `
  if (this.parentElement === document.getElementById("edited") && newCommentReplyvalue.trim() !== null && newCommentReplyvalue.trim() !== "") {
    let newCommentReplyvalue 
    let submittedUserName
    if (editedUserName.startsWith("@")) {
      newCommentReplyvalue = commentReply.firstElementChild.value.replace(`${editedUserName}`, "")
      submittedUserName = `<span class="receiver-name">${editedUserName}</span>`
    } else {
      newCommentReplyvalue = commentReply.firstElementChild.value
      submittedUserName = ""
    }
    submittedComment.innerHTML = `
      <div class="user-info my-info">
        <img src="avatars/image-juliusomo.png" alt="juliusomo">
        <p class="user-name">juliusomo</p>
        <p class="tag">you</p>
        <p class="time">${currentDate()}</p>
      </div>
      <p class="comment-text sub-comment-text">${submittedUserName} ${newCommentReplyvalue}</p>
      <div class="vote">
        <svg width="11" height="11" xmlns="http://www.w3.org/2000/svg" class="vote-btn">
          <path d="M6.33 10.896c.137 0 .255-.05.354-.149.1-.1.149-.217.149-.354V7.004h3.315c.136 0 .254-.05.354-.149.099-.1.148-.217.148-.354V5.272a.483.483 0 0 0-.148-.354.483.483 0 0 0-.354-.149H6.833V1.4a.483.483 0 0 0-.149-.354.483.483 0 0 0-.354-.149H4.915a.483.483 0 0 0-.354.149c-.1.1-.149.217-.149.354v3.37H1.08a.483.483 0 0 0-.354.15c-.1.099-.149.217-.149.353v1.23c0 .136.05.254.149.353.1.1.217.149.354.149h3.333v3.39c0 .136.05.254.15.353.098.1.216.149.353.149H6.33Z" fill="#C5C6EF"/>
        </svg>
        <p class="current-vote">0</p>
        <svg width="11" height="3" xmlns="http://www.w3.org/2000/svg" class="vote-btn">
          <path d="M9.256 2.66c.204 0 .38-.056.53-.167.148-.11.222-.243.222-.396V.722c0-.152-.074-.284-.223-.395a.859.859 0 0 0-.53-.167H.76a.859.859 0 0 0-.53.167C.083.437.009.57.009.722v1.375c0 .153.074.285.223.396a.859.859 0 0 0 .53.167h8.495Z" fill="#C5C6EF"/>
        </svg>
      </div>
      <div class="my-comment-actions">
        <div class="delete">
          <img src="icon-delete.svg" alt="delete">
          <p class="delete-text">Delete</p>
        </div>
        <div class="edit">
          <img src="icon-edit.svg" alt="edit">
          <p class="edit-text">Edit</p>
        </div>
      </div>
    `
    this.parentElement.insertAdjacentElement("afterEnd", submittedComment)
    commentReply.removeAttribute("id", "edited")
    voteFunction()
  }
  mainComments.forEach((item, index) => {
    if (item === commentReply.previousElementSibling && newCommentReplyvalue.trim() !== null && newCommentReplyvalue.trim() !== "") {
      replySection[index].append(submittedComment)
      voteFunction()
    }
  })
  if (subCommentArray.includes(commentReply.previousElementSibling) && newCommentReplyvalue.trim() !== null && newCommentReplyvalue.trim() !== "") {
    commentReply.insertAdjacentElement("afterEnd", submittedComment)
    voteFunction()
  }

  replySectionResize()
  refreshValues()
  editBtnRefresh()

  if (this.parentElement.nextElementSibling.nextElementSibling === document.getElementById("main-comment")) {
    submittedComment.style.width = "100%"
  } else {
    submittedComment.style.width = "95%"
  }
  commentReply.remove()
  saveContent()
})

function replySectionResize() {
  for (let i = 0; i < replySection.length; i++) {
    if (replySection[i].firstElementChild === null) {
      replySection[i].style.display = "none"
    }
    else {
      replySection[i].style.display = "flex"
    }
  } 
}

function refreshValues() {
  myComments = Array.from(document.querySelectorAll(".my-comment"))
  myComments.map((item, index) => {
    let deleteBtn = document.querySelectorAll(".delete")
    deleteBtn[index].addEventListener("click", function() {
      aside.style.transform = "scale(100%, 100%)"
      aside.style.opacity = "1"
      document.body.style.overflowY = "hidden"
      indexed = index
    })
  })
}
refreshValues()

yesBtn.addEventListener("click", function() {
  aside.style.transform = "scale(0, 0)"
  aside.style.opacity = "0"
  document.body.style.overflowY = "visible"
  refreshValues()
  myComments[indexed].remove()
  replySectionResize()
  refreshValues()
  voteFunction()
  saveContent()
})
noBtn.addEventListener("click", function() {
  aside.style.transform = "scale(0, 0)"
  aside.style.opacity = "0"
  document.body.style.overflowY = "visible"
  saveContent()
})

const editBtnRefresh = () => {
editBtn = document.querySelectorAll(".edit")
editBtnArray = Array.from(editBtn)
editBtnArray.forEach((item, index) => {
  item.addEventListener("click", function() {
    commentReply.firstElementChild.value = this.parentElement.parentElement.firstElementChild.nextElementSibling.textContent.trim()
    this.parentElement.parentElement.insertAdjacentElement("afterend", commentReply)
    commentReply.firstElementChild.focus()
    commentReply.setAttribute("id", "edited")
    commentIndex = index
    editedUserName = commentReply.firstElementChild.value.split(" ")[0]
    subComment = document.querySelectorAll(".sub-comment")
    subCommentArray = Array.from(subComment)

    if (subCommentArray.includes(this.parentElement.parentElement)) {
      commentReply.style.width = "90%"
    } else {
      commentReply.style.width = "100%"
    }
    this.parentElement.parentElement.remove()
    saveContent()
  })
})
}

let voteFunction = () => voteArray.forEach((item, index) => {
  item.firstElementChild.addEventListener("click", function() {
    const voteValue = Number(this.nextElementSibling.textContent)
    this.nextElementSibling.textContent = voteValue + 1
    saveContent()
  })
  item.lastElementChild.addEventListener("click", function() {
    const voteValue = Number(this.previousElementSibling.textContent)
    if (this.previousElementSibling.textContent > 0) {
      this.previousElementSibling.textContent = voteValue - 1
    } else {}
    saveContent()
  })
})

voteFunction()
editBtnRefresh()

function currentDate() {
  const presentDate = new Date
  return `${presentDate.getDate()}-${presentDate.getMonth() + 1}-${presentDate.getFullYear()}`
}
function saveContent() {
  let savedContent = JSON.stringify(document.querySelector("main").innerHTML)
  localStorage.setItem("interactiveCommentSectionSavedContent", savedContent)
}
function recallSavedContent() {
  if (JSON.parse(localStorage.getItem("interactiveCommentSectionSavedContent")) !== null) {
    document.querySelector("main").innerHTML = JSON.parse(localStorage.getItem("interactiveCommentSectionSavedContent"))
  }
  if (document.querySelectorAll(".new-comment").length > 1) {
    let newCommentArray = Array.from(document.querySelectorAll(".new-comment"))
    newCommentArray.pop()
    newCommentArray.map(item => item.remove())
    return
  }
}