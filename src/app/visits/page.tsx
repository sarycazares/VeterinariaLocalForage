'use client'
import AppTable from '@/components/Table'
import AddVisitForm from '@/components/Visit/AddVisitForm'
import EditVisitForm from '@/components/Visit/EditVisitForm'
import { Visit } from '@/models/Visits'
import { getvisits } from '@/services/visit'
import AddIcon from '@mui/icons-material/Add'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Head from 'next/head'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function VisitsPage() {

    const router = useRouter()
    const searchParams = useSearchParams()
    const step = searchParams.get('step')
    const [visitsList, setVisitsList] = useState<Visit[]>([])

    const getAnimalsList = async () => {
        try {
            setVisitsList(await getvisits())
        } catch {
            setVisitsList([])
        }
    }

    useEffect(() => {
        getAnimalsList()
    }, [])

    const handleClick = (stepName: string, id: number) => {
        router.push(`/visits?step=${stepName}&id=${id}`)
    }

    return (
        <>
            <Head>
                <title>Raww Raww | Veterinaria</title>
            </Head>
            <Box width="100%">
                <Grid container spacing={4}>
                    <Grid item xs={12}>
                        <Stack direction='row' spacing={2}>
                            <Typography component="h1" fontWeight={600} variant="h4" textAlign='left'>
                                Visitas
                            </Typography>
                            <IconButton
                                aria-label="Agregar"
                                color='inherit'
                                onClick={() => handleClick('add', 0)}
                            >
                                <AddIcon />
                            </IconButton>
                        </Stack>
                    </Grid>
                    {step ?
                        <Grid item xs={12}>
                            <Container maxWidth="xs">
                                {step == 'add' &&
                                    <AddVisitForm />
                                }
                                {step == 'edit' &&
                                    <EditVisitForm />
                                }
                                {step == 'delete' &&
                                    <AddVisitForm />
                                }
                            </Container>
                        </Grid>
                        :
                        <Grid item xs={12}>
                            {visitsList.length != 0 &&
                                <AppTable titleCells={['id', 'name', 'weight', 'type', '']} dataCells={visitsList} handleClickButton={handleClick} />
                            }
                        </Grid>
                    }

                </Grid>
            </Box >
        </>
    )

}

