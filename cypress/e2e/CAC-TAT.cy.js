describe("Central de atendimento ao Cliente TAT", () => {
  beforeEach(() => {
    cy.visit("./src/index.html");
  });
  it("Verifica o titulo da aplicação", () => {
    cy.title().should("include", "Central de Atendimento ao Cliente TAT");
  });

  it("Preencha os campos obrigatorios e enviar o formulario", () => {
    const textao = Cypress._.repeat("texte de texto longo ", 10);

    cy.get("#firstName").type("Bruno Eduardo");
    cy.get("#lastName").type("Maruno");
    cy.get("#email").type("bruno_maruno@hotmail.com");
    cy.get("#phone").type("11999999999");
    cy.get("#product").select("mentoria");

    cy.get("#open-text-area").type(textao, { delay: 0 });
    //cy.get('form').submit()
    cy.get('button[type="submit"]').click();

    cy.get(".success").should("be.visible");
  });

  it("Exibe mensagem de erro ao submeter o formulario com um email com formatação invalida", () => {
    cy.clock();

    cy.get("#firstName").type("Bruno Eduardo");
    cy.get("#lastName").type("Maruno");
    cy.get("#email").type("bruno_maruno@.com");
    cy.get("#phone").type("11999999999");
    cy.get("#product").select("mentoria");

    cy.get("#open-text-area").type(
      "Exibe mensagem de erro ao submeter o formulario com um email com formatação invalida",
      { delay: 0 }
    );

    cy.get('button[type="submit"]').click();

    cy.get(".error").should("be.visible");

    cy.tick(3000);
    cy.get(".error").should("not.be.visible");
  });

  it("Campo telefone continua vazio quando preenchido com um valor nao-numerico", () => {
    cy.get("#phone").type("abcde").should("have.value", "");
  });

  it("Exibe mensagem de erro quando telefone se torna obrigatorio mas nao é preenchido", () => {
    cy.clock();

    cy.get("#firstName").type("Bruno Eduardo");
    cy.get("#lastName").type("Maruno");
    cy.get("#email").type("bruno_maruno@.com");
    cy.get("#product").select("mentoria");
    cy.get("#phone-checkbox").check();
    cy.get("#open-text-area").type(
      "Exibe mensagem de erro ao submeter o formulario com um email com formatação invalida"
    );
    cy.get('button[type="submit"]').click();
    cy.get(".error").should("be.visible");


    cy.tick(3000);
    cy.get(".error").should("not.be.visible");
  });

  it("Preencha e limpe os campos nome, sobrenome, email e telefone", () => {
    cy.get("#firstName")
      .type("Bruno Eduardo")
      .should("have.value", "Bruno Eduardo")
      .clear()
      .should("have.value", "");
    cy.get("#lastName")
      .type("Maruno")
      .should("have.value", "Maruno")
      .clear()
      .should("have.value", "");
    cy.get("#email")
      .type("bruno_maruno@gmail.com")
      .should("have.value", "bruno_maruno@gmail.com")
      .clear()
      .should("have.value", "");
    cy.get("#phone")
      .type("11999999999")
      .should("have.value", "11999999999")
      .clear()
      .should("have.value", "");
  });

  it("Exibe mensagem de erro ao submeter o formulario sem preencher os campos obrigatorios", () => {
    cy.get('button[type="submit"]').click();
    cy.get(".error").should("be.visible");
  });

  it("Envia o formuário com sucesso usando um comando customizado", () => {
    const data = {
      firstName: "Bruno Eduardo",
      lastName: "Maruno",
      email: "bruno_maruno@gmail.com",
      phone: "11999999999",
      textao:
        "Exibe mensagem de erro ao submeter o formulario com um email com formatação invalida",
    };
    cy.fillMandatoryFieldsAndSubmit(data);
  });

  it("Enviar o formulario usando o cy.contains para clicar no botão ENVIAR", () => {
    cy.get("#firstName").type("Bruno Eduardo");
    cy.get("#lastName").type("Maruno");
    cy.get("#email").type("bruno_maruno@email.com");
    cy.get("#open-text-area").type(
      "Exibe mensagem de erro ao submeter o formulario com um email com formatação invalida"
    );
    cy.contains("button", "Enviar").click();
    cy.get(".success").should("be.visible");
  });

  it("Seleciona um produto (YouTube) por seu texto", () => {
    cy.get("select").select("YouTube").should("have.value", "youtube");
  });

  it("Seleciona um produto (Mentoria) pelo seu valor", () => {
    cy.get("select").select("mentoria").should("have.value", "mentoria");
  });

  it("Seleciona um produto (Blog) pelo seu indice", () => {
    cy.get("select").select(1).should("have.value", "blog");
  });

  it('Marca o tipo de atendiment "Feedback"', () => {
    cy.get('input[type="radio"]').check("feedback").should("be.checked");
  });

  it("Marca cada tipo de atendimento e verifica se está marcado", () => {
    cy.get('input[type="radio"]').each((eachRadio) => {
      cy.wrap(eachRadio).check().should("be.checked");
    });
  });

  it("Marca ambos checkboxes, de´pos desmarca o ultimo", () => {
    cy.get('input[type="checkbox"]').each((eachCheckbox) => {
      cy.wrap(eachCheckbox).check().should("be.checked");
    });
    cy.get('input[type="checkbox"]').last().uncheck().should("not.be.checked");
  });

  it("Verifica a exibição da mensagem de erro quando o telefone se torna obrigatoria mas não é preenchido antes do envio do form", () => {
    cy.get("#firstName").type("Bruno Eduardo");
    cy.get("#lastName").type("Maruno");
    cy.get("#email").type("BRUNO@EMAIL.COM");
    cy.get("#open-text-area").type(
      "Exibe mensagem de erro ao submeter o formulario com um email com formatação invalida"
    );
    cy.get('input[type="checkbox"]').check("phone").should("be.checked");
    cy.get('button[type="submit"]').click();
    cy.get(".error").should("be.visible");
  });

  it("Selecione um arquivo da pasta fixtures", () => {
    cy.get("#firstName").type("Bruno Eduardo");
    cy.get("#lastName").type("Maruno");
    cy.get("#email").type("BRUNO@EMAIL.COM");
    cy.get("#open-text-area").type(
      "Exibe mensagem de erro ao submeter o formulario com um email com formatação invalida"
    );
    cy.get("#file-upload")
      .selectFile("cypress/fixtures/example.json")
      .should((fileCallBack) => {
        console.log(fileCallBack);
        expect(fileCallBack[0].files[0].name).to.eq("example.json");
      });

    cy.get('button[type="submit"]').click();
    cy.get(".success").should("be.visible");
  });

  it("Selecione um arquivo sinmulando um drag-and-drop", () => {
    cy.get("#firstName").type("Bruno Eduardo");
    cy.get("#lastName").type("Maruno");
    cy.get("#email").type("BRUNO@EMAIL.COM");
    cy.get("#open-text-area").type(
      "Exibe mensagem de erro ao submeter o formulario com um email com formatação invalida"
    );
    cy.get("#file-upload")
      .selectFile("cypress/fixtures/example.json", { action: "drag-drop" })
      .should((fileCallBack) => {
        console.log(fileCallBack);
        expect(fileCallBack[0].files[0].name).to.eq("example.json");
      });

    cy.get('button[type="submit"]').click();
    cy.get(".success").should("be.visible");
  });

  it("Selecione um arquivo utilizando uma fixture para a qual foi dada um alias", () => {
    cy.fixture("example.json").as("exampleJson");

    cy.get("#firstName").type("Bruno Eduardo");
    cy.get("#lastName").type("Maruno");
    cy.get("#email").type("BRUNO@EMAIL.COM");
    cy.get("#open-text-area").type("Texto exemplo");
    cy.get("#file-upload")
      .selectFile("@exampleJson", { action: "drag-drop" })
      .should((fileCallBack) => {
        console.log(fileCallBack);
        expect(fileCallBack[0].files[0].name).to.eq("example.json");
      });

    cy.get('button[type="submit"]').click();
    cy.get(".success").should("be.visible");
  });

  it("md07 - Verifica a existencia do link de acesso para a pagina de politica de privacidade", () => {
    cy.contains("a", "Política de Privacidade")
      .should("have.attr", "href", "privacy.html")
      .and("have.attr", "target", "_blank");
  });

  it("md07 - Acessa a pagina de politica de privacidade removendo o target e então clicando no link", () => {
    cy.contains("a", "Política de Privacidade")
      .invoke("removeAttr", "target")
      .click();
    cy.url().should("include", "privacy.html");
    cy.contains("h1", "Política de Privacidade").should("be.visible");
  });

  it("md12 - Preencha o campo de textarea simulando um control+v", () => {
    cy.get('#open-text-area').invoke('val', 'Teste de control v no campo de text area').should('have.value', 'Teste de control v no campo de text area').trigger('paste', {clipboardData: 'Teste de control v no campo de text area'})  
  });


  it('md12 - Faz uma requisição HTTP', () => {
    cy.request({
      method: 'GET',
      url: 'https://cac-tat-v3.s3.eu-central-1.amazonaws.com/index.html'
    }).then( (response) => {
      console.log(response)
      expect(response.status).to.eq(200)
      expect(response.statusText).to.eq('OK')
      expect(response.body).to.contain('CAC TAT')

    })

  })

  it.only('Fazer o gato aparecer', () => {
    cy.get('#cat').should('not.be.visible').invoke('show').should('be.visible')
    cy.get('#title').invoke('text', 'CAT TAT')
  })





});
