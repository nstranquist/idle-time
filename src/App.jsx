import React, { Suspense, lazy } from "react";
import { connect } from "react-redux";
import { TimerProvider } from './context/IdleTimer'
import styled from "styled-components";
import { Route, Switch, Redirect } from "react-router-dom";
import { GuestPageNotFound, AuthPageNotFound } from "./pages/PageNotFound";
// component imports
import { TopBar } from "./components/TopBar";
import { Sidebar } from "./components/Sidebar";
import { bulmaColors } from './styles/bulma.colors'
import { pageOptions } from './styles/pageOptions'
import { openSidebar, closeSidebar } from "./store/UI";
import { selectSidebarOpen } from "./store/UI/selectors";
import { selectIsSignedIn } from "./store/Auth/selectors";

import { Login, SignUp, ResetPassword } from './pages/Auth'

// Perhaps: put sidebar and layout container code here

const App = ({ 
  isSignedIn,
  sidebarOpen,
  openSidebar,
  closeSidebar,
}) => {

  if(isSignedIn === false) {
    return (
      <GuestApp>
        <Switch>
          <Route
            exact
            path="/"
            component={Login}
          />
          <Route
            exact
            path="/login"
            component={Login}
          />
          <Route
            exact
            path="/signup"
            component={SignUp}
          />
          <Route
            exact
            path="/reset-password"
            component={ResetPassword}
          />
          <Route path="/" component={GuestPageNotFound} />
        </Switch>
      </GuestApp>
    )
  }
  return (
    <StyledApp>
      <Sidebar
        pageStyles={{
          width: pageOptions.sidebarWidth,
          widthClosed: pageOptions.sidebarWidthClosed,
          iconSize: pageOptions.iconSize,
        }}
        sidebarOpen={sidebarOpen}
      />

      {/* Main Section */}
      <TimerProvider>
        <div className="content" style={{marginLeft: sidebarOpen ? pageOptions.sidebarWidth : pageOptions.sidebarWidthClosed}}>
          <TopBar
            sidebarOpen={sidebarOpen}
            openSidebar={openSidebar}
            closeSidebar={closeSidebar}
            // notifications={notifications}
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
                  path="/login"
                  component={() => <Redirect to="/home" />}
                />
                <Route
                  exact
                  path="/time-tracking"
                  component={lazy(() => import("./pages/TimeTracking"))}
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
                <Route
                  exact
                  path="/profile"
                  component={lazy(() => import("./pages/Profile"))}
                />
                <Route
                  exact
                  path="/settings"
                  component={lazy(() => import("./pages/Settings"))}
                />
                <Route path="/" component={AuthPageNotFound} />
              </Switch>
            </Suspense>
          </main>
        </div>
      </TimerProvider>
    </StyledApp>
  );
};

const mapStateToProps = (state) => ({
  isSignedIn: selectIsSignedIn(state),
  sidebarOpen: selectSidebarOpen(state),
});

export const ConnectedApp = connect(
  mapStateToProps,
  { openSidebar, closeSidebar },
)(App);

export default ConnectedApp;

const GuestApp = styled.div`
  position: relative;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  background-color: ${bulmaColors.light};
`

const StyledApp = styled.div`
  // min-height: 100vh;

  .content {
    // height: 100vh;
    transition: 0.2s ease-in-out;

    .page-inner {
      // height: calc(100% - 85px);
      // max-height: calc(100% - 85px);
      // padding-top: 16px;
      // padding-bottom: ${pageOptions.bottombarHeight}; // makes room for bottom bar
      overflow-y: auto;
      min-height: 100%;
    }
  }

  @media (min-width: 1400px) {
    .content {
      margin-left: 350px;
    }
  }
`;
