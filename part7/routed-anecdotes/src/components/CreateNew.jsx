import { useNavigate } from 'react-router-dom'
import { useField } from '../hooks/index'
import PropTypes from 'prop-types'

const CreateNew = (props) => {
  const content = useField('text')
  const author = useField('text')
  const info = useField('text')

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()

    props.addNew({
      content: content.args.value,
      author: author.args.value,
      info: info.args.value,
      votes: 0
    })

    navigate('/')
  }

  const handleReset = () => {
    content.reset()
    author.reset()
    info.reset()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...content.args} name='content' />
        </div>
        <div>
          author
          <input {...author.args} name='author' />
        </div>
        <div>
          url for more info
          <input {...info.args} name='info' />
        </div>
        <button type='submit'>create</button>
        <button type='reset' onClick={handleReset}>
          reset
        </button>
      </form>
    </div>
  )
}

CreateNew.propTypes = {
  addNew: PropTypes.func
}

export default CreateNew
