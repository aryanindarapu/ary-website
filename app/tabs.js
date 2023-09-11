'use client'

import "./styles.css";
import styles from './page.module.css'
import React, { useState } from "react";
import styled from "styled-components";
import s from "csd";
import { Page1, Page2 } from './pages'
import Blog from "./posts/blog";

const StyledTabIndicator = styled.div`
  position: absolute;
  width: ${(props) => 100 / props.tabCount}%;
  top: 100%;
  left: 0;

  transform: translate(${(props) => props.offset}, -100%);

  transition: transform ${(props) => props.duration}ms;

  border-top-style: solid;
  border-top-width: 1px;
`;

const StyledTab = styled.li`
  font-weight: 10000;
  flex: 1;
  height: 100%;
  border: none;

  button {
    cursor: pointer;
    transition: color 0.3s;
    color: ${(props) => (props.isFocused ? "#fff" : "#656565")};
    border: solid;
    border-radius: 6px;
    width: 75%;
    height: 100%;

    transition: 0.3s;

    &:hover {
        background-color: #656565;
        color: #fff;
        border-color: #656565;
    }

    background-color: ${(props) => (props.isFocused ? "#333333" : "rgba(0, 0, 0, 0)")};
    border-color: ${(props) => (props.isFocused ? "#333333" : "#656565")};
  }
`;

const Tab = ({ title, onClick, isFocused }) => {
  return (
    <StyledTab onClick={onClick} isFocused={isFocused}>
      <button className={styles.tabHeader}>{title}</button>
    </StyledTab>
  );
};

const StyledTabs = styled.div`
  position: relative;
  list-style: none;
  height: 30px;
  ${s.row}
`;

const Tabs = ({ focusedIdx, children, onChange, duration = 300 }) => {

  return (
    <>
      <StyledTabs>
        {React.Children.map(children, (child, i) =>
          React.cloneElement(child, {
            key: i,
            isFocused: focusedIdx === i,
            onClick: (e) => {
              onChange(i);
            }
          })
        )}
        {/* <StyledTabIndicator
          duration={duration}
          tabCount={children.length}
          offset={`${100 * focusedIdx}%`}
        /> */}
      </StyledTabs>
    </>
  );
};

const StyledOuterSliders = styled.div`
  overflow: hidden;
`;

const StyledSliders = styled.div`
  display: flex;
  flex-wrap: no-wrap;
  width: 100%;

  transform: translateX(${(props) => `${props.offset}%`});
  transition: transform ${(props) => props.duration}ms;

  div {
    flex-shrink: 0;
    width: 100%;
  }
`;

const Sliders = ({ focusedIdx, children, duration = 300 }) => {
  const offset = -100 * focusedIdx;

  return (
    <StyledOuterSliders>
      <StyledSliders offset={offset} duration={duration}>
        {children}
      </StyledSliders>
    </StyledOuterSliders>
  );
};

export const TabSliders = () => {
    const [focusedIdx, setFocusedIdx] = React.useState(0);

    return (
        <div className="tabbedArea">
            <Tabs focusedIdx={focusedIdx} onChange={setFocusedIdx}>
                <Tab title="Home" />
                <Tab title="Experience" />
                {/* <Tab title="Skills" /> */}
                <Tab title="Blog" />
            </Tabs>
            <Sliders focusedIdx={focusedIdx}>
                <Page1 />
                <Page2 />
                <Blog />
                {/* <Page4 /> */}
            </Sliders>
        </div>
    )
}

export const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
      <div>
          <button className="hamburger" onClick={() => setIsOpen(!isOpen)}>
              Menu
          </button>
          {isOpen && (
              <div className={`menu ${isOpen ? "open" : ""}`}>
                  <button className="menu-item" onClick={() => setIsOpen(false)}>Page 1</button>
                  <button className="menu-item" onClick={() => setIsOpen(false)}>Page 2</button>
                  <button className="menu-item" onClick={() => setIsOpen(false)}>Page 3</button>
              </div>
          )}
      </div>
  );
};