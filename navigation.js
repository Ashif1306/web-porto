// Menunggu sampai DOM sepenuhnya dimuat
document.addEventListener('DOMContentLoaded', function() {
    // Mendapatkan elemen header
    const header = document.querySelector('header');
    const body = document.body;
    
    // Mendapatkan tinggi header asli
    const headerHeight = header.offsetHeight;
    
    // Membuat tombol toggle menu untuk tampilan mobile
    const mobileMenuToggle = document.createElement('div');
    mobileMenuToggle.className = 'mobile-menu-toggle';
    mobileMenuToggle.innerHTML = `
        <div class="bar1"></div>
        <div class="bar2"></div>
        <div class="bar3"></div>
    `;
    
    // Menyisipkan tombol menu mobile sebelum navigasi
    const nav = document.querySelector('nav');
    header.insertBefore(mobileMenuToggle, nav);
    
    // Menambahkan event listener ke tombol menu mobile
    mobileMenuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        nav.classList.toggle('active');
        body.classList.toggle('menu-open'); // Mencegah scrolling saat menu terbuka
    });
    
    // Menutup menu mobile saat mengklik di luar menu
    document.addEventListener('click', function(e) {
        if (
            nav.classList.contains('active') && 
            !nav.contains(e.target) && 
            !mobileMenuToggle.contains(e.target)
        ) {
            mobileMenuToggle.classList.remove('active');
            nav.classList.remove('active');
            body.classList.remove('menu-open');
        }
    });
    
    // Set header sebagai fixed dari awal (tanpa menunggu scroll)
    header.classList.add('fixed-header');
    // Tambahkan padding pada body sesuai dengan tinggi header
    body.style.paddingTop = headerHeight + 'px';
    
    // Menangani perubahan ukuran window
    window.addEventListener('resize', function() {
        // Perbarui tinggi header jika ukuran window berubah
        const currentHeaderHeight = header.offsetHeight;
        body.style.paddingTop = currentHeaderHeight + 'px';
        
        // Reset menu mobile jika window diubah ke tampilan desktop
        if (window.innerWidth > 992 && nav.classList.contains('active')) {
            mobileMenuToggle.classList.remove('active');
            nav.classList.remove('active');
            body.classList.remove('menu-open');
        }
    });
    
    // Menangani animasi saat perpindahan halaman untuk semua link navigasi (termasuk Let's Talk)
    document.querySelectorAll('nav ul li a, .cta-button a, a[href="contact.html"]').forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Hanya jika berpindah ke halaman lain (bukan anchor pada halaman yang sama)
            if (href && !href.startsWith('#')) {
                e.preventDefault();
                
                // Animasi menu tertutup
                if (nav.classList.contains('active')) {
                    mobileMenuToggle.classList.remove('active');
                    nav.classList.remove('active');
                    body.classList.remove('menu-open');
                }
                
                // Simpan informasi halaman tujuan untuk animasi di halaman berikutnya
                sessionStorage.setItem('pageTransition', 'true');
                sessionStorage.setItem('prevPage', window.location.pathname);
                
                // Tambahkan class animasi keluar
                document.body.classList.add('page-transition-out');
                
                // Setelah animasi keluar, arahkan ke halaman baru
                setTimeout(function() {
                    window.location.href = href;
                }, 300); // Sesuaikan dengan durasi animasi CSS
            }
        });
    });
    
    // Cek apakah halaman dimuat sebagai bagian dari transisi
    if (sessionStorage.getItem('pageTransition') === 'true') {
        // Hapus flag transisi
        sessionStorage.removeItem('pageTransition');
        
        // Terapkan animasi masuk
        document.body.classList.add('page-transition-in');
        
        // Hapus class animasi setelah selesai
        setTimeout(function() {
            document.body.classList.remove('page-transition-in');
        }, 500);
    } else {
        // Jika bukan bagian dari transisi, tetap animasi halaman loaded biasa
        document.body.classList.add('page-loaded');
        setTimeout(function() {
            document.body.classList.remove('page-loaded');
        }, 300);
    }
    
    // Tandai halaman aktif di menu navigasi
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('nav ul li a').forEach(navLink => {
        const linkPage = navLink.getAttribute('href');
        
        // Tandai link sebagai aktif jika sesuai dengan halaman saat ini
        if (linkPage === currentPage || 
            (currentPage === '' && linkPage === 'index.html') || 
            (currentPage === '/' && linkPage === 'index.html')) {
            navLink.classList.add('active');
        }
    });
});