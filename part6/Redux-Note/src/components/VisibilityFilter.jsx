import Filter from './Filter'

const VisibilityFilter = () => {
  return (
    <div>
      <Filter filter='all' />
      <Filter filter='important' />
      <Filter filter='nonimportant' />
    </div>
  )
}

export default VisibilityFilter
