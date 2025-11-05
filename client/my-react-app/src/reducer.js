const initialState = {
  jobs: [],
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_JOBS":
      return { ...state, jobs: action.payload };

    case "ADD":
      return { ...state, jobs: [...state.jobs, action.payload] };

    case "UPDATE":
  return {
    ...state,
    jobs: state.jobs.map((job) =>
      job._id === action.payload._id ? action.payload : job
    ),
    };

    case "DEL":
      return {
        ...state,
        jobs: state.jobs.filter((job) => job._id !== action.payload),
      }
      case "GET":
        return {
          ...state,
          jobs: action.payload
  };


    default:
      return state;
  }
};
