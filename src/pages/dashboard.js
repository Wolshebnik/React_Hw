import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import {
	Box,
	Collapse,
	IconButton,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
	Button, Grid
} from '@material-ui/core';

import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

import { getToysAsync } from '../store/toys/action';

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

const MyLink = styled(Link)`
color:${(props) => (props.to.includes('incoming') ? '#3f50b5': '#ba000d')};
text-decoration: none;
width: 50px;
`

function Row( props ) {
	const {row, transactions} = props;
	const [ open, setOpen ] = React.useState( false );
	const classes = useRowStyles();

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
								{ transactions.map( ( transactionRow ) => {
									const {id, date, userId, toys, type} = transactionRow
								return	(
									<TableRow key={ id }>
									<TableCell component="th" scope="row">
									{ date }
									</TableCell>
									<TableCell>{ userId }</TableCell>
									<TableCell align="right">{toys.quantity}</TableCell>
									<TableCell align="right">{toys.price}</TableCell>
									<TableCell align="right">{toys.totalCost}</TableCell>
									<TableCell align="right">{type}</TableCell>
									<TableCell align="right">
									<Button variant="outlined" color={type === "incoming" ? 'primary': 'secondary' } size="medium" >
										<MyLink to={type === "incoming" ? `/incoming/${toys.name}`: `/outcoming/${toys.name}` }>
										info
										</MyLink>
									</Button>
									</TableCell>
									</TableRow>
									)})
								}
							</TableBody>
						</Table>
						{/*<div className={classes.grid}>*/}
						{/*<Grid container spacing={3} mb={1}>*/}
						{/*<Grid item xs align={'left'} >*/}
						{/*	<Button variant="outlined" color="primary"  >*/}
						{/*		Incoming transaction*/}
						{/*	</Button>*/}
						{/*</Grid >*/}
						{/*	<Grid item xs align={'center'}>*/}
						{/*		<Button variant="outlined" color="secondary"  >*/}
						{/*			Outcoming transaction*/}
						{/*		</Button>*/}
						{/*	</Grid>*/}
						{/*	<Grid item xs align={'right'}>*/}
						{/*		<Button variant="outlined" color="primary"  >*/}
						{/*			Transaction details*/}
						{/*		</Button>*/}
						{/*	</Grid >*/}
						{/*</Grid>*/}
						{/*</div>*/}
					</Collapse>
				</TableCell>
			</TableRow>
		</React.Fragment>
	);
}

export default function Dashboard() {
	const dispatch = useDispatch();
	const {toysList} = useSelector( state => state.toys );
	const {transactionsList} = useSelector(state => state.transactions)
	const {isFetching} = useSelector( state => state.ui );

	const classes = useRowStyles();

	useEffect( () => {
		dispatch( getToysAsync );
	}, [ dispatch ] );

	const incoming = () =>{
		console.log('incoming')
	}

	const outcoming = () => {
		console.log('outcoming');
	}

	return (
		<>
			<Box m={ 8 } borderRadius={ 5 } border={ 1 } borderColor="primary.main">
				<TableContainer component={ Paper } elevation={ 7 }>
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
								const transactions = transactionsList.filter(e => {
									return e.toys.find(item => item.id === row.id)
								})
								const mappedTransactions = transactions.map(trans => {
									const currentItem = trans.toys.find(item => item.id === row.id)
									return {
										...trans,
										toys: currentItem
									}
								})
								return (<Row key={ row.name } row={ row } transactions={ mappedTransactions }  />) }
							)}
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
