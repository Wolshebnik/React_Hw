import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
	Box,
	Button,
	Grid,
	MenuItem,
	Paper,
	Select,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	TextField
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import LinearBuffer from '../components/LinearBuffer';
import { getToys, postTransactions } from '../store/products/action';
import TransitionsModal from '../components/popup';
import { createArrayForPostTransaction, findCategoryByName } from '../Utilities';
import { errorsModal, openModal } from '../store/ui/action';

const useStyles = makeStyles( () => ({
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
	tableCell: {
		margin: '5px',
		minWidth: 200
	},
	root: {
		margin: '5px',
		width: 700
	}
}) );

const AddTransaction = () => {
	const classes = useStyles();
	const dispatch = useDispatch();
	let history = useHistory();

	const {toysList} = useSelector( state => state.products );
	const {isFetching} = useSelector( state => state.ui );

	const [ select, setSelect ] = useState( {toySelect: '', transSelect: ''} );
	const [ transactionField, setTransactionField ] = useState( {
		id: '', name: '', quantity: 0, price: 0, description: '', totalCost: 0, category: {}
	} );
	const [ transactionsLocal, setTransactionsLocal ] = useState( [] );

	useEffect( () => {
		dispatch( getToys );
	}, [ dispatch ] );

	const showError = ( text ) => {
		dispatch( openModal );
		dispatch( errorsModal( {
			title: 'Error',
			text
		} ) );
	};

	const handleChangeSelectToy = ( event ) => {
		const categoryByName = findCategoryByName( toysList, event.target.value );
		categoryByName.quantity = 0;
		categoryByName.totalCost = 0;
		setSelect( {
			...select,
			toySelect: event.target.value
		} );
		setTransactionField( categoryByName );
	};
	const handleChangeSelectTransactions = ( event ) => {
		setSelect( {
			...select,
			transSelect: event.target.value
		} );
	};

	const changeInput = ( e ) => {
		setTransactionField( {
			...transactionField,
			quantity: +e.target.value,
			totalCost: transactionField.price * e.target.value
		} );
	};

	const addTransactionInTable = () => {
		if (!transactionField.quantity || !transactionField.name) {
			showError( 'Тhe field cannot be empty' );
			return;
		}
		setSelect( {...select, toySelect: ''} );
		setTransactionField( {id: '', name: '', quantity: 0, price: 0, description: '', totalCost: 0, category: {}} );
		setTransactionsLocal( [
			...transactionsLocal,
			transactionField
		] );
	};

	const removeTransactionFromTable = ( id ) => {
		const list = transactionsLocal.filter( trans => trans.id !== id );
		setTransactionsLocal( list );
	};

	const onSubmit = ( e ) => {
		e.preventDefault();
		if (!select.transSelect) {
			showError( 'Transaction type must not be empty' );
			return;
		}
		if (!transactionsLocal.length) {
			showError( 'Add at least one transaction' );
			return;
		}
		const newTransaction = createArrayForPostTransaction( transactionsLocal );
		const body = {toys: newTransaction, type: select.transSelect};
		dispatch( postTransactions( body ) );
		setSelect( {
			...select,
			transSelect: ''
		} );
		setTransactionsLocal( [] );

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
								<TableCell align="left">Quantity</TableCell>
								<TableCell align="right">Price</TableCell>
								<TableCell align="right">Total Cost</TableCell>
								<TableCell align="right">Description</TableCell>
								<TableCell align="right">Edit</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							<TableRow>
								<TableCell component="th" scope="row" className={ classes.tableCell } align="left">
									<Select
										labelId="demo-simple-select-label"
										id="demo-simple-select"
										label='Select toy'
										color={ 'primary' }
										value={ select.toySelect }
										className={ classes.tableCell }
										onChange={ handleChangeSelectToy }
									>
										{ toysList.map( ( option ) => (
											<MenuItem key={ option.id } value={ option.name }>
												{ option.name }
											</MenuItem>
										) ) }
									</Select>
								</TableCell>
								<TableCell align="left" className={ classes.tableCell }>
									<TextField label="Add quantity" type={ 'Number' } onChange={ changeInput } value={ transactionField.quantity }/>
								</TableCell>
								<TableCell align="right">
									{ transactionField.price }
								</TableCell>
								<TableCell align="right">
									{ transactionField.totalCost }
								</TableCell>
								<TableCell align="right">
									{ transactionField.description }
								</TableCell>
								<TableCell className={ classes.tableCell } align="right">
									<Button variant="outlined" color={ 'primary' } size="medium" onClick={ addTransactionInTable }>
										add
									</Button>

								</TableCell>
							</TableRow>

							{ transactionsLocal.map( ( row ) => (
								<TableRow key={ row.id }>
									<TableCell component="th" scope="row" className={ classes.tableCell } align="left">
										{ row.name }
									</TableCell>
									<TableCell align="left" className={ classes.tableCell }>
										{ row.quantity }
									</TableCell>
									<TableCell align="right">
										{ row.price }
									</TableCell>
									<TableCell align="right">
										{ row.totalCost }
									</TableCell>
									<TableCell align="right">
										{ row.description }
									</TableCell>
									<TableCell className={ classes.tableCell } align="right">
										<Button variant="outlined" color={ 'secondary' } size="medium"
											onClick={ () => removeTransactionFromTable( row.id ) }>
											del
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

			<Grid container
				direction="row"
				justify="center"
				alignItems="center"
			>
				<Grid item xs={ 12 }>
					Type transactions <Select
					labelId="demo-simple-select-label"
					id="demo-simple-select"
					label='Select trans'
					color={ 'primary' }
					value={ select.transSelect }
					className={ classes.tableCell }
					onChange={ handleChangeSelectTransactions }
				>
					<MenuItem value={ 'incoming' }>incoming</MenuItem>
					<MenuItem value={ 'outcoming' }>outcoming</MenuItem>

				</Select>

				</Grid>
				<Grid item xs={ 12 }>
					<Button className={ classes.root }
						variant="contained"
						color="primary"
						type={ 'submit' }
						onClick={ onSubmit }>
						add
					</Button>
				</Grid>
				<Box>
				</Box>
			</Grid>
			<TransitionsModal/>
		</Box>
	);

};
export default AddTransaction;