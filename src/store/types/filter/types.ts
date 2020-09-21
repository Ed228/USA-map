export type Genders = "Male" | "Female"

export interface Filter {
  "Sex"?: Genders,
  "Fields of study"?: string | null,
  "Additional"?: string | null
}

export const CHANGE_FILTER = 'CHANGE_FILTER'

interface ChangeFilter {
  type: typeof CHANGE_FILTER,
  payload: Filter
}

export type FilterActions = ChangeFilter