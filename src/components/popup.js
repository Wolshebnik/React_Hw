import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

import { closeModal } from '../store/ui/action';

const useStyles = makeStyles((theme) => ({
	modal: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	paper: {
		backgroundColor: theme.palette.background.paper,
		border: '2px solid #000',
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
	},
}));

export default function TransitionsModal() {
	const classes = useStyles();
	const dispatch = useDispatch();
	const{modal, errorModal} =useSelector(state=> state.ui)

	const handleClose = () => {
		dispatch(closeModal);
	};

	return (
		<div>
			<Modal
				aria-labelledby="transition-modal-title"
				aria-describedby="transition-modal-description"
				className={classes.modal}
				open={modal}
				onClose={handleClose}
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{
					timeout: 500,
				}}
			>
				<Fade in={modal}>
					<div className={classes.paper}>
						<h2 id="transition-modal-title">{ errorModal.title }</h2>
						<p id="transition-modal-description">{ errorModal.text }</p>
					</div>
				</Fade>
			</Modal>
		</div>
	);
}
