import React from "react"
import {InfoBoxModel} from "../../types";
import {roundNumberBillion} from "../../types";

interface InfoBoxFixedProps  {
  isFixed: boolean
  infoBox: InfoBoxModel | null
}

export function InfoBoxFixed({isFixed, infoBox}: InfoBoxFixedProps) {

  if(isFixed) {
    return(<div className="info-box-fixed">
      <h6>State programs info</h6>
      <p>State: <span>{infoBox?.state}</span></p>
      <p>Student community: <span>{infoBox?.studentCommunity}</span></p>
      <p>Appropriations for major programs: <span>${roundNumberBillion(
        Number.parseInt(infoBox?.totalAppropriations.replaceAll(' ', '')!)
      )} billion</span></p>
    </div>)
  } else return null
}