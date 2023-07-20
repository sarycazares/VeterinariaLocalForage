export const ANIMALS_DB_KEY = 'animals'

export interface Animal {
    id?: number
    name: string
    weight: number
    type: string
}

export interface Animals {
    id: number
    animals: Animal[]
}