import {PieChartApprData} from "../../../types";

export interface ClickedStateState {
  clickedState: string | undefined
  data: PieChartApprData[] | null
}

export interface RootClickedStateState {
  clickedState: ClickedStateState
}

export const CHANGE_CLICKED_STATE = 'CHANGE_CLICKED_STATE'

interface ChangeClickedState {
  type: typeof CHANGE_CLICKED_STATE,
  payload: ClickedStateState
}

export type ClickedStateActionsTypes = ChangeClickedState