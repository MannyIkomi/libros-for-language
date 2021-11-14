/** @jsx jsx */
import React from 'react';
import { Global, jsx } from '@emotion/react';

export function MenuIcon(props) {
  // const { color, css } = props;

  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M3 6H21V8H3V6ZM3 11H21V13H3V11ZM3 16H21V18H3V16Z" />
    </svg>
  );
}
