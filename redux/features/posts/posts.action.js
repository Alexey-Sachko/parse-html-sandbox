import ApiService from '../../../services/ApiService';
import * as t from './constants'

function fetchPosts() {

  return (dispatch, getState) => {
    const { posts } = getState();
    const { selectedPage, perPage } = posts;

    dispatch({
      type: t.FETCH_POSTS
    })

    return ApiService.get(`/posts/?perPage=${perPage}&page=${selectedPage}`)
      .then((res) => {
        if (res.status === 200) {
          dispatch(fetchPostsSuccess(res.data))
        } else {
          dispatch(fetchPostsError(res.status))
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }
}

function fetchPostsSuccess(data) {

  const { count } = data.data || {};

  const { items } = data.data || {};

  return {
    type: t.FETCH_POSTS_SUCCESS,
    payload: {
      count,
      items
    } 
  }
}

function fetchPostsError(err) {
  return {
    type: t.FETCH_POSTS_ERROR,
    payload: err
  }
}

// function fetchDelete(postId) {

//   return (dispatch) => {

//     dispatch({
//       type: t.FETCH_POSTS_DELETE
//     })

//     ApiService.delete(`/posts/${postId}`)
//     .then((res) => {
//       if (res.status === 200) {
//         dispatch(fetchDeleteSuccess())
//         } else {
//           dispatch(fetchDeleteError(res.status))
//         }
//      })
//   }
// }

// function fetchDeleteSuccess() {
//   return {
//     type: t.FETCH_POSTS_DELETE_SUCCESS,
//     payload: {}
//   }
// }

// function fetchDeleteError(err) {
//   return {
//     type: t.FETCH_POSTS_DELETE_ERROR,
//     payload: err
//   }
// }

function fetchSinglePost(id) {

  return (dispatch) => {

    dispatch({
      type: t.FETCH_SINGLE_POST
    })

    ApiService.get(`/posts/${id}`)
    .then((res) => {
      if (res.status === 200) {
        dispatch(fetchSinglePostSuccess(res.data))
      } else {
        dispatch(fetchSinglePostsError(res.status))
      }
     })
    .catch((err) => {
      console.log(err)
    })
  }
}

function fetchSinglePostSuccess(data) {
  return {
    type: t.FETCH_SINGLE_POST_SUCCESS,
    payload: data
  }
}

function fetchSinglePostsError(err) {
  return {
    type: t.FETCH_SINGLE_POST_ERROR,
    payload: err
  }
}

function setPage(selectedPage, perPage) {
   
  return (dispatch) => {
    dispatch({
      type: t.SWITCH_PAGES,
      payload: selectedPage
    });
      dispatch(fetchPosts(perPage, selectedPage));
  };
}

export {
  fetchPosts,
  setPage,
  fetchSinglePost
  // fetchDelete
}