import {CHANGE_CLICKED_STATE, ClickedStateActionsTypes, ClickedStateState} from "../types/clickedState/types";

const initClickedState: ClickedStateState = {
  clickedState: undefined,
  data: null
}

export function clickedStateReducer(
  state: ClickedStateState = initClickedState,
  action: ClickedStateActionsTypes
): ClickedStateState {
  switch (action.type) {
    case CHANGE_CLICKED_STATE:
      return action.payload
    default: return state
  }
}