// method to submit the form data for new post using AJAX
const createPost = function () {
    let newPostForm = $('#new-post-form');
    newPostForm.submit(function (e) {
        e.preventDefault();
        $.ajax({
            type: 'post',
            url: '/users/create-post',
            data: newPostForm.serialize(),
            success: function (data) {
                console.log("form data :",data);
                let newPost = newPostDom(data.data.post);
                $(`#posts-list>ul`).prepend(newPost);
                deletePost($('.post-delete-button', newPost));
            }, error: function (error) {
                console.log(error.responseText);
            }
        });
    });
}

// method to create a post in DOM
const newPostDom = function (post) {
    return $(`<div id="post-${post._id}">
                <li >
                    <div style="display: flex; justify-content: space-between;">
                        <span class="post-content">
                            ${post.content}
                        </span>
                        <span style="position: relative; right: 5px;">
                            <a class="post-delete-button" href="/users/destroy/${post._id}"><i class="fa-solid fa-xmark"></i></a>
                        </span>
                    </div>
                    <span class="post-user">
                        ${post.user.name}
                    </span>

                    <div class="post-comments">
                            <form action="/comments/create" method="post">
                                <input type="text" name="content" id="comment-reply" placeholder="Type your comment" required>
                                <input type="hidden" name="postID" value="${post._id}">
                                <input type="submit" value="Reply" id="comment-reply-submit">
                            </form>
                    </div>

                    <div class="post-comments-list">
                        <ul>
                            
                        </ul>
                    </div>
                </li>

            </div>`)
}

// method to delete a post from DOM
const deletePost = function(deleteLink){
    $(deleteLink).click(function(e){
        e.preventDefault();
        $.ajax({
            type: 'get',
            url: $(deleteLink).prop('href'),
            success: function(data){
                // console.log("delete post data: ",data);
                $(`#post-${data.data.post._id}`).remove();
            }, error: function(error){
                console.log(error.responseText);
            }
        })
    })
}

// method to add comment on a post
const creatComment = function(){
    let newCommentForm = $('#new-comment-form');
    newCommentForm.submit(function(e){
        e.preventDefault();
        $.ajax({
            type: 'post',
            url: '/comments/create',
            data: newCommentForm.serialize(),
            success: (data) => {
                console.log("comment data", data);
                let newComment = newCommentDom(data.data.comment);
                $(`#post-comments-${data.data.comment.post}`).append(newComment);
                deleteComment($('.comment-delete-button', newComment));
            },
            error: (error)=>{
                console.log(error.responseText);
            }
        })
    })
}

// method to add a comment in DOM
const newCommentDom = function(comment){
    return $(`<div id="comment-${comment._id}">
                <li>
                    <div style="display: flex; justify-content: space-between;">
                        <span class="post-content">
                        ${comment.content}
                        </span>
                            <span style="position: relative; right: 5px;">
                                <a class="comment-delete-button" href="/comments/destroy/${comment._id}"><i class="fa-solid fa-xmark"></i></a>
                            </span>
                    </div>
                    <span class="post-user">
                        By: ${comment.user.name}
                    </span>
                </li>
            </div>`);
}

// method to delete a comment from DOM
const deleteComment = function(deleteLink){
    $(deleteLink).click(function(e){
        console.log($(deleteLink).prop('href'));
        e.preventDefault();
        $.ajax({
            type: 'get',
            url: $(deleteLink).prop('href'),
            success: (data)=>{
                $(`#comment-${data.data.comment._id}`).remove();
            },
            error:(error)=>{
                console.log(error.responseText);
            }
        })
    })
}

creatComment();
createPost();


// Function to check scroll position and show/hide button

const scrollToTopButton = document.getElementById('scrollToTopButton');
const feedPosts = document.getElementById('feed-posts');

function checkScroll() {
    if (feedPosts.scrollTop > 50) { 
        scrollToTopButton.style.display = 'block';
    } else {
        scrollToTopButton.style.display = 'none';
    }
}

function scrollToTop() {
    feedPosts.style.scrollBehavior = 'smooth';
    feedPosts.scrollTop = 0;

    feedPosts.addEventListener('scroll', function smoothScrollEnd() {
        feedPosts.style.scrollBehavior = 'auto';
        feedPosts.removeEventListener('scroll', smoothScrollEnd);
    });
}

feedPosts.addEventListener('scroll', checkScroll);
scrollToTopButton.addEventListener('click', scrollToTop);
