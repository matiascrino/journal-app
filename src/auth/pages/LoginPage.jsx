import {useMemo} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {Link as RouterLink} from 'react-router-dom';
import { Grid, Typography, TextField, Button, Link, Alert } from '@mui/material'
import { Google } from '@mui/icons-material'
import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from '../../hooks';
import {startGoogleSignIn, startLoginEmailAndPassword } from '../../store/auth/thunks';


const formData = {
	email: "",
	password: "",
};


export const LoginPage = () => {
	const {status, errorMessage} = useSelector(state => state.auth)
	const dispatch = useDispatch();

	const {formState, email, password, onInputChange} = useForm(formData)

	const isAuthenticating = useMemo(() => status === 'checking', [status])

	const onSubmit = (e) => {
		e.preventDefault();
		dispatch(startLoginEmailAndPassword(formState))
		// dispatch(checkingAuthentication(email, password))
	}

	const onGoogleSignIn = () => {
		dispatch(startGoogleSignIn());
	}

    return (
			<AuthLayout title="Login">
				<form
					onSubmit={onSubmit}
					className="animate__animated animate__fadeIn animate__faster">
					<Grid container>
						<Grid item xs={12} sx={{ mt: 2 }}>
							<TextField
								label="Correro"
								type="email"
								placeholder="correo@google.com"
								fullWidth
								name="email"
								value={email}
								onChange={onInputChange}
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
							/>
						</Grid>

						<Grid container display={errorMessage ? "" : "none"}>
							<Grid item xs={12} sx={{ mt: 2 }}>
								<Alert severity="error"> {errorMessage} </Alert>
							</Grid>
						</Grid>

						<Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
							<Grid item xs={12} sm={6}>
								<Button
									disabled={isAuthenticating}
									type="submit"
									variant="contained"
									fullWidth>
									Login
								</Button>
							</Grid>
							<Grid item xs={12} sm={6}>
								<Button
									disabled={isAuthenticating}
									variant="contained"
									fullWidth
									onClick={onGoogleSignIn}>
									<Google />
									<Typography sx={{ ml: 1 }}>Google</Typography>
								</Button>
							</Grid>
						</Grid>

						<Grid container direction="row" justifyContent="end">
							<Link component={RouterLink} color="inherit" to="/auth/register">
								Crear Una Cuenta
							</Link>
						</Grid>
					</Grid>
				</form>
			</AuthLayout>
		);
}

