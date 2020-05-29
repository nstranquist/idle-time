import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useLocation } from 'react-router-dom'
import { Home, CheckSquare, Bookmark } from 'react-feather'
import { UnstyledLink } from '../../styles/link.styled'
import { bulmaColors } from '../../styles/bulma.colors'

const pageOptions = {
  sidebarWidth: "20%",
  sidebarWidthClosed: "98px", // 30px padding + 44px icon size + 24px icon padding = 98px
  timelineWidth: "120px",
  topbarHeight: "85px", // includes padding
  bottombarHeight: "56px", // includes 8px top/bot padding
  toolbarHeight: "40px",
  iconSize: 44
}


export const Sidebar = ({
  sidebarOpen,
}) => {
  const location = useLocation()

  useEffect(() => {
    console.log('location:', location)
  }, [location])

  return (
    <StyledSidebar className={sidebarOpen ? "sidebar" : "sidebar closed"}>
      <header className="sidebar-header">
        <h1 className="app-title">{sidebarOpen ? "Idle Time" : "IT"}</h1>
      </header>
      <div className="sidebar-body">
        <nav className="sidebar-nav" role="navigation">
          <UnstyledLink to="/" className={(location.pathname === "/home" || location.pathname === "/") ? "nav-item active" : "nav-item"}>
            <Home size={pageOptions.iconSize} />
          </UnstyledLink>
          <UnstyledLink to="/tasks" className={location.pathname === "/tasks" ? "nav-item active" : "nav-item"}>
            <CheckSquare size={pageOptions.iconSize} />
          </UnstyledLink>
          <UnstyledLink to="/presets" className={location.pathname === "/presets" ? "nav-item active" : "nav-item"}>
            <Bookmark size={pageOptions.iconSize} />
          </UnstyledLink>
        </nav>
      </div>
    </StyledSidebar>
  )
}

const StyledSidebar = styled.div`
  transition: .2s ease-in-out;

  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: ${pageOptions.sidebarWidth};
  background: ${bulmaColors.light};
  border-right: 1px solid rgba(0,0,0,.02);
  max-width: 350px;

  &.closed {
    width: ${pageOptions.sidebarWidthClosed};

    // .sidebar-header { visibility: hidden; }
  }

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

        &.active {
          background: rgba(0,0,0,.09);
          transition: background-color .1s ease-in-out;
        }
      }
    }
  }
`
