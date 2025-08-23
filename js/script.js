// Portfolio Website JavaScript Functions

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-on-scroll');
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Portfolio modal data
const modalData = {
    'modal1': {
        title: 'Brand Identity Design',
        image: 'images/portfolio/project1.jpg',
        description: 'โปรเจกต์การออกแบบเอกลักษณ์แบรนด์สำหรับบริษัทเทคโนโลยีสตาร์ทอัพ รวมถึงการออกแบบโลโก้, ระบบสี, และแนวทางการใช้งานแบรนด์',
        details: ['วิจัยและวิเคราะห์แบรนด์', 'ออกแบบโลโก้และสัญลักษณ์', 'พัฒนาระบบสีและตัวอักษร', 'สร้าง Brand Guidelines']
    },
    'modal2': {
        title: 'Mobile App UI/UX',
        image: 'images/portfolio/project2.jpg',
        description: 'การออกแบบส่วนติดต่อผู้ใช้และประสบการณ์ผู้ใช้สำหรับแอปพลิเคชันมือถือด้านสุขภาพ',
        details: ['UX Research และ User Journey', 'สร้าง Wireframes และ Prototypes', 'ออกแบบ UI Components', 'User Testing และปรับปรุง']
    },
    'modal3': {
        title: 'Print Design',
        image: 'images/portfolio/project3.jpg',
        description: 'การออกแบบสื่อสิ่งพิมพ์และบรรจุภัณฑ์สำหรับผลิตภัณฑ์อินทรีย์',
        details: ['ออกแบบบรรจุภัณฑ์', 'สร้างคู่มือผลิตภัณฑ์', 'ออกแบบโบรชัวร์', 'การจัดพิมพ์และผลิต']
    },
    'modal4': {
        title: 'Digital Marketing Assets',
        image: 'images/portfolio/project4.jpg',
        description: 'การสร้างสื่อการตลาดดิจิทัลสำหรับแคมเปญออนไลน์',
        details: ['ออกแบบโฆษณา Social Media', 'สร้าง Banner และ Display Ads', 'Email Marketing Templates', 'การวิเคราะห์ผลการตลาด']
    }
};

// Portfolio modal functions
function openModal(modalId) {
    const modal = document.getElementById('portfolioModal');
    const content = document.getElementById('modalContent');
    
    const data = modalData[modalId];
    if (data) {
        content.innerHTML = `
            <h2 style="margin-bottom: 1rem; color: var(--primary);">${data.title}</h2>
            <img src="${data.image}" alt="${data.title}" style="width: 100%; border-radius: 10px; margin-bottom: 1rem;">
            <p style="margin-bottom: 1rem; color: var(--text-light);">${data.description}</p>
            <h3 style="margin-bottom: 0.5rem;">รายละเอียดโปรเจกต์:</h3>
            <ul style="list-style-type: disc; margin-left: 2rem; color: var(--text-light);">
                ${data.details.map(detail => `<li>${detail}</li>`).join('')}
            </ul>
        `;
        modal.style.display = 'block';
    }
}

function closeModal() {
    document.getElementById('portfolioModal').style.display = 'none';
}

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    const modal = document.getElementById('portfolioModal');
    if (e.target === modal) {
        closeModal();
    }
});

// Download resume function
function downloadResume() {
    // สร้าง link สำหรับดาวน์โหลด resume
    const link = document.createElement('a');
    link.href = 'assets/resume.pdf'; // เปลี่ยนเป็นไฟล์ resume จริง
    link.download = 'Resume_GraphicDesigner.pdf';
    link.click();
    
    // หรือเปิดหน้าต่างใหม่ไปยัง Google Drive หรือ Cloud Storage
    // window.open('https://drive.google.com/file/d/your-resume-file-id/view', '_blank');
    
    // แจ้งเตือนหากยังไม่มีไฟล์
    console.log('กำลังดาวน์โหลดไฟล์ Resume...');
}

// Form submission
function submitForm(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');
    
    // ส่งข้อมูลไปยัง server หรือ email service
    // ตัวอย่างการใช้งาน EmailJS หรือ Formspree
    
    // EmailJS example:
    // emailjs.send('service_id', 'template_id', {
    //     from_name: name,
    //     from_email: email,
    //     message: message
    // }).then(() => {
    //     alert(`ขอบคุณ ${name} สำหรับข้อความของคุณ! เราจะติดต่อกลับโดยเร็วที่สุด`);
    //     e.target.reset();
    // });
    
    // สำหรับตอนนี้แค่แสดง alert
    alert(`ขอบคุณ ${name} สำหรับข้อความของคุณ! เราจะติดต่อกลับโดยเร็วที่สุด`);
    e.target.reset();
}

// Add interactive animations to portfolio items
function initPortfolioAnimations() {
    document.querySelectorAll('.portfolio-item').forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 15px 30px rgba(0,0,0,0.2)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 5px 20px rgba(0,0,0,0.1)';
        });
    });
}

// Mobile menu toggle
function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
            
            // Add mobile menu styles when opened
            if (navLinks.style.display === 'flex') {
                navLinks.style.position = 'absolute';
                navLinks.style.top = '100%';
                navLinks.style.left = '0';
                navLinks.style.width = '100%';
                navLinks.style.flexDirection = 'column';
                navLinks.style.background = 'rgba(255, 255, 255, 0.95)';
                navLinks.style.backdropFilter = 'blur(10px)';
                navLinks.style.padding = '1rem';
                navLinks.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
            }
        });
    }
}

// Typing animation function
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Lazy loading for images
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// Initialize all functions when page loads
document.addEventListener('DOMContentLoaded', function() {
    console.log('Portfolio website loaded successfully!');
    initPortfolioAnimations();
    initMobileMenu();
    // initLazyLoading(); // uncomment if using lazy loading
});

// Handle form validation
function validateForm(formData) {
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');
    
    if (name.length < 2) {
        alert('กรุณากรอกชื่อให้ถูกต้อง');
        return false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('กรุณากรอกอีเมลให้ถูกต้อง');
        return false;
    }
    
    if (message.length < 10) {
        alert('กรุณากรอกข้อความอย่างน้อย 10 ตัวอักษร');
        return false;
    }
    
    return true;
}

// Add loading animation
function showLoading() {
    const loader = document.createElement('div');
    loader.id = 'loading';
    loader.innerHTML = '<div class="spinner"></div>';
    loader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(255,255,255,0.9);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
    `;
    
    const spinnerStyle = document.createElement('style');
    spinnerStyle.textContent = `
        .spinner {
            width: 40px;
            height: 40px;
            border: 4px solid #f3f3f3;
            border-top: 4px solid var(--primary);
            border-radius: 50%;
            animation: spin 1s linear infinite;
        }
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    
    document.head.appendChild(spinnerStyle);
    document.body.appendChild(loader);
    
    setTimeout(() => {
        if (document.getElementById('loading')) {
            document.body.removeChild(loader);
            document.head.removeChild(spinnerStyle);
        }
    }, 3000);
}

// Performance optimization
function optimizeImages() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.loading = 'lazy';
        img.decoding = 'async';
    });
}

// Initialize performance optimizations
window.addEventListener('load', function() {
    optimizeImages();
});