import {
  CHANGE_CURRENT_GRANT,
  CurrentGrantActions,
  Grant,
  REMOVE_CURRENT_GRANT
} from '../types/currentGrant/types'

export function changeCurrentGrant(grant: Grant): CurrentGrantActions {
  return {
    type: CHANGE_CURRENT_GRANT,
    payload: grant
  }
}

export function removeCurrentGrant(): CurrentGrantActions {
  return {
    type: REMOVE_CURRENT_GRANT
  }
}