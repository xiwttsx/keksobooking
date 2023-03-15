const disableForm = (form) => {
  form.classList.add(`${form.className}--disabled`);

  for (const child of form.children) {
    child.disabled = true;
  }
};

const enableForm = (form) => {
  form.classList.remove(form.classList[1]);

  for (const child of form.children) {
    child.disabled = false;
  }
};

export { disableForm, enableForm };
