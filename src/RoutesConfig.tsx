import React from 'react';

import { Route, Routes } from "react-router-dom";

import { ROUTES } from "./constants/Routes";

export default function RoutesConfig() {
  const renderedRoutes = ROUTES.map((route) => (
    <Route
      key={route.path}
      path={route.path}
      element={(
        <route.guard>
          <route.component />
        </route.guard>
      )}
    />
  ));

  return <Routes>{renderedRoutes}</Routes>;
}
