import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import * as React from 'react'
import { useEffect, useState } from 'react'
import AppSelect from '../Select'
import Stack from '@mui/material/Stack'
import InputAdornment from '@mui/material/InputAdornment'
import Typography from '@mui/material/Typography'
import { useRouter, useSearchParams } from 'next/navigation'
import { Animal } from '@/models/Animals'
import { createAnimal, getAnimal, updateAnimal } from '@/services/animal'

export default function EditAnimalForm() {

    const [name, setName] = useState('')
    const [weight, setWeight] = useState(0)
    const [type, setType] = useState('')
    const router = useRouter()
    const searchParams = useSearchParams()
    const id = searchParams.get('id')

    const getAnimalList = async () => {
        try {
            const animal = await getAnimal(Number(id))
            setName(animal?.name)
            setWeight(animal?.weight)
            setType(animal?.type)
        } catch {
            console.log('Error al asignar información')
        }
    }

    useEffect(() => {
        getAnimalList()
    }, [])

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        try {
            const data: Animal = {
                id: Number(id),
                name: name,
                weight: weight,
                type: type
            }

            updateAnimal(data)
            router.push('/animals')
            console.log('Se edito animal c:')
        } catch {
            console.log('Hubo un error :c')
        }

    }

    return (
        <Box component="form" onSubmit={handleSubmit}>
            <Stack spacing={2}>
                <Typography variant='h6' fontWeight={400} textAlign='left'>
                    Editar Animal
                </Typography>
                <TextField
                    label="Nombre"
                    variant="outlined"
                    value={name}
                    onChange={(e) => setName(e.currentTarget.value)}
                />
                <TextField
                    label="Peso"
                    type="number"
                    variant="outlined"
                    value={weight}
                    onChange={(e) => setWeight(Number(e.currentTarget.value))}
                    InputProps={{
                        endAdornment: <InputAdornment position="end">kg</InputAdornment>,
                    }}
                />
                <AppSelect
                    value={type}
                    setValue={setType}
                    menuItems={['Gato', 'Perro', 'Mapache', 'Dinosaurio', 'Otro',]}
                    label={'Tipo de animal'}
                />
                <Stack direction='row' spacing={3}>
                    <Button variant="text" type='button' fullWidth onClick={() => router.push('/animals')}>Cancel</Button>
                    <Button variant="text" type='submit' fullWidth>Editar</Button>
                </Stack>

            </Stack>
        </Box>
    )
}