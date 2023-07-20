import { ANIMALS_DB_KEY, Animal, Animals } from '@/models/Animals'
import { createItem, isExistItem, readItem } from './localForage'


export const createAnimal = async (data: Animal) => {
    try {
        let animalsArray: Animals = {
            id: 1,
            animals: []
        }
        const isExistAnimal = await isExistItem(ANIMALS_DB_KEY)
        if (isExistAnimal) {
            animalsArray = JSON.parse(await readItem(ANIMALS_DB_KEY))
            animalsArray.id = animalsArray.id + 1
        }

        data.id = animalsArray.id
        animalsArray.animals.push(data)
        createItem(ANIMALS_DB_KEY, JSON.stringify(animalsArray))

    } catch (error: any) {
        throw new Error(error.message)
    }
}

export const getAnimals = async () => {
    try {
        const animals: Animals = JSON.parse(await readItem(ANIMALS_DB_KEY))
        console.log(animals)
        return animals.animals

    } catch (error: any) {
        throw new Error(error.message)
    }
}

export const getAnimal = async (id: number) => {
    try {
        const animals: Animals = JSON.parse(await readItem(ANIMALS_DB_KEY))
        const animal = animals.animals.find((animal) => animal.id === id)

        if (!animal) {
            throw new Error('Animal no encontrado')
        }

        return animal
    } catch (error: any) {
        throw new Error(error.message)
    }
}

export const updateAnimal = async (data: Animal) => {
    try {
        let animalsArray: Animals = {
            id: 1,
            animals: []
        }

        const isExistAnimal = await isExistItem(ANIMALS_DB_KEY)
        if (isExistAnimal) {
            animalsArray = JSON.parse(await readItem(ANIMALS_DB_KEY))
        }

        const existingAnimalIndex = animalsArray.animals.findIndex(
            (animal) => animal.id === data.id
        )

        if (existingAnimalIndex === -1) {
            throw new Error('El id no fue encontrado')
        }

        animalsArray.animals[existingAnimalIndex] = data
        createItem(ANIMALS_DB_KEY, JSON.stringify(animalsArray))
    } catch (error: any) {
        throw new Error(error.message)
    }
}

export const deleteAnimal = async (id: number) => {
    try {
        const animalsArray: Animals = JSON.parse(await readItem(ANIMALS_DB_KEY))

        const existingAnimalIndex = animalsArray.animals.findIndex(
            (animal) => animal.id === id
        )

        if (existingAnimalIndex === -1) {
            throw new Error('El id no fue encontrado')
        }

        animalsArray.animals.splice(existingAnimalIndex, 1)
        createItem(ANIMALS_DB_KEY, JSON.stringify(animalsArray))
    } catch (error: any) {
        throw new Error(error.message)
    }
}