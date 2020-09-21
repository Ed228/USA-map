import {CHANGE_FILTER, Filter, FilterActions} from "../types/filter/types";

export function changeFilter(filter: Filter): FilterActions {
  return {
    type: CHANGE_FILTER,
    payload: filter
  }
}

