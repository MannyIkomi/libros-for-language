/** @jsx jsx */
import React from 'react';
import { jsx } from '@emotion/react';
import * as ReactTabs from 'react-tabs';

import {
  tabStyle,
  tabDisabledStyle,
  tabFocusStyle,
  tabListStyle,
  tabPanelStyle,
  tabPanelSelectedStyle,
  tabSelectedStyle,
} from '../styles/tabs';

import 'react-tabs/style/react-tabs.css';

export const Tabs = ({ children, ...props }) => (
  // container element
  <ReactTabs.Tabs {...props}>{children}</ReactTabs.Tabs>
);

export const Tab = ({ children, ...props }) => (
  // header for each Tab
  <ReactTabs.Tab
    // css={[tabStyle, tabSelectedStyle, tabDisabledStyle, tabFocusStyle]}
    {...props}
  >
    {children}
  </ReactTabs.Tab>
);

export const TabList = ({ children, ...props }) => (
  // list of Tab headers
  <ReactTabs.TabList
    // css={[tabListStyle]}
    {...props}
  >
    {children}
  </ReactTabs.TabList>
);
export const TabPanel = ({ children, ...props }) => (
  // tab content
  <ReactTabs.TabPanel
    // css={[tabPanelStyle, tabPanelSelectedStyle]}
    {...props}
  >
    {children}
  </ReactTabs.TabPanel>
);
