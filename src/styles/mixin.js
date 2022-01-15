import { base1280, base640, s1 } from './spacing';

export const DESKTOP_VIEWPORT = base1280;
export const TABLET_VIEWPORT = base640;

export const tabletMediaQuery = `@media (min-width: ${TABLET_VIEWPORT})`;
export const desktopMediaQuery = `@media (min-width: ${DESKTOP_VIEWPORT})`;

export const onMedia = (query = '', styles = {}) => ({
  [`@media (${query})`]: {
    ...styles,
  },
});

export const onHover = (styles = {}) =>
  onMedia('hover: hover', { '&:hover': { ...styles } });

export const onSupport = (query = '', styles = {}) => ({
  [`@supports (${query})`]: {
    ...styles,
  },
});

export const supportsGrid = (hasSupport = {}) =>
  onSupport(`display: grid`, hasSupport);

export const onTabletMedia = (tabletStyles = {}) => ({
  [tabletMediaQuery]: {
    ...tabletStyles,
  },
});

export const onDesktopMedia = (desktopStyles = {}) => ({
  [desktopMediaQuery]: {
    ...desktopStyles,
  },
});

export const flex = (direction = 'column', styles) => ({
  display: 'flex',
  flexDirection: direction,
  ...styles,
});

export const grid = (styles = {}) =>
  supportsGrid({
    display: 'grid',
    ...styles,
  });

export const onMediaWidth = (width = '0px', styles = {}) => ({
  [`@media screen and (min-width: ${width})`]: {
    ...styles,
  },
});

export const grid12Columns = (styles = {}) =>
  supportsGrid(
    grid({
      gridTemplateColumns: 'repeat(12, 1fr)',
      gridGap: s1,
      ...styles,
    })
  );

export const positionSticky = (top = 0) => ({ position: 'sticky', top });
