import React, { Component } from 'react';
import NavBar from './components/navbar/NavBar';
import { MuiThemeProvider } from '@material-ui/core';
import './App.css';
import Search from './components/search/Search';
import ResponsiveDrawer from './components/PictureSearch';

class App extends Component {
	render() {
		return <ResponsiveDrawer />;
	}
}

export default App;
