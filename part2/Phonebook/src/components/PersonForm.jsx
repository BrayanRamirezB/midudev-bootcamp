import PropTypes from 'prop-types'
import Input from './Input'

const PersonForm = (props) => {
  return (
    <form onSubmit={props.onSubmit}>
      <div>
        <Input
          content={'Name'}
          value={props.nameValue}
          change={props.nameChange}
        />
        <Input
          content={'Number'}
          value={props.numberValue}
          change={props.numberChange}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

PersonForm.propTypes = {
  onSubmit: PropTypes.func,
  nameValue: PropTypes.string,
  numberValue: PropTypes.string,
  nameChange: PropTypes.func,
  numberChange: PropTypes.func,
}

export default PersonForm
