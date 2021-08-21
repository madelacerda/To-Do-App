import {
  ADD_TODO,
  ADD_TODO_ERROR,
  ADD_TODO_SUCCESS,
  GET_TODOS,
  GET_TODOS_SUCCESS,
  GET_TODOS_ERROR,
  START_TOOGLE_TODO,
  TOOGLE_TODO_SUCCESS,
  TOOGLE_TODO_ERROR,
} from '../types';

const initialState = {
  tasks: [],
  loading: false,
  error: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_TODO:
    case GET_TODOS:
    case START_TOOGLE_TODO:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case ADD_TODO_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        tasks: [action.payload, ...state.tasks],
      };
    case ADD_TODO_ERROR:
    case GET_TODOS_ERROR:
    case TOOGLE_TODO_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
      };
    case GET_TODOS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        tasks: action.payload,
      };
    case TOOGLE_TODO_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        tasks: state.tasks.map(task =>
          task.id === action.payload.id
            ? {...task, isComplete: action.payload.value}
            : task,
        ),
      };
    default:
      return state;
  }
}
