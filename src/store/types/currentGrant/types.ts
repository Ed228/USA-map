export interface Grant {
  title: string,
  description: string,
  reward: string,
  link?: string
}

export interface CurrentGrantState {
  currentGrant: Grant | null
}

export interface RootCurrentGrantState {
  currentGrant: CurrentGrantState
}

export const CHANGE_CURRENT_GRANT = 'CHANGE_CURRENT_GRANT'
export const REMOVE_CURRENT_GRANT = 'REMOVE_CURRENT_GRANT'

interface ChangeCurrentGrant {
  type: typeof CHANGE_CURRENT_GRANT
  payload: Grant
}

interface RemoveCurrentGrant {
  type: typeof REMOVE_CURRENT_GRANT
}

export type CurrentGrantActions = ChangeCurrentGrant | RemoveCurrentGrant