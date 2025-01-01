import { auth, firestore, signInWithEmailAndPassword, collection, addDoc, updateDoc, onSnapshot } from './firebase.js';

document.addEventListener("DOMContentLoaded", function() {
    // User authentication
    document.getElementById("loginForm").addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent default form submission

        const email = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                alert("Login successful!");
                document.getElementById("login").style.display = "none";
                document.getElementById("feed").style.display = "block";
                document.querySelector("nav").style.display = "flex";
            })
            .catch((error) => {
                alert("Invalid credentials. Please try again.");
            });
    });

    // Posting functionality
    document.getElementById("postForm").addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent default form submission

        const postContent = document.getElementById("postContent").value;

        addDoc(collection(firestore, "posts"), {
            content: postContent,
            likes: 0,
            comments: []
        });

        document.getElementById("postForm").reset(); // Clears the form
    });

    // Listening for new posts
    onSnapshot(collection(firestore, "posts"), (snapshot) => {
        const postsContainer = document.getElementById("posts");
        postsContainer.innerHTML = ""; // Clear existing posts

        snapshot.forEach((doc) => {
            const post = doc.data();
            const postId = doc.id;

            const newPost = document.createElement("div");
            newPost.classList.add("post");

            const postText = document.createElement("p");
            postText.innerText = post.content;
            newPost.appendChild(postText);

            const likeBtn = document.createElement("button");
            likeBtn.classList.add("like-btn");
            likeBtn.innerText = "Like";
            newPost.appendChild(likeBtn);

            const likeCount = document.createElement("span");
            likeCount.classList.add("like-count");
            likeCount.innerText = `${post.likes} likes`;
            newPost.appendChild(likeCount);

            const commentBtn = document.createElement("button");
            commentBtn.classList.add("comment-btn");
            commentBtn.innerText = "Comment";
            newPost.appendChild(commentBtn);

            const commentsContainer = document.createElement("div");
            commentsContainer.classList.add("comments");
            newPost.appendChild(commentsContainer);

            const commentForm = document.createElement("form");
            commentForm.classList.add("comment-form");
            commentForm.style.display = "none";
            const commentInput = document.createElement("input");
            commentInput.classList.add("comment-input");
            commentInput.type = "text";
            commentInput.placeholder = "Add a comment...";
            commentForm.appendChild(commentInput);
            const commentSubmit = document.createElement("button");
            commentSubmit.type = "submit";
            commentSubmit.innerText = "Post Comment";
            commentForm.appendChild(commentSubmit);
            newPost.appendChild(commentForm);

            postsContainer.prepend(newPost); // Adds the new post to the top of the feed

            // Like button functionality
            likeBtn.addEventListener("click", function() {
                updateDoc(doc(firestore, "posts", postId), {
                    likes: post.likes + 1
                });
            });

            // Comment button functionality
            commentBtn.addEventListener("click", function() {
                commentForm.style.display = commentForm.style.display === "none" ? "block" : "none";
            });

            // Comment form functionality
            commentForm.addEventListener("submit", function(event) {
                event.preventDefault(); // Prevent default form submission
                const commentText = commentInput.value;

                updateDoc(doc(firestore, "posts", postId), {
                    comments: [...post.comments, commentText]
                });
                commentForm.reset(); // Clears the comment form
            });

            // Displaying comments
            post.comments.forEach(comment => {
                const newComment = document.createElement("div");
                newComment.classList.add("comment");
                newComment.innerText = comment;
                commentsContainer.appendChild(newComment);
            });
        });
    });

    // Profile page functionality
    document.getElementById("profile-link").addEventListener("click", function(event) {
        event.preventDefault();
        document.getElementById("feed").style.display = "none";
        document.getElementById("profile").style.display = "block";
    });

    document.getElementById("logout-link").addEventListener("click", function(event) {
        event.preventDefault();
        document.getElementById("profile").style.display = "none";
        document.getElementById("feed").style.display = "none";
        document.getElementById("login").style.display = "block";
        document.querySelector("nav").style.display = "none";
    });

    document.getElementById("profileForm").addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent default form submission
        alert("Profile updated!");
    });
});
