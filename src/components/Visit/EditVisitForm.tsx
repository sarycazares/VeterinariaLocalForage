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
import { getvisit, updatevisit } from '@/services/visit'
import { Visit } from '@/models/Visits'

export default function EditVisitForm() {

    const [date, setDate] = useState('')
    const [hour, setHour] = useState('')
    const [reason, setReason] = useState('')
    const [animal, setAnimal] = useState('')
    const router = useRouter()
    const searchParams = useSearchParams()
    const id = searchParams.get('id')

    const getVisitList = async () => {
        try {
            const visit = await getvisit(Number(id))
            setDate(visit.date)
            setHour(visit.hour)
            setReason(visit.reason)

            const animalInfo = await getAnimal(Number(id))
            setAnimal(animalInfo.name)
        } catch {
            console.log('Error al asignar información')
        }
    }

    useEffect(() => {
        getVisitList()
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

            updatevisit(data)
            router.push(`/animals/${id}/visits`)
            console.log('Se edito visita c:')
        } catch {
            console.log('Hubo un error :c')
        }

    }

    return (
        <Box component="form" onSubmit={handleSubmit}>
            <Stack spacing={2}>
                <Typography variant='h6' fontWeight={400} textAlign='left'>
                    Editar Visita
                </Typography>
                <Typography variant='subtitle1' fontWeight={400} textAlign='center'>
                    {animal}
                </Typography>
                <TextField
                    label="Día"
                    variant="outlined"
                    value={date}
                    onChange={(e) => setDate(e.currentTarget.value)}
                />
                <TextField
                    label="Hora"
                    variant="outlined"
                    value={hour}
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
                    <Button variant="text" type='submit' fullWidth>Editar</Button>
                </Stack>

            </Stack>
        </Box>
    )
}

