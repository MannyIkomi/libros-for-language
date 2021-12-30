/** @jsx jsx */
import { jsx } from '@emotion/react';

export function MenuDownTriangle({ ...props }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M7 10L12 15L17 10H7Z" />
    </svg>
  );
}
export function MenuUpTriangle({ ...props }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M7 15L12 10L17 15H7Z" />
    </svg>
  );
}

export function MenuTriangle({ open, ...props }) {
  return open ? <MenuUpTriangle /> : <MenuDownTriangle />;
}

export default MenuTriangle;
