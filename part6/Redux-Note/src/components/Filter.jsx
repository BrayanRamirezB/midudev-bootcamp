import { useDispatch } from 'react-redux'
import { filterChange } from '../features/note/filterReducer'
import PropTypes from 'prop-types'

const Filter = ({ filter }) => {
  const dispatch = useDispatch()

  const filterSelected = (value) => {
    dispatch(filterChange(value))
  }

  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      {filter}
      <input
        type='radio'
        name='filter'
        onChange={() => filterSelected(filter.toUpperCase())}
      />
    </div>
  )
}

Filter.propTypes = {
  filter: PropTypes.string
}

export default Filter
