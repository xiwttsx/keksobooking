const disableForm = (form) => {
  form.classList.add(`${form.className}--disabled`);

  for (const child of form.children) {
    child.disabled = true;
  }
};

const enableForm = (form, cb) => {
  form.classList.remove(form.classList[1]);

  for (const child of form.children) {
    child.disabled = false;
  }

  cb();
};

export { disableForm, enableForm };
