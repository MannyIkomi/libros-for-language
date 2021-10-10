/** @jsx jsx */
import * as React from 'react'
import { css, jsx } from '@emotion/react'
import { COMPLIMENT, MONO_FONT } from '../styles'

/* 

{
  tags: {
    topics: [Culture, Food]
    categories: {
      languages: […]
      genres: […]
      gradeLevels: […]
    }
  }
}

*/

/* 
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 8px 12px;

position: absolute;
width: 65px;
height: 40px;
left: 20px;
top: 37px;


*/

const display = css`
  display: flex;
  align-items: center;
  justify-content: center;
`

const type = css`
  text-transform: uppercase;
  font-size: 0.8rem;
  font-family: ${MONO_FONT};
  letter-spacing: 0.05rem;
  white-space: nowrap;
`

export const TopicTag = (props) => {
  return (
    <div
      css={[
        display,
        type,
        css`
          min-width: 2.5rem;
          width: 100%;
          max-width: min-content;

          min-height: 2.5rem;

          padding: 0.25rem 1rem;

          background: ${COMPLIMENT};
          border-radius: 0.0625rem 0.5rem;
        `,
      ]}
    >
      {props.children || props.label}
    </div>
  )
}
