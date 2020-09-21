import React from "react"
import {InfoBoxModel} from "../../types";
import {roundNumberBillion} from "../../types";

interface InfoBoxProps  {
  isShow: boolean
  infoBox: InfoBoxModel | null
  top: number,
  left: number
}

export function InfoBox({isShow, infoBox, top, left}: InfoBoxProps) {

  if(isShow) {
    return(<div className="info-box" style={{
      top: `${top}px`,
      left: `${left}px`
    }}>
      <p>State: <span>{infoBox?.state}</span></p>
      <p>Student community: <span>{infoBox?.studentCommunity}</span></p>
      <p>Appropriations for major programs: <span>${roundNumberBillion(
        Number.parseInt(infoBox?.totalAppropriations.replaceAll(' ', '')!)
      )} billion</span></p>
    </div>)
  } else return null
}