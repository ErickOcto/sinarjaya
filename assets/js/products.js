fetch("products.json")
  .then((response) => response.json())
  .then((data) => {
    const list = document.querySelector("#bestSeller");
    const productHtml = data
      .map(
        (product) => `
          <li class="scrollbar-item">
              <div class="shop-card">
                <div class="card-banner img-holder" style="--width: 540; --height: 720;">
                  <img src="/assets/images/${
                    product.image
                  }" width="540" height="720" loading="lazy" alt="${
          product.name
        }" class="img-cover">
                  <span class="badge" aria-label="20% off">${
                    product.promo
                  }</span>
                  <div class="card-actions">
                    <button class="action-btn" onclick="addToCart(${JSON.stringify(
                      product.id,
                    )})">
                      <ion-icon name="bag-handle-outline" aria-hidden="true"></ion-icon>
                    </button>
                  </div>
                </div>
                <div class="card-content">
                  <div class="price">
                    <del class="del">${product.oldPrice}</del>
                    <span class="span">${product.newPrice}</span>
                  </div>
                  <h3>
                    <a href="#" class="card-title">${product.name}</a>
                  </h3>
                  <div class="card-rating">
                    <div class="rating-wrapper" aria-label="${
                      product.rating
                    } start rating">
                      ${Array.from(
                        { length: product.rating },
                        () =>
                          '<ion-icon name="star" aria-hidden="true"></ion-icon>'
                      ).join("")}
                    </div>
                    <p class="rating-text">${product.reviews} reviews</p>
                  </div>
                </div>
              </div>
            </li>
        `
      )
      .join("");
    list.innerHTML = productHtml;
  })
  .catch((error) => console.error("Error loading JSON data:", error));

  function addToCart(productId) {
    let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItemIndex = cartItems.findIndex(item => item.id === productId);

    if (existingItemIndex !== -1) {
        cartItems[existingItemIndex].quantity++;
    } else {
        cartItems.push({ id: productId, quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cartItems));
    showFloatingAlert();
    updateTotalQuantityUI();
    updateTotalHarga();
}

function showFloatingAlert() {
  let floatingAlert = document.getElementById("floating-alert");
  floatingAlert.style.display = "block";
}