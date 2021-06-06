import { FETCH_DATA, ADD_HOUSE } from "../Action/add";

const reducer = (state = [], action) => {
  switch (action.type) {
    case FETCH_DATA:
      return [...action.payload];
    case ADD_HOUSE:
      return state.concat(action.payload);
  }
  return state;
};

export default reducer;
