import React, { Component } from 'react';
import { connect } from 'react-redux';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import ErrorBoundry from '../components/ErrorBoundry';
import './App.css';

import { setSearchField } from '../actions';

const mapStateToProps = state => {
	return {
		searchField: state.searchRobots.searchField
	}
}

const mapDispatchToProps = dispatch => {
	return {
		onSearchChange: (event) => dispatch(setSearchField(event.target.value))
	}
}

class App extends Component {
	constructor() {
		super();
		this.state = {
			robots: [],
			searchField: ''
		}
	}

	componentDidMount() {
		console.log(this.props.store.getState());
		
		fetch('https://jsonplaceholder.typicode.com/users')
			.then(response => response.json())
			.then(users => this.setState({ robots: users }));
	}

	onSearchChange = e => {
		this.setState({ searchField: e.target.value });
	}

	render() {
		const { robots, searchField } = this.state;

		const filteredRobots = robots.filter(robot => {
			return robot.name.toLocaleLowerCase().includes(searchField.toLocaleLowerCase());
		})

		return !robots.length ?
			<h1 className='tc f1'>Loading...</h1> :
			(
				<div className='tc'>
					<h1 className='f1' >RoboFriends</h1>
					<SearchBox searchChange={this.onSearchChange} />
					<Scroll>
						<ErrorBoundry>
						  <CardList robots={filteredRobots} />
						</ErrorBoundry>
					</Scroll>
				</div>
			)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
