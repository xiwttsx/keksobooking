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

const showMessage = (template) => {
  const message = template.cloneNode(true);

  document.querySelector('body').appendChild(message);

  document.addEventListener('click', () => {message.remove();}, { once: true });
};

export {
  disableForm,
  enableForm,
  showMessage
};
