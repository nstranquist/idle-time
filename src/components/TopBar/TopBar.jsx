import React, { useState } from 'react'
import styled from 'styled-components'
import { Menu, Bell, User } from 'react-feather'
import { bulmaColors } from '../../styles/bulma.colors'

export const TopBar = ({
  sidebarOpen,
  openSidebar,
  closeSidebar,
}) => {
  const [activeDisplay, setActiveDisplay] = useState("day")
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [showNotifMenu, setShowNotifMenu] = useState(false)

  const handleToggleSidebar = () => {
    // If open, close it. If closed, open it
    if(sidebarOpen)
      closeSidebar()
    else
      openSidebar()
  }

  return (
    <StyledTopbar className="top-bar bar">
      <div className="topbar-left">
        <div className="menu-icon"
          onClick={handleToggleSidebar} >
          <Menu size={32} />
        </div>
        <h3 className="date-text">Today,</h3>
      </div>
      <div className="topbar-right">
        {/* Week/Day Toggle */}
        <div className="week-day-toggle" onClick={(e) => setActiveDisplay(e.target.name)}>
          {/* NOTE: if active, keep as is, but if not, leave background white, with color coming in on hover */}
          <button name="week" className={activeDisplay === "week" ? "button is-primary has-text-white" : "button primary-inactive"}>
            W</button>
          <button name="day" className={activeDisplay === "day" ? "button is-info has-text-white" : "button info-inactive"}>
            D</button>
        </div>
        <div className="dropdown is-right is-hoverable">
          <div className="icon-container dropdown-trigger" aria-haspopup="true" aria-controls="dropdown-menu-notifications"
            onClick={() => setShowNotifMenu(!showNotifMenu)}>
            {/* include red-circle "snack" top-right of Bell icon? */}
            <Bell size={26}  className="dropdown" />
          </div>
          <div className="dropdown-menu" role="menu">
            <div className="dropdown-content">
              <div className="dropdown-item">
                <p>An Item That is Dropped Down</p>
              </div>
              <div style={{padding: 12}}>
                Other content :)
              </div>
            </div>
          </div>
        </div>
        <div className="dropdown is-right is-hoverable">
          <div className="icon-container dropdown-trigger" aria-haspopup="true" aria-controls="dropdown-menu-notifications"
            onClick={() => setShowUserMenu(!showUserMenu)}>
            {/* include chevron-down next to User icon? */}
            <User size={26} />
          </div>
          <div className="dropdown-menu" role="menu">
            <div className="dropdown-content">
              <div className="dropdown-item">
                <p className="hoverboard-item">Profile</p>
              </div>
              <div className="dropdown-item">
                <p className="hoverboard-item">Settings</p>
              </div>
              <div className="dropdown-item">
                <p className="hoverboard-item">Delete your account</p>
              </div>
              <div style={{padding: 12}}>
                Other content :)
              </div>
            </div>
          </div>
        </div>
      </div>
    </StyledTopbar>
  )
}

const StyledTopbar = styled.div`
  transition: .2s ease-in-out;

  padding: 18px 14px;
  border-bottom: 1px solid rgba(0,0,0,.17);
  display: flex;
  justify-content: space-between;
  align-items: center;

  .dropdown-menu {
    border: 1px solid rgba(22,22,22,.1);
  }

  .dropdown-item {
    cursor: pointer;
    background-color: #fff;
    transition: .12s ease-in-out;

    &:hover {
      background-color: ${bulmaColors.light};
      transition: .2s ease-in-out;
    }
  }
  // .hoverboard-item {  }

  .topbar-left {
    display: flex;
    align-items: center;

    h3.date-text {
      margin: 0;
      padding-top: 0;
      padding-bottom: 0;
      padding-left: 16px;
      padding-right: 6px;
      font-weight: 500;
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
    cursor: pointer;
    height: 38px;
    width: 38px;
    margin-left: 2px;
    margin-right: 2px;
    padding: 6px;
    border-radius: 50%;
    background-color: #fff;
    transition: background-color .2s ease-in-out;

    &:hover {
      background-color: rgba(0,0,0,.07);
      transition: background-color .2s ease-in-out;
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
      .button.primary-inactive {
        &:hover {
          color: #fff;
          border-color: ${bulmaColors.primary};
          background-color: ${bulmaColors.primary};
          transition: background-color border-color .15s ease-in-out;
        }
      }
      .button.info-inactive {
        &:hover {
          color: #fff;
          border-color: ${bulmaColors.info};
          background-color: ${bulmaColors.info};
          transition: background-color border-color .15s ease-in-out;
        }
      }
    }
  }
`