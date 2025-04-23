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
                <p>SCAMPER adalah metode kreatif yang digunakan untuk merangsang ide-ide baru dan inovasi dengan memodifikasi atau mengadaptasi hal-hal yang sudah ada. Metode ini pertama kali diperkenalkan oleh Bob Eberle dan merupakan akronim dari tujuh teknik yang berbeda untuk berpikir kreatif.</p>
                
                <h3>Penerapan Metode SCAMPER dalam Bisnis Pertanian</h3>
                
                <p>S = Subtitute

<br>Bagian ini menekankan pada apa yang dapat kita ubah atau gantikan pada entah itu produk, masalah, atau proses untuk memperbaikinya.</br></p>
                
                <p>C = Combine

Bagian ini menekankan pada bagaimana menggabungkan dua atau lebih bagian dari produk, proses, atau masalah kita untuk mendapatkan proses, produk, atau masalah yang berbeda untuk meningkatkan kesatuan atau sinergi baru.</p>
                <p>A = Adapt

<br>Dalam tahap menyesuaikan ini, kita akan mneerapkan suatu konsep ke dalam ide baru yang mungkin bisa mneghasilkan sesuatu yang baru juga.</br></p>
                <p>M = Magnify/Modify/Minify

Bagian modifikasi ini mendorong kita untuk memikirkan cara kreatif mnegubah ide yang sedang dipertimbangkan dengan memodifikasi dimensi atau atribut, ukuran, bentuk, warna, atau membuatnya lebih besar, lebih cepat dan kuat.</p>
                <p>P = Put to Another Use

<br>Bagian ini mendorong kita untuk melihat area lain dimana produk atau topic dapat digunakan serta memaksa untuk memikirkan kembali mengapa produk atau suatu cara itu ada, penggunaannya, dan ruang lingkup aplikasi sehingga kita dapat menemukan ide tentang dimana lagi produk atau cara itu dapat digunakan. Tahap ini mengganti sebuah kegunaan merupakan salah satu bentuk kreativitas yang bisa dicoba.</br></p>
                <p>E = Eliminate/Elaborate

Eliminate atau penghapusan adalah aspek dari metode SCAMPER di mana Sahabat Wirausaha diminta untuk menghapus elemen-elemen yang tidak perlu atau tahapan yang redundan untuk meningkatkan efisiensi dan fokus pada nilai inti produk. </p>
                <p>R = Rearrange/Reverse

<br>Reverse atau pembalikan adalah tahap dalam metode SCAMPER di mana Sahabat Wirausaha diharapkan untuk mempertimbangkan kembali urutan atau pendekatan dalam proses produk untuk menyederhanakan atau meningkatkan efisiensi.</br></p>
                <h3>Kesimpulan</h3>
                <p>Analisis menggunakan metode SCAMPER dapat membantu individu atau tim untuk berpikir lebih inovatif dalam menyelesaikan masalah, merancang produk, atau memperbaiki proses yang ada. Dengan memanfaatkan berbagai pendekatan dalam SCAMPER, seseorang dapat menemukan solusi yang lebih efektif, efisien, dan kreatif. Metode ini sangat berguna dalam pengembangan produk, desain, serta dalam meningkatkan proses atau layanan yang sudah ada.</p>
            `
        },
        {
            id: 'artikel-2',
            judul: 'Desain Produk',
            gambar: 'img/Desain Produk Blog.png',
            kategori: ['Popular', 'Web Design'],
            penulis: 'Muh Ashif',
            konten: `
                <p>Desain iklan produk sebuah hal yang penting dalam menarik perhatian konsumen di tengah informasi yang semakin maju. Sebuah iklan yang dirancang dengan baik tidak hanya mampu menyampaikan pesan secara efektif, tetapi juga menciptakan daya tarik emosional yang membuat produk lebih diingat dan diinginkan. Periklanan, menurut Kriyantono, adalah jenis komunikasi impersonal yang bertujuan untuk membujuk konsumen agar membeli barang dengan membayar biaya kepada media sebagai imbalan atas pesan-pesan yang menarik dari sponsor yang jelas.</p>
                
                <h3>Konsep Dasar Desain Produk</h3>
                
                <p>Desain produk adalah suatu proses yang melibatkan perencanaan, pengembangan, dan pembuatan produk dengan tujuan untuk memenuhi kebutuhan dan keinginan pengguna. Proses ini tidak hanya mencakup aspek estetika dan fungsionalitas, tetapi juga mempertimbangkan faktor ergonomis, keberlanjutan, dan inovasi. Dalam dunia yang semakin kompetitif, desain produk menjadi salah satu faktor kunci yang membedakan suatu produk di pasar. Produk yang dirancang dengan baik tidak hanya menarik secara visual, tetapi juga mampu memberikan pengalaman pengguna yang optimal serta memenuhi standar kualitas yang tinggi. Artikel ini akan mengupas lebih dalam tentang pentingnya desain produk, tahapan-tahapan dalam proses desain, serta peran inovasi dalam menciptakan produk yang dapat bertahan dan berkembang di pasar.</p>
                
                <p>Dalam era persaingan bisnis yang semakin ketat, pemasaran telah menjadi salah satu hal terpentinguntuk menarik perhatian calon konsumen dan memperluas pangsa pasar. Salah satu alat pemasaran yang paling efektif adalah periklanan. Iklan yang dirancang dengan baik dan tepat dapat mempengaruhi keputusan konsumen untuk membeli produk atau layanan yang dipromosikan. Oleh karena itu, perencanaan iklan yang tepat sangat penting untuk memastikan keberhasilan sebuah kampanye pemasaran.(Cahyadi, 2023).</p>
            `
        },
        {
            id: 'artikel-3',
            judul: 'Business Model Canvas (BMC)',
            gambar: 'img/bmc.png',
            kategori: ['UMKM', 'Web Design'],
            penulis: 'Muh Ashif',
            konten: `
                <p>Business Model Canvas (BMC) adalah alat manajemen strategis yang digunakan untuk merancang, mendefinisikan, dan mengkomunikasikan model bisnis secara visual. Konsep ini diperkenalkan oleh Alexander Osterwalder dalam bukunya "Business Model Generation" pada tahun 2005. BMC menyajikan kerangka kerja yang ringkas dan mudah dipahami, memungkinkan pengusaha untuk menggambarkan ide dan strategi bisnis mereka dalam satu halaman.</p>
                
                <h3>Elemen-elemen dalam Business Model Canvas</h3>
                
                <p>BMC terdiri dari sembilan elemen kunci yang saling terkait, yaitu:

<br>1. Customer Segments (Segmen Pelanggan): Menentukan siapa pelanggan potensial dan mengelompokkan mereka berdasarkan karakteristik tertentu.</br>

2. Value Propositions (Proposisi Nilai): Menjelaskan nilai unik yang ditawarkan kepada pelanggan, termasuk solusi atas masalah yang mereka hadapi.

<br>3. Channels (Saluran): Menyediakan informasi tentang bagaimana produk atau layanan disampaikan kepada pelanggan, termasuk saluran distribusi dan komunikasi.</br>

4. Customer Relationships (Hubungan Pelanggan): Menggambarkan jenis hubungan yang dibangun dengan pelanggan, seperti dukungan pribadi, layanan mandiri, atau komunitas.

<br>5. Revenue Streams (Aliran Pendapatan): Mengidentifikasi cara bisnis menghasilkan uang dari setiap segmen pelanggan, termasuk metode pembayaran dan model harga.</br>

6. Key Resources (Sumber Daya Utama): Menentukan aset penting yang diperlukan untuk menjalankan model bisnis, seperti sumber daya fisik, intelektual, manusia, dan finansial.

<br>7. Key Activities (Aktivitas Utama): Menggambarkan aktivitas penting yang harus dilakukan untuk menjalankan model bisnis, termasuk produksi, pemasaran, dan pengembangan produk.</br>

8. Key Partnerships (Kemitraan Utama): Menjelaskan hubungan dengan pihak ketiga yang membantu dalam mencapai tujuan bisnis, seperti pemasok atau mitra strategis.

<br>9. Cost Structure (Struktur Biaya): Mengidentifikasi semua biaya yang terlibat dalam menjalankan model bisnis, termasuk biaya tetap dan variabel.</br></p>
                
                <h3>Manfaat Business Model Canvas</h3>
                
                <p>- Visualisasi: BMC memungkinkan pemilik bisnis untuk melihat gambaran keseluruhan dari model bisnis mereka secara jelas dan ringkas.

<br>- Fleksibilitas: Mudah untuk diubah dan disesuaikan seiring dengan perkembangan bisnis.</br>

- Kolaborasi: Memfasilitasi diskusi dan kolaborasi antar tim dalam merancang strategi bisnis.

<br>- Fokus: Membantu pemilik bisnis untuk fokus pada elemen-elemen kunci yang mempengaruhi kesuksesan usaha mereka.</br></p>
            `
        },
        {
            id: 'artikel-4',
            judul: 'UTS Digital Marketing',
            gambar: 'img/uts.png',
            kategori: ['UMKM', 'Web Design'],
            penulis: 'Muh Ashif',
            konten: `
                <p>Digital Marketing adalah sebuah proses yang memasarkan atau mengiklankan merek,produk,maupun jasa. Proses ini biasanya dilakukan melalui media digital dan membutuhkan jaringan internet dalam kegiatannya. Seorang digital juga harus bisa menyusun strategi pemasaran yang tepat dan berkumunikasi dengan pihak lain agar target pemasaran dapat tercapai sesuai dengan target. Digital marketing sangat dibutuhkan saat ini mengigat kemajuan teknologi yang semakin cepat serta era yang semakin serba digital.</p>
                
                <h3>Pengalaman saat evaluasi :</h3>
                
                <p>Pada hari senin tanggal 30 September 2004 saat pukul 14:00 lewat kami melakukan evaluasi mata kuliah Digital Marketing. Perasaan saya waktu bapak masuk ruangan agak panik sedikit yang mungkin disebabkan juga dari layout ruangan yang jarang saya temukan. Tata letak kursi dan meja-meja di ruangan tersebut seperti ada yang ingin melaksanakan rapat ditambah suhu ruangan yang saya rasakan itu panas dingin. Tapi pada saat bapak menjelaskan bahwa ini hanyalah evaluasi dari pembelajaran digital marketing bukan seperti ujian pada biasanya saya merasa tenang. Seperti biasa, setelah dibagikan lembar kertas saya langsung mengisi nama,nim,prodi,dll. Saat itu juga, bapak langsung menjelaskan mekanisme pengerjaan evaluasi serta soal-soal yang pada awalnya harusnya 4 soal tetapi berhubung karena soal ke-4 tersebut belum di ajarkan oleh pak Alam jadinya 3 soal saja. Dalam hati saya berkata Alhamdulillah cuma 3 soal. Pada saat mengerjakan soal pertama saya memulai dengan mendefinisikan dulu kemudian menggambar element-element yang mungkin terkait dengan hal yang sudah didefinisikan. Perasaan saya ketika mengerjakan soal tersebut adalah senang karena kita diberikan kebebasan untuk  mengerjakan soal evaluasi yang dalam hal ini pemahaman kita terkait materi dapat kita gambarkan dan imajinasikan sesuai dengan keinginan kita sendiri. Setelah itu, saya melanjutkan dengan memikirkan berbagai pendekatan untuk menyelesaikan soal tersebut, tanpa merasa terbebani oleh banar atau tidaknya. Hal ini membuat proses pengerjaan menjadi lebih menyenangkan dan kreatif, karena saya bisa mengeksplorasi berbagai cara yang mungkin dilakukan untuk dapat menyelesaikan soal yang diberikan.</p>
            `
        },
        {
            id: 'artikel-5',
            judul: 'Apa itu Iklan!! adalah Terbaik & Terburuk.. Simak penjelasan berikut!!',
            gambar: 'img/iklan.png',
            kategori: ['UMKM', 'Web Design'],
            penulis: 'Muh Ashif',
            konten: `
                <p>Iklan merupakan sebuah bentuk memperkenalkan atau mempromosikan produk dan jasa yang dapat disaksikan banyak orang. Tujuannya itu untuk memengaruhi pembeli agar dapat membeli produk yang ditawarkan tersebut. Iklan biasanya ditemukan diberbagai media seperti radio, televisi, media online, dan reklame. Ciri-Ciri iklan yaitu menggunakan kata-kata singkat dalam penyampaian informasi dan juga kata-kata sugestif agar dapat mempengaruhi konsumen.</p>
                <h3>Iklan Terbaik:</h3>
                <p><br>1. Nike – "Just Do It" Iklan Nike dengan slogan "Just Do It" adalah salah satu kampanye iklan paling ikonik yang berhasil mengubah cara orang melihat olahraga dan kehidupan. Dengan pesan yang kuat tentang keberanian, tekad, dan semangat juang, iklan ini tidak hanya mempromosikan produk, tetapi juga menginspirasi individu untuk mengejar impian mereka. Nike berhasil menciptakan iklan yang relevan, emosional, dan mudah diingat, yang terus resonan dengan konsumen hingga saat ini.</br></p>
                <p>2. Coca-Cola – "Share a Coke" Kampanye "Share a Coke" dari Coca-Cola adalah contoh sempurna bagaimana personalisasi dapat membuat iklan menjadi lebih efektif. Coca-Cola mengganti logo mereka dengan nama-nama populer di kaleng dan botol minuman, yang menciptakan iklan yang sangat personal dan mengundang konsumen untuk berbagi pengalaman mereka. Kampanye ini berhasil meningkatkan penjualan dan menciptakan keterlibatan yang tinggi antara merek dan konsumen.</p>
                <p><br>3. Apple – "1984" Iklan "1984" dari Apple, yang disutradarai oleh Ridley Scott, adalah salah satu iklan paling revolusioner dalam sejarah pemasaran. Dengan visual yang menggugah dan pesan yang kuat tentang kebebasan dan inovasi, iklan ini menandai peluncuran komputer Macintosh dan mengukuhkan Apple sebagai pemimpin dalam teknologi yang memecah batasan. Iklan ini mendapat pengakuan luas dan menjadi simbol dari visi kreatif Apple.</br></p>
                <h3>Iklan Terburuk:</h3>
                <p>1. Pepsi – "Live for Now" Iklan Pepsi yang dibintangi oleh Kendall Jenner, yang dirilis pada 2017, mendapat reaksi keras dari publik. Dalam iklan tersebut, Jenner tampak mengatasi ketegangan sosial dengan memberikan Pepsi kepada seorang petugas polisi dalam sebuah protes. Iklan ini dianggap meremehkan masalah sosial yang serius dan berusaha menggunakan isu sensitif untuk tujuan komersial. Reaksi negatif terhadap iklan ini sangat besar, hingga akhirnya Pepsi menarik iklan tersebut dan meminta maaf.</p>
                <p>2. Calvin Klein – Iklan yang Kontroversial Calvin Klein pernah meluncurkan kampanye iklan yang sangat kontroversial yang melibatkan anak-anak dan remaja yang tampaknya terlalu seksual untuk usia mereka. Meskipun merek ini dikenal dengan pendekatan desain yang berani, beberapa iklan mereka terlalu provokatif dan menimbulkan kecaman publik. Salah satu iklan yang paling banyak dibicarakan adalah kampanye yang menampilkan model remaja dalam pose yang dianggap terlalu dewasa untuk usia mereka, yang akhirnya membuat merek tersebut dituntut di beberapa negara.</p>             
                <p>3. Gap – "Manifest Destiny" Kampanye iklan Gap pada 2017 yang mengandung unsur "Manifest Destiny" dianggap sangat tidak sensitif. Iklan ini menampilkan gambar-gambar yang mengarah pada kolonialisasi dan pengambilalihan tanah, yang sangat tidak cocok untuk konteks sejarah Amerika Serikat. Gap gagal memahami konotasi yang lebih dalam dari gambar dan pesan yang mereka coba sampaikan, sehingga kampanye ini mendapat kritik tajam dan dipandang sebagai sebuah kegagalan besar.</p>
                <h3>Faktor-Faktor Penentu Keberhasilan atau Kegagalan Iklan:</h3>
                <br>1. Pesan yang Relevan dan Emosional: Iklan terbaik mampu menyampaikan pesan yang menyentuh emosi audiens dan relevan dengan kehidupan mereka. Misalnya, Nike dengan "Just Do It" menginspirasi audiens untuk tidak hanya berolahraga tetapi juga mengejar mimpi mereka. Di sisi lain, iklan yang tidak sensitif atau yang mencoba memanfaatkan isu-isu sosial untuk tujuan komersial cenderung gagal.</br>
                <br>2. Pemilihan Waktu dan Konteks: Waktu peluncuran iklan sangat penting. Iklan yang keluar pada waktu yang salah, atau yang tidak memperhitungkan konteks sosial dan budaya, dapat dengan mudah dianggap ofensif atau tidak pantas. Contoh terbaik adalah kampanye Pepsi yang meremehkan protes sosial dengan cara yang tidak bijak.</br>
                <br>3. Kreativitas dan Inovasi: Iklan yang berani, kreatif, dan inovatif cenderung lebih mudah diterima. Namun, jika kreativitas tersebut tidak dipadukan dengan pemahaman yang tepat tentang audiens atau budaya, maka kampanye tersebut bisa jadi kontroversial. Apple dengan iklan "1984" dan Coca-Cola dengan "Share a Coke" adalah contoh bagaimana inovasi dapat menciptakan iklan yang memorable.</br>
                <br>4. Resonansi dengan Audiens: Iklan terbaik mampu membangun hubungan yang kuat dengan audiens. Iklan yang tidak relevan dengan audiens atau bahkan tampaknya mengeksploitasi mereka untuk tujuan pemasaran bisa menimbulkan rasa tidak puas. Iklan yang gagal menyentuh audiens cenderung berakhir dengan kegagalan.</br>
                <h3>Kesimpulan</h3>
                <p>Iklan yang efektif dan sukses adalah yang dapat menciptakan hubungan yang kuat dengan audiens, menyampaikan pesan yang relevan dan emosional, serta menggunakan kreativitas secara cerdas. Sebaliknya, iklan yang buruk sering kali gagal memahami audiens, terjebak dalam kontroversi yang tidak perlu, atau mencoba mengkomodifikasi isu-isu sensitif untuk tujuan komersial. Dalam dunia pemasaran yang kompetitif, merek perlu memastikan bahwa mereka tidak hanya menjual produk, tetapi juga berkomunikasi dengan audiens mereka secara bijaksana dan efektif.</p>
            `
        },
        {
            id: 'artikel-6',
            judul: 'Policy conflict - Ekonomi Makro',
            gambar: 'img/policy konflik.png',
            kategori: ['UMKM', 'Ekonomi'],
            penulis: 'Muh Ashif',
            konten: `
                <p>Kebijakan yang dirancang untuk mendorong pertumbuhan ekonomi dan mengurangi pengangguran seringkali dapat berdampak negatif pada stabilitas harga dan neraca pembayaran. Sebaliknya, kebijakan yang bertujuan untuk mengurangi inflasi dan mencapai surplus neraca pembayaran dapat menyebabkan penurunan pertumbuhan ekonomi dan peningkatan pengangguran.</p>
                <p>Dalam upaya mendorong pertumbuhan ekonomi, pemerintah sering menggunakan kebijakan fiskal dan moneter seperti pengurangan pajak, peningkatan belanja pemerintah, atau penurunan suku bunga untuk meningkatkan belanja dan investasi. Namun, ini dapat menyebabkan inflasi dan defisit neraca pembayaran karena mendorong lebih banyak konsumsi produk impor. Di sisi lain, kebijakan yang bertujuan untuk mengendalikan inflasi dan mencapai surplus neraca pembayaran, seperti menaikkan pajak, mengurangi belanja pemerintah, atau menaikkan suku bunga, dapat menekan pertumbuhan ekonomi dan meningkatkan pengangguran.</p>              
                <p>Dalam jangka panjang, para ekonom klasik percaya bahwa perekonomian akan kembali ke output lapangan kerja penuh, dan kebijakan sisi permintaan untuk merangsang ekonomi dapat menjadi tidak efektif. Mereka berpendapat bahwa penawaran agregat jangka panjang sebenarnya vertikal, yang berarti perubahan dalam permintaan agregat tidak memengaruhi output jangka panjang</p>
            `
        },
        {
            id: 'artikel-7',
            judul: 'Makro equelibrium',
            gambar: 'img/makro equeblirium.png',
            kategori: ['UMKM', 'Web Design'],
            penulis: 'Muh Ashif',
            konten: `
                <p>Keseimbangan makroekonomi ditentukan oleh interaksi penawaran agregat dan permintaan agregat, yang mencapai titik perpotongan di mana PDB riil dan tingkat harga stabil. Perubahan pada faktor-faktor yang mempengaruhi permintaan atau penawaran agregat dapat mempengaruhi inflasi, PDB riil, dan tingkat lapangan kerja. Pergeseran permintaan agregat ke kanan, misalnya, dapat meningkatkan inflasi dan PDB riil dalam jangka pendek, tetapi dalam jangka panjang, perekonomian kembali ke tingkat output yang sama namun dengan tingkat harga yang lebih tinggi.</p>
                <p>Pergeseran penawaran agregat dapat memengaruhi tingkat harga dan PDB riil dalam jangka pendek maupun jangka panjang. Penurunan tingkat harga membantu mengendalikan inflasi sambil meningkatkan PDB riil. Kebijakan yang meningkatkan pasokan agregat, seperti pendidikan, pelatihan, dan investasi dalam infrastruktur, bermanfaat bagi perekonomian karena tidak memiliki trade-off dan membantu mendorong pertumbuhan ekonomi jangka panjang.Namun, kebijakan sisi permintaan yang tidak tepat dapat menyebabkan pergeseran penawaran agregat, mengurangi kapasitas produktif ekonomi dalam jangka panjang.</p>
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