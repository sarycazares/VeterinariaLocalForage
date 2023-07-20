'use client'
import AppBar from '@mui/material/AppBar'
import Container from '@mui/material/Container'
import IconButton from '@mui/material/IconButton'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

function Header() {

    const router = useRouter()

    return (
        <AppBar position="static" className='headerBackground'>
            <Container maxWidth="xl">
                <Toolbar disableGutters >
                    <IconButton onClick={() => router.push('/')}>
                        <Image
                            src="https://img.icons8.com/stickers/100/kawaii-dinosaur.png"
                            alt='raww'
                            width={50}
                            height={50}
                            style={{ objectFit: 'cover' }}
                        />
                    </IconButton>
                    <Typography
                        variant="h6"
                        noWrap
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        Raww Raww Veterinaria
                    </Typography>
                </Toolbar>
            </Container>
        </AppBar>
    )
}
export default Header