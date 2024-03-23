// DO NOT EDIT. This file is generated by Fresh.
// This file SHOULD be checked into source version control.
// This file is automatically updated during development when running `dev.ts`.

import * as $_404 from "./routes/_404.tsx";
import * as $_app from "./routes/_app.tsx";
import * as $_layout from "./routes/_layout.tsx";
import * as $_middleware from "./routes/_middleware.ts";
import * as $api_joke from "./routes/api/joke.ts";
import * as $api_project_upload from "./routes/api/project/upload.ts";
import * as $api_rpc_op_ from "./routes/api/rpc/[op].ts";
import * as $auth_github_callback from "./routes/auth/github/callback.ts";
import * as $auth_github_index from "./routes/auth/github/index.ts";
import * as $auth_logout from "./routes/auth/logout.ts";
import * as $derived_projectId_ from "./routes/derived/[projectId].tsx";
import * as $development from "./routes/development.tsx";
import * as $greet_name_ from "./routes/greet/[name].tsx";
import * as $index from "./routes/index.tsx";
import * as $local_work from "./routes/local-work.tsx";
import * as $project_projectId_ from "./routes/project/[projectId].tsx";
import * as $self_projects from "./routes/self-projects.tsx";
import * as $settings from "./routes/settings.tsx";
import * as $ChildProjectsListPage from "./islands/ChildProjectsListPage.tsx";
import * as $Counter from "./islands/Counter.tsx";
import * as $DevelopmentPage from "./islands/DevelopmentPage.tsx";
import * as $LocalProjectPage from "./islands/LocalProjectPage.tsx";
import * as $MainLayout from "./islands/MainLayout.tsx";
import * as $ProjectDetailPage from "./islands/ProjectDetailPage.tsx";
import * as $ProjectListPage from "./islands/ProjectListPage.tsx";
import * as $SettingsPage from "./islands/SettingsPage.tsx";
import * as $SiteContextProvider from "./islands/SiteContextProvider.tsx";
import { type Manifest } from "$fresh/server.ts";

const manifest = {
  routes: {
    "./routes/_404.tsx": $_404,
    "./routes/_app.tsx": $_app,
    "./routes/_layout.tsx": $_layout,
    "./routes/_middleware.ts": $_middleware,
    "./routes/api/joke.ts": $api_joke,
    "./routes/api/project/upload.ts": $api_project_upload,
    "./routes/api/rpc/[op].ts": $api_rpc_op_,
    "./routes/auth/github/callback.ts": $auth_github_callback,
    "./routes/auth/github/index.ts": $auth_github_index,
    "./routes/auth/logout.ts": $auth_logout,
    "./routes/derived/[projectId].tsx": $derived_projectId_,
    "./routes/development.tsx": $development,
    "./routes/greet/[name].tsx": $greet_name_,
    "./routes/index.tsx": $index,
    "./routes/local-work.tsx": $local_work,
    "./routes/project/[projectId].tsx": $project_projectId_,
    "./routes/self-projects.tsx": $self_projects,
    "./routes/settings.tsx": $settings,
  },
  islands: {
    "./islands/ChildProjectsListPage.tsx": $ChildProjectsListPage,
    "./islands/Counter.tsx": $Counter,
    "./islands/DevelopmentPage.tsx": $DevelopmentPage,
    "./islands/LocalProjectPage.tsx": $LocalProjectPage,
    "./islands/MainLayout.tsx": $MainLayout,
    "./islands/ProjectDetailPage.tsx": $ProjectDetailPage,
    "./islands/ProjectListPage.tsx": $ProjectListPage,
    "./islands/SettingsPage.tsx": $SettingsPage,
    "./islands/SiteContextProvider.tsx": $SiteContextProvider,
  },
  baseUrl: import.meta.url,
} satisfies Manifest;

export default manifest;
