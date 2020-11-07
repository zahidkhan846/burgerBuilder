export const updatedObject = (oldObject, updatedProperties) => {
  return {
    ...oldObject,
    ...updatedProperties,
  };
};

export const checkValidity = (value, rules) => {
  let valid = true;
  if (rules.required) {
    valid = value.trim() !== "" && valid;
  }
  if (rules.minLength) {
    valid = value.length >= rules.minLength && valid;
  }
  if (rules.maxLength) {
    valid = value.length <= rules.maxLength && valid;
  }
  return valid;
};
