const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

export const addGood = () => {
  return {
    type: '@counter/GOOD'
  }
}

export const addOk = () => {
  return {
    type: '@counter/OK'
  }
}

export const addBad = () => {
  return {
    type: '@counter/BAD'
  }
}

export const setInit = () => {
  return {
    type: '@counter/ZERO'
  }
}

const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    case '@counter/GOOD':
      return {
        ...state,
        good: state.good + 1
      }

    case '@counter/OK':
      return {
        ...state,
        ok: state.ok + 1
      }

    case '@counter/BAD':
      return {
        ...state,
        bad: state.bad + 1
      }

    case '@counter/ZERO':
      return initialState

    default:
      return state
  }
}

export default counterReducer
