import React from 'react'
import styled from 'styled-components'
import { useLocation } from 'react-router-dom'
import { Home, CheckSquare, Bookmark } from 'react-feather'
import { UnstyledLink } from '../../styles/components/link.styled'
import { bulmaColors } from '../../styles/bulma.colors'


export const Sidebar = ({
  pageStyles: {
    width,
    widthClosed,
    iconSize,
  },
  sidebarOpen,
}) => {
  const location = useLocation()

  return (
    <StyledSidebar className="sidebar" style={{width: sidebarOpen ? width : widthClosed}}>
      <header className="sidebar-header">
        <h1 className="app-title">{sidebarOpen ? "Idle Time" : "IT"}</h1>
      </header>
      <div className="sidebar-body">
        <nav className="sidebar-nav" role="navigation">
          <UnstyledLink to="/" className={(location.pathname === "/home" || location.pathname === "/") ? "nav-item active" : "nav-item"}>
            <Home size={iconSize} />
          </UnstyledLink>
          <UnstyledLink to="/tasks" className={location.pathname === "/tasks" ? "nav-item active" : "nav-item"}>
            <CheckSquare size={iconSize} />
          </UnstyledLink>
          <UnstyledLink to="/presets" className={location.pathname === "/presets" ? "nav-item active" : "nav-item"}>
            <Bookmark size={iconSize} />
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
  // width: width;
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

        &.active {
          background: rgba(0,0,0,.09);
          transition: background-color .1s ease-in-out;
        }
      }
    }
  }

  @media(max-width: 800px) {
    .app-title {
      font-size: 20px;
    }
  }
  @media(min-width: 1400px) {
    width: 350px;
    max-width: 350px;
  }
`
