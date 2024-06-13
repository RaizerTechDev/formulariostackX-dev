class FormSubmit {
  constructor(settings) {
    this.settings = settings;
    this.form = document.querySelector(settings.form);
    this.formButton = document.querySelector(settings.button);
    if (this.form) {
      this.url = this.form.getAttribute("action");
    }
    this.sendForm = this.sendForm.bind(this);
  }

  displaySuccess() {
    window.location.href = this.settings.successRedirect;
  }

  displayError() {
    window.location.href = this.settings.errorRedirect;
  }

  getFormObject() {
    const formObject = {};
    const fields = this.form.querySelectorAll("[name]");
    fields.forEach((field) => {
      formObject[field.getAttribute("name")] = field.value;
    });
    return formObject;
  }

  validateForm() {
    const formObject = this.getFormObject();
    let isValid = true;
    let errorMessage = '';

    // Validação para o campo nome
    if (!formObject.name || formObject.name.trim() === '') {
      isValid = false;
      errorMessage += 'Campo Nome é obrigatório.\n';
    }

    // Validação para o campo telefone (formato: (XX) XXXXX-XXXX)
    if (!formObject.telephone || !/^\(\d{2}\) \d{5}-\d{4}$/.test(formObject.telephone)) {
      isValid = false;
      errorMessage += 'Campo Telefone é obrigatório e deve estar no formato (XX) XXXXX-XXXX.\n';
    }

    // Validação para o campo email
    if (!formObject.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formObject.email)) {
      isValid = false;
      errorMessage += 'Campo Email é obrigatório e deve ser um email válido.\n';
    }

    // Validação para o campo linguagem
    if (!formObject.language || formObject.language.trim() === '') {
      isValid = false;
      errorMessage += 'Campo Linguagem é obrigatório.\n';
    }

    // Validação para o campo experiência
    if (!formObject.experience || isNaN(formObject.experience)) {
      isValid = false;
      errorMessage += 'Campo Experiência é obrigatório e deve ser um número válido.\n';
    }

    // Validação para o campo mensagem adicional
    if (!formObject.message || formObject.message.trim() === '') {
      isValid = false;
      errorMessage += 'Campo Mensagem Adicional é obrigatório.\n';
    }

    if (!isValid) {
      alert(errorMessage);
    }

    return isValid;
  }

  onSubmission(event) {
    event.preventDefault();
    event.target.disabled = true;
    event.target.innerHTML = '<img src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExeGo1MWEzNzJsdXRybjNoYm55aG1pcThsdnB0bDVtNWdxaWp0cnB4eCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/CJFoawrEEq5P3ptexI/giphy.gif" alt="Enviando..." class="button--animation">';
  }

  async sendForm(event) {
    event.preventDefault();
    if (!this.validateForm()) {
      event.target.disabled = false; // Reabilita o botão se a validação falhar
      event.target.innerHTML = 'SEND MESSAGE'; // Redefine o texto do botão se a validação falhar
      return; // Interrompe o envio se o formulário for inválido
    }
    try {
      this.onSubmission(event);
      await fetch(this.url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(this.getFormObject()),
      });
      this.displaySuccess();
    } catch (error) {
      this.displayError();
      throw new Error(error);
    }
  }

  init() {
    if (this.form) this.formButton.addEventListener("click", this.sendForm);
    return this;
  }
}

const formSubmit = new FormSubmit({
  form: "[data-form]",
  button: "[data-button]",
  successRedirect: "https://rafarz76dev-registration-formdev.netlify.app/success_page.html",
  errorRedirect: "https://rafarz76dev-registration-formdev.netlify.app/error_page.html",
});
formSubmit.init();
