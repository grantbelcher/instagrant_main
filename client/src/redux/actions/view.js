export const viewFeed = () => (dispatch) => {
  console.log('IN VIEW FEED ACTION')
  dispatch({
    type: 'VIEW_FEED',
  })
}