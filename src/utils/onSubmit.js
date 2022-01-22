import { encode } from './encode';

export const onSubmit = (data, e) => {
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
    .then(() => {
      console.log('FORM SUCCESS');
    })
    .catch((error) => alert(error));
};
