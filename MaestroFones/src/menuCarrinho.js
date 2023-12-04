function openCart() {}
document.getElementById("carrinho").classList.remove("width-closed");
function closeCart() {
  document.getElementById("carrinho").classList.add("width-closed");
}

function inicializarCarrinho() {
  const closeCartBtn = document.getElementById("close-cart");
  const openCartBtn = document.getElementById("open-cart");
  closeCartBtn.addEventListener("click", closeCart);
  openCartBtn.addEventListener("click", openCart);
}
