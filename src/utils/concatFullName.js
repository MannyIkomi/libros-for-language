// import 'react-tabs/style/react-tabs.css';
export const concatFullName = ({
  firstName,
  middleName,
  lastName,
  ...rest
}) => {
  return {
    firstName,
    middleName,
    lastName,
    name: `${firstName}${middleName ? ' ' + middleName + ' ' : ' '}${lastName}`,
    ...rest,
  };
};
