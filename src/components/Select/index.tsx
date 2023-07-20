import * as React from 'react'
import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { useState } from 'react'

export interface AppSelectProps {
    value: any
    setValue: Function
    menuItems: string[]
    label: string
}

export default function AppSelect(props: AppSelectProps) {
    const { value, setValue, label, menuItems } = props

    const handleChange = (event: SelectChangeEvent) => {
        setValue(event.target.value as string)
    }

    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">{label}</InputLabel>
                <Select
                    value={value}
                    label={label}
                    onChange={handleChange}
                >
                    {menuItems.map((row, index) => (
                        <MenuItem value={row} key={index}>{row}</MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    )
}