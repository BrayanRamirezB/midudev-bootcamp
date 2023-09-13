export const filterChange = (filter) => {
  return {
    type: '@notes/setFilter',
    filter
  }
}

const filterReducer = (state = 'ALL', action) => {
  switch (action.type) {
    case '@notes/setFilter':
      return action.filter
    default:
      return state
  }
}

export default filterReducer
