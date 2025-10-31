import React from "react";

export interface AppRoute {
  link: string;        // URL ("" til index route / home page)
  title: string;       // link titel i navbars
  component: React.ReactElement; // "pages"
  showInNavbar?: boolean;  // false hvis siden ikke skal vises i navbar
}

import Landingpage from "./src/pages/Landingpage";
import Subpage from "./src/pages/Subpage";
import Podcast from "./src/pages/Podcast";
import Vejr from "./src/pages/Vejr";
import Sport from "./src/pages/Sport";
import Nyheder from "./src/pages/Nyheder";

import Login from "./src/pages/Login";
import Unauthorized from "./src/pages/Unauthorized";
import NotFound from "./src/pages/NotFound";

export const publicRoutes: AppRoute[] = [

  //nav
  { link: "", title: "", component: <Landingpage />, showInNavbar: false },
  { link: "artikel/:slug", title: "", component: <Subpage />, showInNavbar: false },
  { link: "nyheder", title: "Nyheder", component: <Nyheder /> },
  { link: "sport", title: "Sport", component: <Sport /> },
  { link: "vejr", title: "Vejr", component: <Vejr /> },
  { link: "podcast", title: "Podcast", component: <Podcast /> },

  { link: "login", title: "Login", component: <Login />, showInNavbar: false },
  { link: "unauthorized", title: "Unauthorized", component: <Unauthorized />, showInNavbar: false },
  { link: "*", title: "NotFound", component: <NotFound />, showInNavbar: false },
];

//admin pages
import AdminArticles from "./src/admin/Pages/AdminArticles";
import AdminPodcast from "./src/admin/Pages/AdminPodcast";

//admin nav
export const adminRoutes: AppRoute[] = [
  { link: "articles", title: "Articles", component: <AdminArticles /> },
  { link: "podcast", title: "Podcast", component: <AdminPodcast /> },
];