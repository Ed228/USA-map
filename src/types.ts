export type ProgramsPerState = "Grants for the disadvan-taged" |
  "Block grants to states for school improve-ment" | "School assistance in federally affected areas" |
  "Career/technical and adult education" | "Special education" |
  "English language acquisition" | "American Indian education" |
  "Student financial assistance" | "Rehabilitation services"

export type DataStatesKeys = "States" | "Student community" | "Total appropriations" | ProgramsPerState

export type DataStates = {
  [key in DataStatesKeys | string]: string
}
export type StudentsInfoBox = {
  "States": string
  "Student community" : string
  "Total appropriations" : string
}

export type StateCoordinatesSvg = {
  "state": string,
  "coordinates": string
}

export const colorsMapPrograms: {[program: string] : string} = {
  "Grants for the disadvan-taged": '#990033',
  "Block grants to states for school improve-ment": '#003300',
  "School assistance in federally affected areas": '#cc9900',
  "Career/technical and adult education": '#0033cc',
  "Special education": '#6600cc',
  "English language acquisition": '#ffff00',
  "American Indian education": '#666699',
  "Student financial assistance": '#669999',
  "Rehabilitation services": '#996633'
}

export type PieChartApprData = {
  title: string,
  value: number,
  color: string
}

export interface InfoBoxModel {
  state: string
  studentCommunity: string
  totalAppropriations: string
  numberOfScholarships?: number
}

export function capitalizeFirstLetter(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1)
}

export function roundNumberBillion(number: number) {
  return (number/1_000_000).toFixed(2)
}

export const DATA_PATH = 'data/grands_data_3.csv'