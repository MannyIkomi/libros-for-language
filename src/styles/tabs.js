import { PRIMARY20, PRIMARY40 } from './color';

export const tabListStyle = {
  // '.react-tabs__tab-list'
  borderBottom: '1px solid #aaa',
  margin: '0 0 10px',
  padding: '0',
};

export const tabStyle = {
  // '.react-tabs__tab'
  display: 'inline-block',
  border: '1px solid transparent',
  borderBottom: 'none',
  bottom: '-1px',
  position: 'relative',
  listStyle: 'none',
  padding: '6px 12px',
  cursor: 'pointer',
};

export const tabSelectedStyle = {
  // '.react-tabs__tab--selected'
  background: '#fff',
  borderColor: PRIMARY20,
  color: 'black',
  borderRadius: '5px 5px 0 0',
};

export const tabDisabledStyle = {
  // '.react-tabs__tab--disabled'
  color: PRIMARY40,
  cursor: 'default',
};

export const tabFocusStyle = {
  // '.react-tabs__tab'
  '&:focus': {
    boxShadow: '0 0 5px hsl(208, 99%, 50%)',
    borderColor: 'hsl(208, 99%, 50%)',
    outline: 'none',
    '&:after': {
      content: '""',
      position: 'absolute',
      height: '5px',
      left: '-4px',
      right: '-4px',
      bottom: '-5px',
      background: '#fff',
    },
  },
};

export const tabPanelStyle = {
  // '.react-tabs__tab-panel'
  display: 'none',
};

export const tabPanelSelectedStyle = {
  // '.react-tabs__tab-panel--selected'
  display: 'block',
};

// export const reactTabs = {
//   '.react-tabs': {
//     WebkitTapHighlightColor: 'transparent',
//   },
//   ...tabList,
//   ...tab,
//   ...tabSelected,
//   ...tabDisabled,
//   ...tabFocus,

//   ...tabPanel,
//   ...tabPanelSelected,
// };
