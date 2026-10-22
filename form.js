// Seleksi Elemen Form & Input via DOM
const form = document.getElementById('feedback-form');
const inputNama = document.getElementById('nama');
const inputEmail = document.getElementById('email');
const selectKategori = document.getElementById('kategori');
const inputPesan = document.getElementById('pesan');
const charCount = document.getElementById('char-count');
const feedbackResult = document.getElementById('feedback-result');

// 1. Event Listener "input" - Menghitung karakter pesan secara dinamis
inputPesan.addEventListener('input', function () {
    const len = inputPesan.value.length;
    charCount.textContent = `${len} / 200 karakter`;

    if (len > 200) {
        charCount.style.color = '#dc2626';
    } else {
        charCount.style.color = '#6b7280';
    }
});

// 2. Event Listener "submit" - Memproses form & melakukan validasi
form.addEventListener('submit', function (event) {
    // Cegah submit bawaan yang mereload halaman
    event.preventDefault();

    // Bersihkan pesan error sebelumnya
    clearErrors();

    // Validasi input
    if (validateForm()) {
        // Ambil nilai input menggunakan DOM
        const nama = inputNama.value.trim();
        const email = inputEmail.value.trim();
        const kategori = selectKategori.value;
        const pesan = inputPesan.value.trim();

        // Tampilkan hasil pemrosesan form secara dinamis pada halaman web
        feedbackResult.className = 'feedback-result';
        feedbackResult.innerHTML = `
            <h3>✅ Ulasan Berhasil Dikirim!</h3>
            <p><strong>Nama:</strong> ${escapeHTML(nama)}</p>
            <p><strong>Email:</strong> ${escapeHTML(email)}</p>
            <p><strong>Kategori:</strong> ${escapeHTML(kategori)}</p>
            <p><strong>Pesan:</strong> "${escapeHTML(pesan)}"</p>
        `;

        // Reset form
        form.reset();
        charCount.textContent = '0 / 200 karakter';
    }
});

// Fungsi Validasi Sederhana
function validateForm() {
    let isValid = true;

    if (inputNama.value.trim() === '') {
        showError('error-nama', 'Nama wajib diisi.');
        isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (inputEmail.value.trim() === '') {
        showError('error-email', 'Email wajib diisi.');
        isValid = false;
    } else if (!emailRegex.test(inputEmail.value.trim())) {
        showError('error-email', 'Format email tidak valid.');
        isValid = false;
    }

    if (selectKategori.value === '') {
        showError('error-kategori', 'Pilih salah satu kategori.');
        isValid = false;
    }

    if (inputPesan.value.trim() === '') {
        showError('error-pesan', 'Pesan ulasan wajib diisi.');
        isValid = false;
    } else if (inputPesan.value.length > 200) {
        showError('error-pesan', 'Pesan tidak boleh melebihi 200 karakter.');
        isValid = false;
    }

    return isValid;
}

function showError(elementId, message) {
    document.getElementById(elementId).textContent = message;
}

function clearErrors() {
    const errorElems = document.querySelectorAll('.error-msg');
    errorElems.forEach(elem => elem.textContent = '');
}

function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
        tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
    );
}