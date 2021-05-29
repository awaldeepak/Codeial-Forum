{
    //Method to submit the form data for new post using AJAX
    let createPost = function(){
        let newPostForm = $('#feed-post-form');

        newPostForm.submit(function(event){
            event.preventDefault();

            $.ajax({
                type: 'post',
                url: '/posts/create-post',
                data: newPostForm.serialize(),
                success: function(data){
                    let newPost = newPostDOM(data.data.post);
                    $('#div-posts>ul').prepend(newPost);
                    deletePost($(' .delete-post-button', newPost));
                },
                error: function(){
                    console.log(error.responseText);
                }
            });
        });
    }

    //Method to create a post in DOM
    let newPostDOM = function(post){
        return $(`<li id="post-${post._id}">
                    <p>
                        ${ post.content }
                    </p>
                    <small>
                        ${ post.user.name }
                    </small>
                   
                    <small>
                        <a class="delete-post-button" href="/posts/destroy-post/${ post._id }">Delete</a>
                    </small>
                
                    <br><br>
                
                        <div class="post-comments">
                            <form action="/comments/add-comment" method="POST">
                                <input type="text" name="comment_content" placeholder="Comment Here..." required>
                                <input type="hidden" name="post" value="${ post._id }">
                                <input type="submit" value="Comment">
                            </form>
                        </div>
                    
                        <div class="div-comments">
                            <h5>Comments</h5>
                            <ul>
                               
                            </ul>            
                        </div>
                </li>`
                );
    }

    //Method to delete a post from DOM
    let deletePost = function(deleteLink){
        $(deleteLink).click(function(event){
            event.preventDefault();

            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function(data){
                    $(`#post-${data.data.post_id}`).remove();
                },
                error: function(err){
                    console.log(error.responseText);
                }
            });
        });
    }
    



    createPost();
}