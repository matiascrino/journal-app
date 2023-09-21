import {Button, Grid, Typography, TextField, IconButton} from '@mui/material'
import { DeleteOutline, SaveOutlined, UploadOutlined } from '@mui/icons-material'
import { ImageGallery } from '../components'
import { useForm } from '../../hooks/useForm'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useMemo, useRef } from 'react'
import { setActiveNote } from '../../store/journal/journalSlice'
import {
	startSavingNote,
	startUploadingFiles,
	startDeletingNote,
} from "../../store/journal/thunks";
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css'



export const NoteView = () => {

	const dispatch = useDispatch();
	const {activeNote} = useSelector((state) => state.journal);
	const {messageSaved, isSaving } = useSelector((state) => state.journal);

	const { body, title, date, onInputChange, formState } = useForm(activeNote);

	const fileInputRef = useRef();

	const dateString = useMemo(() => {
		const newDate = new Date(date);
		return newDate.toUTCString();
	}, [date]);

	useEffect(() => {
		dispatch(setActiveNote(formState));
	}, [formState])

	useEffect(() => {	
		if(messageSaved.length > 0){
			Swal.fire('Guardado', messageSaved, 'success');
		}
	}, [messageSaved])

	const onSaveNote= () => {
		dispatch(startSavingNote());
	}

	const onFileInputChange = ({target}) => {
		if(target.files === 0) return;
		dispatch(startUploadingFiles(target.files));
	}

	const onDelete = () => {
		dispatch(startDeletingNote(activeNote.id));
	}


    return (
			<Grid
				className="animate__animated animate__fadeIn animate__faster"
				container
				direction="row"
				justifyContent="space-between"
				alignItems="center"
				sx={{ mb: 1 }}>
				<Grid item>
					<Typography fontSize={25} fontWeight="light">
						{dateString}
					</Typography>
				</Grid>
				<Grid item>
					<input
						type="file"
						multiple
						ref={fileInputRef}
						onChange={onFileInputChange}
						style={{ display: "none" }}
					/>

					<IconButton
						color="primary"
						disabled={isSaving}
						onClick={() => fileInputRef.current.click()}>
						<UploadOutlined />
					</IconButton>

					<Button
						disabled={isSaving}
						onClick={onSaveNote}
						color="primary"
						sx={{ padding: 2 }}>
						<SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
						Guardar
					</Button>
				</Grid>
				<Grid container>
					<TextField
						type="text"
						variant="filled"
						fullWidth
						placeholder="Ingrese un titulo"
						label="Titulo"
						sx={{ mb: 1, border: "none" }}
						value={title}
						name="title"
						onChange={onInputChange}
					/>
					<TextField
						type="text"
						variant="filled"
						fullWidth
						multiline
						placeholder="Que sucedio en el dia de hoy?"
						minRows={5}
						value={body}
						name="body"
						onChange={onInputChange}
					/>
				</Grid>

				<Grid container justifyContent="end">
					<Button
					onClick={onDelete}
					sx={{mt:2}}
					color="error"
					>
						<DeleteOutline />
						Borrar
					</Button>
				</Grid>

				<ImageGallery images={activeNote.imageUrl} />
			</Grid>
		); 

}