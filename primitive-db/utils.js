export const messages = {
  name: "Enter user's name (to cancel press Enter):",
  gender: "Choose user's gender:",
  age: "Enter user's age:",
  search: "Enter user's name you want to find in database:",
};

export const genderOptions = [
  {
    name: 'male',
    value: 'male',
  },
  {
    name: 'female',
    value: 'female',
  },
  {
    name: 'undecided',
    value: 'undecided',
  },
];

export const ageValidation = (value) => {
  const age = Number(value);

  if (isNaN(age) || age <= 0) {
    return 'Please enter a valid age.';
  }

  return true;
};
