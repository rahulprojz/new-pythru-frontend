import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import { RootState } from "../../app/store"
import { useSelector } from 'react-redux';
export default function SimpleBackdrop() {
    const { globalLoader } = useSelector((state: RootState) => state.globalLoaderSlice)
    return (
        <div>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={globalLoader}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </div>
    );
}
