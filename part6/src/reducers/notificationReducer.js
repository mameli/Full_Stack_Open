const reducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_NOTE':
      if (action.data === '')
        return action.data
      return action.data.notification
    default:
      return state
  }
}

export const setNotification = (notification, timeout) => {
  return async (dispatch) => {
    dispatch({
      type: 'SET_NOTE',
      data: { notification },
    })
    const time = timeout * 1000
    setTimeout(
      () =>
        dispatch({
          type: 'SET_NOTE',
          data: '',
        }),
      time
    )
  }
}

export default reducer
