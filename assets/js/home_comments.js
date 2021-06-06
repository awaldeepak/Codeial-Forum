class PostComments{
    // constructor is used to initialize the instance of the class whenever a new instance is created
    constructor(postId){
        this.postId = postId;
        this.postContainer = $(`#post-${postId}`);
        this.newCommentForm = $(`#post-${postId}-comments-form`);

        this.createComment(postId);

        let self = this;
        // call for all the existing comments
        $(' .delete-comment-button', this.postContainer).each(function(){
            self.deleteComment($(this));
        });
    }

    createComment = function(){

        let pSelf = this;
        this.newCommentForm.submit(function(event){

            event.preventDefault();
            let self = this;

            $.ajax({
                type: 'post',
                url: '/comments/add-comment',
                data: $(self).serialize(),
                success: function(data){
                    let newComment = pSelf.newCommentDom(data.data.comment);
                    $(`#post-comments-${postId}`).prepend(newComment);
                    pSelf.deleteComment($(' .delete-comment-button', newComment));
                },
                error: function(error){
                    console.log(error.responseText);
                }
            });
        });
    }


    // let newCommentDOM = function(comment){

    //     return $(`<li>
    //                 <p>
    //                     ${ comment.content }
    //                 </p>
    //                 <small>
    //                     ${ comment.user.name }
    //                 </small>
    //                 <% if(${user} && (${user._id} == ${comment.user._id} || ${user._id} == ${post.user._id})) { %>
    //                     <small>
    //                         <a href="/comments/destroy-comment/${ comment._id }">Delete</a>
    //                     </small>
    //                 <% } %>
    //             </li>`);
    // }
}