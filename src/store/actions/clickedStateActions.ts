import {CHANGE_CLICKED_STATE, ClickedStateActionsTypes, ClickedStateState} from "../types/clickedState/types";

export function changeClickedState(
  newState: ClickedStateState
): ClickedStateActionsTypes {
  return {
    type: CHANGE_CLICKED_STATE,
    payload: newState
  }
}