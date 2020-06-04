import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { Provider } from "react-redux";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore"; // <- needed if using firestore
// import 'firebase/functions' // <- needed if using httpsCallable
import { createStore, combineReducers } from "redux";
import {
  ReactReduxFirebaseProvider, firebaseReducer
} from "react-redux-firebase";
import { createFirestoreInstance, firestoreReducer } from "redux-firestore"; // <- needed if using firestore

// login
import Login from "./components/Login";

// Home
import Home from "./components/Home";

// Nabvar
import Nabvar from "./components/Nabvar";
// detalle Pozo
import PozoDetalle from "./components/PozoDetalle"
// Agregar nuevo Pozo
import NuevoPozo from "./components/NuevoPozo";
// Editar Pozo
import Edit from "./components/Edit";
// router
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

// Helper para asegurar rutas
import { UserIsAuthenticated } from "./helper/Auth";

const firebaseConfig = {
  apiKey: "AIzaSyD3TZwNsllwzCRA1ZxKeiajkOwseLPLCSQ",
  authDomain: "app-daniel-5b0c3.firebaseapp.com",
  databaseURL: "https://app-daniel-5b0c3.firebaseio.com",
  projectId: "app-daniel-5b0c3",
  storageBucket: "app-daniel-5b0c3.appspot.com",
  messagingSenderId: "626694795495",
  appId: "1:626694795495:web:1daed4e47f4f473669b242",
  measurementId: "G-0YCPZ6QVQR",
};

const rrfConfig = {
  userProfile: "users",
  useFirestoreForProfile: true, // Firestore for Profile instead of Realtime DB
};

// Initialize firebase instance
firebase.initializeApp(firebaseConfig);

// Initialize other services on firebase instance
firebase.firestore(); // <- needed if using firestore

// Add firebase to reducers
const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer, // <- needed if using firestore
});

// Create store with reducers and initial state
const initialState = {};
const store = createStore(
  rootReducer,
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance, // <- needed if using firestore
};

function App() {
  return (
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <Router>
          <Nabvar></Nabvar>
          <Switch>
            <Route path="/login" component={Login}/>
            <Route exact path="/" component={UserIsAuthenticated(Home)} />
            <Route exact path="/pozo/:id" component={UserIsAuthenticated(PozoDetalle)} />
            <Route exact path="/nuevo/pozo" component={UserIsAuthenticated(NuevoPozo)} />
            <Route exact path="/edit/:id" component={UserIsAuthenticated(Edit)} />
          </Switch>
        </Router>
      </ReactReduxFirebaseProvider>
    </Provider>
  );
}

export default App;
