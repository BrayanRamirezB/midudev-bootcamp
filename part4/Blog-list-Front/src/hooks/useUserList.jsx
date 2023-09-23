import { useEffect, useState } from 'react'
import { getAllUsers } from '../services/user'

export const useUserList = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const u = await getAllUsers() // Espera a que getAllUsers() se complete
        setUsers(u)
      } catch (e) {
        console.log(e)
      }
    }

    fetchData()
  }, [])

  return {
    users
  }
}
