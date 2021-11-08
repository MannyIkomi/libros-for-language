export const DESKTOP_VIEWPORT = `1200px`;
export const TABLET_VIEWPORT = `700px`;

export const tabletMediaQuery = `@media screen and (min-width: ${TABLET_VIEWPORT})`;
export const desktopMediaQuery = `@media screen and (min-width: ${DESKTOP_VIEWPORT})`;

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

export const flex = (direction = 'column') => ({
  display: 'flex',
  flexDirection: direction,
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
      gridGap: '1rem',
      ...styles,
    })
  );

export const positionSticky = (top = 0) => ({ position: 'sticky', top });
