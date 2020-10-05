import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {
	Box,
	Button,
	MenuItem,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	TextField
} from '@material-ui/core';

import { deleteToysAsync, getCategories, getToys, postToys, updateToyAsync } from '../store/products/action';
import LinearBuffer from '../components/LinearBuffer';
import TransitionsModal from '../components/popup';
import { errorsModal, openModal } from '../store/ui/action';
import { findCategoryByName, findItem, findSameField } from '../Utilities';

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

export default function Toys() {
	const classes = useStyles();
	const dispatch = useDispatch();
	let history = useHistory();
	const {isFetching} = useSelector( state => state.ui );
	const {toysList} = useSelector( state => state.products );
	const {categoriesList} = useSelector( state => state.products );
	const [ category, setCategory ] = useState( {id: '', name: ''} );
	const [ accessToEdit, setAccessToEdit ] = useState( false );
	const [ form, setForm ] = useState( {
		id: '',
		name: '',
		price: '',
		quantity: 0,
		totalCost: 0,
		description: '',
		categoryId: ''
	} );

	useEffect( () => {
		dispatch( getCategories );
		dispatch( getToys );
	}, [ dispatch ] );

	const deleteItem = ( e, id ) => {
		e.stopPropagation();
		dispatch( deleteToysAsync( id ) );
		setForm( {
			...form,
			id: '',
			name: '',
			price: '',
			description: '',
			categoryId: ''
		} );
		setAccessToEdit( false );
	};

	const editItem = ( e, id ) => {
		setAccessToEdit( true );
		const item = findItem( toysList, id );
		delete item.quantity;
		delete item.totalCost;

		setCategory( {
			...item.category
		} );
		setForm( {
			...form,
			...item,
			categoryId: item.category.id
		} );
	};

	const changeInput = ( e ) => {
		const valueNumber = e.target.name === 'price' ? Number( e.target.value ) : e.target.value;
		setForm( {
			...form,
			[e.target.name]: valueNumber
		} );
	};

	const handleChangeSelect = ( event ) => {
		const categoryByName = findCategoryByName( categoriesList, event.target.value );
		setCategory( {
			...categoryByName
		} );
		setForm( {
			...form,
			id: categoryByName.id,
			categoryId: categoryByName.id
		} );
	};

	const showError = ( text ) => {
		dispatch( openModal );
		dispatch( errorsModal( {
			title: 'Error',
			text
		} ) );
		setForm( {
			...form,
			name: '',
			price: '',
			description: '',
			categoryId: ''
		} );
	};

	const onSubmitForm = ( e ) => {
		e.preventDefault();
		const error = findSameField(toysList, form.name)
		if (!form.name || !form.price || !form.description || !category.name){
			showError('Тhe field cannot be empty');
			return;
		}

		if (error) {
			showError('This field exists')
			return;
		}

		const body = {...form};
		delete body.category;

		if (accessToEdit) {
			dispatch( updateToyAsync( {id: form.id, body} ) );
			setForm( {
				...form,
				name: '',
				price: '',
				description: '',
				categoryId: ''
			} );
			setCategory( {id: '', name: ''} );
			setAccessToEdit( false );

		} else {
			dispatch( postToys( form ) );
			setForm( {
				...form,
				id: '',
				name: '',
				price: '',
				description: '',
				categoryId: ''
			} );
			setCategory( {id: '', name: ''} );
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
								<TableCell>Toys</TableCell>
								<TableCell align="right">Description</TableCell>
								<TableCell align="right">Price</TableCell>
								<TableCell align="right">Category</TableCell>
								<TableCell align="right">Delete</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{ toysList.map( ( row ) => (
								<TableRow key={ row.id } className={ classes.hover } onClick={ ( e ) => editItem( e, row.id ) }>
									<TableCell component="th" scope="row">
										{ row.name }
									</TableCell>
									<TableCell align="right">
										{ row.description }
									</TableCell>
									<TableCell align="right">
										{ row.price }
									</TableCell>
									<TableCell align="right">
										{ row.category.name }
									</TableCell>
									<TableCell align="right">
										<Button
											variant="contained"
											size={ 'small' }
											color="secondary" onClick={ ( e ) => deleteItem( e, row.id ) }
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
						label="Toys"
						name="name"
						placeholder="Edit"
						value={ form.name }
						variant="outlined"
						onChange={ changeInput }
					/>

					<TextField className={ classes.root }
						size={ 'small' }
						color={ 'secondary' }
						label="Description"
						name="description"
						placeholder="Edit"
						value={ form.description }
						variant="outlined"
						onChange={ changeInput }
					/>
					<TextField className={ classes.root }
						size={ 'small' }
						color={ 'secondary' }
						label="Price"
						name="price"
						type="number"
						placeholder="Number"
						value={ form.price }
						variant="outlined"
						onChange={ changeInput }
					/>

					<TextField
						className={ classes.root }
						color={ 'secondary' }
						select
						label='Select category'
						value={ category.name }
						onChange={ handleChangeSelect }
						InputProps={ {
							readOnly: accessToEdit
						} }
						variant="outlined"
					>
						{ categoriesList.map( ( option ) => (
							<MenuItem key={ option.id } value={ option.name }>
								{ option.name }
							</MenuItem>
						) ) }
					</TextField>

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
