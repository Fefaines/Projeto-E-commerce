const produto1 = {
  id: "1",
  nome: "TC-01",
  marca: "Tripowin",
  preco: 359,
  nomeArquivoImagem: "Tripowin-TC-01.jpg",
  fone: true,
};

const produto2 = {
  id: "2",
  nome: "ZS10 PRO",
  marca: "KZ",
  preco: 249.0,
  nomeArquivoImagem: "ZS10-PRO.jpg",
  fone: true,
};

const produto3 = {
  id: "3",
  nome: "ZAX",
  marca: "KZ",
  preco: 369.0,
  nomeArquivoImagem: "ZAX.jpg",
  fone: true,
};

const catalogo = [
  {
    id: "4",
    nome: "TC-01",
    marca: "Tripowin ",
    preco: 359.0,
    nomeArquivoImagem: "Tripowin-TC-01.jpg",
    fone: true,
  },
  {
    id: "5",
    nome: "ZS10 PRO",
    marca: "KZ",
    preco: 249.0,
    nomeArquivoImagem: "ZS10-PRO.jpg",
    fone: true,
  },
  {
    id: "6",
    nome: "ZAX",
    marca: "KZ",
    preco: 369.0,
    nomeArquivoImagem: "ZAX.jpg",
    fone: true,
  },
  {
    id: "7",
    nome: "AS16 PRO",
    marca: "KZ",
    preco: 410.0,
    nomeArquivoImagem: "AS16.jpg",
    fone: true,
  },
  {
    id: "8",
    nome: "Adaptador USB-C",
    marca: "KZ",
    preco: 189.0,
    nomeArquivoImagem: "ADAPTADOR-USB-C.jpg",
    fone: false,
  },
  {
    id: "9",
    nome: "Cabo Tipo C",
    marca: "KZ",
    preco: 45.0,
    nomeArquivoImagem: "cabo-tipoC.jpg",
    fone: false,
  },

  {
    id: "10",
    nome: "Cabo Tipo B",
    marca: "KZ",
    preco: 45.0,
    nomeArquivoImagem: "cabo-tipoB.jpg",
    fone: false,
  },

  {
    id: "11",
    nome: "ZSX TERMINATOR",
    marca: "KZ",
    preco: 264.0,
    nomeArquivoImagem: "ZSX-TERMINATOR.jpg",
    fone: true,
  },
  {
    id: "12",
    nome: "D-FI",
    marca: "KZ",
    preco: 189.0,
    nomeArquivoImagem: "D-FI.jpg",
    fone: true,
  },
];

for (const produtoCatalogo of catalogo) {
  const cartaoProduto = `
  <div class= "card shadow-lg group ${
    produtoCatalogo.fone ? "fones" : "acessorios" //Se o que estiver à esquerda da interrogação for verdadeiro, ele usará a primeira opção, caso contrário, usará o que estiver após à direita":"
  }" id="card card-produto-${produtoCatalogo.id}">
    <img
      src="./img/${produtoCatalogo.nomeArquivoImagem}"
      alt="Fone Tripowin-TC-01"
      class="product-img"
    />
    <p class="marca">${produtoCatalogo.marca}</p>
    <p>${produtoCatalogo.nome}</p>
    <p>R$${produtoCatalogo.preco + ",00"}</p>
    <button class="addCartBtn" id= "addCartBtn-${
      produtoCatalogo.id
    }">Adicionar <i " class="fa-solid fa-cart-plus"></i></button>
  </div>`;

  document.getElementById("container-produto").innerHTML += cartaoProduto;
  document.getElementById("addCartBtn-${produtoCatalogo.id");
}

//**************Cart script*****************

const idsProdutoCarrinhoComQuantidade = lerLocalStorage("carrinho") ?? {}; //Caso não tenha nenhuma informação com a chave informada, ele vai considerar o "??" vai considerar o elemento da direita

document.addEventListener("DOMContentLoaded", function () {
  const carrinho = document.querySelector(".carrinho");
  const closeCartButton = document.getElementById("close-cart");
  const openCartButton = document.getElementById("open-cart");

  function toggleCart() {
    carrinho.classList.toggle("cart-open"); // Mudança de classe para abrir/fechar
  }

  closeCartButton.addEventListener("click", toggleCart);
  openCartButton.addEventListener("click", toggleCart);
});

function incrementarQuantidadeProduto(idProduto) {
  idsProdutoCarrinhoComQuantidade[idProduto]++;
  atualizarPrecoCarrinho();
  atualizarInformacaoQuantidade(idProduto);
  salvarLocalStorage("carrinho", idsProdutoCarrinhoComQuantidade);
}

function decrementarQuantidadeProduto(idProduto) {
  if (idsProdutoCarrinhoComQuantidade[idProduto] === 1) {
    removerDoCarrinho(idProduto);
    return;
  }

  idsProdutoCarrinhoComQuantidade[idProduto]--;
  atualizarInformacaoQuantidade(idProduto);
  atualizarPrecoCarrinho();
  salvarLocalStorage("carrinho", idsProdutoCarrinhoComQuantidade);
}

function atualizarInformacaoQuantidade(idProduto) {
  document.getElementById(`qtd-${idProduto}`).innerText =
    idsProdutoCarrinhoComQuantidade[idProduto];
}

function desenharProdutoNoCarrinho(idProduto) {
  const produto = catalogo.find((p) => p.id === idProduto); // ache um produto p tal que esse produto p, tenha o id igual ao ID que foi solicitado no parâmetro ;
  const containerProdutosCarrinho = document.getElementById("cart-products");

  const elementoArticle = document.createElement("article");
  const articleClasses = ["cart-item"];
  for (const articleClass of articleClasses) {
    elementoArticle.classList.add(articleClass);
  }

  const cartaoProdutoCarrinho = `
      <img
        class="CartProduct-img"
        src="./img/${produto.nomeArquivoImagem}"
        alt="produto no carrinho"
      />

      <div class="product-description">
        <p>${produto.marca}</p>
        <p>${produto.nome}</p>
        <p>R$${produto.preco},00</p>
        <div class="product-counter" >
        <button type="button" id="decrementar-produto-${
          produto.id
        }" class="qtdBtn btn btn-outline-dark">-</button>
        <span id="qtd-${produto.id}" class=" btn btn-light">${
    idsProdutoCarrinhoComQuantidade[produto.id]
  }</span>
        <button type="button" id="incrementar-produto-${
          produto.id
        }" class="qtdBtn btn btn-outline-dark">+</button>
        </div
      </div>

      <i id="remove-item-${
        produto.id
      }" class="close-product fa-regular fa-circle-xmark "></i>
`;

  elementoArticle.innerHTML = cartaoProdutoCarrinho;
  containerProdutosCarrinho.appendChild(elementoArticle);

  document
    .getElementById(`decrementar-produto-${produto.id}`)
    .addEventListener("click", () => decrementarQuantidadeProduto(produto.id)); //Se eu coloco o nome da função e parênteses, a função irá rodar naquele momento, mas se eu uso a função "seta", ela só estará referenciado a função junto de seu parâmetro
  document
    .getElementById(`incrementar-produto-${produto.id}`)
    .addEventListener("click", () => incrementarQuantidadeProduto(produto.id));
  document
    .getElementById(`remove-item-${produto.id}`)
    .addEventListener("click", () => removerDoCarrinho(produto.id));
}

function renderizarProdutosCarrinho() {
  const containerProdutosCarrinho = document.getElementById("cart-products");
  containerProdutosCarrinho.innerHTML = ""; //Apagando o texto para gerá-lo novamente
  for (const idProduto in idsProdutoCarrinhoComQuantidade) {
    desenharProdutoNoCarrinho(idProduto);
  }
}

function AdicionarAoCarrinho(idProduto) {
  if (idProduto in idsProdutoCarrinhoComQuantidade) {
    incrementarQuantidadeProduto(idProduto);
    return;
  }

  idsProdutoCarrinhoComQuantidade[idProduto] = 1;
  desenharProdutoNoCarrinho(idProduto);
  atualizarPrecoCarrinho();
  salvarLocalStorage("carrinho", idsProdutoCarrinhoComQuantidade);
}

for (const produtoCatalogo of catalogo) {
  document
    .getElementById(`addCartBtn-${produtoCatalogo.id}`)
    .addEventListener("click", () => AdicionarAoCarrinho(produtoCatalogo.id));
}

function removerDoCarrinho(idProduto) {
  delete idsProdutoCarrinhoComQuantidade[idProduto];
  renderizarProdutosCarrinho();
  salvarLocalStorage("carrinho", idsProdutoCarrinhoComQuantidade);
  atualizarPrecoCarrinho();
}

function atualizarPrecoCarrinho() {
  const precoCarrinho = document.getElementById("total-price");
  let precoTotalCarrinho = 0;

  for (const idProdutoNoCarrinho in idsProdutoCarrinhoComQuantidade) {
    precoTotalCarrinho +=
      catalogo.find((p) => p.id === idProdutoNoCarrinho).preco *
      idsProdutoCarrinhoComQuantidade[idProdutoNoCarrinho];
  }
  precoCarrinho.innerText = `Total: R$${precoTotalCarrinho},00`;
}

function salvarLocalStorage(chave, informacao) {
  localStorage.setItem(chave, JSON.stringify(informacao));
}

function lerLocalStorage(chave) {
  return JSON.parse(localStorage.getItem(chave));
}

// *****Filtragem do catálogo*****

const catalogoProdutos = document.getElementById("container-produto");

// function esconderAcessorios() {
//   const acessorios = Array.from(
//     catalogoProdutos.getElementsByClassName("acessorios")
//   );

//   for (const acessorio of acessorios) {
//     acessorio.classList.add("hidden");
//   }
// }

// function inicilizarFiltros() {
//   document
//     .getElementById("exibir-fones")
//     .addEventListener("click", esconderAcessorios);
// }

// function exibirTodos() {
//   const produtosEscondidos = Array.from(
//     catalogoProdutos.getElementsByClassName("hidden")
//   );

//   for (const produto of produtosEscondidos) {
//     produto.classList.remove("hidden");
//   }
// }

// function esconderAcessorios() {
//   exibirTodos();
//   const acessorios = Array.from(
//     catalogoProdutos.getElementsByClassName("acessorios")
//   );

//   for (const acessorio of acessorios) {
//     acessorio.classList.add("hidden");
//   }
// }

// function esconderFones() {
//   exibirTodos();
//   const fones = Array.from(catalogoProdutos.getElementsByClassName("fones"));

//   for (const fone of fones) {
//     fone.classList.add("hidden");
//   }
// }

// function inicilizarFiltros() {
//   document
//     .getElementById("exibir-todos")
//     .addEventListener("click", exibirTodos);
//   document
//     .getElementById("exibir-fones")
//     .addEventListener("click", esconderAcessorios);
//   document
//     .getElementById("exibir-acessorios")
//     .addEventListener("click", esconderFones);
// }

// document.addEventListener("DOMContentLoaded", function () {
//   inicilizarFiltros();
// });
document.addEventListener("DOMContentLoaded", function () {
  // Obtenha referências aos elementos de filtro
  const filtroTodos = document.getElementById("exibir-todos");
  const filtroFones = document.getElementById("exibir-fones");
  const filtroAcessorios = document.getElementById("exibir-acessorios");

  // Obtenha uma referência aos produtos
  const produtos = document.querySelectorAll("#container-produto .card");

  // Adicione ouvintes de eventos para os filtros
  filtroTodos.addEventListener("change", () => {
    // Quando "Todos" é selecionado, mostre todos os produtos
    produtos.forEach((produto) => {
      produto.style.display = "flex";
    });
  });

  filtroFones.addEventListener("change", () => {
    // Quando "Fones" é selecionado, mostre apenas produtos de fone
    produtos.forEach((produto) => {
      if (produto.classList.contains("fones")) {
        produto.style.display = "flex";
      } else {
        produto.style.display = "none";
      }
    });
  });

  filtroAcessorios.addEventListener("change", () => {
    // Quando "Acessórios" é selecionado, mostre apenas produtos de acessórios
    produtos.forEach((produto) => {
      if (produto.classList.contains("acessorios")) {
        produto.style.display = "flex";
      } else {
        produto.style.display = "none";
      }
    });
  });
});
renderizarProdutosCarrinho();
atualizarPrecoCarrinho();

/* ***** Carrinho Checkout ***** */
