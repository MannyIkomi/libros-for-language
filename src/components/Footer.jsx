/** @jsx jsx */
import { useContext } from 'react';
import { jsx } from '@emotion/react';
import { flex, s1, s05, PRIMARY20, PRIMARY, s5, WHITE, s075 } from '../styles';
import { GlobalContext } from './GlobalLayout';
import { Logo } from './Logo';
import { List } from './List';
import { Container } from './Container';
import { Link } from './Link';
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
      }}
    >
      <Container css={[flex('column', { alignItems: 'flex-start' })]}>
        <Link to={'/'}>
          <Logo css={{ width: s5, color: WHITE, margin: s05 }} />
        </Link>
        <List css={{ listStyle: 'none' }}>
          {navigation.tags.map((tag) => {
            return (
              <li key={tag._name}>
                <NavigationLink to={`tags/${tag.slug}`} css={{ color: WHITE }}>
                  {tag.title}
                </NavigationLink>
              </li>
            );
          })}
          <li>
            <NavigationLink
              to={`${navigation.about.slug}`}
              css={{ color: WHITE }}
            >
              {navigation.about.title}
            </NavigationLink>
          </li>
        </List>
        <p css={{ color: PRIMARY20, fontSize: s075 }}>
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
