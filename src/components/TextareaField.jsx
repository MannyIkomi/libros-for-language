/** @jsx jsx */
import React from 'react';
import { jsx } from '@emotion/react';

import { useForm, useController } from 'react-hook-form';
import { flex } from '../styles';

export function TextareaField({
  control,
  name,
  defaultValue,
  textarea,
  label,
  style,
  ...props
}) {
  const { id, placeholder, cols, rows, required, ...restTextarea } = textarea;

  const {
    field,
    fieldState: { invalid, isTouched, isDirty },
    formState: { touchedFields, dirtyFields },
  } = useController({
    name,
    control,
    defaultValue: '',
    rules: { required },
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
    >
      <label htmlFor={textarea.id || name} {...label}>
        {label.children}
      </label>
      <textarea
        id={id || name}
        cols={cols || '30'}
        rows={rows || '10'}
        placeholder={'Placeholder' || placeholder}
        {...textarea}
        name={field.name} // send down the input name
        onChange={field.onChange} // send value to hook form
        onBlur={field.onBlur} // notify when input is touched/blur
        value={field.value} // input value
        inputRef={field.ref} // send input ref, so we can focus on input when error appear
        {...restTextarea}
      ></textarea>
    </div>
  );
}
