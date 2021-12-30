/** @jsx jsx */
import { jsx } from '@emotion/react';
import {
  s1,
  base160,
  s025,
  flex,
  grid,
  PRIMARY40,
  PRIMARY20,
  boxShadow,
} from '../styles';
import { Heading } from './Heading';
import { Container, TextContainer } from './Container';
import { TertiaryLink } from './Link';

export function TeamMemberBio(props) {
  const {
    id,
    portrait,
    name,
    firstName,
    role,
    description,
    webLink,
    webLinkLabel,
    ...other
  } = props;

  return (
    <Container
      key={id}
      css={[
        {
          ...flex('column', {
            alignItems: 'flex-start',
          }),
          width: '100%',
          padding: s1,

          background: PRIMARY20,
          borderRadius: `${s025}`,
          ...boxShadow,
        },
      ]}
      {...other}
    >
      <div
        css={[
          {
            ...grid({
              gridTemplateColumns: 'max-content 1fr',
              gridTemplateRows: '1fr min-content',
              gridColumnGap: s1,
              placeItems: 'end start',
            }),
          },
        ]}
      >
        {portrait ? (
          <div
            css={{
              borderRadius: '100%',
              overflow: 'hidden',

              gridColumn: '1 / 2',
              gridRow: '1 / 3',
            }}
          >
            <img
              src={portrait?.url}
              width={portrait?.width}
              height={portrait?.height}
              // loading="eager"
              alt={portrait?.altDescription || `Portrait of ${name}`}
              css={{
                display: 'block',
                width: '100%',
                height: 'auto',
                aspectRatio: `${portrait?.width} / ${portrait?.height}`,

                maxWidth: base160,
                maxHeight: base160,
              }}
            />
          </div>
        ) : (
          <div
            css={{
              display: 'block',
              width: base160,
              height: base160,

              borderRadius: '100%',
              overflow: 'hidden',

              backgroundColor: PRIMARY40,
            }}
          ></div>
        )}

        <Heading level={3} css={{ gridColumn: '2 / -1', margin: '0' }}>
          {name}
        </Heading>

        {role && (
          <TextContainer css={{ gridColumn: '2 / -1' }}>
            <p css={{ margin: '0' }}>
              <strong>{role}</strong>
            </p>
          </TextContainer>
        )}
      </div>
      {description && (
        <TextContainer>
          <p>{description}</p>
          {webLink && (
            <p>
              Learn more about {firstName}:{' '}
              {webLinkLabel ? (
                <TertiaryLink to={webLink}>{webLinkLabel}</TertiaryLink>
              ) : (
                <TertiaryLink to={webLink}>
                  {new URL(webLink).host}
                </TertiaryLink>
              )}
            </p>
          )}
        </TextContainer>
      )}
    </Container>
  );
}
