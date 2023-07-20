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
import { createAnimal, deleteAnimal, getAnimal, updateAnimal } from '@/services/animal'

export default function DeleteAnimalForm() {

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
            deleteAnimal(Number(id))
            router.push('/animals')
            console.log('Se elimino animal c:')
        } catch {
            console.log('Hubo un error :c')
        }

    }

    return (
        <Box component="form" onSubmit={handleSubmit}>
            <Stack spacing={2}>
                <Typography variant='h6' fontWeight={400} textAlign='left'>
                    Eliminar Animal
                </Typography>

                <Typography variant='subtitle1' fontWeight={400} textAlign='center'>
                    {name}
                </Typography>
                <Typography variant='subtitle1' fontWeight={400} textAlign='center'>
                    {weight}
                </Typography>
                <Typography variant='subtitle1' fontWeight={400} textAlign='center'>
                    {type}
                </Typography>

                <Stack direction='row' spacing={3}>
                    <Button variant="text" type='button' fullWidth onClick={() => router.push('/animals')}>Cancel</Button>
                    <Button variant="text" type='submit' fullWidth>Eliminar</Button>
                </Stack>

            </Stack>
        </Box>
    )
}