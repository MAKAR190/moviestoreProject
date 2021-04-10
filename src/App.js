import { Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import routes from "./routes";
import Navigation from "./components/Navigation/Navigation";
import Spinner from "./components/Spinner/Spinner";
function App() {
  return (
    <Suspense fallback={<Spinner />}>
      <Navigation />
      <Switch>
        {routes.map((page) => (
          <Route {...page} key={page.path} />
        ))}
      </Switch>
    </Suspense>
  );
}

export default App;
