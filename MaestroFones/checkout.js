const produtosCarrinhoCheckout = document.getElementById(
  "container-produtos-checkout"
);

const newElement = document.createElement("div");
newElement.innerHTML = "ola Mundo";
produtosCarrinhoCheckout.appendChild(newElement);

function desenharProdutoNoCarrinho(idProduto) {
  const produto = catalogo.find((p) => p.id === idProduto); // ache um produto p tal que esse produto p, tenha o id igual ao ID que foi solicitado no parâmetro ;
  const containerProdutosCarrinho = document.getElementById(
    "container-produtos-checkout"
  );

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
