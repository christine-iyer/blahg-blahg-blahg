import Comment from '../Comment/Comment'
import styles from './CommentsList.module.scss'

export default function CommentsList ({ comments, user, post, deleteComment, updateComment }) {
  return (
    // <h2>Comments List Page</h2>
    <div className={styles.CommentsList}>
      <h3>Comments Timeline</h3>
      {/* <Post /> */}

      { post.comments.length?
      <ul>
      {comments.map(comment => (
        <Comment
          key={comment._id}
          comment={comment}
          deleteComment={deleteComment}
          updateComment={updateComment}
          user={user}
          
        />
      ))}
    </ul>: ""

      }
    </div>
  )
}