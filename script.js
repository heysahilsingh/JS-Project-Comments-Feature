// POST COMMENT
postCommentForm.addEventListener("submit", (event) => {
  event.preventDefault();
  let commentInput = postCommentForm.querySelector("#comment");
  let commentForPost = commentInput.value;
  if (commentForPost.trim() !== "") {
    postComment(commentForPost);
    commentInput.value = "";
  }
});

// MISC. HTML MANIPULATION
const postCommentUserImg = createElement("img", {
  class: "profile-img",
  src: currentUser.userImgUrl,
  alt: currentUser.userName + "'s profile image",
});

postCommentForm.prepend(postCommentUserImg);

commentsWrapper.style.paddingBottom = postCommentWrapper.offsetHeight / 2 + "px";