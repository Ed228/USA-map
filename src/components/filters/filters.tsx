import React, {SyntheticEvent, useEffect, useState} from 'react'
import * as d3 from 'd3-dsv'
import {Genders} from "../../store/types/filter/types";
import {useDispatch} from "react-redux";
import {changeFilter} from "../../store/actions/filterActions";
import {capitalizeFirstLetter, DATA_PATH} from "../../types";

type Data = {
  additional: (string | undefined)[] | null
  fieldsStudy: (string | undefined)[] | null
}

export function Filters() {
  const dispatch = useDispatch()
  const setRadioUnchecked = (e: SyntheticEvent) => {
    if (e.target instanceof HTMLInputElement) {
      let inputRadio = e.target as HTMLInputElement
      setSex(inputRadio.value as Genders)
      dispatch(changeFilter({"Sex": inputRadio.value as Genders}))
    }
  }

  const setFieldsStudyFilter = (e: SyntheticEvent) => {
    let select = e.currentTarget as HTMLInputElement
    select.value === 'All' ? dispatch(changeFilter({
        "Fields of study": undefined
      })) :
      dispatch(changeFilter({
        "Fields of study": select.value
      }))
  }

  const setAdditionalFilter = (e: SyntheticEvent) => {
    let select = e.currentTarget as HTMLInputElement
    select.value === 'All' ? dispatch(changeFilter({
        "Additional": undefined
      })) :
      dispatch(changeFilter({
        "Additional": select.value
      }))
  }
  const [, setSex] = useState<Genders>('Male')
  const [data, setData] = useState<Data | null>(null)
  useEffect(() => {
    (async function fetchData() {
      const response = await fetch(process.env.PUBLIC_URL + DATA_PATH)
      const data = await response.text()
      const additionalSet = new Set(d3.dsvFormat(';').parse(data)
        .filter(value => value['Additional'] !== "")
        .map(value => {
          console.log(value)
          return capitalizeFirstLetter(value['Additional']?.trim() as string)
        }))
      const fieldsStudySet: Set<string | undefined> = new Set()
      Array.from(d3.dsvFormat(';').parse(data)
        .filter(value => value['Fields of study']?.trim() !== "")
        .map(value => value['Fields of study']?.trim()
        )).forEach(val => {
        if (val?.split(',').length) {
          val?.split(',')
            .forEach(e => fieldsStudySet.add(capitalizeFirstLetter(e.trim())))
        } else if (val) fieldsStudySet.add(capitalizeFirstLetter(val.trim()))
      })
      setData({
        additional: Array.from(additionalSet.values()),
        fieldsStudy: Array.from(fieldsStudySet.values())
      })
    })()
  }, [])
  return (<div className='filter'>
    <div className="filter-sex">
      <p>Sex:</p>
      <fieldset id='sex' onClick={setRadioUnchecked}>
        <span>Male</span>
        <input type="radio" value='Male' defaultChecked={true} name="sex"/>
        <span>Female</span>
        <input type="radio" value='Female' name="sex"/>
      </fieldset>
    </div>
    <div className="field-of-study">
      <p>Field of study:</p>
      <select name='field-of-study' onChange={setFieldsStudyFilter}>
        <option value="All">All</option>
        {data?.fieldsStudy?.map((f, index) =>
          <option value={f} key={index}>{f}</option>)}
      </select>
    </div>
    <div className="additional">
      <p>Additional:</p>
      <select name="additional" onChange={setAdditionalFilter}>
        <option value="All">All</option>
        {data?.additional?.map((a, index) =>
          <option value={a} key={index}>{a}</option>)}
      </select>
    </div>
  </div>)
}