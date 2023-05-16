// GET COMMENTS LIST VIA API
const fetchedComments = [
  {
    userImgUrl: "./assets/user-img-1.png",
    userName: "@CaptainAmerica",
    commentTime: "Tue May 16 2023 15:29:00",
    commentText:
      "Thanos, your quest for power and destruction ends here. I will fight alongside my allies to protect the universe.",
    commentLikes: "1526",
  },
  {
    userImgUrl: "./assets/user-img-2.png",
    userName: "@IronMan",
    commentTime: "Tue May 16 2023 03:08:00",
    commentText:
      "You underestimate our determination. With our combined strength, we will stop your reign of chaos. You brinjal!",
    commentLikes: "3515",
  },
  {
    userImgUrl: "./assets/user-img-3.png",
    userName: "@akaTHOR",
    commentTime: "Tue May 15 2023 02:19:00",
    commentText:
      "Thanos!!! prepare to face the fury of Mjolnir. I will unleash thunder upon you and bring an end to your tyranny",
    commentLikes: "2308",
  },
  {
    userImgUrl: "./assets/user-img-4.png",
    userName: "@DrStrange",
    commentTime: "Tue May 13 2023 07:02:00",
    commentText:
      "your pursuit of imbalance will not go unchallenged. I wield the mystical forces that will unravel your plans.",
    commentLikes: "1977",
  },
];

// CURRENT USER DETAILS
const currentUser = {
  userImgUrl: "./assets/user-img-current.png",
  userName: "@spiderman",
  commentTime: "1 second ago",
  isCurrentUser: true,
};

// PRINT FETCHED COMMENTS TO DOCUMENT
for (let i = 0; i < fetchedComments.length; i++) {
  addComment(
    fetchedComments[i].userImgUrl,
    fetchedComments[i].userName,
    commentTimeCompare(fetchedComments[i].commentTime),
    fetchedComments[i].commentText,
    fetchedComments[i].commentLikes,
    (() => {
      if (fetchedComments[i].hasOwnProperty("isCurrentUser")) {
        return fetchedComments[i].isCurrentUser;
      }
    })()
  );
}
