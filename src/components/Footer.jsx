/** @jsx jsx */
import { useContext } from 'react';
import { jsx } from '@emotion/react';
import {
  flex,
  s1,
  s05,
  PRIMARY20,
  PRIMARY,
  s5,
  WHITE,
  s075,
  PRIMARY_WHITE,
  onTabletMedia,
  grid,
} from '../styles';

import { Logo } from './Logo';
import { List } from './List';
import { Container } from './Container';
import { Link } from './Link';
import { GlobalContext } from './GlobalLayout';
import { NavigationLink } from './NavigationLink';

export function Footer() {
  const { navigation } = useContext(GlobalContext);
  const thisYear = new Date().getFullYear();

  return (
    <footer
      css={{
        padding: s1,
        textAlign: 'left',
        backgroundColor: PRIMARY,
        color: PRIMARY_WHITE,
      }}
    >
      <Container
        css={[
          // flex('column', { alignItems: 'flex-start' }),

          grid({
            gridTemplateColumns: 'repeat(12, 1fr)',
            gridTemplateRows: 'min-content 1fr min-content',
            gridTemplateAreas: `"logo logo . . . . . . . . . ." ". . books books tags tags links links links links links links" "disclaimer disclaimer disclaimer disclaimer disclaimer disclaimer disclaimer disclaimer disclaimer disclaimer disclaimer disclaimer"`,
          }),
        ]}
      >
        <Link to={'/'} css={{ gridArea: 'logo' }}>
          <Logo css={{ width: s5, color: WHITE, margin: s05 }} />
        </Link>
        <List css={{ listStyle: 'none', gridArea: 'books', gridArea: 'books' }}>
          <NavigationLink css={{ color: WHITE }} to={navigation.books.path}>
            {navigation.books.title}
          </NavigationLink>

          <NavigationLink css={{ color: WHITE }} to={navigation.allTags.path}>
            {navigation.allTags.title}
          </NavigationLink>
          <NavigationLink
            css={{ color: WHITE }}
            to={navigation.authorIllustrator.path}
          >
            {navigation.authorIllustrator.title}
          </NavigationLink>
          <NavigationLink
            css={{ color: PRIMARY_WHITE }}
            to={navigation.about.path}
          >
            {navigation.about.title}
          </NavigationLink>
          <NavigationLink
            css={{ color: PRIMARY_WHITE }}
            to={navigation.typology.path}
          >
            {navigation.typology.title}
          </NavigationLink>
          <NavigationLink
            css={{ color: PRIMARY_WHITE }}
            to={navigation.resources.path}
          >
            {navigation.resources.title}
          </NavigationLink>
        </List>
        <List css={{ listStyle: 'none', gridArea: 'tags' }}>
          {navigation.tags.map((tag) => {
            return (
              <NavigationLink
                to={tag.path}
                css={{ color: WHITE }}
                key={tag._name}
              >
                {tag.title}
              </NavigationLink>
            );
          })}
        </List>
        <p
          css={[
            {
              color: PRIMARY20,
              fontSize: s075,
              textAlign: 'center',
              gridArea: 'disclaimer',
              placeSelf: 'center',
            },
          ]}
        >
          <Link to="https://www.ala.org/" css={{ color: WHITE }}>
            <small css={{ color: 'inherit' }}>
              Funded by the American Library Association
            </small>
          </Link>{' '}
          <br />
          <small css={{ color: 'inherit' }}>
            Copyright © {thisYear} Libros for Language. All rights reserved.
          </small>
        </p>
      </Container>
    </footer>
  );
}
