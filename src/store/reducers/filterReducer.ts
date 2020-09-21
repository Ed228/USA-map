import {CHANGE_FILTER, Filter, FilterActions} from "../types/filter/types";

const initFilterState: Filter = {
  'Sex' : "Male"
}

export function filterReducer(
  state: Filter = initFilterState,
  action: FilterActions
): Filter {
  switch (action.type) {
    case CHANGE_FILTER:
      return {
        ...state,
        ...action.payload
      }
    default: return state
  }
}