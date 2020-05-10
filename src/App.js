import React, { Component } from 'react';
import CardList from './CardList';
import SearchBox from './SearchBox';
import { robots } from './robots';

export default class App extends Component {
	constructor() {
		super();
		this.state = {
			robots: robots,
			searchField: ''
		}
	}

	onSearchChange = e => {
		console.log(e.target.value);
	}

	render() {
		return(
			<div className='tc'>
				<h1>RoboFriends</h1>
				<SearchBox searchChange={this.onSearchChange} />
				<CardList robots={this.state.robots} />
			</div>
		)
	}
}