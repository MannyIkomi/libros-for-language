/** @jsx jsx */
import React from 'react';
import { jsx } from '@emotion/react';
import { useForm, useController } from 'react-hook-form';
import { flex, MIN_TOUCH_SIZE, s05, s1 } from '../styles';

export function TextField(props) {
  const { control, name, defaultValue, input, label, style } = props;
  const { id, placeholder, type } = input;

  const {
    field,
    fieldState: { invalid, isTouched, isDirty },
    formState: { touchedFields, dirtyFields },
  } = useController({
    name,
    control,
    defaultValue: '',
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
      <label htmlFor={input.id || name}>{label.children}</label>
      <input
        type={type || 'text'}
        id={id || name}
        placeholder={'Placeholder' || placeholder}
        {...input}
        onChange={field.onChange} // send value to hook form
        onBlur={field.onBlur} // notify when input is touched/blur
        value={field.value} // input value
        name={field.name} // send down the input name
        inputRef={field.ref} // send input ref, so we can focus on input when error appear
      />
    </div>
  );
}
