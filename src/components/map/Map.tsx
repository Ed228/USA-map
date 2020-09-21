import React, {MouseEvent, useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {changeInfoBox, fixInfoBox, toggleInfoBox} from "../../store/actions/infoBoxActions";
import {InfoBox} from "../infoBox/InfoBox";
import {InfoBoxModel} from "../../types";
import dataStates from "../../data/dataStates.json"
import statesCoordinatesSvg from "../../data/statesCoordinatesSvg.json"
import {
  colorsMapPrograms,
  DataStates,
  PieChartApprData,
  StateCoordinatesSvg,
  StudentsInfoBox
} from "../../types";
import {changeClickedState} from "../../store/actions/clickedStateActions";
import {RootState} from "../../store/reducers/rootReducer";
import {removeCurrentGrant} from "../../store/actions/currentGrantActions";

type MapCoordinates = {
  top: number,
  left: number
}

let initMapCoordinates: MapCoordinates = {
  top: 0,
  left: 0
}

const cumulativeOffset = (element: HTMLElement): MapCoordinates => {
  let top = 0, left = 0
  do {
    top += element.offsetTop || 0
    left += element.offsetLeft || 0
    element = element.offsetParent as HTMLElement
  } while (element)
  return {
    top: top,
    left: left
  }
}

const updateMapCoordinates =
  (newCoordinates: MapCoordinates): MapCoordinates => {
  return newCoordinates
}

export function Map() {
  const mapRef = useRef(null)
  const [clientCoordinates, changeClientCoordinates] = useState({
    top: 0,
    left: 0
  })
  const [activeState, changeActiveState] = useState<string | null>(null)
  useEffect(() => {
    const map = mapRef.current! as HTMLElement
    initMapCoordinates = updateMapCoordinates({
      top: cumulativeOffset(map).top,
      left: cumulativeOffset(map).left
    })
    window.addEventListener('resize', () => {
      initMapCoordinates = updateMapCoordinates({
        top: cumulativeOffset(map).top,
        left: cumulativeOffset(map).left
      })
    })
    window.addEventListener('scroll', () => {
      initMapCoordinates.top = cumulativeOffset(map).top - window.scrollY
    })
  }, [])
  const dispatch = useDispatch()
  const mouseMoveHandler = (e: MouseEvent) => {
    changeClientCoordinates({
      top: e.clientY - initMapCoordinates.top,
      left: e.clientX - initMapCoordinates.left
    })
  }
  const hoverHandler = (e: MouseEvent) => {
    let currentTarget = e.currentTarget as SVGPathElement
    let currentState = currentTarget.getAttribute('data-region')
    dispatch(toggleInfoBox(true))
    let studentPerState: StudentsInfoBox = dataStates.find(
      (studentInfo: StudentsInfoBox) => studentInfo['States'].trim() === currentState)!
    dispatch(changeInfoBox({
      state: studentPerState['States'],
      studentCommunity: studentPerState['Student community'],
      totalAppropriations: `${studentPerState['Total appropriations']}`
    }))
  }

  const leaveHandler = (e: MouseEvent) => {
    dispatch(toggleInfoBox(false))
    dispatch(changeInfoBox(null))
  }

  const clickHandler = (e: MouseEvent) => {
    let currentTarget = e.currentTarget as SVGPathElement
    let clickedState = currentTarget.getAttribute('data-region')
    const clickedDataState: DataStates
      = dataStates.find((dataState: DataStates) => dataState['States'].trim() === clickedState) !
    let data: PieChartApprData[] = []
    Object.keys(colorsMapPrograms).forEach((key: string) => {
      data.push({
        title: key,
        value: Number.parseInt(clickedDataState[key].replaceAll(" ", "")),
        color: colorsMapPrograms[key]
      })
    })
    dispatch(changeClickedState({
      clickedState: activeState === clickedState ? undefined : clickedState !,
      data: activeState === clickedState ? null : data
    }))
    changeActiveState(activeState === clickedState ? null : clickedState)
    dispatch(fixInfoBox(activeState !== clickedState))
    if (activeState === clickedState) {
      dispatch(removeCurrentGrant())
    }
  }

  let isShow: boolean =
    useSelector((state: RootState) => state.infoBox.isShow)
  let infoBox: InfoBoxModel | null =
    useSelector((state: RootState) => state.infoBox.infoBox)
  return (
    <div style={{position: "relative"}}>
      <div className='map-wrap'
           ref={mapRef}
           onMouseMove={mouseMoveHandler}
      >
        <svg viewBox="0 0 1920 1418" xmlns='http://www.w3.org/2000/svg'
        >
          <defs>
            <filter
              id="prefix__a"
              x={599.146}
              y={687.384}
              width={196.134}
              height={206.79}
              filterUnits="userSpaceOnUse"
            >
              <feOffset dy={3}/>
              <feGaussianBlur stdDeviation={3} result="blur"/>
              <feFlood floodOpacity={0.184}/>
              <feComposite operator="in" in2="blur"/>
              <feComposite in="SourceGraphic"/>
            </filter>
            <filter
              id="prefix__b"
              x={668.125}
              y={715.464}
              width={387.878}
              height={364.53}
              filterUnits="userSpaceOnUse"
            >
              <feOffset dy={3}/>
              <feGaussianBlur stdDeviation={3} result="blur-2"/>
              <feFlood floodOpacity={0.161}/>
              <feComposite operator="in" in2="blur-2"/>
              <feComposite in="SourceGraphic"/>
            </filter>
          </defs>
          <path fill="#fff" d="M0 0h1920v1418H0z"/>
          <g className='map-states' data-name="us (1)">
            {
              statesCoordinatesSvg.map((statesCoordinatesSvg: StateCoordinatesSvg, index: number) => {
                return <path
                  data-region={statesCoordinatesSvg.state}
                  d={statesCoordinatesSvg.coordinates}
                  fill={activeState !== statesCoordinatesSvg.state ? "#0f243a" : "#5d97d5"}
                  stroke="#fff"
                  strokeLinejoin="round"
                  strokeWidth={0.971}
                  fillRule="evenodd"
                  onMouseOver={hoverHandler}
                  onMouseLeave={leaveHandler}
                  onClick={clickHandler}
                  id={statesCoordinatesSvg.state}
                  key={index}
                >
                </path>
              })
            }
          </g>
          <path
            data-name="Line 15"
            fill="none"
            stroke="#0f243a"
            d="M1443.163 562.202l191.337.478"
          />
          <path
            data-name="Line 17"
            fill="none"
            stroke="#0f243a"
            d="M1519.663 360.202H1595"
          />
          <path
            data-name="Line 18"
            fill="none"
            stroke="#0f243a"
            d="M1545.163 407.202h75.337"
          />
          <path
            data-name="Line 21"
            fill="none"
            stroke="#0f243a"
            d="M1483.163 508.202H1595.5"
          />
          <path
            data-name="Line 22"
            fill="none"
            stroke="#0f243a"
            d="M1479.163 548.202h75.337"
          />
          <path
            data-name="Line 24"
            fill="none"
            stroke="#0f243a"
            d="M613 1104.202h75.337"
          />
          <path
            data-name="Line 23"
            fill="none"
            stroke="#0f243a"
            d="M1483.163 576.202h56.337"
          />
          <path
            data-name="Line 19"
            fill="none"
            stroke="#0f243a"
            d="M1545.163 433.202h75.337"
          />
          <path
            data-name="Line 20"
            fill="none"
            stroke="#0f243a"
            d="M1503.663 450.202l75.837 11.478"
          />
          <path
            data-name="Line 16"
            fill="none"
            stroke="#0f243a"
            d="M1483 355.203l-25.5-59.522"
          />
          <g
            data-name="Ellipse 37"
            transform="translate(1634 545.357)"
            fill="#f5d617"
            stroke="#0f243a"
          >
            <ellipse cx={17} cy={17.5} rx={17} ry={17.5} stroke="none"/>
            <ellipse cx={17} cy={17.5} rx={16.5} ry={17} fill="none"/>
          </g>
          <text
            data-region='Washington'
            transform="translate(404 322.357)"
            fill="#fff"
            fontSize={31}
            fontFamily="Poppins-Medium, Poppins"
            fontWeight={500}
            onMouseOver={hoverHandler}
            onMouseLeave={leaveHandler}
          >
            <tspan x={0} y={0}>
              {"WA"}
            </tspan>
          </text>
          <text
            transform="translate(349 428.357)"
            fill="#fff"
            fontSize={31}
            fontFamily="Poppins-Medium, Poppins"
            fontWeight={500}
          >
            <tspan x={0} y={0}>
              {"OR"}
            </tspan>
          </text>
          <text
            transform="translate(327 666.357)"
            fill="#fff"
            fontSize={31}
            fontFamily="Poppins-Medium, Poppins"
            fontWeight={500}
          >
            <tspan x={0} y={0}>
              {"CA"}
            </tspan>
          </text>
          <text
            transform="translate(415 596.357)"
            fill="#fff"
            fontSize={31}
            fontFamily="Poppins-Medium, Poppins"
            fontWeight={500}
          >
            <tspan x={0} y={0}>
              {"NV"}
            </tspan>
          </text>
          <text
            transform="translate(519 467.357)"
            fill="#fff"
            fontSize={31}
            fontFamily="Poppins-Medium, Poppins"
            fontWeight={500}
          >
            <tspan x={0} y={0}>
              {"ID"}
            </tspan>
          </text>
          <text
            transform="translate(663 511.357)"
            fill="#fff"
            fontSize={31}
            fontFamily="Poppins-Medium, Poppins"
            fontWeight={500}
          >
            <tspan x={0} y={0}>
              {"WY"}
            </tspan>
          </text>
          <text
            transform="translate(691 644.357)"
            fill="#fff"
            fontSize={31}
            fontFamily="Poppins-Medium, Poppins"
            fontWeight={500}
          >
            <tspan x={0} y={0}>
              {"CO"}
            </tspan>
          </text>
          <text
            transform="translate(553 631.357)"
            fill="#fff"
            fontSize={29}
            fontFamily="Poppins-Medium, Poppins"
            fontWeight={500}
          >
            <tspan x={0} y={0}>
              {"UT"}
            </tspan>
          </text>
          <text
            transform="translate(519 783.357)"
            fill="#fff"
            fontSize={31}
            fontFamily="Poppins-Medium, Poppins"
            fontWeight={500}
          >
            <tspan x={0} y={0}>
              {"AZ"}
            </tspan>
          </text>
          <text
            transform="translate(353 1042.357)"
            fill="#fff"
            fontSize={31}
            fontFamily="Poppins-Medium, Poppins"
            fontWeight={500}
          >
            <tspan x={0} y={0}>
              {"AK"}
            </tspan>
          </text>
          <text
            transform="translate(633 366.357)"
            fill="#fff"
            fontSize={31}
            fontFamily="Poppins-Medium, Poppins"
            fontWeight={500}
          >
            <tspan x={0} y={0}>
              {"MT"}
            </tspan>
          </text>
          <text
            transform="translate(824 366.357)"
            fill="#fff"
            fontSize={31}
            fontFamily="Poppins-Medium, Poppins"
            fontWeight={500}
          >
            <tspan x={0} y={0}>
              {"ND"}
            </tspan>
          </text>
          <text
            transform="translate(966 406.357)"
            fill="#fff"
            fontSize={31}
            fontFamily="Poppins-Medium, Poppins"
            fontWeight={500}
          >
            <tspan x={0} y={0}>
              {"MN"}
            </tspan>
          </text>
          <text
            transform="translate(994 546.357)"
            fill="#fff"
            fontSize={31}
            fontFamily="Poppins-Medium, Poppins"
            fontWeight={500}
          >
            <tspan x={0} y={0}>
              {"IA"}
            </tspan>
          </text>
          <text
            transform="translate(1036 667.357)"
            fill="#fff"
            fontSize={31}
            fontFamily="Poppins-Medium, Poppins"
            fontWeight={500}
          >
            <tspan x={0} y={0}>
              {"MO"}
            </tspan>
          </text>
          <text
            transform="translate(1074 450.357)"
            fill="#fff"
            fontSize={31}
            fontFamily="Poppins-Medium, Poppins"
            fontWeight={500}
          >
            <tspan x={0} y={0}>
              {"WI"}
            </tspan>
          </text>
          <text
            transform="translate(1199 590.357)"
            fill="#fff"
            fontSize={31}
            fontFamily="Poppins-Medium, Poppins"
            fontWeight={500}
          >
            <tspan x={0} y={0}>
              {"IN"}
            </tspan>
          </text>
          <text
            transform="translate(1207 483.357)"
            fill="#fff"
            fontSize={31}
            fontFamily="Poppins-Medium, Poppins"
            fontWeight={500}
          >
            <tspan x={0} y={0}>
              {"MI"}
            </tspan>
          </text>
          <text
            transform="translate(1242 657.357)"
            fill="#fff"
            fontSize={31}
            fontFamily="Poppins-Medium, Poppins"
            fontWeight={500}
          >
            <tspan x={0} y={0}>
              {"KY"}
            </tspan>
          </text>
          <text
            transform="translate(1265 569.357)"
            fill="#fff"
            fontSize={31}
            fontFamily="Poppins-Medium, Poppins"
            fontWeight={500}
          >
            <tspan x={0} y={0}>
              {"OH"}
            </tspan>
          </text>
          <text
            transform="translate(1382 515.357)"
            fill="#fff"
            fontSize={31}
            fontFamily="Poppins-Medium, Poppins"
            fontWeight={500}
          >
            <tspan x={0} y={0}>
              {"PA"}
            </tspan>
          </text>
          <text
            transform="translate(1323 622.357)"
            fill="#fff"
            fontSize={28}
            fontFamily="Poppins-Medium, Poppins"
            fontWeight={500}
          >
            <tspan x={0} y={0}>
              {"WV"}
            </tspan>
          </text>
          <text
            transform="translate(1113 595.357)"
            fill="#fff"
            fontSize={31}
            fontFamily="Poppins-Medium, Poppins"
            fontWeight={500}
          >
            <tspan x={0} y={0}>
              {"IL"}
            </tspan>
          </text>
          <text
            transform="translate(827 475.357)"
            fill="#fff"
            fontSize={31}
            fontFamily="Poppins-Medium, Poppins"
            fontWeight={500}
          >
            <tspan x={0} y={0}>
              {"SD"}
            </tspan>
          </text>
          <text
            transform="translate(847 568.357)"
            fill="#fff"
            fontSize={31}
            fontFamily="Poppins-Medium, Poppins"
            fontWeight={500}
          >
            <tspan x={0} y={0}>
              {"NE"}
            </tspan>
          </text>
          <text
            transform="translate(871 666.357)"
            fill="#fff"
            fontSize={31}
            fontFamily="Poppins-Medium, Poppins"
            fontWeight={500}
          >
            <tspan x={0} y={0}>
              {"KS"}
            </tspan>
          </text>
          <text
            transform="translate(926 766.357)"
            fill="#fff"
            fontSize={31}
            fontFamily="Poppins-Medium, Poppins"
            fontWeight={500}
          >
            <tspan x={0} y={0}>
              {"OK"}
            </tspan>
          </text>
          <text
            transform="translate(863 899.357)"
            fill="#fff"
            fontSize={29}
            fontFamily="Poppins-Medium, Poppins"
            fontWeight={500}
          >
            <tspan x={0} y={0}>
              {"TX"}
            </tspan>
          </text>
          <text
            transform="translate(1049 881.357)"
            fill="#fff"
            fontSize={31}
            fontFamily="Poppins-Medium, Poppins"
            fontWeight={500}
          >
            <tspan x={0} y={0}>
              {"LA"}
            </tspan>
          </text>
          <text
            transform="translate(1125 829.357)"
            fill="#fff"
            fontSize={31}
            fontFamily="Poppins-Medium, Poppins"
            fontWeight={500}
          >
            <tspan x={0} y={0}>
              {"MS"}
            </tspan>
          </text>
          <text
            transform="translate(1202 829.357)"
            fill="#fff"
            fontSize={31}
            fontFamily="Poppins-Medium, Poppins"
            fontWeight={500}
          >
            <tspan x={0} y={0}>
              {"AL"}
            </tspan>
          </text>
          <text
            transform="translate(1293 829.357)"
            fill="#fff"
            fontSize={31}
            fontFamily="Poppins-Medium, Poppins"
            fontWeight={500}
          >
            <tspan x={0} y={0}>
              {"GA"}
            </tspan>
          </text>
          <text
            transform="translate(1384 952.357)"
            fill="#fff"
            fontSize={31}
            fontFamily="Poppins-Medium, Poppins"
            fontWeight={500}
          >
            <tspan x={0} y={0}>
              {"FL"}
            </tspan>
          </text>
          <text
            transform="translate(1363 760.357)"
            fill="#fff"
            fontSize={31}
            fontFamily="Poppins-Medium, Poppins"
            fontWeight={500}
          >
            <tspan x={0} y={0}>
              {"SC"}
            </tspan>
          </text>
          <text
            transform="translate(1410 689.357)"
            fill="#fff"
            fontSize={31}
            fontFamily="Poppins-Medium, Poppins"
            fontWeight={500}
          >
            <tspan x={0} y={0}>
              {"NC"}
            </tspan>
          </text>
          <text
            transform="translate(1395 626.357)"
            fill="#fff"
            fontSize={31}
            fontFamily="Poppins-Medium, Poppins"
            fontWeight={500}
          >
            <tspan x={0} y={0}>
              {"VA"}
            </tspan>
          </text>
          <text
            transform="translate(1433 431.357)"
            fill="#fff"
            fontSize={31}
            fontFamily="Poppins-Medium, Poppins"
            fontWeight={500}
          >
            <tspan x={0} y={0}>
              {"NY"}
            </tspan>
          </text>
          <text
            transform="translate(1533 306.357)"
            fill="#fff"
            fontSize={31}
            fontFamily="Poppins-Medium, Poppins"
            fontWeight={500}
          >
            <tspan x={0} y={0}>
              {"ME"}
            </tspan>
          </text>
          <text
            transform="translate(1419 295.357)"
            fill="#045281"
            fontSize={31}
            fontFamily="Poppins-Medium, Poppins"
            fontWeight={500}
          >
            <tspan x={0} y={0}>
              {"VT"}
            </tspan>
          </text>
          <text
            transform="translate(1603 371.357)"
            fill="#045281"
            fontSize={31}
            fontFamily="Poppins-Medium, Poppins"
            fontWeight={500}
          >
            <tspan x={0} y={0}>
              {"NH"}
            </tspan>
          </text>
          <text
            transform="translate(1627 415.357)"
            fill="#045281"
            fontSize={31}
            fontFamily="Poppins-Medium, Poppins"
            fontWeight={500}
          >
            <tspan x={0} y={0}>
              {"MA"}
            </tspan>
          </text>
          <text
            transform="translate(1625 453.357)"
            fill="#045281"
            fontSize={31}
            fontFamily="Poppins-Medium, Poppins"
            fontWeight={500}
          >
            <tspan x={0} y={0}>
              {"RI"}
            </tspan>
          </text>
          <text
            transform="translate(1583 483.357)"
            fill="#045281"
            fontSize={31}
            fontFamily="Poppins-Medium, Poppins"
            fontWeight={500}
          >
            <tspan x={0} y={0}>
              {"CT"}
            </tspan>
          </text>
          <text
            transform="translate(1603 520.357)"
            fill="#045281"
            fontSize={31}
            fontFamily="Poppins-Medium, Poppins"
            fontWeight={500}
          >
            <tspan x={0} y={0}>
              {"NJ"}
            </tspan>
          </text>
          <text
            transform="translate(1557 555.357)"
            fill="#045281"
            fontSize={31}
            fontFamily="Poppins-Medium, Poppins"
            fontWeight={500}
          >
            <tspan x={0} y={0}>
              {"DE"}
            </tspan>
          </text>
          <text
            transform="translate(1675 575.357)"
            fill="#045281"
            fontSize={31}
            fontFamily="Poppins-Medium, Poppins"
            fontWeight={500}
          >
            <tspan x={0} y={0}>
              {"DC"}
            </tspan>
          </text>
          <text
            transform="translate(1541 596.357)"
            fill="#045281"
            fontSize={31}
            fontFamily="Poppins-Medium, Poppins"
            fontWeight={500}
          >
            <tspan x={0} y={0}>
              {"MD"}
            </tspan>
          </text>
          <text
            transform="translate(1215 722.357)"
            fill="#fff"
            fontSize={31}
            fontFamily="Poppins-Medium, Poppins"
            fontWeight={500}
          >
            <tspan x={0} y={0}>
              {"TN"}
            </tspan>
          </text>
          <text
            transform="translate(1043 766.357)"
            fill="#fff"
            fontSize={31}
            fontFamily="Poppins-Medium, Poppins"
            fontWeight={500}
          >
            <tspan x={0} y={0}>
              {"AR"}
            </tspan>
          </text>
          <text
            transform="translate(676 789.357)"
            fill="#fff"
            fontSize={31}
            fontFamily="Poppins-Medium, Poppins"
            fontWeight={500}
          >
            <tspan x={0} y={0}>
              {"NM"}
            </tspan>
          </text>
          <text
            transform="translate(578 1115.357)"
            fill="#0f243a"
            fontSize={31}
            fontFamily="Poppins-Medium, Poppins"
            fontWeight={500}
          >
            <tspan x={0} y={0}>
              {"HI"}
            </tspan>
          </text>
          <g data-name="Rectangle 94" fill="none" stroke="#707070">
            <path stroke="none" d="M215 943.181h323v246H215z"/>
            <path d="M215.5 943.681h322v245h-322z"/>
          </g>
          <g data-name="Rectangle 95" fill="none" stroke="#707070">
            <path stroke="none" d="M553 995.181h198v194H553z"/>
            <path d="M553.5 995.681h197v193h-197z"/>
          </g>

        </svg>
      </div>
      <InfoBox isShow={isShow}
               infoBox={infoBox}
               top={clientCoordinates.top}
               left={clientCoordinates.left}
      />
    </div>
  )
}
