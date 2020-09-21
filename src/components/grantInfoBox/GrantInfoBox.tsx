import React from "react"
import {useSelector} from "react-redux";
import {RootCurrentGrantState} from "../../store/types/currentGrant/types";

export function GrantInfoBox() {
  const currentGrant =
    useSelector((state: RootCurrentGrantState) =>
    state.currentGrant.currentGrant)

  return(currentGrant ? <div className='grant-box'>
    <div className="row">
      <div className="col-xs-12 col-sm-12 col-md-8 col-lg-8">
        <h5>{currentGrant.title}</h5>
        <p>{currentGrant.description}</p>
        {currentGrant.link ?
          <a target='_blank' href={currentGrant.link}>Details</a> : null}
      </div>
      <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4 reward-col">
        <p>Reward:</p>
        <p className='reward'>{currentGrant.reward}</p>
      </div>
    </div>
  </div> : null)
}