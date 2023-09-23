import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setSavedUser, resetUser } from '../reducers/userSlice'

export const useUser = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.users)

  useEffect(() => {
    const loggedUserJSON = localStorage.getItem('loggedBlogAppUser')

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setSavedUser(user))
    }
  }, [dispatch])

  const handleLogout = () => {
    dispatch(resetUser())
  }

  return {
    user,
    handleLogout
  }
}
