import { deleteAnimal, getAnimal } from '@/services/animal'
import { deletevisit, getvisit } from '@/services/visit'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { useRouter, useSearchParams } from 'next/navigation'
import * as React from 'react'
import { useEffect, useState } from 'react'

export default function DeleteVisitForm() {

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
            deletevisit(Number(id))
            router.push(`/animals/${id}/visits`)
            console.log('Se elimino visita c:')
        } catch {
            console.log('Hubo un error :c')
        }

    }

    return (
        <Box component="form" onSubmit={handleSubmit}>
            <Stack spacing={2}>
                <Typography variant='h6' fontWeight={400} textAlign='left'>
                    Eliminar visita
                </Typography>

                <Typography variant='subtitle1' fontWeight={400} textAlign='center'>
                    Nombre: {animal}
                </Typography>
                <Typography variant='subtitle1' fontWeight={400} textAlign='center'>
                    Fecha: {date}
                </Typography>
                <Typography variant='subtitle1' fontWeight={400} textAlign='center'>
                    Hora: {hour}
                </Typography>
                <Typography variant='subtitle1' fontWeight={400} textAlign='center'>
                    Razón: {reason}
                </Typography>

                <Stack direction='row' spacing={3}>
                    <Button variant="text" type='button' fullWidth onClick={() => router.push(`/animals/${id}/visits`)}>Cancel</Button>
                    <Button variant="text" type='submit' fullWidth>Eliminar</Button>
                </Stack>

            </Stack>
        </Box>
    )
}