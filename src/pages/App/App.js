import { useState, useEffect } from 'react'
import NavBar from '../../components/NavBar/NavBar'
import AuthPage from '../AuthPage/AuthPage'
import WigsPage from "../WigsPage/WigsPage"
import PostsPage from '../PostsPage/PostsPage'
import styles from './App.module.scss'
import { Routes, Route, Navigate } from 'react-router-dom'
import { getUser } from '../../utilities/users-service'
import ProfilePage from '../ProfilePage/ProfilePage'

function App () {
  const [state, setState] = useState(null)
  const [user, setUser] = useState(getUser())

  const fetchState = async () => {
    try {
      const response = await fetch('/api/test')
      const data = await response.json()
      setState(data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchState()
  }, [])

  return (
    <main className={styles.App}>
      {
                user
                  ? <>
                    <NavBar user={user} setUser={setUser} />
                    <Routes>
                      {/* <Route path="/posts/new" element={<NewPostPage />} user={user}/> */}
                      <Route
                        path='/'
                        element={<PostsPage user={user} setUser={setUser} />}
                      />
                    <Route path="/profile" element={<ProfilePage user={user} setUser={setUser}/>} />
                    <Route path="/*" element={<Navigate to="/profile" />} />
                    </Routes>
                    <WigsPage />
                  </>
                  : <AuthPage setUser={setUser} />
            }
    </main>
  )
}

export default App