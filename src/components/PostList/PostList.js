import Post from '../Post/Post'
import styles from './PostsList.module.scss'

export default function PostsList ({ posts, deletePost, updatePost, user }) {
  return (
    <div className={styles.PostsList}>
      <h3>Timeline</h3>
      {/* <Post /> */}
      <ul>
        {posts.map(post => (
          <Post
            key={post._id}
            post={post}
            deletePost={deletePost}
            updatePost={updatePost}
            user={user}
            
          />
        ))}
      </ul>
    </div>
  )
}