const bests = [
  {
    title: "Facial cleanser",
    image: "./assets/images/product-01.jpg",
    promo: "-20%",
    oldPrice: "$38.00",
    newPrice: "$29.00",
    rating: 5,
    reviews: 5170,
  },
  {
    title: "Facial cleanser",
    image: "./assets/images/product-01.jpg",
    promo: "",
    oldPrice: "$38.00",
    newPrice: "$29.00",
    rating: 5,
    reviews: 5170,
  },
];

const shop = document.querySelector("#sectionShop");
const shopHtml = bests
  .map(
    (product) => `
  <li class="scrollbar-item">
    <div class="shop-card">

      <div class="card-banner img-holder" style="--width: 540px; --height: 720px;">
        <img src="${product.image}" width="540" height="720" loading="lazy"
          alt="${product.title}" class="img-cover">

        <span class="badge" aria-label="20% off">${product.promo}</span>

        <div class="card-actions">

          <button class="action-btn" aria-label="add to cart">
            <ion-icon name="bag-handle-outline" aria-hidden="true"></ion-icon>
          </button>

          <button class="action-btn" aria-label="add to whishlist">
            <ion-icon name="star-outline" aria-hidden="true"></ion-icon>
          </button>

          <button class="action-btn" aria-label="compare">
            <ion-icon name="repeat-outline" aria-hidden="true"></ion-icon>
          </button>

        </div>
      </div>

      <div class="card-content">

        <div class="price">
          <del class="del">${product.oldPrice}</del>

          <span class="span">${product.newPrice}</span>
        </div>

        <h3>
          <a href="#" class="card-title">${product.title}</a>
        </h3>

        <div class="card-rating">

          <div class="rating-wrapper" aria-label="${
            product.rating
          } start rating">
            ${Array.from(
              { length: product.rating },
              () => '<ion-icon name="star" aria-hidden="true"></ion-icon>'
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

shop.innerHTML = shopHtml;