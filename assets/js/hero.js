class Hero {
  constructor(title, text, price, image) {
    this.title = title;
    this.text = text;
    this.price = price;
    this.image = image;
  }

  render() {
    return `
      <li class="scrollbar-item">
        <div class="hero-card has-bg-image" style="background-image: url('${this.image}')">
          <div class="card-content">
            <h1 class="h1 hero-title">${this.title}</h1>
            <p class="hero-text">${this.text}</p>
            <p class="price">${this.price}</p>
            <a href="#shop" class="btn btn-primary">Belanja Sekarang</a>
          </div>
        </div>
      </li>
    `;
  }
}

const heroData = [
  new Hero(
    "Toko Sepeda <br> Terbaik di Balikpapan",
    "Kontak kami untuk informasi seperti ketersediaan unit barang",
    "Mulai dari RP 599.000",
    "./assets/images/hero-banner-1.png"
  ),
  // Tambahkan hero data lainnya di sini
  new Hero(
    "Toko Sepeda <br> Anak Terlengkap!",
    "Kontak kami untuk informasi seperti ketersediaan unit barang",
    "Mulai dari RP 799.000",
    "./assets/images/hero-banner-2.png"
  ),
  new Hero(
    "Dipercayai <br>oleh Brand Terbaik",
    "Kami telah dipercayai oleh brand brand top lokal hingga internasional",
    "Mulai dari RP 499.000",
    "./assets/images/hero-banner-3.png"
  ),
];


const heroList = document.getElementById("hero-section");
const heroHtml = heroData.map((hero) => hero.render()).join("");
heroList.innerHTML = heroHtml;
