import React, { ComponentProps, useState } from "react"
import { PieChart } from 'react-minimal-pie-chart'
import ReactTooltip from 'react-tooltip'
import { useSelector } from "react-redux"
import { RootClickedStateState } from "../../store/types/clickedState/types"
import {roundNumberBillion} from "../../types";

export function PieChartAppr() {
  const [hovered, setHovered] = useState<number | null>(null)

  type Props = {
    data: ComponentProps<typeof PieChart>['data'];
  }

  type DataWithTooltip = {
    tooltip: string,
    value: number,
    color: string
  }

  function makeTooltipContent(entry: Props['data'][0]) {
    return `Program ${entry.tooltip} has appropriations value $${
      roundNumberBillion(entry.value)} billion`;
  }

  let data = useSelector((state: RootClickedStateState) => state.clickedState.data)
  let dataWithToolTip: DataWithTooltip[] | null

  if(data) {
    dataWithToolTip = data!.map(({title, ...entry}) => {
      return {
        ...entry,
        tooltip: title
      }
    })
  }


  return(data ? <div className='pie-chart-wrap' data-tip="" data-for="chart">
    <p> U.S. Department of Education appropriations for major programs:</p>
    <PieChart
      data={data!}
      style={{height: "250px"}}
      lengthAngle={-360}
      onMouseOver={(_, index) => {
        setHovered(index)
      }}
      onMouseOut={() => {
        setHovered(null);
      }}
      animate
    />
    <ReactTooltip
      id='chart'
      getContent={() =>
        typeof hovered === 'number' ? makeTooltipContent(dataWithToolTip![hovered]) : null
      }
    />
  </div> : null)
}