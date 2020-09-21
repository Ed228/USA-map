import React from "react"
import {useSelector} from "react-redux";
import {RootClickedStateState} from "../../store/types/clickedState/types";
import {PieChartApprData} from "../../types";

export function ColorMap() {
  const data: PieChartApprData[] | null
    = useSelector((state: RootClickedStateState) => state.clickedState.data)

  return (data === null ? null : <div className='color-map'><p>
    Type of Appropriation
  </p>
    <ul>{
      data!.map((item: PieChartApprData, index: number) => <li key={index}>
        <span className='color-map-icon' style={{backgroundColor: item.color}}>
        </span>
        <span className='color-map-text'>{item.title}</span>
      </li>)}</ul>
  </div>)
}