const commentsWrapper = document.querySelector(".comments .wrapper"); // Important Variable
const dialogBoxWrapper = document.querySelector(".dialog-box-wrapper"); // Important Variable
const postCommentWrapper = document.querySelector(".post-comment");
const postCommentForm = document.querySelector(".post-comment form");

// FUNCTION - CREATE HTML ELEMENTS
function createElement(tagName, attributes = {}, content = ``) {
  const element = document.createElement(tagName);

  for (const [key, value] of Object.entries(attributes)) {
    element.setAttribute(key, value);
  }

  if (content instanceof Node) {
    element.appendChild(content);
  } else {
    element.textContent = content;
  }

  return element;
}

// FUNCTION - ADD COMMENT
function addComment(
  paramUserImgUrl,
  paramUserName,
  paramCommentTime,
  paramComment,
  paramCommentLikes,
  isCurrentUser
) {
  // CREATE ELEMENTS
  // Create Comment Top
  const comment = createElement("div", { class: "comment" });

  const wrapper = createElement("div", { class: "wrapper" });

  const commentTop = createElement("div", { class: "top" });

  const userImg = createElement("img", {
    class: "user-image",
    src: paramUserImgUrl,
    alt: paramUserName + "'s Profile Picture",
  });

  const userNameWrapper = createElement("div", { class: "user-name-wrapper" });
  const userName = (() => {
    if (isCurrentUser) {
      return createElement(
        "span",
        { class: "name current-user" },
        paramUserName
      );
    } else {
      return createElement("span", { class: "name" }, paramUserName);
    }
  })();

  const commentTime = createElement(
    "span",
    { class: "time" },
    paramCommentTime
  );

  const actionsWrapper = createElement("div", { class: "actions-wrapper" });

  const actionsHandler = createElement(
    "div",
    { class: "actions-handler" },
    "⋮"
  );

  const actions = createElement("div", { class: "actions" });

  const actionEdit = createElement("span", { class: "action edit" }, "Edit");

  const actionDelete = createElement(
    "span",
    { class: "action delete" },
    "Delete"
  );

  const actionReply = createElement("span", { class: "action reply" }, "Reply");

  const actionReport = createElement(
    "span",
    { class: "action report" },
    "Report"
  );

  // Create Comment Bottom
  const commentBottom = createElement("div", { class: "bottom" });
  const commentField = createElement("div", { class: "comment-field" });
  const commentText = createElement("p", {}, paramComment);
  const commentActions = createElement("div", { class: "bottom-actions" });
  const commentReply = createElement("span", { class: "reply" }, "Reply");
  const commentLikes = createElement(
    "span",
    { class: "like" },
    paramCommentLikes
  );

  // APPEND ALL THE ELEMENTS
  // Append Comment in Comments Wrapper
  commentsWrapper.appendChild(comment);
  comment.appendChild(wrapper);

  // Append Comment Top in Comment
  [commentTop, commentBottom].forEach((element) => {
    wrapper.appendChild(element);
  });

  // Append User Name Wrapper and Actions wrapper in Comment Top
  [userImg, userNameWrapper, actionsWrapper].forEach((element) => {
    commentTop.appendChild(element);
  });

  // Append User Name and Comment Time in User Name Wrapper
  [userName, commentTime].forEach((element) => {
    userNameWrapper.appendChild(element);
  });

  // Append Actions Handler and Actions in Actions Wrapper
  [actionsHandler, actions].forEach((element) => {
    actionsWrapper.appendChild(element);
  });

  // Append Action Edit, Action Delete, Action Reply and Action Report in Actions
  if (isCurrentUser) {
    [actionEdit, createElement("hr"), actionDelete].forEach((element) => {
      actions.appendChild(element);
    });
  } else {
    [actionReply, createElement("hr"), actionReport].forEach((element) => {
      actions.appendChild(element);
    });
  }

  // Append Comment Bottom in Comment
  [commentField, commentActions].forEach((element) => {
    commentBottom.appendChild(element);
  });

  // Append Comment Field and Comment Actions in Comment Bottom
  commentField.appendChild(commentText);

  // Append Comment Reply and Comment Likes in Comment Action
  [commentReply, commentLikes].forEach((element) => {
    commentActions.appendChild(element);
  });

  // ADD EVENT LISTENERS TO COMMENT ACTIONS
  // Comment Actions Trigger
  actionsHandler.addEventListener("click", (event) => {
    event.stopPropagation();
    actions.classList.toggle("active");
  });

  document.addEventListener("click", (event) => {
    if (
      !actions.contains(event.target) &&
      !actionsHandler.contains(event.target) &&
      !actionEdit.contains(event.target)
    ) {
      actions.classList.remove("active");
    }
  });

  // Comment Edit
  actionEdit.addEventListener("click", () => {
    dialogBoxWrapper.classList.add("active-dialog-box");

    let commentContent = comment.querySelector(".comment-field");
    const editedCommentContent = createElement(
      "p",
      { class: "edited-comment", contenteditable: true },
      commentContent.textContent
    );

    // Create Edit Dialog Box
    const dialogBoxEdit = createDialogBox(
      "edit-comment",
      "Edit Comment",
      editedCommentContent,
      "Cancel",
      "Save"
    );

    // Auto-focus Edited comment field
    dialogBoxEdit.querySelector(".edited-comment").focus();

    // Comment Actions Edit Button 1
    dialogBoxEdit.querySelector(".btn-1").addEventListener("click", () => {
      dialogBoxWrapper.classList.remove("active-dialog-box");
      dialogBoxEdit.remove();
    });

    // Comment Actions Edit Button 2
    dialogBoxEdit.querySelector(".btn-2").addEventListener("click", () => {
      commentContent.textContent = editedCommentContent.textContent;
      dialogBoxWrapper.classList.remove("active-dialog-box");
      dialogBoxEdit.remove();
    });
  });

  // Comment Delete
  actionDelete.addEventListener("click", () => {
    dialogBoxWrapper.classList.add("active-dialog-box");

    // Create Delete Dialog Box
    const dialogBoxDelete = createDialogBox(
      "delete-comment",
      "Delete Comment?",
      "Are you sure you want to delete this comment? This will remove the comment and can't be undon.",
      "Cancel",
      "Delete"
    );

    // Comment Action Delete Button 1
    dialogBoxDelete.querySelector(".btn-1").addEventListener("click", () => {
      dialogBoxWrapper.classList.remove("active-dialog-box");
      dialogBoxDelete.remove();
    });

    // Comment Action Delete Button 2
    dialogBoxDelete.querySelector(".btn-2").addEventListener("click", () => {
      comment.remove();
      dialogBoxWrapper.classList.remove("active-dialog-box");
      dialogBoxDelete.remove();
    });
  });

  // Comment Reply
  [actionReply, commentReply].forEach((trigger) => {
    trigger.addEventListener("click", () => {
      dialogBoxWrapper.classList.add("active-dialog-box");

      const replyTo = comment.querySelector(".comment-field").textContent;
      const replyingTo = comment.querySelector(".name").textContent;

      const replyHeading = createElement(
        "p",
        { "reply-to": "Reply to: " + '"' + replyTo + '"' },
        "Replying to " + replyingTo
      );

      const repliedComment = createElement("p", {
        class: "replied-comment",
        contenteditable: true,
      });

      const dialogBoxReply = createDialogBox(
        "reply-comment",
        replyHeading,
        repliedComment,
        "Cancel",
        "Reply"
      );

      // Auto-focus Edited comment field
      dialogBoxReply.querySelector(".replied-comment").focus();

      // Comment Action Reply Button 1
      dialogBoxReply.querySelector(".btn-1").addEventListener("click", () => {
        dialogBoxWrapper.classList.remove("active-dialog-box");
        dialogBoxReply.remove();
      });

      // Comment Action Reply Button 2
      dialogBoxReply.querySelector(".btn-2").addEventListener("click", () => {
        if (repliedComment.textContent.trim() !== "") {

          const repliedCommentElement = postComment(
            replyingTo + " " + repliedComment.textContent,
            "replied-comment"
          );

          comment.appendChild(repliedCommentElement);

          dialogBoxWrapper.classList.remove("active-dialog-box");
          dialogBoxReply.remove();
        }
      });
    });
  });

  // Comment Report
  actionReport.addEventListener("click", () => {
    dialogBoxWrapper.classList.add("active-dialog-box");

    // Create Report Dialog Box
    const dialogBoxReport = createDialogBox(
      "report-comment",
      "Report this comment?",
      "If you believe it violates our comment policy, reporting it allows us to review the content and take necessary action.",
      "Cancel",
      "Report"
    );

    // Comment Action Report Button 1
    dialogBoxReport.querySelector(".btn-1").addEventListener("click", () => {
      dialogBoxWrapper.classList.remove("active-dialog-box");
      dialogBoxReport.remove();
    });

    // Comment Action Report Button 2
    dialogBoxReport.querySelector(".btn-2").addEventListener("click", () => {
      dialogBoxReport.remove();
      afterCommentReport();
    });
  });

  // Comment Report After
  function afterCommentReport() {
    const dialogBoxafterReport = createDialogBox(
      "after-comment-report",
      "",
      "Thank you for being proactive in upholding our standards, we'll take action asap.",
      "",
      "Ok"
    );

    // After Comment Report Button 2
    dialogBoxafterReport
      .querySelector(".btn-2")
      .addEventListener("click", () => {
        dialogBoxafterReport.remove();
        dialogBoxWrapper.classList.remove("active-dialog-box");
      });
  }

  // Comment Like
  commentLikes.addEventListener("click", () => {
    commentLikes.classList.toggle("liked");
    if (commentLikes.classList.contains("liked")) {
      ++commentLikes.innerText;
    } else {
      --commentLikes.innerText;
    }
  });

  return comment;
}

// POST COMMENT FUNCTION
function postComment(comment, className) {
  const addedComment = addComment(
    currentUser.userImgUrl,
    currentUser.userName,
    currentUser.commentTime,
    comment,
    0,
    currentUser.isCurrentUser
  );

  commentsWrapper.prepend(addedComment);
  className ? addedComment.classList.add(className) : null;

  return addedComment
}

// FUNCTION - CREATE DIALOG BOX
function createDialogBox(
  boxName,
  boxHeading,
  boxContent,
  firstButton,
  secondButton
) {
  const dialogBox = createElement("div", {
    class: "dialog-box " + boxName,
    id: boxName,
  });
  const dialogBoxHeading = createElement(
    "p",
    { class: "box-heading" },
    boxHeading
  );
  const dialogBoxContent = createElement(
    "div",
    { class: "box-content" },
    boxContent
  );
  const dialogBoxBtns = createElement("div", { class: "box-btns" });
  const dialogBoxBtn_1 = createElement(
    "button",
    { class: "btn-1" },
    firstButton
  );
  const dialogBoxBtn_2 = createElement(
    "button",
    { class: "btn-2" },
    secondButton
  );

  dialogBoxWrapper.appendChild(dialogBox);

  [dialogBoxHeading, dialogBoxContent, dialogBoxBtns].forEach((element) => {
    dialogBox.appendChild(element);
  });

  [dialogBoxBtn_1, dialogBoxBtn_2].forEach((element) => {
    dialogBoxBtns.appendChild(element);
  });

  return dialogBox;
}

// COMPARE COMMENT TIME FUNCTION
function commentTimeCompare(time) {
  const lastTime = new Date(time);
  const currentTime = new Date();

  const tdInMinss = currentTime - lastTime;
  const tdInSs = Math.floor(tdInMinss / 1000);
  const tdInMins = Math.floor(tdInSs / 60);
  const tdInHr = Math.floor(tdInMins / 60);
  const tdInDs = Math.floor(tdInHr / 24);
  const tdInMns = Math.floor(tdInDs / 30);
  const tdInYrs = Math.floor(tdInDs / 365);

  if (tdInYrs >= 1) {
    return `${tdInYrs} years ago`;
  } else if (tdInMns >= 2) {
    return `${tdInMns} months ago`;
  } else if (tdInDs >= 30) {
    return "1 month ago";
  } else if (tdInDs >= 2) {
    return `${tdInDs} days ago`;
  } else if (tdInHr >= 24) {
    return "1 day ago";
  } else if (tdInHr >= 2) {
    return `${tdInHr} hours ago`;
  } else if (tdInMins >= 60) {
    return "1 hour ago";
  } else if (tdInMins >= 2) {
    return `${tdInMins} minutes ago`;
  } else if (tdInSs >= 60) {
    return "1 minute ago";
  } else {
    return `${tdInSs} seconds ago`;
  }
}

