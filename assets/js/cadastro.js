document.addEventListener("DOMContentLoaded", function () {
  // Seleciona o botão corretamente
  const submitButton = document.querySelector(".formButton");

  // Função para validar campos
  function validateForm(form) {
    const name = form.name.value.trim();
    const telephone = form.telephone.value.trim();
    const email = form.email.value.trim();
    const language = form.language.value;
    const experience = form.experience.value;
    const message = form.message.value.trim();

    // Verificações de validação
    if (!name) {
      alert("Por favor, insira seu nome.");
      return false;
    }
    if (!/^\d{11}$/.test(telephone)) {
      alert("Por favor, insira um número de telefone válido (11 dígitos).");
      return false;
    }
    if (!email) {
      alert("Por favor, insira seu e-mail.");
      return false;
    }
    if (!language) {
      alert("Por favor, selecione uma linguagem.");
      return false;
    }

    return true;
  }

  // Seleciona o formulário para capturar o evento de envio
  const form = document.querySelector("form");

  // Função que adiciona a imagem de carregamento ao botão
  const renderButton = {
    image:
      '<img class="formButton--animation" src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExaWI0azVpZzY1YzJqMDlxNjFlZHNhNmE0aGQ3dnhic2h4eGY2dmdhdyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3o7bu3XilJ5BOiSGic/giphy.gif" alt="Loading">',
    message: "SEND MESSAGE",
  };

  // Adiciona o listener de envio do formulário
  form.addEventListener("submit", function (e) {
    e.preventDefault(); // Impede o envio padrão do formulário

    // Valida o formulário
    if (!validateForm(form)) {
      return;
    }

    // Exibe o spinner após a validação
    submitButton.innerHTML = renderButton.image;

    // Monta a URL do WhatsApp
    const whatsappUrl = `https://wa.me/5547999327137?text=Olá, estou retornando o Formulário-Dev:%0A
      Meu Nome: ${form.name.value}%0A
      Telefone: ${form.telephone.value}%0A
      Email: ${form.email.value}%0A
      Linguagem: ${form.language.value}%0A
      Experience: ${form.experience.value}%0A
      Mensagem Adicional: ${form.message.value}`;

    // Simula um tempo de espera antes de esconder a imagem de carregamento
    setTimeout(() => {
      // Remove o spinner e volta ao texto original
      submitButton.innerHTML = renderButton.message;
      if (window.innerWidth > 768) {
        // Para telas maiores que 768px, abrir em uma nova aba
        window.open(whatsappUrl, "_blank");
      } else {
        // Para telas menores, abrir na mesma aba
        window.open(whatsappUrl, "_self");
      }
    }, 2000);
  });
});
