
export const VISITS_DB_KEY = 'visits'

export interface Visit {
    id?: number
    date: string
    hour: string
    reason: string
    animalId: number
}

export interface Visits {
    id: number
    visits: Visit[]
}