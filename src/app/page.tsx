'use client'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Head from 'next/head'
import { useRouter } from 'next/navigation'

export default function Home() {

    const router = useRouter()

    return (
        <>
            <Head>
                <title>Raww Raww | Veterinaria</title>
            </Head>
            <Box width="100%">
                <Grid container spacing={4}>
                    <Grid item xs={12}>
                        <Stack direction='row' justifyContent="space-between" spacing={2}>
                            <Typography component="h1" fontWeight={600} variant="h4" textAlign='left'>
                                Listas
                            </Typography>
                        </Stack>
                    </Grid>
                    <Grid item xs={12}>
                        <Stack direction='row' spacing={2}>
                            <Button variant="contained" onClick={() => router.push('/animals')}>
                                Animales
                            </Button>
                            <Button variant="contained" onClick={() => router.push('/animals')}>
                                Visitas
                            </Button>
                        </Stack>
                    </Grid>
                </Grid>
            </Box >
        </>
    )

}
