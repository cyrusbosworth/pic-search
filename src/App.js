import React, {Component} from "react";
import NavBar from "./components/navbar/NavBar";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import "./App.css";
import Search from "./components/search/Search";

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <div>
          <NavBar></NavBar>
          <Search></Search>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
