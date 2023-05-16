import { Fragment, useState } from 'react';
import DateRangePicker from '@mui/lab/DateRangePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { Box, Grid, TextField } from '@mui/material';

import './dateRangePicker.scss';
export default function DateRangePickerComp() {
	const [value, setValue] = useState<any>([null, null]);
	return (
		<LocalizationProvider dateAdapter={AdapterDateFns}>
			<DateRangePicker
				startText="Start Time"
				endText="End Time"
				value={value}
				onChange={(newValue: any) => {
					setValue(newValue);
				}}
				renderInput={(startProps: any, endProps: any) => (
					<Grid container rowSpacing={3} columnSpacing={2} style={{ justifyContent: 'space-between' }}>
						<Grid item xs={12} sm={6} md={6}>
							<Box sx={{ mx: 2 }} className={'dateRangePickerText'}></Box>
							<TextField fullWidth {...startProps} size="small" className={'dateRangePicker'} variant="standard" />
						</Grid>
						<Grid item xs={12} sm={6} md={6}>
							<Box sx={{ mx: 2 }} className={'dateRangePickerText'}></Box>
							<TextField fullWidth {...endProps} size="small" className={'dateRangePicker'} variant="standard" />
						</Grid>
					</Grid>
				)}
			/>
		</LocalizationProvider>
	);
}
