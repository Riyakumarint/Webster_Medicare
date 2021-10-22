import { useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import PageRender from "./customRouter/PageRender";
// import PrivateRouter from './customRouter/PrivateRouter'

import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
import NotFound from "./components/global/NotFound";
import Alert from "./components/alert/Alert";
import Header from "./components/header/Header";
import Footer from "./components/header/Footer";
// import StatusModal from './components/StatusModal'

import { useSelector, useDispatch } from "react-redux";
import { refreshToken } from "./redux/actions/authAction";

function App() {
  const {
    auth
  } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshToken());

  }, [dispatch]);


  return (
    <Router>
      <Alert />
      <input type="checkbox" id="theme" />
      <div className="App">
        <div className="main">
          {auth.token && <Header />}
          
          <Route exact path="/register" component={Register} />

          <Route exact path="/" component={auth.token ? Home : Login} />
          <Route exact path="/:page" component={PageRender} />
          <Route exact path="/:page/:id" component={PageRender} />

          {/* <PrivateRouter exact path="/:page" component={PageRender} />
          <PrivateRouter exact path="/:page/:id" component={PageRender} /> */}
          {auth.token && <Footer />}
        </div>
      </div>
    </Router>
  );
}

export default App;
