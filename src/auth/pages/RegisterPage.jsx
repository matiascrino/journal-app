import { Link as RouterLink } from "react-router-dom";
import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Typography, TextField, Button, Link, Alert } from "@mui/material";
import { AuthLayout } from "../layout/AuthLayout";
import {useForm} from '../../hooks/useForm';
import { startCreatingUserWithEmailAndPassword } from "../../store/auth/thunks";

const formData = {
	displayName: '',
	email: '',
	password: '',
}

const formValidations = {
	email: [(value) => value.includes('@'), 'Ingrese un correo valido'],
	password: [(value) => value.length > 5, 'La contraseña debe tener al menos 6 caracteres'],
	displayName: [(value) => value.length > 3, 'El nombre debe tener al menos 4 caracteres'],
}


export const RegisterPage = () => {

	const dispatch = useDispatch();
	const [formSubmitted, setformSubmitted] = useState(false);
	const { status, errorMessage } = useSelector(state => state.auth);
	const isCheckingAuthentication = useMemo(() => status === 'checking', [status]);

	const { 
		formState, displayName, email, password, onInputChange,
		isFormValid, displayNameValid, emailValid, passwordValid,
		} = useForm(formData, formValidations);

	
	

	const onSubmit = (e) => {
		e.preventDefault();
		setformSubmitted(true);
		if(!isFormValid) return;

		dispatch(startCreatingUserWithEmailAndPassword(formState))
		
	}



	return (
		<AuthLayout title="Crear Cuenta">
			<form
				onSubmit={onSubmit}
				className="animate__animated animate__fadeIn animate__faster">
				<Grid container>
					<Grid item xs={12} sx={{ mt: 2 }}>
						<TextField
							label="Nombre Completo"
							type="text"
							placeholder="Ingrese su nombre aqui.."
							fullWidth
							name="displayName"
							value={displayName}
							onChange={onInputChange}
							error={!!displayNameValid && formSubmitted}
							helperText={displayNameValid}
						/>
					</Grid>
					<Grid item xs={12} sx={{ mt: 2 }}>
						<TextField
							label="Correro"
							type="email"
							placeholder="correo@google.com"
							fullWidth
							name="email"
							value={email}
							onChange={onInputChange}
							error={!!emailValid && formSubmitted}
							helperText={emailValid}
						/>
					</Grid>
					<Grid item xs={12} sx={{ mt: 2 }}>
						<TextField
							label="Contraseña"
							type="password"
							placeholder="Ingrese su contraseña"
							fullWidth
							name="password"
							value={password}
							onChange={onInputChange}
							error={!!passwordValid && formSubmitted}
							helperText={passwordValid}
						/>
					</Grid>

					<Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
						<Grid item xs={12} display={!!errorMessage ? "" : "none"}>
							<Alert severity="error">{errorMessage}</Alert>
						</Grid>
						<Grid item xs={12}>
							<Button
								disabled={isCheckingAuthentication}
								type="submit"
								variant="contained"
								fullWidth>
								Crear Cuenta
							</Button>
						</Grid>
					</Grid>

					<Grid container direction="row" justifyContent="end">
						<Typography sx={{ mr: 1 }}>¿Ya tienes una cuenta?</Typography>
						<Link component={RouterLink} color="inherit" to="/auth/login">
							Ingresar
						</Link>
					</Grid>
				</Grid>
			</form>
		</AuthLayout>
	);
};
