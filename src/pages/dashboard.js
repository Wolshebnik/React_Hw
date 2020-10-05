import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import {
	Box,
	Button,
	Collapse,
	IconButton,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography
} from '@material-ui/core';

import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

import { getToysAndTransactionsAsync } from '../store/products/action';

import LinearBuffer from '../components/LinearBuffer';

const useRowStyles = makeStyles( {
	root: {
		'& > *': {
			borderBottom: 'unset',
			spacing: 5
		}
	},
	tableHeadColor: {
		borderRadius: 8,
		backgroundColor: '#fff9c4'
	},
	grid: {
		flexGrow: 1,
		marginBottom: '25px'
	}
} );

function Row( props ) {
	let history = useHistory();
	const {row, transactions} = props;
	const [ open, setOpen ] = React.useState( false );
	const classes = useRowStyles();

	const moveToLink = ( id ) => {
				return history.push( `/transaction/${ id }` );
	};

	return (
		<React.Fragment>
			<TableRow className={ classes.root }>
				<TableCell>
					<IconButton aria-label="expand row" size="small" onClick={ () => setOpen( !open ) }>
						{ open ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/> }
					</IconButton>
				</TableCell>
				<TableCell component="th" scope="row">
					{ row.id }
				</TableCell>
				<TableCell align="left">{ row.name }</TableCell>
				<TableCell align="center">{ row.quantity }</TableCell>
				<TableCell align="center">{ row.description }</TableCell>
				<TableCell align="right">{ row.category.name }</TableCell>
			</TableRow>
			<TableRow>
				<TableCell style={ {paddingBottom: 0, paddingTop: 0} } colSpan={ 6 }>
					<Collapse in={ open } timeout="auto" unmountOnExit>
						<Typography variant="h6" gutterBottom component="div">
							Transactions
						</Typography>
						<Table size="small" aria-label="purchases">
							<TableHead>
								<TableRow>

									<TableCell>Date</TableCell>
									<TableCell>User</TableCell>
									<TableCell align="right">Quantity</TableCell>
									<TableCell align="right">Price</TableCell>
									<TableCell align="right">Total</TableCell>
									<TableCell align="right">Type</TableCell>
									<TableCell align="center">Edit</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{transactions.length===0 && (<TableRow>
									<TableCell>
										<Button variant="outlined" color={ 'primary' } size="medium" onClick={ () => history.push( 'add_transaction') }>
											Add transaction
										</Button>
									</TableCell>
								</TableRow>)}

								{ transactions.map( ( transactionRow ) => {
									const {id, date, userId, toys, type} = transactionRow;
									return (
										<TableRow key={ id }>
											<TableCell component="th" scope="row">
												{ date }
											</TableCell>
											<TableCell>{ userId }</TableCell>
											<TableCell align="right">{ toys.quantity }</TableCell>
											<TableCell align="right">{ toys.price }</TableCell>
											<TableCell align="right">{ toys.totalCost }</TableCell>
											<TableCell align="right">{ type }</TableCell>
											<TableCell align="right">
												<Button variant="outlined" color={ type === 'incoming' ? 'primary' : 'secondary' } size="medium"
													onClick={ () => moveToLink( id ) }>
												info
												</Button>
											</TableCell>
										</TableRow>
									);
								} )
								}
							</TableBody>
						</Table>
					</Collapse>
				</TableCell>
			</TableRow>
		</React.Fragment>
	);
}

export default function Dashboard() {

	const dispatch = useDispatch();
	const {toysList} = useSelector( state => state.products );
	const {transactionsList} = useSelector( state => state.products );
	const {isFetching} = useSelector( state => state.ui );

	const classes = useRowStyles();

	useEffect( () => {
		dispatch( getToysAndTransactionsAsync );
	}, [ dispatch ] );

	return (
		<>
			<Box m={ 8 } borderRadius={ 5 } border={ 1 } borderColor="primary.main">
				<TableContainer component={ Paper } elevation={ 14 }>
					<Table aria-label="collapsible table">
						<TableHead className={ classes.tableHeadColor }>
							<TableRow>
								<TableCell/>
								<TableCell>ID</TableCell>
								<TableCell>Name</TableCell>
								<TableCell align="center">Quantity</TableCell>
								<TableCell align="center">Description</TableCell>
								<TableCell align="right">Category</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{ toysList.map( ( row ) => {
									const transactions = transactionsList.filter( e => {
										return e.toys.find( item => item.id === row.id );
									} );
									const mappedTransactions = transactions.map( trans => {
										const currentItem = trans.toys.find( item => item.id === row.id );
										return {
											...trans,
											toys: currentItem
										};
									} );
									return (<Row key={ row.name } row={ row } transactions={ mappedTransactions }/>);
								}
							) }
						</TableBody>
					</Table>
				</TableContainer>
			</Box>
			<Box m={ 8 }>
				{ isFetching && <LinearBuffer/> }
			</Box>
		</>
	);
}
