import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch, useHistory } from 'react-router-dom';

import {
	Box,
	Button,
	Card,
	CardContent,
	Container,
	Paper,
	Table, TableBody, TableCell,
	TableContainer,
	TableHead, TableRow,
	Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { getTransactionsId } from '../store/products/action';
import LinearBuffer from '../components/LinearBuffer';
import TransitionsModal from '../components/popup';

const useStyles = makeStyles( {
	root: {
		minWidth: 275,
		margin: 10
	},
	green:{
		backgroundColor: '#e0f2f1'
	},
	red:{
		backgroundColor: '#fbe9e7'
	},
	buttonMargin: {
		margin: '10px'
	},
	tableHeadColor: {
		borderRadius: 8,
		backgroundColor: '#fff9c4'
	},
	bullet: {
		display: 'inline-block',
		margin: '0 2px',
		transform: 'scale(0.8)'
	},
	title: {
		fontSize: 14,
		fontStyle: 'italic',
		fontWeight: 600
	},
	pos: {
		marginBottom: 12
	}
} );

export default function Transactions() {
	const classes = useStyles();
	const bull = <span className={ classes.bullet }>•</span>;
	const dispatch = useDispatch();
	let history = useHistory();
	let match = useRouteMatch();

	const {transaction} = useSelector( state => state.products );
	const {isFetching} = useSelector( state => state.ui );


	useEffect( () => {
		dispatch( getTransactionsId(match.params.id) );
	}, [ dispatch, match.params.id ] );

	return (
		<Container maxWidth="xl">
			<Button
				className={ classes.buttonMargin }
				variant="outlined"
				color={ 'secondary' }
				onClick={ history.goBack }
			>Back</Button>
			<Card className={ classes.root } variant="outlined" component={ Paper } elevation={ 14 }>
				<CardContent align={ 'center' }>
					<Typography className={ classes.title } color="textSecondary" gutterBottom
						align={ 'center' }>
						Transaction
					</Typography>
					<Typography variant="h5" component="h2" >
						Date { bull } { transaction.date } { bull }
					</Typography>
					<Typography className={ classes.pos } color="textSecondary">
						User { bull }{ transaction.userId }{ bull }
					</Typography>
					<Typography variant="h5" component="h2"  color={ 'secondary' }>
						Type { bull } { transaction.type } { bull }
					</Typography>
				</CardContent>
			</Card>
			<Box className={ classes.tableMargin }>
				<Box borderRadius={ 5 } border={ 2 } borderColor="primary.main">
					<TableContainer component={ Paper } elevation={ 7 }>
						<Table className={ classes.table } aria-label="simple table">
							<TableHead>
								<TableRow className={ classes.tableHeadColor }>
									<TableCell>Toys</TableCell>
									<TableCell align="right">Quantity</TableCell>
									<TableCell align="right">Price</TableCell>
									<TableCell align="right">Total Cost</TableCell>
									<TableCell align="right">Description</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{ transaction.toys.map( ( row ) => (
									<TableRow key={ row.id } className={ transaction.type==='incoming'? classes.green: classes.red } >
										<TableCell component="th" scope="row" >{ row.name }</TableCell>
										<TableCell align="right" >{ row.quantity }</TableCell>
										<TableCell align="right">{ row.price }</TableCell>
										<TableCell align="right" >{ row.totalCost }</TableCell>
										<TableCell align="right" >{ row.description }</TableCell>
									</TableRow>
								) ) }
							</TableBody>
						</Table>
					</TableContainer>
					{ isFetching && <Box m={ 8 }>
						<LinearBuffer/>
					</Box> }
				</Box>
				<TransitionsModal/>
			</Box>
		</Container>

	);
}