/** @jsx jsx */

import { useContext } from 'react';

import { jsx } from '@emotion/react';
import {
  flex,
  PRIMARY,
  s05,
  s1,
  s2,
  COMPLIMENT40,
  s3,
  s10,
  WHITE,
  PRIMARY_WHITE,
  onTabletMedia,
  s5,
  s8,
  s80,
  COMPLIMENT20,
  COMPLIMENT_WHITE,
} from '../styles';
import useToggleSwitch from '../hooks/useToggleSwitch';
import { NavigationLink } from './NavigationLink';
import { Logo, LOGO_HEIGHT, LOGO_WIDTH } from './Logo';
import { GlobalContext } from './GlobalLayout';
import { MenuIcon } from './MenuIcon';
import { List } from './List';
import { Link } from './Link';
import { Button } from './Button';
import { HorizontalRule } from './HorizontalRule';
import { HiddenAccessibleText } from './HiddenAccessibleText';
import IconLabel from './IconLabel';

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
            css={[
              {
                // color: COMPLIMENT20,
                color: COMPLIMENT_WHITE,
                width: s5,
                margin: s05,

                aspectRatio: `${LOGO_WIDTH} / ${LOGO_HEIGHT}`,
              },
              onTabletMedia({ width: s10, margin: s1 }),
            ]}
          />
          <HiddenAccessibleText>Libros for Language</HiddenAccessibleText>
        </Link>
        <Button
          id="menuButton"
          aria-expanded={toggled}
          aria-controls={'menuItems'}
          onClick={() => setToggled(!toggled)}
          css={{
            color: PRIMARY_WHITE,
            width: s2,
            height: s2,
            position: 'relative',
            ...flex('column', { alignItems: 'center' }),
          }}
        >
          <MenuIcon />
          <IconLabel css={{ position: 'absolute', bottom: 0 }}>Menu</IconLabel>
        </Button>
        <div
          id="menuItems"
          css={[
            // toggled ? {display: ...flex()} : {'none'},
            {
              display: toggled ? 'flex' : 'none',
              flexDirection: 'column',
              alignItems: 'end',
              gap: s1,

              color: PRIMARY_WHITE,
              backgroundColor: PRIMARY,

              position: 'absolute',
              right: 0,
              top: '100%',
              listStyle: 'none',
              padding: s1,
            },
          ]}
        >
          <List
            css={{
              ...flex(),
              alignItems: 'end',

              color: PRIMARY_WHITE,
              backgroundColor: PRIMARY,

              listStyle: 'none',
            }}
          >
            <NavigationLink
              css={{ color: PRIMARY_WHITE, textAlign: 'right' }}
              to={navigation.books.path}
            >
              {navigation.books.title}
            </NavigationLink>
            <NavigationLink css={{ color: WHITE }} to={navigation.allTags.path}>
              {navigation.allTags.title}
            </NavigationLink>
            <NavigationLink
              css={{ color: WHITE, whiteSpace: 'normal' }}
              to={navigation.authorIllustrator.path}
            >
              {navigation.authorIllustrator.title}
            </NavigationLink>
          </List>
          <HorizontalRule />
          <List
            css={{
              listStyle: 'none',
              ...flex(),
              alignItems: 'end',
            }}
          >
            {navigation.tags.map((c) => {
              return (
                <NavigationLink
                  to={c.path}
                  // css={{ color: PRIMARY_WHITE, textAlign: 'right' }}
                  key={c.path}
                >
                  {c.title}
                </NavigationLink>
              );
            })}
          </List>
          <HorizontalRule />
          <List css={{ listStyle: 'none', ...flex(), alignItems: 'end' }}>
            <NavigationLink to={navigation.about.path}>
              {navigation.about.title}
            </NavigationLink>
            <NavigationLink to={navigation.contact.path}>
              {navigation.contact.title}
            </NavigationLink>
            <NavigationLink to={navigation.typology.path}>
              {navigation.typology.title}
            </NavigationLink>
            <NavigationLink to={navigation.resources.path}>
              {navigation.resources.title}
            </NavigationLink>
          </List>
        </div>
      </div>
      {/* </div> */}
    </nav>
  );
}
