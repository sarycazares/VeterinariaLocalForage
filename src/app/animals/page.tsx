'use client'
import AddAnimalForm from '@/components/Animal/AddAnimalForm'
import DeleteAnimalForm from '@/components/Animal/DeleteAnimalForm'
import EditAnimalForm from '@/components/Animal/EditAnimalForm'
import AppTable from '@/components/Table'
import { Animal } from '@/models/Animals'
import { getAnimals } from '@/services/animal'
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

export default function AnimalsPage() {

    const router = useRouter()
    const searchParams = useSearchParams()
    const step = searchParams.get('step')
    const [animalsList, setAnimalsList] = useState<Animal[]>([])

    const getAnimalsList = async () => {
        try {
            setAnimalsList(await getAnimals())
        } catch {
            setAnimalsList([])
        }
    }

    useEffect(() => {
        getAnimalsList()
    }, [])

    const handleClick = (stepName: string, id: number) => {
        router.push(`/animals?step=${stepName}&id=${id}`)
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
                                Animales
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
                                    <AddAnimalForm />
                                }
                                {step == 'edit' &&
                                    <EditAnimalForm />
                                }
                                {step == 'delete' &&
                                    <DeleteAnimalForm />
                                }
                            </Container>
                        </Grid>
                        :
                        <Grid item xs={12}>
                            {animalsList.length != 0 &&
                                <AppTable titleCells={['id', 'name', 'weight', 'type', '']} dataCells={animalsList} handleClickButton={handleClick} />
                            }
                        </Grid>
                    }

                </Grid>
            </Box >
        </>
    )

}
