import React, { Suspense, lazy } from 'react';
import styled from 'styled-components'
import { Route, Switch } from 'react-router-dom'
import { PageNotFound } from './components/PageNotFound'
import { bulmaColors } from './styles/bulma.colors'
import { UnstyledLink } from './styles/link.styled'
// icon imports
import {
  Menu, Bell, User, // topbar icons
  Home, CheckSquare, Bookmark, // sidebar icons
  PlusCircle, // toolbar icons
} from 'react-feather'

const pageOptions = {
  sidebarWidth: "20%",
  timelineWidth: "120px",
  topbarHeight: "85px", // includes padding
  bottombarHeight: "56px",
  toolbarHeight: "40px",
}

function App() {
  return (
    <StyledApp>

      {/* Sidebar */}
      <div className="sidebar">
        <header className="sidebar-header">
          <h1 className="app-title">Idle Time</h1>
        </header>
        <div className="sidebar-body">
          <nav className="sidebar-nav" role="navigation">
            <UnstyledLink to="/home" className="nav-item">
              <Home size={44} />
            </UnstyledLink>
            <UnstyledLink to="/tasks" className="nav-item">
              <CheckSquare size={44} />
            </UnstyledLink>
            <UnstyledLink to="/presets" className="nav-item"> {/* or "Notes"(?) */}
              <Bookmark size={44} />
            </UnstyledLink>
          </nav>
        </div>
      </div>

      {/* Main Section */}
      <div className="content">

        {/* TopBar */}
        <StyledTopbar className="top-bar">
          <div className="topbar-left">
            <div className="menu-icon">
              <Menu size={32} />
            </div>
            <h3>Today,</h3>
          </div>
          <div className="topbar-right">
            {/* Week/Day Toggle */}
            <div className="week-day-toggle">
              <button className="button is-primary has-text-white">W</button>
              <button className="button is-info has-text-white">D</button>
            </div>
            <div className="icon-container">
              <Bell size={26} />
            </div>
            <div className="icon-container">
              <User size={26} />
            </div>
          </div>
        </StyledTopbar>

        {/* Content View */}
        <main>
          {/* Component START */}
          <div className="page-inner idle-time-page">

            {/* Content-Left */}
            <div className="section-left">
              {/* Timeline */}
              <div className="timeline">
                timeline
              </div>
            </div>

            {/* Content-Right */}
            <div className="section-right">
              {/* Toolbar */}
              <div className="toolbar">
                toolbar
              </div>
              {/* Task Cards */}
              <div className="task-cards">
                <div className="task-card">
                  <h3 className="task-card-title">Card Title</h3>
                  <p className="task-card-note has-gray-text">Card Note</p>
                </div>
              </div>
              {/* Add Task Button */}
              <div className="add-button-container">
                <button className="button add-task-button is-primary is-regular">
                  <span className="icon is-large">
                    <PlusCircle size={24} />
                  </span>
                  <span style={{fontSize:20,fontWeight:800,marginLeft:6}}>Add</span>
                </button>
              </div>
            </div>

            {/* BottomBar */}
            <div className="bottom-bar">
              bottom bar
            </div>
          </div>
        </main>
      </div>

      {/* <Suspense fallback={<></>}>
        <Switch>
          <Route exact path="/" component={lazy(() => import('./pages/Home'))} />
          <Route exact path="/home" component={lazy(() => import('./pages/Home'))} />
          <Route exact path="/tasks" component={lazy(() => import('./pages/Tasks'))} />
          <Route exact path="/presets" component={lazy(() => import('./pages/Presets'))} />
          <Route path="/" component={PageNotFound} />
        </Switch>
      </Suspense> */}
    </StyledApp>
  );
}

export default App;

const StyledApp = styled.div`


  .sidebar {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: ${pageOptions.sidebarWidth};
    background: ${bulmaColors.light};

    .sidebar-header {
      padding: 16px;
      padding-top: 20px;
      
      .app-title {
        color: ${bulmaColors.warning};
        font-family: Montserrat;
        font-style: italic;
        font-weight: bold;
        // border: 2px solid #000;
        text-shadow: -2px 0 black, 0 2px black, 2px 0 black, 0 -2px black;
        font-size: 64px;
        line-height: 68px;
        text-align: center;
        word-spacing: 9999rem; // makes sure "Idle" and "Time" are always on separate lines
      }
    }
    .sidebar-body {
      margin-top: 12px;
      padding: 10px 15px;

      .sidebar-nav {
        display: flex;
        flex-direction: column;
        align-items: stretch;
        text-align: center;

        .nav-item {
          height: 60px;
          margin-top: 18px;
          margin-bottom: 18px;
          padding: 8px 12px;
          color: rgba(0,0,0,.77);
          font-weight: 300;
          border-radius: 4px;
          background: transparent;
          transition: background .2s ease-in-out;

          &:hover {
            background: rgba(0,0,0,.09);
            transition: background .2s ease-in-out;
          }
        }
      }
    }
  }
  .content {
    margin-left: ${pageOptions.sidebarWidth};

    .page-inner {
      padding-top: 16px;
      padding-bottom: ${pageOptions.bottombarHeight}; // makes room for bottom bar
    }
    .idle-time-page {
      position: relative;
      height: calc(100vh - 85px);

      .section-left {
        width: ${pageOptions.timelineWidth};
        height: 100%;
        float: left;
        border-right: 1px solid rgba(0,0,0,.09);
      }
      .section-right {
        margin-left: ${pageOptions.timelineWidth};
        height: 100%;
        padding-left: 20px;
        padding-right: 20px; // remove if using overflow side-scroll for kanban

        .toolbar {
          border: 1px solid rgba(0,0,0,.17);
          margin-bottom: 12px;
          padding: 6px 12px;
          height: ${pageOptions.toolbarHeight};
        }
        .task-cards {
          // bottombar: 56px, toolbar: 40px + 12px margin, addButton: 40px + 12px margin, topbar: 85px, containerPadding: 16px
          // = 56px + 52px + 52px + 85px + 16px
          max-height: calc(100vh - 56px - 104px - 85px - 16px);

          .task-card {
            padding: 12px 20px; // NOTE: adjust the padding to make responsive
            background: ${bulmaColors.light};
            border: 1px solid rgba(0,0,0,.17);
            border-radius: 8px;

            .task-card-title {
              font-size: 26px;
              line-height: 32px;
              font-weight: 500;
              font-family: montserrat;
              font-style: normal;
              color: #000;
            }
            .task-card-note {
              font-size: 20px;
              line-height: 24px;
              color: #000;
              font-family: montserrat;
              font-style: normal;
              font-weight: normal;
            }
          }
        }
        .add-button-container {
          margin-top: 12px;
          text-align: center;

          .add-task-button {
            // border-radius: 0;
            font-family: montserrat, sans-serif;
            font-style: normal;
          }
        }
      }

      .bottom-bar {
        height: ${pageOptions.bottombarHeight};
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        border-top: 1px solid rgba(0,0,0,.09);
        // layout
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-left: 16px;
        padding-right: 16px;
      }
    }
  }
`

const StyledTopbar = styled.div`
  padding: 18px 14px;
  border-bottom: 1px solid rgba(0,0,0,.17);
  // layout:
  display: flex;
  justify-content: space-between;
  align-items: center;

  .topbar-left {
    display: flex;
    align-items: center;

    h3 {
      margin: 0;
      padding-top: 0;
      padding-bottom: 0;
      padding-left: 16px;
      padding-right: 6px;
      font-weight: 400;
      font-size: 28px;
      color: #000;
    }
  }
  .menu-icon {
    // border: 1px solid rgba(0,0,0,.12);
    background: #fff;
    cursor: pointer;
    height: 48px;
    width: 48px;
    padding: 8px;
    border-radius: 50%;
    transition: background .2s ease-in-out;

    &:hover {
      background: rgba(0,0,0,.07);
      transition: background .2s ease-in-out;
    }
  }
  .icon-container {
    background: #fff;
    cursor: pointer;
    height: 38px;
    width: 38px;
    padding: 6px;
    border-radius: 50%;
    transition: background .2s ease-in-out;
    margin-left: 2px;
    margin-right: 2px;

    &:hover {
      background: rgba(0,0,0,.07);
      transition: background .2s ease-in-out;
    }
  }

  .topbar-right {
    display: flex;
    align-items: center;
    
    .week-day-toggle {
      margin: 0;
      margin-right: 12px;

      .button {
        font-size: 18px;
        line-height: 18px;
        height: 26px;
        padding-top: 0;
        padding-bottom: 0;
        padding-left: .9em;
        padding-right: .9em;
        display: inline-block;
      }
      .button:first-child {
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
      }
      .button:last-child {
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
      }
    }
  }
`