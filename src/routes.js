import React from "react";
import { Redirect, NotFound} from "react-router-dom";

// Layout Types
import DashboardtLayout from "./components/dashboard_layout";

// Route Views
import BookManagement from "./components/pages/book-management/BookManagement";
import AuthorManagement from "./components/pages/author-management/AuthorManagement";

import PublicLayout from "./components/public_layout";
import EmptyLayout from "./components/empty_layout";
import Login from "./components/pages/auth/Login";
import Logout from "./components/pages/auth/Logout";

import Error404 from "./components/pages/errors/Error404"

export default [
  {
    path: "/",
    exact: true,
    layout: DashboardtLayout,
    component: () => <Redirect to="/book-management" />
  },
  {
    path: "/login",
    isAuth: false,
    layout: PublicLayout,
    component: Login
  },
  {
    path: "/logout",
    isAuth: false,
    layout: EmptyLayout,
    component: Logout
  },
  {
    path: "/book-management",
    isAuth: false,
    layout: DashboardtLayout,
    component: BookManagement
  },
  {
    path: "/author-management",
    isAuth: false,
    layout: DashboardtLayout,
    component: AuthorManagement
  },
  {
    path: "/not-found",
    layout: DashboardtLayout,
    component: Error404
  },
];
