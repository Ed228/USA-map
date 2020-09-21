import {InfoBoxModel} from "../../../types";

export interface InfoBoxState {
  isShow: boolean
  isFixed: boolean
  infoBox: InfoBoxModel | null
}

export interface RootInfoBoxState {
  infoBox: InfoBoxState
}

export const TOGGLE_INFO_BOX = 'TOGGLE_INFO_BOX'
export const CHANGE_INFO_BOX_CONTENT = 'CHANGE_INFO_BOX_CONTENT'
export const FIX_INFO_BOX = 'FIX_INFO_BOX'

interface ToggleInfoBox {
  type: typeof TOGGLE_INFO_BOX
  payload: boolean
}

interface ChangeInfoBoxContent {
  type: typeof CHANGE_INFO_BOX_CONTENT
  payload: InfoBoxModel | null
}

interface FixInfoBox {
  type: typeof FIX_INFO_BOX,
  payload: boolean
}

export type InfoBoxActionsTypes = ToggleInfoBox | ChangeInfoBoxContent | FixInfoBox