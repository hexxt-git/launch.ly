/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

import { Route as rootRouteImport } from './routes/__root'
import { Route as AppRouteRouteImport } from './routes/app/route'
import { Route as IndexRouteImport } from './routes/index'
import { Route as AppIndexRouteImport } from './routes/app/index'
import { Route as AppProjectsIndexRouteImport } from './routes/app/projects/index'
import { Route as AppToolsIdeaGeneratorRouteImport } from './routes/app/tools/idea-generator'
import { Route as AppProjectsProjectIdIndexRouteImport } from './routes/app/projects/$projectId/index'
import { Route as AppProjectsProjectIdRefine_ideaRouteImport } from './routes/app/projects/$projectId/refine_idea'
import { Route as AppProjectsProjectIdPlannerRouteImport } from './routes/app/projects/$projectId/planner'
import { Route as AppProjectsProjectIdEditRouteImport } from './routes/app/projects/$projectId/edit'

const AppRouteRoute = AppRouteRouteImport.update({
  id: '/app',
  path: '/app',
  getParentRoute: () => rootRouteImport,
} as any)
const IndexRoute = IndexRouteImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRouteImport,
} as any)
const AppIndexRoute = AppIndexRouteImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => AppRouteRoute,
} as any)
const AppProjectsIndexRoute = AppProjectsIndexRouteImport.update({
  id: '/projects/',
  path: '/projects/',
  getParentRoute: () => AppRouteRoute,
} as any)
const AppToolsIdeaGeneratorRoute = AppToolsIdeaGeneratorRouteImport.update({
  id: '/tools/idea-generator',
  path: '/tools/idea-generator',
  getParentRoute: () => AppRouteRoute,
} as any)
const AppProjectsProjectIdIndexRoute =
  AppProjectsProjectIdIndexRouteImport.update({
    id: '/projects/$projectId/',
    path: '/projects/$projectId/',
    getParentRoute: () => AppRouteRoute,
  } as any)
const AppProjectsProjectIdRefine_ideaRoute =
  AppProjectsProjectIdRefine_ideaRouteImport.update({
    id: '/projects/$projectId/refine_idea',
    path: '/projects/$projectId/refine_idea',
    getParentRoute: () => AppRouteRoute,
  } as any)
const AppProjectsProjectIdPlannerRoute =
  AppProjectsProjectIdPlannerRouteImport.update({
    id: '/projects/$projectId/planner',
    path: '/projects/$projectId/planner',
    getParentRoute: () => AppRouteRoute,
  } as any)
const AppProjectsProjectIdEditRoute =
  AppProjectsProjectIdEditRouteImport.update({
    id: '/projects/$projectId/edit',
    path: '/projects/$projectId/edit',
    getParentRoute: () => AppRouteRoute,
  } as any)

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/app': typeof AppRouteRouteWithChildren
  '/app/': typeof AppIndexRoute
  '/app/tools/idea-generator': typeof AppToolsIdeaGeneratorRoute
  '/app/projects': typeof AppProjectsIndexRoute
  '/app/projects/$projectId/edit': typeof AppProjectsProjectIdEditRoute
  '/app/projects/$projectId/planner': typeof AppProjectsProjectIdPlannerRoute
  '/app/projects/$projectId/refine_idea': typeof AppProjectsProjectIdRefine_ideaRoute
  '/app/projects/$projectId': typeof AppProjectsProjectIdIndexRoute
}
export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/app': typeof AppIndexRoute
  '/app/tools/idea-generator': typeof AppToolsIdeaGeneratorRoute
  '/app/projects': typeof AppProjectsIndexRoute
  '/app/projects/$projectId/edit': typeof AppProjectsProjectIdEditRoute
  '/app/projects/$projectId/planner': typeof AppProjectsProjectIdPlannerRoute
  '/app/projects/$projectId/refine_idea': typeof AppProjectsProjectIdRefine_ideaRoute
  '/app/projects/$projectId': typeof AppProjectsProjectIdIndexRoute
}
export interface FileRoutesById {
  __root__: typeof rootRouteImport
  '/': typeof IndexRoute
  '/app': typeof AppRouteRouteWithChildren
  '/app/': typeof AppIndexRoute
  '/app/tools/idea-generator': typeof AppToolsIdeaGeneratorRoute
  '/app/projects/': typeof AppProjectsIndexRoute
  '/app/projects/$projectId/edit': typeof AppProjectsProjectIdEditRoute
  '/app/projects/$projectId/planner': typeof AppProjectsProjectIdPlannerRoute
  '/app/projects/$projectId/refine_idea': typeof AppProjectsProjectIdRefine_ideaRoute
  '/app/projects/$projectId/': typeof AppProjectsProjectIdIndexRoute
}
export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | '/app'
    | '/app/'
    | '/app/tools/idea-generator'
    | '/app/projects'
    | '/app/projects/$projectId/edit'
    | '/app/projects/$projectId/planner'
    | '/app/projects/$projectId/refine_idea'
    | '/app/projects/$projectId'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | '/app'
    | '/app/tools/idea-generator'
    | '/app/projects'
    | '/app/projects/$projectId/edit'
    | '/app/projects/$projectId/planner'
    | '/app/projects/$projectId/refine_idea'
    | '/app/projects/$projectId'
  id:
    | '__root__'
    | '/'
    | '/app'
    | '/app/'
    | '/app/tools/idea-generator'
    | '/app/projects/'
    | '/app/projects/$projectId/edit'
    | '/app/projects/$projectId/planner'
    | '/app/projects/$projectId/refine_idea'
    | '/app/projects/$projectId/'
  fileRoutesById: FileRoutesById
}
export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  AppRouteRoute: typeof AppRouteRouteWithChildren
}

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/app': {
      id: '/app'
      path: '/app'
      fullPath: '/app'
      preLoaderRoute: typeof AppRouteRouteImport
      parentRoute: typeof rootRouteImport
    }
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexRouteImport
      parentRoute: typeof rootRouteImport
    }
    '/app/': {
      id: '/app/'
      path: '/'
      fullPath: '/app/'
      preLoaderRoute: typeof AppIndexRouteImport
      parentRoute: typeof AppRouteRoute
    }
    '/app/projects/': {
      id: '/app/projects/'
      path: '/projects'
      fullPath: '/app/projects'
      preLoaderRoute: typeof AppProjectsIndexRouteImport
      parentRoute: typeof AppRouteRoute
    }
    '/app/tools/idea-generator': {
      id: '/app/tools/idea-generator'
      path: '/tools/idea-generator'
      fullPath: '/app/tools/idea-generator'
      preLoaderRoute: typeof AppToolsIdeaGeneratorRouteImport
      parentRoute: typeof AppRouteRoute
    }
    '/app/projects/$projectId/': {
      id: '/app/projects/$projectId/'
      path: '/projects/$projectId'
      fullPath: '/app/projects/$projectId'
      preLoaderRoute: typeof AppProjectsProjectIdIndexRouteImport
      parentRoute: typeof AppRouteRoute
    }
    '/app/projects/$projectId/refine_idea': {
      id: '/app/projects/$projectId/refine_idea'
      path: '/projects/$projectId/refine_idea'
      fullPath: '/app/projects/$projectId/refine_idea'
      preLoaderRoute: typeof AppProjectsProjectIdRefine_ideaRouteImport
      parentRoute: typeof AppRouteRoute
    }
    '/app/projects/$projectId/planner': {
      id: '/app/projects/$projectId/planner'
      path: '/projects/$projectId/planner'
      fullPath: '/app/projects/$projectId/planner'
      preLoaderRoute: typeof AppProjectsProjectIdPlannerRouteImport
      parentRoute: typeof AppRouteRoute
    }
    '/app/projects/$projectId/edit': {
      id: '/app/projects/$projectId/edit'
      path: '/projects/$projectId/edit'
      fullPath: '/app/projects/$projectId/edit'
      preLoaderRoute: typeof AppProjectsProjectIdEditRouteImport
      parentRoute: typeof AppRouteRoute
    }
  }
}

interface AppRouteRouteChildren {
  AppIndexRoute: typeof AppIndexRoute
  AppToolsIdeaGeneratorRoute: typeof AppToolsIdeaGeneratorRoute
  AppProjectsIndexRoute: typeof AppProjectsIndexRoute
  AppProjectsProjectIdEditRoute: typeof AppProjectsProjectIdEditRoute
  AppProjectsProjectIdPlannerRoute: typeof AppProjectsProjectIdPlannerRoute
  AppProjectsProjectIdRefine_ideaRoute: typeof AppProjectsProjectIdRefine_ideaRoute
  AppProjectsProjectIdIndexRoute: typeof AppProjectsProjectIdIndexRoute
}

const AppRouteRouteChildren: AppRouteRouteChildren = {
  AppIndexRoute: AppIndexRoute,
  AppToolsIdeaGeneratorRoute: AppToolsIdeaGeneratorRoute,
  AppProjectsIndexRoute: AppProjectsIndexRoute,
  AppProjectsProjectIdEditRoute: AppProjectsProjectIdEditRoute,
  AppProjectsProjectIdPlannerRoute: AppProjectsProjectIdPlannerRoute,
  AppProjectsProjectIdRefine_ideaRoute: AppProjectsProjectIdRefine_ideaRoute,
  AppProjectsProjectIdIndexRoute: AppProjectsProjectIdIndexRoute,
}

const AppRouteRouteWithChildren = AppRouteRoute._addFileChildren(
  AppRouteRouteChildren,
)

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  AppRouteRoute: AppRouteRouteWithChildren,
}
export const routeTree = rootRouteImport
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()
