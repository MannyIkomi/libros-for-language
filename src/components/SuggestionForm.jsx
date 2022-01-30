/** @jsx jsx */
import React from 'react';
import { jsx } from '@emotion/react';
import { useForm } from 'react-hook-form';
import { flex, grid, onTabletMedia, s1, s2 } from '../styles';
import { TextareaField } from './TextareaField';
import { TextField } from './TextField';
import { SubmitButton } from './SubmitButton';
import { onSubmit } from '../utils/onSubmit';
import { DebugData } from './DebugData';

export function SuggestionForm({ bookTitle, ...props }) {
  const { register, control, handleSubmit, watch, formState } = useForm();
  return (
    <form
      name={'suggestion'}
      method="POST"
      data-netlify={'true'}
      onSubmit={handleSubmit(onSubmit, (error, e) => console.error(error, e))}
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
      <input type="hidden" name="suggestion" value="suggestion" />

      {formState.isSubmitSuccessful ? (
        <div>
          Your suggestion has been recieved, <br /> Thank you!
        </div>
      ) : (
        <>
          <TextField
            label={{ children: 'Name' }}
            input={{
              name: 'name',
              placeholder: 'Your Name',
              id: 'name',
              required: true,
            }}
            control={control}
            style={{ gridArea: 'name' }}
          />

          <TextField
            label={{ children: 'Email' }}
            input={{
              placeholder: 'youremail@domain.com',
              name: 'email',
              id: 'email',
              type: 'email',
              required: true,
            }}
            control={control}
            style={{ gridArea: 'email' }}
          />
          <TextField
            label={{ children: 'Book Title' }}
            input={{
              name: 'bookTitle',
              id: 'bookTitle',
              type: 'text',
            }}
            control={control}
            defaultValue={bookTitle}
            style={{ gridArea: 'bookTitle' }}
          />

          <TextareaField
            label={{ children: 'Message' }}
            textarea={{
              name: 'message',
              id: 'messageField',
              cols: '30',
              rows: '10',
              placeholder: 'Your suggestion…',
              required: true,
            }}
            control={control}
            style={{ gridArea: 'message' }}
          />

          <SubmitButton style={{ gridArea: 'submit', placeSelf: 'center' }}>
            Send Message
          </SubmitButton>
        </>
      )}
    </form>
  );
}

export default SuggestionForm;
