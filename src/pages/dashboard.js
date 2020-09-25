import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

import { getToysAsync } from '../store/toys/action';
import { Menu } from '../components/menu';

const useRowStyles = makeStyles({
	root: {
		'& > *': {
			borderBottom: 'unset',
			spacing: 5
		},
	},
	tableHeadColor: {
		borderRadius: 8,
		backgroundColor: '#fff9c4'
	}
});


function Row(props) {
	const { row } = props;
	const [open, setOpen] = React.useState(false);
	const classes = useRowStyles();
	// category: {id: "2", name: "Constructor"}
	// description: "Lego constructor"
	// id: "2"
	// name: "Lego"
	// price: 200
	// quantity: 20
	// totalCost: 4000
	return (
		<React.Fragment>
			<TableRow className={classes.root}>
				<TableCell>
					<IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
						{open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
					</IconButton>
				</TableCell>
				<TableCell component="th" scope="row">
					{row.name}
				</TableCell>
				<TableCell align="center">{row.description}</TableCell>
				<TableCell align="right">{row.price}</TableCell>
				{/*<TableCell align="right">{row.quantity}</TableCell>*/}
				{/*<TableCell align="right">{row.totalCost}</TableCell>*/}
			</TableRow>
			{/*<TableRow>*/}
			{/*	<TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>*/}
			{/*		<Collapse in={open} timeout="auto" unmountOnExit>*/}
			{/*			<Box margin={1}>*/}
			{/*				<Typography variant="h6" gutterBottom component="div">*/}
			{/*					History*/}
			{/*				</Typography>*/}
			{/*				<Table size="small" aria-label="purchases">*/}
			{/*					<TableHead>*/}
			{/*						<TableRow>*/}
			{/*							<TableCell>Date</TableCell>*/}
			{/*							<TableCell>Customer</TableCell>*/}
			{/*							<TableCell align="right">Amount</TableCell>*/}
			{/*							<TableCell align="right">Total price ($)</TableCell>*/}
			{/*						</TableRow>*/}
			{/*					</TableHead>*/}
			{/*					<TableBody>*/}
			{/*						{row.history.map((historyRow) => (*/}
			{/*							<TableRow key={historyRow.date}>*/}
			{/*								<TableCell component="th" scope="row">*/}
			{/*									{historyRow.date}*/}
			{/*								</TableCell>*/}
			{/*								<TableCell>{historyRow.customerId}</TableCell>*/}
			{/*								<TableCell align="right">{historyRow.amount}</TableCell>*/}
			{/*								<TableCell align="right">*/}
			{/*									{Math.round(historyRow.amount * row.price * 100) / 100}*/}
			{/*								</TableCell>*/}
			{/*							</TableRow>*/}
			{/*						))}*/}
			{/*					</TableBody>*/}
			{/*				</Table>*/}
			{/*			</Box>*/}
			{/*		</Collapse>*/}
			{/*	</TableCell>*/}
			{/*</TableRow>*/}
		</React.Fragment>
	);
}


export default function Dashboard() {
	const dispatch = useDispatch();
	const {list} = useSelector(state => state.toys);

	const classes = useRowStyles();

	useEffect(() => {
		dispatch(getToysAsync)
	},[dispatch]);
	console.log(list)

	return (
		<>
		<Menu />
		<Box m={8}  borderRadius={5} border={1}  borderColor="primary.main">
		<TableContainer  component={Paper} elevation={7}  >
			<Table aria-label="collapsible table">
				<TableHead className={classes.tableHeadColor}>
					<TableRow>
						<TableCell />
						<TableCell>Name</TableCell>
						<TableCell align="center">Description</TableCell>
						<TableCell align="right">Price&nbsp;($)</TableCell>
						{/*<TableCell align="right">Quantity</TableCell>*/}
						{/*<TableCell align="right">Total cost&nbsp;($)</TableCell>*/}
					</TableRow>
				</TableHead>
				<TableBody>
					{list.map((row) => (
						<Row key={row.name} row={row} />
					))}
				</TableBody>
			</Table>
		</TableContainer>
		</Box>
			</>
	);
}
