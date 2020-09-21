import {
  CHANGE_INFO_BOX_CONTENT,
  FIX_INFO_BOX,
  InfoBoxActionsTypes,
  TOGGLE_INFO_BOX
} from "../types/infoBox/types"
import {InfoBoxModel} from "../../types";

export function changeInfoBox(newInfoBox: InfoBoxModel | null): InfoBoxActionsTypes {
  return {
    type: CHANGE_INFO_BOX_CONTENT,
    payload: newInfoBox
  }
}

export function toggleInfoBox(isShow: boolean): InfoBoxActionsTypes {
  return {
    type: TOGGLE_INFO_BOX,
    payload: isShow
  }
}

export function fixInfoBox(isFixed: boolean): InfoBoxActionsTypes {
  return {
    type: FIX_INFO_BOX,
    payload: isFixed
  }
}