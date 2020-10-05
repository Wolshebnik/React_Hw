import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {
	Box,
	Button,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	TextField
} from '@material-ui/core';

import {
	deleteCategoriesAsync,
	getCategories,
	postCategories,
	updateCategoryAsync
} from '../store/products/action';

import LinearBuffer from '../components/LinearBuffer';
import TransitionsModal from '../components/popup';
import { errorsModal, openModal } from '../store/ui/action';
import { findItem, findSameField } from '../Utilities';

const useStyles = makeStyles( {
	table: {
		minWidth: 650

	},
	hover: {
		'&:hover': {
			backgroundColor: '#80cbc4',
			color: '#4527a0'
		},
		cursor: 'pointer'

	},
	buttonMargin: {
		marginBottom: '10px'
	},
	tableMargin: {
		margin: '10px'
	},
	tableHeadColor: {
		borderRadius: 8,
		backgroundColor: '#fff9c4'
	},
	root: {
		margin: '5px',
		width: 700
	}
} );

export default function Categories() {
	const classes = useStyles();
	const dispatch = useDispatch();
	let history = useHistory();
	const {isFetching} = useSelector( state => state.ui );
	const {categoriesList} = useSelector( state => state.products );
	const [ inputForm, setInputForm ] = useState( {
		name: '',
		id: '',
		edit: false
	} );

	useEffect( () => {
		dispatch( getCategories );
	}, [ dispatch ] );

	const deleteItem = ( id ) => {
		dispatch( deleteCategoriesAsync( id ) );
	};

	const editItem = ( id ) => {
		const item = findItem( categoriesList, id );
		setInputForm( {
			...inputForm,
			name: item.name,
			id,
			edit: true
		} );

	};

	const changeInput = ( e ) => {
		setInputForm( {
			...inputForm,
			name: e.target.value
		} );
	};

	const showError = ( text ) =>{
			dispatch( openModal );
			dispatch( errorsModal( {
				title: 'Error',
				text
			} ) );
			setInputForm( {
				...inputForm,
				name: ''
			} );
	}


	const onSubmitForm = ( e ) => {
		e.preventDefault();
		const body = {id: inputForm.id, name: inputForm.name};
		const categoryError = findSameField( categoriesList, inputForm.name );
		!inputForm.name && showError('Тhe field cannot be empty')
		categoryError && showError('This field exists')
		if (!inputForm.name || categoryError) return;
		if (inputForm.edit) {
			dispatch( updateCategoryAsync( body ) );
			setInputForm( {
				...inputForm,
				name: '',
				id: '',
				edit: false
			} );

		} else {
			dispatch( postCategories( {name: inputForm.name}) );
			setInputForm( {
				...inputForm,
				name: ''
			} );
		}

	};

	return (
		<Box className={ classes.tableMargin }>
			<Button
				className={ classes.buttonMargin }
				variant="outlined"
				color={ 'secondary' }
				onClick={ history.goBack }
			>Back</Button>
			<Box borderRadius={ 5 } border={ 2 } borderColor="primary.main">
				<TableContainer component={ Paper } elevation={ 7 }>
					<Table className={ classes.table } aria-label="simple table">
						<TableHead>
							<TableRow className={ classes.tableHeadColor }>
								<TableCell>Categories</TableCell>
								<TableCell align="right">Delete</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{ categoriesList.map( ( row ) => (
								<TableRow key={ row.id } className={ classes.hover }>
									<TableCell component="th" scope="row" onClick={ () => editItem( row.id ) } >
										{ row.name }
									</TableCell>
									<TableCell align="right">
										<Button
											variant="contained"
											size={'small'}
											color="secondary" onClick={ () => deleteItem( row.id ) }
										>
											delete
										</Button>
									</TableCell>
								</TableRow>
							) ) }
						</TableBody>
					</Table>
				</TableContainer>
				{ isFetching && <Box m={ 8 }>
					<LinearBuffer/>
				</Box> }
			</Box>
			<Box display="flex" justifyContent="space-between" height={ 50 }>
				<div className={ classes.tableMargin }>
					<TextField className={ classes.root }
						size={ 'small' }
						color={ 'secondary' }
						label="Category"
						name="category"
						placeholder="Add category"
						value={ inputForm.name }
						variant="outlined"
						onChange={ changeInput }
					/>

					<Button className={ classes.root }
						variant="contained"
						color="primary"
						type={ 'submit' }
						onClick={ onSubmitForm }>
						add
					</Button>
					<Box>
					</Box>
				</div>
			</Box>
			<TransitionsModal/>
		</Box>
	);
}
