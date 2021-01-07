import React from 'react';
import { BrowserRouter as Router, Route, Redirect} from "react-router-dom";

//importing pages
import Signup from "./components/pages/Signup";

function App() {
  return (
    <Router>
      <Route 
        exact={true}
        path='/signup'
        component={Signup}
      />
    </Router>
  );
}

export default App;
