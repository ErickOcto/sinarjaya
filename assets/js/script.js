"use strict";

/**
 * add event on element
 */

const addEventOnElem = function (elem, type, callback) {
  if (elem.length > 1) {
    for (let i = 0; i < elem.length; i++) {
      elem[i].addEventListener(type, callback);
    }
  } else {
    elem.addEventListener(type, callback);
  }
};

/**
 * navbar toggle
 */

const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const navbar = document.querySelector("[data-navbar]");
const navbarLinks = document.querySelectorAll("[data-nav-link]");
const overlay = document.querySelector("[data-overlay]");

const toggleNavbar = function () {
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
};

addEventOnElem(navTogglers, "click", toggleNavbar);

const closeNavbar = function () {
  navbar.classList.remove("active");
  overlay.classList.remove("active");
};

addEventOnElem(navbarLinks, "click", closeNavbar);

/**
 * header sticky & back top btn active
 */

const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

const headerActive = function () {
  if (window.scrollY > 150) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
};

addEventOnElem(window, "scroll", headerActive);

let lastScrolledPos = 0;

const headerSticky = function () {
  if (lastScrolledPos >= window.scrollY) {
    header.classList.remove("header-hide");
  } else {
    header.classList.add("header-hide");
  }

  lastScrolledPos = window.scrollY;
};

addEventOnElem(window, "scroll", headerSticky);

/**
 * scroll reveal effect
 */

const sections = document.querySelectorAll("[data-section]");

const scrollReveal = function () {
  for (let i = 0; i < sections.length; i++) {
    if (sections[i].getBoundingClientRect().top < window.innerHeight / 2) {
      sections[i].classList.add("active");
    }
  }
};

scrollReveal();

addEventOnElem(window, "scroll", scrollReveal);


function openModal() {
  document.getElementById('modalContainer').style.display = 'block';
}

function closeModal() {
  document.getElementById('modalContainer').style.display = 'none';
  window.location.reload();
}

function updateTotalHarga() {
  let totalHarga = 0;
  const rows = document.querySelectorAll("#produkTable tbody tr");
  rows.forEach((row) => {
    const jumlah = parseInt(row.querySelector(".jumlah").value);
    const harga = parseInt(
      row
        .querySelector("td:last-child")
        .innerText.replace("Rp ", "")
        .replace(".", "")
    );
    totalHarga += jumlah * harga;
  });
  document.getElementById(
    "totalHarga"
  ).innerText = `Rp ${totalHarga.toLocaleString()}`;

    document.getElementById(
      "totalHargaSemua"
    ).innerText = `Rp ${totalHarga.toLocaleString()}`;
}

document.querySelectorAll(".jumlah").forEach((input) => {
  input.addEventListener("input", updateTotalHarga);
});

updateTotalHarga();

function removeProduct(event, productId) {
  event.target.closest("tr").remove();
  let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  let existingProductIndex = cartItems.findIndex(
    (item) => item.id === productId
  );
  if (existingProductIndex >= 0) {
    cartItems.splice(existingProductIndex, 1);
  }
  localStorage.setItem("cart", JSON.stringify(cartItems));
}

let i = 1;
let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
fetch("products.json")
  .then((response) => response.json())
  .then((data) => {
    cartItems.forEach((cartItem) => {
      let product = data.find((product) => product.id === cartItem.id);
      if (product) {
        let row = document.createElement("tr");
        row.innerHTML = `
          <td>${i++}</td>
          <td><img src="./assets/images/${
            product.image
          }" width="100" height="100" /></td>
          <td>${product.name}</td>
          <td><input min="1" type="number" class="jumlah" value="${
            cartItem.quantity
          }" data-product-id="${product.id}" /></td>
          <td>Rp ${product.newPrice}</td>
          <td><button id="hapus-tabel" class="btn btn-danger" onclick="removeProduct(event, ${
            product.id
          })">Hapus</button></td>
        `;
        document
          .getElementById("produkTable")
          .querySelector("tbody")
          .appendChild(row);
      }
    });

    let tbody = document.querySelector("#produkTable tbody");
    if (tbody.childElementCount === 0) {
      let emptyRow = document.createElement("tr");
      emptyRow.innerHTML = `<td colspan="6">Tidak ada produk</td>`;
      tbody.appendChild(emptyRow);
    }

    document.querySelectorAll(".jumlah").forEach((input) => {
      input.addEventListener("change", function (event) {
        let productId = event.target.dataset.productId;
        let newQuantity = parseInt(event.target.value);
        updateProductQuantity(productId, newQuantity);

        console.log(productId);
        console.log(newQuantity);
        updateTotal();
      });
    });

    updateTotal();
  })
  .catch((error) => console.error("Error loading JSON data:", error));

function updateProductQuantity(productId, newQuantity) {
  let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  let existingProductIndex = cartItems.findIndex(
    (item) => item.id == productId
  );

  console.log(cartItems[existingProductIndex]);
  console.log(existingProductIndex);

  if (existingProductIndex >= 0) {
    cartItems[existingProductIndex].quantity = newQuantity;
  }

  localStorage.setItem("cart", JSON.stringify(cartItems));
}
  
function updateTotal() {
  let total = 0;
  document.querySelectorAll('#produkTable tbody tr').forEach(row => {
    let jumlah = parseInt(row.querySelector('.jumlah').value);
    let harga = parseInt(row.querySelector('td:nth-child(5)').textContent.replace('Rp ', '').replace('.', '').replace(',', ''));
    total += jumlah * harga;
  });
  document.getElementById('totalHarga').textContent = 'Rp ' + total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  document.getElementById('totalHargaSemua').textContent = 'Rp ' + total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function getTotalQuantityFromLocalStorage() {
  let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  let totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);
  return totalQuantity;
}

function updateTotalQuantityUI() {
  let totalQuantity = getTotalQuantityFromLocalStorage();
  document.querySelector('.btn-badge').textContent = totalQuantity;
}

updateTotalQuantityUI();

document.addEventListener("DOMContentLoaded", function () {
  let whatsappLink;

  var modal = document.getElementById("modal");
  var btn = document.getElementById("whatsappButton");
  var span = document.getElementsByClassName("tutup")[0];

  btn.onclick = function () {
    let whatsappData = "";

    document.querySelectorAll("#produkTable tbody tr").forEach((tr, index) => {
      let productName = tr.querySelector("td:nth-child(3)").innerText;
      let productQuantity = tr.querySelector("td:nth-child(4) input").value;

      whatsappData += `${
        index + 1
      }. ${productName} - (Qty: ${productQuantity})\n`;
    });

    modal.style.display = "block";

    whatsappLink = `https://wa.me/628123456789?text=${encodeURIComponent(
      whatsappData
    )}`;
  };

  span.onclick = function () {
    modal.style.display = "none";
  };

  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };

  var sendOrderBtn = document.getElementById("kirimPesananBtn");

  sendOrderBtn.onclick = function () {
    modal.style.display = "none";
    localStorage.removeItem("cart");
    window.open(whatsappLink);
  };
});
