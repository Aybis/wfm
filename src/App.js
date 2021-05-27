/** @format */
import Authenticated from "components/Routes/Authenticated";
import { createBrowserHistory } from "history";
import Forgot from "pages/Forgot";
import Index from "pages/Index";
import { Route, Router, Switch } from "react-router-dom";
import Gate from "./components/Routes/Gate";
import Unauthenticated from "./pages/401";
import NotFound from "./pages/404";
import Login from "./pages/Login";

function App() {
  const history = createBrowserHistory({ basename: process.env.PUBLIC_URL });

  return (
    <>
      <Router history={history}>
        <Switch>
          <Gate path="/login" component={Login}></Gate>
          <Gate path="/private" component={Unauthenticated}></Gate>
          <Route path="/forgot" component={Forgot}></Route>

          <Authenticated path="/" component={Index}></Authenticated>
          <Route path="*" component={NotFound}></Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
