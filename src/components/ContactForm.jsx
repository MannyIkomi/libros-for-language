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

export function ContactForm(props) {
  const { register, control, handleSubmit, watch, formState, setValue } =
    useForm();

  return (
    <form
      name={'contact'}
      method="POST"
      data-netlify={'true'}
      onSubmit={handleSubmit(onSubmit, (error, e) => console.error(error, e))}
      css={[
        grid({
          gridTemplateColumns: '1fr',
          gridTemplateAreas: `"name" "email" "message" "submit"`,
          gridGap: `${s2} ${s1}`,
        }),
        onTabletMedia(
          grid({
            gridTemplateColumns: '1fr 1fr',
            gridTemplateAreas: `"name email" "message message" "submit submit"`,
            gridGap: `${s2} ${s1}`,
          })
        ),
      ]}
      {...props}
    >
      <input type="hidden" name="contact" value="contact" />

      {formState.isSubmitSuccessful ? (
        <div>
          Your message has been recieved, <br /> Thank you!
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

          <TextareaField
            label={{ children: 'Message' }}
            textarea={{
              name: 'message',
              id: 'messageField',
              cols: '30',
              rows: '10',
              placeholder: 'Your message…',
              required: true,
            }}
            control={control}
            style={{ gridArea: 'message' }}
          />

          <SubmitButton
            style={{ gridArea: 'submit', placeSelf: 'center' }}
            disabled={formState.isSubmitting}
          >
            {formState.isSubmitting ? 'Sending…' : 'Send Message'}
          </SubmitButton>
        </>
      )}
    </form>
  );
}

export default ContactForm;
