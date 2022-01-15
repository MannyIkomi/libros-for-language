/** @jsx jsx */
import React from 'react';
import { jsx } from '@emotion/react';
import { useForm } from 'react-hook-form';
import { flex, grid, onTabletMedia, s1, s2 } from '../styles';
import { TextareaField } from './TextareaField';
import { TextField } from './TextField';
import { SubmitButton } from './SubmitButton';

export function SuggestionForm({ bookTitle, ...props }) {
  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => alert(JSON.stringify(data));

  return (
    <form
      name={'Suggestion'}
      method="POST"
      data-netlify={true}
      // onSubmit={handleSubmit(onSubmit)}
      css={[
        grid({
          gridTemplateColumns: '1fr',
          gridTemplateAreas: `"name" "email" "bookTitle" "message" "submit"`,
          gridGap: `${s2} ${s1}`,
        }),
        onTabletMedia(
          grid({
            gridTemplateColumns: '1fr 1fr',
            gridTemplateAreas: `"name email" "bookTitle bookTitle" "message message" "submit submit"`,
            gridGap: `${s2} ${s1}`,
          })
        ),
      ]}
      {...props}
    >
      <TextField
        name={'name'}
        label={{ children: 'Name' }}
        input={{ placeholder: 'Your Name', id: 'name' }}
        control={control}
        style={{ gridArea: 'name' }}
      />

      <TextField
        name={'email'}
        label={{ children: 'Email' }}
        input={{
          placeholder: 'youremail@domain.com',
          id: 'email',
          type: 'email',
        }}
        control={control}
        style={{ gridArea: 'email' }}
      />
      <TextField
        name={'bookTitle'}
        label={{ children: 'Book Title' }}
        input={{
          // placeholder: 'youremail@domain.com"',
          id: 'bookTitle',
          type: 'text',
        }}
        control={control}
        defaultValue={bookTitle}
        style={{ gridArea: 'bookTitle' }}
      />

      <TextareaField
        name="message"
        label={{ children: 'Message' }}
        textarea={{
          id: 'messageField',
          cols: '30',
          rows: '10',
          placeholder: 'Your suggestion…',
        }}
        control={control}
        style={{ gridArea: 'message' }}
      />

      <SubmitButton style={{ gridArea: 'submit', placeSelf: 'center' }}>
        Send Message
      </SubmitButton>
    </form>
  );
}

export default SuggestionForm;
