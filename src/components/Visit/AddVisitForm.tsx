import { Visit } from '@/models/Visits'
import { getAnimal } from '@/services/animal'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { useRouter, useSearchParams } from 'next/navigation'
import * as React from 'react'
import { useEffect, useState } from 'react'
import AppSelect from '../Select'
import { createvisit } from '@/services/visit'

export default function AddVisitForm() {

    const [date, setDate] = useState('')
    const [hour, setHour] = useState('')
    const [reason, setReason] = useState('')
    const [animal, setAnimal] = useState('')
    const router = useRouter()
    const searchParams = useSearchParams()
    const id = searchParams.get('id')

    const getAnimalList = async () => {
        try {
            const animal = await getAnimal(Number(id))
            setAnimal(animal?.name)
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
            const data: Visit = {
                animalId: Number(id),
                date: date,
                hour: hour,
                reason: reason
            }

            createvisit(data)
            router.push(`/animals/${id}/visits`)
            console.log('Se agregó visita c:')
        } catch {
            console.log('Hubo un error :c')
        }

    }

    return (
        <Box component="form" onSubmit={handleSubmit}>
            <Stack spacing={2}>
                <Typography variant='h6' fontWeight={400} textAlign='left'>
                    Agregar Visita
                </Typography>
                <Typography variant='subtitle1' fontWeight={400} textAlign='center'>
                    {animal}
                </Typography>
                <TextField
                    label="Día"
                    variant="outlined"
                    onChange={(e) => setDate(e.currentTarget.value)}
                />
                <TextField
                    label="Hora"
                    variant="outlined"
                    onChange={(e) => setHour(e.currentTarget.value)}
                />
                <AppSelect
                    value={reason}
                    setValue={setReason}
                    menuItems={['Enfermedad', 'Visita de rutina', 'Baño', 'Murió', 'Otro',]}
                    label={'Tipo de visita'}
                />
                <Stack direction='row' spacing={3}>
                    <Button variant="text" type='button' fullWidth onClick={() => router.push(`/animals/${id}/visits`)}>Cancel</Button>
                    <Button variant="text" type='submit' fullWidth>Agregar</Button>
                </Stack>

            </Stack>
        </Box>
    )
}