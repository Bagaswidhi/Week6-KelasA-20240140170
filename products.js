// Endpoint URL DummyJSON
const API_URL = 'https://dummyjson.com/products';

// Element DOM
const statusContainer = document.getElementById('status-container');
const productGrid = document.getElementById('product-grid');

// Fungsi utama mengambil data produk menggunakan Fetch API
async function fetchProducts() {
    // 1. Tampilkan Indikator Loading
    statusContainer.innerHTML = '<p class="loading">⌛ Memuat data produk dari API...</p>';
    productGrid.innerHTML = '';

    try {
        const response = await fetch(API_URL);

        // Periksa jika HTTP response gagal
        if (!response.ok) {
            throw new Error(`Gagal memuat data (Status HTTP: ${response.status})`);
        }

        // Olah response JSON
        const data = await response.json();

        // Bersihkan status loading
        statusContainer.innerHTML = '';

        // Tampilkan produk ke halaman
        renderProducts(data.products);

    } catch (error) {
        // 2. Penanganan Error
        console.error('Fetch Error:', error);
        statusContainer.innerHTML = `
            <div class="error-box">
                ⚠️ <strong>Error:</strong> Gagal mengambil data produk. ${error.message}
            </div>
        `;
    }
}

// Fungsi memanipulasi DOM untuk menampilkan daftar produk
function renderProducts(products) {
    if (!products || products.length === 0) {
        productGrid.innerHTML = '<p>Tidak ada produk untuk ditampilkan.</p>';
        return;
    }

    products.forEach(product => {
        // Buat elemen card baru secara dinamis
        const card = document.createElement('div');
        card.className = 'product-card';

        // Tampilkan minimal Nama dan Harga Produk sesuai ketentuan soal
        card.innerHTML = `
            <img src="${product.thumbnail}" alt="${product.title}" class="product-img">
            <div class="product-body">
                <span class="product-category">${product.category}</span>
                <h3 class="product-title">${product.title}</h3>
                <div class="product-price">$${product.price.toFixed(2)}</div>
            </div>
        `;

        // Sisipkan ke grid
        productGrid.appendChild(card);
    });
}

// Jalankan Fetch API saat DOM selesai dimuat
document.addEventListener('DOMContentLoaded', fetchProducts);