/**
 * File: dot-trail-animation.js
 * 
 * Membuat animasi titik bergerak dengan efek trail yang mengelilingi
 * tulisan "Contact Me" dan membentuk border capsule
 */

document.addEventListener('DOMContentLoaded', function() {
    // Fungsi untuk menambahkan animasi titik dengan trail
    function addDotTrailAnimation() {
      // Cari elemen heading Contact Me
      const contactHeader = document.querySelector('.contact-info h1');
      
      if (contactHeader) {
        // Tambahkan kelas untuk styling
        contactHeader.classList.add('dot-trail-container');
        
        // Buat elemen untuk titik yang bergerak
        const movingDot = document.createElement('div');
        movingDot.className = 'moving-dot-trail';
        
        // Buat elemen untuk jejak/trail
        const dotTrail = document.createElement('div');
        dotTrail.className = 'dot-trail';
        
        // Tambahkan elemen-elemen ke dalam DOM
        contactHeader.appendChild(dotTrail);
        contactHeader.appendChild(movingDot);
        
        // Tambahkan CSS untuk animasi
        const style = document.createElement('style');
        style.textContent = `
          /* Container untuk animasi */
          .dot-trail-container {
            position: relative;
            display: inline-block;
            padding: 15px 30px;
            margin-bottom: 20px;
            border-radius: 50px;
            z-index: 1;
          }
          
          /* Titik yang bergerak */
          .moving-dot-trail {
            position: absolute;
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background: linear-gradient(45deg, #B16CEA, #FF5E69);
            box-shadow: 0 0 10px 2px rgba(255, 94, 105, 0.7);
            z-index: 3;
            animation: moveTrail 6s linear infinite;
            transform-origin: center center;
          }
          
          /* Efek trail/jejak */
          .dot-trail {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            border-radius: 50px;
            z-index: 2;
            overflow: visible;
          }
          
          .dot-trail::before {
            content: '';
            position: absolute;
            top: -3px;
            left: -3px;
            right: -3px;
            bottom: -3px;
            border-radius: 50px;
            border: 3px dashed transparent;
            background: 
              linear-gradient(90deg, #B16CEA, #FF5E69, #FF8A56, #FFA84B) border-box;
            -webkit-mask: 
              linear-gradient(#fff 0 0) padding-box, 
              linear-gradient(#fff 0 0);
            -webkit-mask-composite: xor;
            mask-composite: exclude;
            animation: formTrail 6s linear infinite;
            opacity: 0;
          }
          
          /* Animasi titik bergerak dengan jalur yang lebih halus */
          @keyframes moveTrail {
            0% {
              top: -6px;
              left: 50%;
              transform: translateX(-50%);
            }
            12.5% {
              top: 10%;
              left: 90%;
              transform: translate(-50%, -50%);
            }
            25% {
              top: 50%;
              left: 100%;
              transform: translate(-50%, -50%);
            }
            37.5% {
              top: 90%;
              left: 90%;
              transform: translate(-50%, -50%);
            }
            50% {
              top: 100%;
              left: 50%;
              transform: translate(-50%, -50%);
            }
            62.5% {
              top: 90%;
              left: 10%;
              transform: translate(-50%, -50%);
            }
            75% {
              top: 50%;
              left: 0;
              transform: translate(-50%, -50%);
            }
            87.5% {
              top: 10%; 
              left: 10%;
              transform: translate(-50%, -50%);
            }
            100% {
              top: -6px;
              left: 50%;
              transform: translateX(-50%);
            }
          }
          
          /* Animasi trail terbentuk secara bertahap */
          @keyframes formTrail {
            0% {
              clip-path: polygon(50% 0%, 51% 0%, 51% 0%, 50% 0%);
              opacity: 1;
            }
            12.5% {
              clip-path: polygon(50% 0%, 100% 0%, 100% 10%, 50% 0%);
              opacity: 1;
            }
            25% {
              clip-path: polygon(50% 0%, 100% 0%, 100% 50%, 50% 0%);
              opacity: 1;
            }
            37.5% {
              clip-path: polygon(50% 0%, 100% 0%, 100% 90%, 70% 90%, 50% 0%);
              opacity: 1;
            }
            50% {
              clip-path: polygon(50% 0%, 100% 0%, 100% 100%, 50% 100%, 50% 0%);
              opacity: 1;
            }
            62.5% {
              clip-path: polygon(50% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 90%, 50% 0%);
              opacity: 1;
            }
            75% {
              clip-path: polygon(50% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 50%, 50% 0%);
              opacity: 1;
            }
            87.5% {
              clip-path: polygon(50% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 10%, 30% 0%, 50% 0%);
              opacity: 1;
            }
            100% {
              clip-path: polygon(50% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 0%, 50% 0%);
              opacity: 1;
              
              /* Pastikan border tetap terlihat setelah animasi selesai */
              border-image-slice: 1;
            }
          }
          
          /* Animasi ulang dengan efek pulsa setelah trail terbentuk penuh */
          .dot-trail-container:hover .dot-trail::before {
            animation: pulseTrail 2s infinite alternate;
            clip-path: none;
          }
          
          @keyframes pulseTrail {
            0% {
              box-shadow: 0 0 5px rgba(255, 94, 105, 0);
              border-color: transparent;
            }
            100% {
              box-shadow: 0 0 15px rgba(255, 94, 105, 0.5);
              border-color: transparent;
            }
          }
          
          /* Pastikan teks tetap terlihat */
          .dot-trail-container span,
          .dot-trail-container .highlight-pink,
          .dot-trail-container .highlight-orange {
            position: relative;
            z-index: 1;
          }
          
          /* Responsive adjustments */
          @media (max-width: 768px) {
            .dot-trail-container {
              padding: 10px 20px;
            }
            
            .moving-dot-trail {
              width: 8px;
              height: 8px;
            }
            
            .dot-trail::before {
              border-width: 2px;
            }
          }
        `;
        document.head.appendChild(style);
      }
    }
    
    // Panggil fungsi
    addDotTrailAnimation();
  });