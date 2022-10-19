import {
  useState,
  useEffect
} from 'react'

import axios from 'axios'

const USER_URL = process.env.REACT_APP_USERS_URL

const useUsers = () => {
  const [users, setUsers] = useState([])
  const [isLoading, setLoading] = useState(false)
  
  const getUsers = async () => {
    setLoading(true)
    try {
      const { data } = await axios.get(USER_URL)

      setUsers(data)
    } catch (err) {
      console.log('KO::USERS', err)
    } finally {
      setLoading(false)
    }
  }

  /** GET USERS */
  useEffect(() => {
    getUsers()
  }, [])

  const addUser = async (data, callback) => {
    setLoading(true)
    try {
      await axios.post(USER_URL, data)
      getUsers()
      callback()
    } catch (err) {
      alert('Something was wrong! Please try again')
    } finally {
      setLoading(false)
    }
  }

  const editUser = async (data, callback = () => {}) => {
    setLoading(true)
    try {
      await axios.put(`${USER_URL}/${data.id}`,data)
      getUsers()
      callback()
    } catch (err) {
      alert('Something was wrong! Please try again')
    } finally {
      setLoading(false)
    }
  }

  const deleteUser = async (id, callback = () => {}) => {
    setLoading(true)
    try {
      await axios.delete(`${USER_URL}/${id}`)
      getUsers()
      callback()
    } catch (err) {
      alert('Something was wrong! Please try again')
    } finally {
      setLoading(false)
    }
  }

  return {
    users,
    getUsers,
    addUser,
    editUser,
    deleteUser,
    isLoading
  }
}

/*const addUsers = () => {
  axios.post(process.env.REACT_APP_USERS_URL,{nombre,apellido,correo,telefono,cc})
  .then((response)=> {

  })
}*/

export default useUsers
