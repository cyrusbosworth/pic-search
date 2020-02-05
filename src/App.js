import React, {Component} from "react";
import NavBar from "./components/navbar/NavBar";
import {MuiThemeProvider} from "@material-ui/core";
import "./App.css";
import Search from "./components/search/Search";

class App extends Component {
  render() {
    return (
      <div>
        <NavBar></NavBar>
        <Search></Search>
      </div>
    );
  }
}

export default App;
