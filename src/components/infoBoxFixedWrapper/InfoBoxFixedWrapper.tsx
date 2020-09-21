import React from "react"
import {useSelector} from "react-redux";
import {RootClickedStateState} from "../../store/types/clickedState/types";
import {colorsMapPrograms, DataStates, PieChartApprData} from "../../types";
import dataStates from "../../data/dataStates.json";
import {RootInfoBoxState} from "../../store/types/infoBox/types";
import {InfoBoxModel} from "../../types";
import {InfoBoxFixed} from "../infoBoxFixed/infoBoxFixed";

export function InfoBoxFixedWrapper() {
  const clickedState =
    useSelector((state: RootClickedStateState) => state.clickedState.clickedState)
  const clickedDataState: DataStates | undefined
    = dataStates.find((dataState: DataStates) => dataState['States'].trim() === clickedState)
  let dataArr: PieChartApprData[] = []
  if(clickedDataState !== undefined) {
    Object.keys(colorsMapPrograms).forEach((key: string) => {
      dataArr.push({
        title: key,
        value: Number.parseInt(clickedDataState[key].replaceAll(" ", "")),
        color: colorsMapPrograms[key]
      })
    })}
  let isFixed: boolean =
    useSelector((state: RootInfoBoxState) => state.infoBox.isFixed)
  let infoBox: InfoBoxModel | null
  if(clickedDataState) {
    infoBox = {
      state: clickedDataState.States,
      studentCommunity: clickedDataState['Student community'],
      totalAppropriations: clickedDataState['Total appropriations']
    }
  } else infoBox = null
  return(<InfoBoxFixed isFixed={isFixed} infoBox={infoBox}/>)
}