import React from "react"
import {DSVRowString} from "d3-dsv";

interface grantsListItemProps {
  value: DSVRowString,
  index: number,
  activeButton: number | null,
  listItemClickHandler(value: DSVRowString, index: number): void
}

export function GrantsListItem({value, index, activeButton, listItemClickHandler}: grantsListItemProps) {
  return(<button className={activeButton === index ? 'active' : ''} onClick={() => listItemClickHandler(value, index)}>
    <span>{index + 1}.</span> {value['Title']}
  </button>)
}