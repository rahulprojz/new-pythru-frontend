import { TextField } from '@mui/material';

import './selectPicker.scss';

interface Props {
	label?: string;
	placeholder?: string;
	id?: string;
	name?: string;
	type?: string;
	onBlur?: any;
	values?: any;
	onChange?: any;
	size?: any;
	helperText?: any;
	error?: any;
	touched?: any;
	errors?: any;
	data?: any;
	isRequired?: boolean;
	isDisabled?: boolean;
}

export default function Selectpicker({ label, id, values, size = 'small', onChange, touched, errors, data }: Props) {
	return (
		<TextField
			id={id}
			select
			size={size}
			className={'selectPicker'}
			label={label}
			variant="outlined"
			value={values ? values : ''}
			onChange={onChange}
			helperText={touched ? errors : ''}
			error={touched && Boolean(errors)}
		>
			{data}
		</TextField>
	);
}
