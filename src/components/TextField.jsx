/** @jsx jsx */
import React from 'react';
import { jsx } from '@emotion/react';
import { useForm, useController } from 'react-hook-form';
import { flex, MIN_TOUCH_SIZE, s05, s1 } from '../styles';

export function TextField({
  control,
  // name,
  defaultValue,
  input,
  label,
  style,
  ...props
}) {
  const { id, placeholder, type, required, name, ...inputProps } = input;

  const {
    field,
    fieldState: { error, invalid, isTouched, isDirty },
    formState: { isSubmitting },
  } = useController({
    name,
    control,
    defaultValue: defaultValue || '',
  });

  return (
    <div
      css={[
        {
          ...flex('column', {
            alignItems: 'flex-start',
          }),
        },
        style,
      ]}
      {...props}
    >
      <FieldLabel input={input}>{label.children}</FieldLabel>
      <input
        type={type || 'text'}
        id={id || name}
        placeholder={placeholder || 'Placeholder'}
        onChange={field.onChange} // send value to hook form
        onBlur={field.onBlur} // notify when input is touched/blur
        value={field.value} // input value
        name={field.name} // send down the input name
        inputRef={field.ref} // send input ref, so we can focus on input when error appear
        disabled={isSubmitting}
        {...inputProps}
      />
      {error && <p>{error?.message}</p>}
    </div>
  );
}

function FieldLabel({ input, label, children, ...props }) {
  return (
    <label htmlFor={input.id || input.name} {...props}>
      {children}
    </label>
  );
}
