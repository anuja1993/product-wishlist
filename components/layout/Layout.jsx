import React, { Component } from "react";
import MainNavigation from "./MainNavigation";

/**
 * Layout component
 */
class Layout extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <div>
          <MainNavigation />
          <main className="items-center">{this.props.children}</main>
        </div>
      </React.Fragment>
    );
  }
}

export default Layout;
