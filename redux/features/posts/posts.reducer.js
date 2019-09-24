import * as t from './constants';

const initialState = {
  countPosts: 0,
  items: [],
  selectedPage: 0,
  perPage: 10,
  loading: false,
  error: null,
  item: {}
}

const posts = (state = initialState, action) => {

  switch(action.type) {

    case t.FETCH_POSTS:
      return {
        ...state,
        loading: true,
      }
    
    case t.FETCH_POSTS_SUCCESS: 

      return {
        ...state,
        loading: false,
        items: action.payload.items,
        countPosts: action.payload.count
      }

    case t.FETCH_POSTS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      }

    case t.FETCH_SINGLE_POST:
      return {
        ...state,
        loading: true
      }

    case t.FETCH_SINGLE_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        item: action.payload
      }

    case t.FETCH_SINGLE_POST_ERROR:
      return {
        ...state,
        loading: false,
        err: action.payload
      }

    // case t.FETCH_POSTS_DELETE:
    //   return {
    //     ...state,
    //     loading: true
    //   }

    // case t.FETCH_POSTS_DELETE_SUCCESS:
    //   return {
    //     ...state,
    //     loading: false
    //   }

    // case t.FETCH_POSTS_DELETE_ERROR:
    //   return {
    //     ...state,
    //     loading: false,
    //     error: action.payload
    //   }

    case t.SWITCH_PAGES:
      return {
        ...state,
        selectedPage: action.payload
      }

    default:
      return state;
  }
}

export { posts }