(function () {
  const htmlElements = {
    formElement: document.querySelector("form"),
    userName: document.querySelector("[js_data_name]"),
    userTelephone: document.querySelector("[js_data_telephone]"),
    userEmail: document.querySelector("[js_data_email]"),
    userLanguage: document.querySelector("[js_data_language]"),
    userMessage: document.querySelector("[js_data_message]"),
    userExperience: document.querySelector("[js_data_experience]"),
    buttonForm: document.querySelector("[js_data_form_button]"),
  };

  // Aqui são definidos os endereços relevantes para a API e para as páginas de erro e sucesso.
  const adresses = {
    api: "https://api.sheetmonkey.io/form/uM1Q7XZyF85NbpeU6wSwFB",
    errorPage: "http://127.0.0.1:5504/error_page.html",
    successPage: "http://127.0.0.1:5504/success_page.html",
  };

  // Aqui são definidos objetos que representam o botão de envio do formulário, tanto em forma de imagem de carregamento como de mensagem.
  const renderButton = {
    image:
      '<img class="c-section-contact__button--animation" src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExeGo1MWEzNzJsdXRybjNoYm55aG1pcThsdnB0bDVtNWdxaWp0cnB4eCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/CJFoawrEEq5P3ptexI/giphy.gif" alt="Loading">',
    message: "SEND MESSAGE",
  };

  const addLoad = () => {
    htmlElements.buttonForm.innerHTML = renderButton.image;
  };

  const removedLoad = () => {
    htmlElements.buttonForm.innerHTML = renderButton.message;
  };

  const delaySuccess = () => {
    setTimeout(() => {
      window.location.href = adresses.successPage;
      removedLoad();
    }, 1000);
  };

  const delayError = () => {
    setTimeout(() => {
      window.location.href = adresses.errorPage;
      removedLoad();
    }, 1000);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addLoad();

    const userNameValue = htmlElements.userName.value;
    const userTelephoneValue = htmlElements.userTelephone.value;    
    const userEmailValue = htmlElements.userEmail.value;
    const userLanguageValue = htmlElements.userLanguage.value;
    const userExperienceValue = htmlElements.userExperience.value;
    const userMessageValue = htmlElements.userMessage.value;

    fetch(adresses.api, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: userNameValue,
        telephone: userTelephoneValue,
        email: userEmailValue,
        language: userLanguageValue,
        experience: userExperienceValue,
        message: userMessageValue,
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString(),
      }),
    })
      .then(() => delaySuccess())
      .catch(() => delayError());
  };

  htmlElements.formElement.addEventListener("submit", handleSubmit);
})();
