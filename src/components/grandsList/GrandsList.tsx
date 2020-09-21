import React from "react"
import * as d3 from 'd3-dsv'
import {DSVRowString} from 'd3-dsv'
import {useDispatch, useSelector} from "react-redux";
import {RootClickedStateState} from "../../store/types/clickedState/types";
import {changeCurrentGrant} from "../../store/actions/currentGrantActions";
import {RootState} from "../../store/reducers/rootReducer";
import {DATA_PATH} from "../../types";
import {Filter} from "../../store/types/filter/types";
import {GrantsListItem} from "../grantsListItem/GrantsListItem";

const compareFilters = (inputObjFilter: Filter, filterState: Filter): boolean => {
  if (inputObjFilter.Additional && filterState["Fields of study"]) {
    return inputObjFilter.Sex?.includes(filterState.Sex as string)!
      && inputObjFilter.Additional.includes(filterState.Additional!)
      && inputObjFilter['Fields of study']!.includes(filterState["Fields of study"]!)
  } else if (inputObjFilter.Additional) {
    return inputObjFilter.Sex?.includes(filterState.Sex as string)!
      && inputObjFilter.Additional.includes(filterState.Additional!)
  } else if (inputObjFilter['Fields of study']) {
    return inputObjFilter.Sex?.includes(filterState.Sex as string)!
      && inputObjFilter['Fields of study'].includes(filterState["Fields of study"]!)
  } else return inputObjFilter.Sex?.includes(filterState.Sex as string)!
}

type InputObjFilter = {
  [key: string]: string | undefined
}

const useAsyncHook = (currentClickedState: string | undefined) => {
  const [result, setResult] = React.useState<null | DSVRowString[]>(null)
  const [, setLoading] = React.useState<boolean | null>(false)
  const [nationwideResult, setNationwideResult] = React.useState<null | DSVRowString[]>(null)

  React.useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const response = await fetch(process.env.PUBLIC_URL + DATA_PATH)
        const data = await response.text();

        setResult(
          d3.dsvFormat(';').parse(data)
            .filter(value => {
              return value['State']?.trim() === currentClickedState?.trim()
            })
        )
        setNationwideResult(
          d3.dsvFormat(';').parse(data)
            .filter(value => {
              return value['State']?.trim() === 'Nationwide'
            })
        )
      } catch (error) {
        setLoading(null);
      }
    }

    if (currentClickedState !== undefined) {
      fetchData()
    } else {
      setResult(null)
    }
  }, [currentClickedState]);

  return [result, nationwideResult];
}

export function GrandsList() {
  const [activeButton, setActiveButton] = React.useState<number | null>(null)
  const dispatch = useDispatch()
  const listItemClickHandler = (
    value: DSVRowString,
    activeIndex: number
  ) => {
    dispatch(changeCurrentGrant({
      title: value['Title']!,
      reward: value['Reward']!,
      description: value['Description']!,
      link: value['Link']
    }))
    setActiveButton(activeIndex)
  }
  let currentClickedState: string | undefined =
    useSelector((state: RootClickedStateState) =>
      state.clickedState.clickedState)
  const [result, nationwideResult] = useAsyncHook(currentClickedState)
  const filterState = useSelector((state: RootState) =>
    state.filter
  )
  let filteredResult: DSVRowString[] = []
  if (result) {
    filteredResult = (result as DSVRowString[]).filter((value => {
      const inputObjFilter: InputObjFilter = {}
      Object.entries(filterState)
        .filter(([_, val]) => val !== undefined)
        .forEach(([key]) => {
          inputObjFilter[key] = value[key]?.trim()
        })
      return compareFilters(inputObjFilter, filterState)
    }))
  }
  let filteredNationwideResult: DSVRowString[] = []
  if(nationwideResult) {
    filteredNationwideResult = (nationwideResult as DSVRowString[]).filter(value => {
      const inputObjFilter: InputObjFilter = {}
      Object.entries(filterState)
        .filter(([_, val]) => val !== undefined)
        .forEach(([key]) => {
          inputObjFilter[key] = value[key]?.trim()
        })
      return compareFilters(inputObjFilter, filterState)
    })
  }
  return (result && nationwideResult ? <div className='grands-list-wrap'>
    <p>Grants list</p>
    <div className='grands-list'
         style={{overflowY: filteredResult.length || filteredNationwideResult.length ? "scroll" : "visible"}}>
    <ul>
      {filteredResult.length ? <li className='title'>Grants per state</li> : null}
      {
        filteredResult.length ? filteredResult.map((value, index) => {
          return <li key={index}>
            <GrantsListItem value={value} index={index} activeButton={activeButton}
                            listItemClickHandler={listItemClickHandler}/>
          </li>
        }) : null
      }
      {filteredNationwideResult.length ? <li className='title'>Nationwide grants</li> : null}
      {
        filteredNationwideResult.length ? filteredNationwideResult.map((value, index) => {
          return <li key={filteredNationwideResult.length + index}>
            <GrantsListItem value={value} index={index} activeButton={activeButton}
                            listItemClickHandler={listItemClickHandler}/>
          </li>
        }) : null
      }
      {(!filteredResult.length && !filteredNationwideResult.length) ? <li className='empty'>No grants found</li> : null }
    </ul>
  </div></div> : null);
}