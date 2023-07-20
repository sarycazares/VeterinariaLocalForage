
import { VISITS_DB_KEY, Visit, Visits } from '@/models/Visits'
import { createItem, isExistItem, readItem } from './localForage'


export const createvisit = async (data: Visit) => {
    try {
        let visitsArray: Visits = {
            id: 1,
            visits: []
        }
        const isExistvisit = await isExistItem(VISITS_DB_KEY)
        if (isExistvisit) {
            visitsArray = JSON.parse(await readItem(VISITS_DB_KEY))
            visitsArray.id = visitsArray.id + 1
        }

        data.id = visitsArray.id
        visitsArray.visits.push(data)
        createItem(VISITS_DB_KEY, JSON.stringify(visitsArray))

    } catch (error: any) {
        throw new Error(error.message)
    }
}

export const getvisits = async () => {
    try {
        const visits: Visits = JSON.parse(await readItem(VISITS_DB_KEY))
        console.log(visits)
        return visits.visits

    } catch (error: any) {
        throw new Error(error.message)
    }
}

export const getvisit = async (id: number) => {
    try {
        const visits: Visits = JSON.parse(await readItem(VISITS_DB_KEY))
        const visit = visits.visits.find((visit) => visit.id === id)

        if (!visit) {
            throw new Error('visit no encontrado')
        }

        return visit
    } catch (error: any) {
        throw new Error(error.message)
    }
}

export const updatevisit = async (data: Visit) => {
    try {
        let visitsArray: Visits = {
            id: 1,
            visits: []
        }

        const isExistvisit = await isExistItem(VISITS_DB_KEY)
        if (isExistvisit) {
            visitsArray = JSON.parse(await readItem(VISITS_DB_KEY))
        }

        const existingvisitIndex = visitsArray.visits.findIndex(
            (visit) => visit.id === data.id
        )

        if (existingvisitIndex === -1) {
            throw new Error('El id no fue encontrado')
        }

        visitsArray.visits[existingvisitIndex] = data
        createItem(VISITS_DB_KEY, JSON.stringify(visitsArray))
    } catch (error: any) {
        throw new Error(error.message)
    }
}

export const deletevisit = async (id: number) => {
    try {
        const visitsArray: Visits = JSON.parse(await readItem(VISITS_DB_KEY))

        const existingvisitIndex = visitsArray.visits.findIndex(
            (visit) => visit.id === id
        )

        if (existingvisitIndex === -1) {
            throw new Error('El id no fue encontrado')
        }

        visitsArray.visits.splice(existingvisitIndex, 1)
        createItem(VISITS_DB_KEY, JSON.stringify(visitsArray))
    } catch (error: any) {
        throw new Error(error.message)
    }
}