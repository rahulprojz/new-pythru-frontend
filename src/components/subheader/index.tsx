import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Breadcrumbs from "../breadcrumb"
import "./subheader.scss"
export default function BasicSelect({ page = 10, handleChange }: any) {
    return (
        <Box className="container">
            <Box className="leftContent">
                Poducts
            </Box>
            <Box>
                <Breadcrumbs />
            </Box>
        </Box>
    );
}