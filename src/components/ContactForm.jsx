/** @jsx jsx */
import React from 'react';
import { jsx } from '@emotion/react';
import { useForm } from 'react-hook-form';
import { flex, grid, onTabletMedia, s1, s2 } from '../styles';
import { TextareaField } from './TextareaField';
import { TextField } from './TextField';
import { SubmitButton } from './SubmitButton';
import { encode } from '../utils/encode';
import { navigate } from 'gatsby';

export function ContactForm(props) {
  const { register, control, handleSubmit, watch, formState } = useForm();

  const onSubmit = (data, e) => {
    e.preventDefault();
    const form = e.target;
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({
        'form-name': form.getAttribute('name'),
        ...data,
      }),
    })
      .then(() => navigate(form.getAttribute('action')))
      .catch((error) => alert(error));
  };

  return (
    <form
      name={'contact'}
      method="POST"
      data-netlify={'true'}
      action="/thanks"
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

      <TextareaField
        name="message"
        label={{ children: 'Message' }}
        textarea={{
          id: 'messageField',
          cols: '30',
          rows: '10',
          placeholder: 'Your message…',
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

export default ContactForm;
