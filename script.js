document.addEventListener('DOMContentLoaded', () => {
    // Navigation Logic
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
            if(navLinks.style.display === 'flex') {
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '70px';
                navLinks.style.right = '0';
                navLinks.style.width = '100%';
                navLinks.style.background = '#0a0a0f';
                navLinks.style.padding = '20px';
                navLinks.style.borderBottom = '1px solid #333';
            }
        });
    }

    // Smooth Scrolling for Anchors
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
                // Close mobile menu if open
                if(window.innerWidth <= 768 && navLinks.style.display === 'flex') {
                    navLinks.style.display = 'none';
                }
            }
        });
    });

    // Payment Modal Logic
    const modal = document.getElementById('paymentModal');
    const payBtn = document.getElementById('payNowBtn');
    const closeBtn = document.querySelector('.close-modal');
    const paymentForm = document.getElementById('paymentForm');

    if (payBtn) {
        payBtn.addEventListener('click', (e) => {
            e.preventDefault();
            modal.style.display = 'flex';
        });
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });
    }

    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Form Submission Simulation
    if (paymentForm) {
        paymentForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = paymentForm.querySelector('input[type="text"]').value;
            const amount = paymentForm.querySelector('input[type="number"]').value;
            
            // Simulate processing
            const originalText = paymentForm.querySelector('button').innerHTML;
            paymentForm.querySelector('button').innerHTML = '<i class="fas fa-spinner fa-spin"></i> Memproses...';
            
            setTimeout(() => {
                alert(`Terima kasih ${name}!\n\nKonfirmasi pembayaran senilai Rp${amount} telah dikirim ke admin.\nSilakan selesaikan transfer di aplikasi DANA Anda.\n\nNomor DANA: 0819-3642-5733`);
                modal.style.display = 'none';
                paymentForm.reset();
                paymentForm.querySelector('button').innerHTML = originalText;
            }, 1500);
        });
    }

    // Scroll Animation Reveal
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    // Expose copy function globally
    window.copyNumber = function() {
        const number = document.getElementById('danaNumber').innerText;
        navigator.clipboard.writeText(number).then(() => {
            const btn = document.querySelector('.copy-btn');
            const originalHTML = btn.innerHTML;
            btn.innerHTML = '<i class="fas fa-check"></i> Tersalin';
            setTimeout(() => {
                btn.innerHTML = originalHTML;
            }, 2000);
        });
    };
});
