import React, { Component } from "react";
import { Route, BrowserRouter } from "react-router-dom";
import { connect } from "react-redux";
import Login from "./Login.jsx";
import Signup from "./Signup.jsx";
import Search from "./Search.jsx";
import "./main.css";
import Header from "./Header.jsx";
import Items from "./Items.jsx";
import NewItems from "./NewItems.jsx";
import Footer from "./Footer.jsx";

class App extends Component {
  renderHomePage = () => {
    return (
      <div>
        <Header />
        <Items />
        {/* <div>
          <Link to={"/cart/"}>
            <img height="20px" width="20px" src="/cart.png" />
          </Link>
        </div> */}

        <Footer />
      </div>
    );
  };

  renderSearchPage = allItems => {
    return (
      <div>
        <Search items={this.props.allItems} />
      </div>
    );
  };
  renderLoginPage = () => {
    return (
      <div>
        <Login />
      </div>
    );
  };

  renderItemDescriptionPage = routerData => {
    let itemId = routerData.match.params._id;
    let item = this.props.allItems.filter(item => {
      return item._id == itemId;
    })[0];
    return <div>{/* <ItemDescription item={item} /> */}</div>;
  };

  componentDidMount = async () => {
    let response = await fetch("/send-items");
    let body = await response.text();
    console.log("send-items", body);
    body = JSON.parse(body);
    this.props.dispatch({
      type: "all-items",
      allItems: body
    });
  };

  render = () => {
    return (
      <BrowserRouter>
        <div>
          <Route exact={true} path="/" render={this.renderHomePage} />
          <Route exact={true} path="/search" render={this.renderSearchPage} />
          <Route exact={true} path="/login" render={this.renderLoginPage} />
          <Route
            exact={true}
            path="/itemDescription/:_id"
            render={this.renderItemDescriptionPage}
          />
        </div>
      </BrowserRouter>
    );
  };
}

let mapStateToProps = st => {
  return { allItems: st.allItems };
};

let connectedApp = connect(mapStateToProps)(App);
export default connectedApp;
