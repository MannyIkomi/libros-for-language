/** @jsx jsx */
import { jsx } from '@emotion/react';
import { flex, PRIMARY, s05, s2, s3, WHITE } from '../styles';
import { slugify } from '../utils/slugify';
import useToggleSwitch from '../hooks/useToggleSwitch';
import { NavigationLink } from './NavigationLink';

export function MainMenu({ categoryTypes }) {
  const [toggled, setToggled] = useToggleSwitch(false);

  return (
    <nav
      css={{
        position: 'sticky',
        top: 0,
        left: 0,
        width: '100%',
        zIndex: 99,
      }}
    >
      <div
        css={{
          ...flex('row'),
          justifyContent: 'space-between',
          padding: s05,
          alignItems: 'center',
          minHeight: s3,
          backgroundColor: PRIMARY,
        }}
      >
        <div>LOGO</div>
        {/* <div
          css={{
            ...flex(),
            alignItems: 'flex-end',
            position: 'relative',
          }}
        > */}
        <button
          id="menuButton"
          class="icon"
          aria-expanded={toggled}
          aria-controls="menuItems"
          onClick={() => setToggled(!toggled)}
          css={{
            width: s2,
            height: s2,
          }}
        >
          M
        </button>
        <ul
          id="menuItems"
          css={{
            display: toggled ? flex() : 'none',
            alignItems: 'flex-start',
            backgroundColor: PRIMARY,

            position: 'absolute',
            right: 0,
            top: '100%',
            listStyle: 'none',
          }}
        >
          {categoryTypes.map((type) => {
            return (
              <li css={{ textAlign: 'right' }}>
                <NavigationLink
                  to={`/categories/${slugify(type.name)}`}
                  css={{ color: WHITE }}
                >
                  {type.name.replace('_', ' ')}
                </NavigationLink>
              </li>
            );
          })}
          <li css={{ textAlign: 'right' }}>
            <NavigationLink css={{ color: WHITE }} to={'/about'}>
              About
            </NavigationLink>
          </li>
          {/* <a to={'/resources'}>Resources</a> */}
        </ul>
      </div>
      {/* </div> */}
    </nav>
  );
}
