import User from './User'
import { useUserList } from '../hooks/useUserList'

import Table from 'react-bootstrap/Table'
import Container from 'react-bootstrap/Container'

const Users = () => {
  const { users } = useUserList()

  return (
    <Container>
      <h1>Users</h1>
      <Table striped bordered hover variant='dark'>
        <thead>
          <tr>
            <th>User</th>
            <th>Blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, i) => (
            <User key={i} user={user} blogs={user.blogs.length} />
          ))}
        </tbody>
      </Table>
    </Container>
  )
}

export default Users
