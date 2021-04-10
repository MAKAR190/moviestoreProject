import { lazy } from "react";

export const urls = {
  home: "/",
  movies: "/movies",
  movieDetails: "/movies/:id",
};
const routes = [
  {
    path: urls.home,
    exact: true,
    component: lazy(() => import("./views/Home")),
    label: "Home",
  },
  {
    path: urls.movies,
    exact: true,
    component: lazy(() => import("./views/Movies")),
    label: "Movies",
  },
  {
    path: urls.movieDetails,
    exact: true,
    component: lazy(() => import("./views/MovieDetails")),
  },
];
export default routes;
