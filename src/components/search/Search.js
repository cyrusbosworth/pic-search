import React, { Component } from 'react';
import { TextField, Select, MenuItem } from '@material-ui/core';

import axios from 'axios';

class Search extends Component {
	state = {
		searchText: '',
		amount: 15,
		apiUrl: 'https://pixabay.com/api',
		apiKey: '14697498-6dbb7ed2f4df9223c3c4cf59c'
	};

	search = e => {
		const val = e.target.value;
		this.setState(
			{
				[e.target.name]: val
			},
			() => {
				if (val === '') {
					this.props.searchResults([]);
				} else {
					axios
						.get(
							`${this.state.apiUrl}/?key=${this.state.apiKey}&q=${this.state.searchText}
            &image_type=photo&per_page=${this.state.amount}&safesearch=true`
						)
						.then(res => this.props.searchResults(res.data.hits))
						.catch(err => console.log(err));
				}
			}
		);
	};
	render() {
		return (
			<div>
				<TextField
					placeholder="Enter search text"
					name="searchText"
					value={this.state.searchText}
					onChange={this.search}
					fullWidth={true}
				/>
				<br />
				<label htmlFor="amount">Amount: </label>
				<Select name="amount" value={this.state.amount} onChange={this.search}>
					<MenuItem value={5}>5</MenuItem>
					<MenuItem value={10}>10</MenuItem>
					<MenuItem value={15}>15</MenuItem>
					<MenuItem value={30}>30</MenuItem>
					<MenuItem value={50}>50</MenuItem>
				</Select>

				<br />
			</div>
		);
	}
}

export default Search;
