/** @jsx jsx */
import { useContext } from 'react';

import { jsx } from '@emotion/react';
import {
  flex,
  PRIMARY,
  s05,
  s1,
  s2,
  s3,
  s5,
  s10,
  WHITE,
  ACCENT,
  COMPLIMENT,
} from '../styles';
import useToggleSwitch from '../hooks/useToggleSwitch';
import { NavigationLink } from './NavigationLink';
import { Logo, LOGO_HEIGHT, LOGO_WIDTH } from './Logo';
import { GlobalContext } from './GlobalLayout';
import { MenuIcon } from './MenuIcon';
import { List } from './List';
import { Link } from './Link';
import { Button } from './Button';

export function MainMenu() {
  const { navigation } = useContext(GlobalContext);
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
        <Link to={'/'}>
          <Logo
            css={{
              color: COMPLIMENT,
              width: s10,
              margin: s1,
              aspectRatio: `${LOGO_WIDTH} / ${LOGO_HEIGHT}`,
            }}
          />
        </Link>
        <Button
          id="menuButton"
          aria-expanded={toggled}
          aria-controls="menuItems"
          onClick={() => setToggled(!toggled)}
          css={{
            color: WHITE,
            width: s2,
            height: s2,
          }}
        >
          <MenuIcon />
        </Button>
        <List
          id="menuItems"
          css={{
            display: toggled ? flex() : 'none',
            alignItems: 'flex-start',
            backgroundColor: PRIMARY,
            padding: s1,

            position: 'absolute',
            right: 0,
            top: '100%',
            listStyle: 'none',
          }}
        >
          <li css={{ textAlign: 'right' }}>
            <NavigationLink css={{ color: WHITE }} to={'/browse'}>
              Browse
            </NavigationLink>
          </li>
          {navigation.categories.map((c) => {
            return (
              <li css={{ textAlign: 'right' }}>
                <NavigationLink
                  to={`/categories/${c.slug}`}
                  css={{ color: WHITE }}
                >
                  {c.title}
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
        </List>
      </div>
      {/* </div> */}
    </nav>
  );
}
