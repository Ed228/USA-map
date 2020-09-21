import { infoBoxReducer } from "./infoBoxReducer"
import { combineReducers } from 'redux'
import { clickedStateReducer } from "./clickedStateReducer";
import { currentGrantReducer } from './currentGrantReducer'
import { filterReducer } from "./filterReducer";

const rootReducer = combineReducers({
  infoBox: infoBoxReducer,
  clickedState: clickedStateReducer,
  currentGrant: currentGrantReducer,
  filter: filterReducer
})

export default rootReducer
export type RootState = ReturnType<typeof rootReducer>