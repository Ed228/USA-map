import {
  CHANGE_CURRENT_GRANT,
  CurrentGrantActions,
  CurrentGrantState,
  REMOVE_CURRENT_GRANT
} from "../types/currentGrant/types";

const initCurrentGrantState: CurrentGrantState = {
  currentGrant: null
}

export function currentGrantReducer(
  state: CurrentGrantState = initCurrentGrantState,
  action: CurrentGrantActions
): CurrentGrantState {
  switch (action.type) {
    case CHANGE_CURRENT_GRANT:
      return {
        currentGrant: action.payload
      }
    case REMOVE_CURRENT_GRANT:
      return {
        currentGrant: null
      }
    default: return state
  }
}