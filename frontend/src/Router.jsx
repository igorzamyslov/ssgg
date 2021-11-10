import About from "@/pages/About";
import Main from "@/pages/Main";
import Result from "@/pages/Result";
import ga4 from "react-ga4";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import ym from "react-yandex-metrika";

export const routes = {
  resultPage: "/result",
  aboutPage: "/about",
  mainPage: "/",
};

export function createNavigationHandler(history, route, queryParams = {}) {
  let queryParamsString = new URLSearchParams(queryParams).toString();
  if (queryParamsString) {
    queryParamsString = `?${queryParamsString}`;
  }
  // Log yandex metrics navigation
  return () => {
    ga4.send({ hitType: "pageview", page: route });
    ym("hit", route, { params: queryParams });
    history.push({
      pathname: route,
      search: queryParamsString,
    });
  };
}

export const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path={routes.resultPage} component={Result} />
      <Route exact path={routes.mainPage} component={Main} />
      <Route exact path={routes.aboutPage} component={About} />
      <Redirect to={routes.mainPage} />
    </Switch>
  </BrowserRouter>
);
