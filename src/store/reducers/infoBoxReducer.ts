import {
  InfoBoxState,
  InfoBoxActionsTypes,
  TOGGLE_INFO_BOX,
  CHANGE_INFO_BOX_CONTENT,
  FIX_INFO_BOX
} from "../types/infoBox/types"


const initInfoBoxState: InfoBoxState = {
  isShow: false,
  isFixed: false,
  infoBox: null
}

export function infoBoxReducer(
  state: InfoBoxState = initInfoBoxState,
  action: InfoBoxActionsTypes
): InfoBoxState {
  switch (action.type) {
    case TOGGLE_INFO_BOX:
      return {
        ...state,
        isShow: action.payload
      }
    case CHANGE_INFO_BOX_CONTENT:
      return {
        ...state,
        infoBox: action.payload
      }
    case FIX_INFO_BOX:
      return {
        ...state,
        isFixed: action.payload
      }
    default:
      return state
  }
}