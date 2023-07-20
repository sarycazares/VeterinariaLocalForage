import localForage from 'localforage'

const db = localForage.createInstance({
    name: 'VeterinariaDB',
})

export async function createItem(key: string, data: any): Promise<void> {
    try {
        await db.setItem(key, data)
    } catch {
        throw Error('Error al crear item')
    }

}

export async function readItem(key: string): Promise<any> {
    try {
        const data = await db.getItem(key)
        return data
    } catch {
        throw Error('Error al leer item')
    }

}

export async function updateItem(key: string, newData: any): Promise<void> {
    try {
        const existingData = await readItem(key)
        if (existingData) {
            const updatedData = { ...existingData, ...newData }
            await db.setItem(key, updatedData)
        } else {
            throw new Error('Error el elemento no existe')
        }
    } catch {
        throw new Error('Error al modificar item')
    }

}

export async function deleteItem(key: string): Promise<void> {
    try {
        await db.removeItem(key)
    } catch {
        throw new Error('Error al eliminar item')
    }
}

export async function isExistItem(key: string): Promise<boolean> {
    try {
        const isExist = await db.getItem(key)
        return isExist ? true : false
    } catch {
        throw new Error('Error al verificar item')
    }

}