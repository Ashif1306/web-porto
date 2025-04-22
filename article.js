document.addEventListener('DOMContentLoaded', function() {
    // Data artikel (bisa diganti dengan data asli nanti)
    const artikelData = [
        {
            id: 'artikel-1',
            judul: 'Analisis SCAMPER Bisnis Pertanian',
            gambar: 'img/scamper blog).png',
            kategori: ['UMKM', 'Agriculture'],
            penulis: 'Muh Ashif',
            konten: `
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, vel aliquam nisl nisl vel nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, vel aliquam nisl nisl vel nisl.</p>
                
                <h3>Penerapan Metode SCAMPER dalam Bisnis Pertanian</h3>
                
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Curabitur aliquet quam id dui posuere blandit. Vivamus suscipit tortor eget felis porttitor volutpat. Proin eget tortor risus. Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus.</p>
                
                <p>Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Pellentesque in ipsum id orci porta dapibus. Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem.</p>
                
                <h3>Hasil dan Kesimpulan</h3>
                
                <p>Vivamus suscipit tortor eget felis porttitor volutpat. Curabitur aliquet quam id dui posuere blandit. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula. Nulla quis lorem ut libero malesuada feugiat. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a.</p>
                
                <p>Nulla porttitor accumsan tincidunt. Curabitur aliquet quam id dui posuere blandit. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Quisque velit nisi, pretium ut lacinia in, elementum id enim.</p>
            `
        },
        {
            id: 'artikel-2',
            judul: 'Desain Produk',
            gambar: 'img/Desain Produk Blog.png',
            kategori: ['Popular', 'Web Design'],
            penulis: 'Muh Ashif',
            konten: `
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, vel aliquam nisl nisl vel nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, vel aliquam nisl nisl vel nisl.</p>
                
                <h3>Konsep Dasar Desain Produk</h3>
                
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Curabitur aliquet quam id dui posuere blandit. Vivamus suscipit tortor eget felis porttitor volutpat. Proin eget tortor risus. Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus.</p>
                
                <p>Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Pellentesque in ipsum id orci porta dapibus. Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem.</p>
                
                <h3>Implementasi Praktis</h3>
                
                <p>Vivamus suscipit tortor eget felis porttitor volutpat. Curabitur aliquet quam id dui posuere blandit. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula. Nulla quis lorem ut libero malesuada feugiat. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a.</p>
                
                <p>Nulla porttitor accumsan tincidunt. Curabitur aliquet quam id dui posuere blandit. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Quisque velit nisi, pretium ut lacinia in, elementum id enim.</p>
            `
        },
        {
            id: 'artikel-3',
            judul: 'Business Model Canvas (BMC)',
            gambar: 'img/bmc.png',
            kategori: ['UMKM', 'Web Design'],
            penulis: 'Muh Ashif',
            konten: `
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, vel aliquam nisl nisl vel nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, vel aliquam nisl nisl vel nisl.</p>
                
                <h3>Pengertian Business Model Canvas</h3>
                
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Curabitur aliquet quam id dui posuere blandit. Vivamus suscipit tortor eget felis porttitor volutpat. Proin eget tortor risus. Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus.</p>
                
                <p>Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Pellentesque in ipsum id orci porta dapibus. Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem.</p>
                
                <h3>Implementasi BMC dalam Bisnis</h3>
                
                <p>Vivamus suscipit tortor eget felis porttitor volutpat. Curabitur aliquet quam id dui posuere blandit. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula. Nulla quis lorem ut libero malesuada feugiat. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a.</p>
                
                <p>Nulla porttitor accumsan tincidunt. Curabitur aliquet quam id dui posuere blandit. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Quisque velit nisi, pretium ut lacinia in, elementum id enim.</p>
            `
        },
        {
            id: 'artikel-4',
            judul: 'UTS Digital Marketing',
            gambar: 'img/uts.png',
            kategori: ['UMKM', 'Web Design'],
            penulis: 'Muh Ashif',
            konten: `
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, vel aliquam nisl nisl vel nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, vel aliquam nisl nisl vel nisl.</p>
                
                <h3>Pengantar Digital Marketing</h3>
                
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Curabitur aliquet quam id dui posuere blandit. Vivamus suscipit tortor eget felis porttitor volutpat. Proin eget tortor risus. Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus.</p>
                
                <p>Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Pellentesque in ipsum id orci porta dapibus. Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem.</p>
                
                <h3>Strategi Digital Marketing</h3>
                
                <p>Vivamus suscipit tortor eget felis porttitor volutpat. Curabitur aliquet quam id dui posuere blandit. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula. Nulla quis lorem ut libero malesuada feugiat. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a.</p>
                
                <p>Nulla porttitor accumsan tincidunt. Curabitur aliquet quam id dui posuere blandit. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Quisque velit nisi, pretium ut lacinia in, elementum id enim.</p>
            `
        },
        {
            id: 'artikel-5',
            judul: 'Apa itu Iklan!! adalah Terbaik & Terburuk.. Simak penjelasan berikut!!',
            gambar: 'img/iklan.png',
            kategori: ['UMKM', 'Web Design'],
            penulis: 'Muh Ashif',
            konten: `
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, vel aliquam nisl nisl vel nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, vel aliquam nisl nisl vel nisl.</p>
                
                <h3>Konsep Dasar Iklan</h3>
                
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Curabitur aliquet quam id dui posuere blandit. Vivamus suscipit tortor eget felis porttitor volutpat. Proin eget tortor risus. Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus.</p>
                
                <p>Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Pellentesque in ipsum id orci porta dapibus. Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem.</p>
                
                <h3>Iklan Terbaik dan Terburuk</h3>
                
                <p>Vivamus suscipit tortor eget felis porttitor volutpat. Curabitur aliquet quam id dui posuere blandit. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula. Nulla quis lorem ut libero malesuada feugiat. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a.</p>
                
                <p>Nulla porttitor accumsan tincidunt. Curabitur aliquet quam id dui posuere blandit. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Quisque velit nisi, pretium ut lacinia in, elementum id enim.</p>
            `
        },
        {
            id: 'artikel-6',
            judul: 'Policy conflict - Ekonomi Makro',
            gambar: 'img/policy konflik.png',
            kategori: ['UMKM', 'Ekonomi'],
            penulis: 'Muh Ashif',
            konten: `
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, vel aliquam nisl nisl vel nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, vel aliquam nisl nisl vel nisl.</p>
                
                <h3>Apa itu Policy Conflict?</h3>
                
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Curabitur aliquet quam id dui posuere blandit. Vivamus suscipit tortor eget felis porttitor volutpat. Proin eget tortor risus. Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus.</p>
                
                <p>Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Pellentesque in ipsum id orci porta dapibus. Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem.</p>
                
                <h3>Dampak Policy Conflict dalam Ekonomi Makro</h3>
                
                <p>Vivamus suscipit tortor eget felis porttitor volutpat. Curabitur aliquet quam id dui posuere blandit. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula. Nulla quis lorem ut libero malesuada feugiat. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a.</p>
                
                <p>Nulla porttitor accumsan tincidunt. Curabitur aliquet quam id dui posuere blandit. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Quisque velit nisi, pretium ut lacinia in, elementum id enim.</p>
            `
        },
        {
            id: 'artikel-7',
            judul: 'Makro equelibrium',
            gambar: 'img/makro equeblirium.png',
            kategori: ['UMKM', 'Web Design'],
            penulis: 'Muh Ashif',
            konten: `
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, vel aliquam nisl nisl vel nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, vel aliquam nisl nisl vel nisl.</p>
                
                <h3>Pengertian Makro Ekuilibrium</h3>
                
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Curabitur aliquet quam id dui posuere blandit. Vivamus suscipit tortor eget felis porttitor volutpat. Proin eget tortor risus. Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus.</p>
                
                <p>Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Pellentesque in ipsum id orci porta dapibus. Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem.</p>
                
                <h3>Penerapan dan Analisis</h3>
                
                <p>Vivamus suscipit tortor eget felis porttitor volutpat. Curabitur aliquet quam id dui posuere blandit. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula. Nulla quis lorem ut libero malesuada feugiat. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a.</p>
                
                <p>Nulla porttitor accumsan tincidunt. Curabitur aliquet quam id dui posuere blandit. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Quisque velit nisi, pretium ut lacinia in, elementum id enim.</p>
            `
        }
    ];

    // Buat struktur HTML untuk pop-up artikel
    const popupHTML = `
    <div id="artikel-popup" class="artikel-popup">
        <div class="artikel-popup-overlay"></div>
        <div class="artikel-popup-content">
            <button class="artikel-popup-close">&times;</button>
            <div class="artikel-popup-header">
                <div class="artikel-popup-categories"></div>
                <h2 class="artikel-popup-title"></h2>
                <div class="artikel-popup-author"></div>
            </div>
            <div class="artikel-popup-image">
                <img src="" alt="">
            </div>
            <div class="artikel-popup-text"></div>
        </div>
    </div>
    `;

    // Sisipkan struktur HTML pop-up ke dalam body
    document.body.insertAdjacentHTML('beforeend', popupHTML);

    // Dapatkan elemen-elemen pop-up
    const popup = document.getElementById('artikel-popup');
    const popupOverlay = document.querySelector('.artikel-popup-overlay');
    const popupClose = document.querySelector('.artikel-popup-close');
    const popupTitle = document.querySelector('.artikel-popup-title');
    const popupCategories = document.querySelector('.artikel-popup-categories');
    const popupAuthor = document.querySelector('.artikel-popup-author');
    const popupImage = document.querySelector('.artikel-popup-image img');
    const popupText = document.querySelector('.artikel-popup-text');

    // Tambahkan event listener ke semua artikel (featured articles)
    const featuredArticles = document.querySelectorAll('.article-card');
    featuredArticles.forEach((article, index) => {
        article.addEventListener('click', () => {
            openPopup(artikelData[index]);
        });
    });

    // Tambahkan event listener ke semua artikel (blog list)
    const blogArticles = document.querySelectorAll('.blog-item');
    blogArticles.forEach((article, index) => {
        article.addEventListener('click', () => {
            openPopup(artikelData[index + 2]); // +2 karena featured articles sudah menggunakan 2 data pertama
        });
    });

    // Fungsi untuk membuka pop-up artikel
    function openPopup(artikel) {
        // Isi konten pop-up dengan data artikel
        popupTitle.textContent = artikel.judul;
        popupImage.src = artikel.gambar;
        popupImage.alt = artikel.judul;
        popupText.innerHTML = artikel.konten;
        popupAuthor.innerHTML = `<p>By ${artikel.penulis}</p>`;

        // Buat kategori artikel
        popupCategories.innerHTML = '';
        artikel.kategori.forEach(kat => {
            let categoryClass = 'dark';
            if (kat === 'Agriculture') categoryClass = 'green';
            else if (kat === 'Web Design') categoryClass = 'blue';
            else if (kat === 'Ekonomi') categoryClass = 'purple';

            const categorySpan = document.createElement('span');
            categorySpan.className = `category ${categoryClass}`;
            categorySpan.textContent = kat;
            popupCategories.appendChild(categorySpan);
        });

        // Tampilkan pop-up dengan animasi
        popup.classList.add('active');
        document.body.style.overflow = 'hidden'; // Mencegah scrolling halaman di belakang pop-up
    }

    // Fungsi untuk menutup pop-up artikel
    function closePopup() {
        popup.classList.remove('active');
        document.body.style.overflow = ''; // Kembalikan scrolling halaman
    }

    // Event listener untuk tombol tutup dan overlay
    popupClose.addEventListener('click', closePopup);
    popupOverlay.addEventListener('click', closePopup);

    // Event listener untuk tombol escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && popup.classList.contains('active')) {
            closePopup();
        }
    });
});