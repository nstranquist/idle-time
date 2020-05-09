import React, { Suspense, lazy } from 'react';
import styled from 'styled-components'
import { Route, Switch } from 'react-router-dom'
import { PageNotFound } from './components/PageNotFound'
// icon imports
import { TopBar } from './components/TopBar';
import { Sidebar } from './components/Sidebar';

const pageOptions = {
  sidebarWidth: "20%",
  timelineWidth: "120px",
  topbarHeight: "85px", // includes padding
  bottombarHeight: "56px", // includes 8px top/bot padding
  toolbarHeight: "40px",
}

function App() {
  return (
    <StyledApp>

      {/* Sidebar */}
      <Sidebar />

      {/* Main Section */}
      <div className="content">

        {/* TopBar */}
        <TopBar />

        {/* Content View */}
        <main className="page-inner">
          <Suspense fallback={<></>}>
            <Switch>
              <Route exact path="/" component={lazy(() => import('./pages/Home'))} />
              <Route exact path="/home" component={lazy(() => import('./pages/Home'))} />
              <Route exact path="/tasks" component={lazy(() => import('./pages/Tasks'))} />
              <Route exact path="/presets" component={lazy(() => import('./pages/Presets'))} />
              <Route path="/" component={PageNotFound} />
            </Switch>
          </Suspense>
        </main>
      </div>

    </StyledApp>
  );
}

export default App;


const StyledApp = styled.div`
  .content {
    margin-left: ${pageOptions.sidebarWidth};

    .page-inner {
      padding-top: 16px;
      padding-bottom: ${pageOptions.bottombarHeight}; // makes room for bottom bar
    }
  }
`
