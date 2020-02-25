import React from "react";
import ReactDOM from "react-dom";
import Layout from "./components/layout"
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import configureStore from "./store";

const store = configureStore();

function Root() {
  return (
    <Provider store={store}>
      <Layout />
    </Provider>
  );
}

ReactDOM.render(<Root />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
