import React, { Suspense, lazy } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { Route, Switch } from "react-router-dom";
import { PageNotFound } from "./pages/PageNotFound";
// icon imports
import { TopBar } from "./components/TopBar";
import { Sidebar } from "./components/Sidebar";
import { openSidebar, closeSidebar } from "./store/UI";
import { pageOptions } from './styles/pageOptions'

// Perhaps: put sidebar and layout container code here

const App = ({ sidebarOpen, openSidebar, closeSidebar }) => {
  return (
    <StyledApp>
      {/* Sidebar */}
      <Sidebar
        pageStyles={{
          width: pageOptions.sidebarWidth,
          widthClosed: pageOptions.sidebarWidthClosed,
          iconSize: pageOptions.iconSize,
        }}
        sidebarOpen={sidebarOpen}
      />

      {/* Main Section */}
      <div className="content" style={{marginLeft: sidebarOpen ? pageOptions.sidebarWidth : pageOptions.sidebarWidthClosed}}>
        {/* TopBar */}
        <TopBar
          sidebarOpen={sidebarOpen}
          openSidebar={openSidebar}
          closeSidebar={closeSidebar}
        />

        {/* Content View */}
        <main className="page-inner">
          <Suspense fallback={<></>}>
            <Switch>
              <Route
                exact
                path="/"
                component={lazy(() => import("./pages/Home"))}
              />
              <Route
                exact
                path="/home"
                component={lazy(() => import("./pages/Home"))}
              />
              <Route
                exact
                path="/tasks"
                component={lazy(() => import("./pages/Tasks"))}
              />
              <Route
                path="/tasks/:taskId"
                component={lazy(() => import("./pages/Tasks/TaskDetail"))}
              />
              <Route
                exact
                path="/presets"
                component={lazy(() => import("./pages/Presets"))}
              />

              {/* Auth Routes */}
              <Route
                exact
                path="/login"
                component={lazy(() => import("./pages/Auth/Login"))}
              />
              <Route
                exact
                path="/signup"
                component={lazy(() => import("./pages/Auth/SignUp"))}
              />
              <Route
                exact
                path="/reset-password"
                component={lazy(() => import("./pages/Auth/ResetPassword"))}
              />

              <Route path="/" component={PageNotFound} />
            </Switch>
          </Suspense>
        </main>
      </div>
    </StyledApp>
  );
};

const mapStateToProps = (state) => ({
  sidebarOpen: state.ui.sidebarOpen,
});

export const ConnectedApp = connect(mapStateToProps, {
  openSidebar,
  closeSidebar,
})(App);

export default ConnectedApp;

const StyledApp = styled.div`
  .content {
    transition: 0.2s ease-in-out;

    .page-inner {
      padding-top: 16px;
      padding-bottom: ${pageOptions.bottombarHeight}; // makes room for bottom bar
    }
  }

  @media (min-width: 1400px) {
    .content {
      margin-left: 350px;
    }
  }
`;
