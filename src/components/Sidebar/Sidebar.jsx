import React from 'react'
import styled from 'styled-components'
import { Home, CheckSquare, Bookmark } from 'react-feather'
import { UnstyledLink } from '../../styles/link.styled'
import { bulmaColors } from '../../styles/bulma.colors'

const pageOptions = {
  sidebarWidth: "20%",
  timelineWidth: "120px",
  topbarHeight: "85px", // includes padding
  bottombarHeight: "56px", // includes 8px top/bot padding
  toolbarHeight: "40px",
}

export const Sidebar = () => {
  return (
    <StyledSidebar>
      <header className="sidebar-header">
        <h1 className="app-title">Idle Time</h1>
      </header>
      <div className="sidebar-body">
        <nav className="sidebar-nav" role="navigation">
          <UnstyledLink to="/" className="nav-item">
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
    </StyledSidebar>
  )
}


const StyledSidebar = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: ${pageOptions.sidebarWidth};
  background: ${bulmaColors.light};
  border-right: 1px solid rgba(0,0,0,.02);

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
          transition: background-color .2s ease-in-out;
        }
      }
    }
  }
`
