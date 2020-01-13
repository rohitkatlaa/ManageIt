import {
  GET_ITEMS,
  REFRESH_ITEMS,
  ADD_ITEM,
  DELETE_ITEM,
  ITEMS_LOADING,
  FILTERITEMS,
  CHANGESTATUS,
  UPVOTE
} from '../actions/types';

const initialState = {
  items: [],
  loading: false,
  filterPrimaryCategory: "All",
  filterSubCategory: "All",
  filterStatus: "All",
  sortParams: "default",
  sortByUser: "All"
};

export default function(state = initialState, action) {
  switch (action.type) {
    case CHANGESTATUS:
      return {
        ...state,
        items: [action.payload, ...state.items.filter(item => item._id !== action.payload._id)]
      }
    case UPVOTE:
      return {
        ...state,
        items: [action.payload, ...state.items.filter(item => item._id !== action.payload._id)]
      }
    case FILTERITEMS:
      return {
        ...state,
        filterPrimaryCategory: action.payload.PrimaryCategory,
        filterSubCategory: action.payload.subCategory,
        filterStatus: action.payload.status,
        sortParams: action.payload.sortParams,
        sortByUser: action.payload.sortByUser
      }
    case REFRESH_ITEMS:
      if(action.payload.type==="add"){
        return {
          ...state,
          items: [action.payload.data, ...state.items]
        };
      }
      else if(action.payload.type==="delete"){
        return {
          ...state,
          items: state.items.filter(item => item._id !== action.payload.complainID)
        };
      }
      else if(action.payload.type==="edit"){
        return {
          ...state,
          items: [action.payload.complain, ...state.items.filter(item => item._id !== action.payload.complain._id)]
        };
      }
    break;
    case GET_ITEMS:
      return {
        ...state,
        items: action.payload,
        loading: false
      };
    case DELETE_ITEM:
      return {
        ...state,
        items: state.items.filter(item => item._id !== action.payload)
      };
    case ADD_ITEM:
      return {
        ...state,
        items: [action.payload, ...state.items]
      };
    case ITEMS_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
}
