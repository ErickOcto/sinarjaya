class Collection {
  constructor(title, price, imageUrl, linkUrl) {
    this.title = title;
    this.price = price;
    this.imageUrl = imageUrl;
    this.linkUrl = linkUrl;
  }

  render() {
    return `
      <li>
        <div class="collection-card has-before hover:shine">
          <div class="collection-image has-bg-image" style="background-image: url('${this.imageUrl}'); opacity: 0.9;"></div>
          <h2 class="h2 card-title">${this.title}</h2>
          <p class="card-text">${this.price}</p>
          <a href="products.html${this.linkUrl}" class="btn-link">
            <span class="span">Belanja Sekarang</span>
            <ion-icon name="arrow-forward" aria-hidden="true"></ion-icon>
          </a>
        </div>
      </li>
    `;
  }
}

const collectionData = [
  new Collection(
    "Dibawah 1 Juta",
    "Mulai dari RP 399.000",
    "./assets/images/collection-1.png",
    "#semi"
  ),
  new Collection(
    "Sepeda Gunung",
    "Mulai dari RP 1.999.000",
    "./assets/images/collection-2.png",
    "gunung"
  ),
  new Collection(
    "Sepeda Anak",
    "Mulai dari RP 1.999.000",
    "./assets/images/collection-3.png",
    "anak"
  ),

  // Tambah koleksi lainnya di sini
];

// Ambil elemen <ul> dari HTML
const collectionList = document.getElementById("collectionList");

// Tambahkan HTML untuk setiap koleksi ke elemen <ul>
collectionData.forEach((collection) => {
  collectionList.innerHTML += collection.render();
});