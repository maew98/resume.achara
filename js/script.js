// Portfolio Website JavaScript Functions

let portfolioObserver = null;
let scrollListener = null;
let animationFrameId = null;
let isScrolling = false;

// ฟังก์ชันเลื่อนกลับไปหน้าแรก
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Optimized scroll handler
function optimizedScrollHandler() {
    if (isScrolling) return;
    
    isScrolling = true;
    if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
    }
    
    animationFrameId = requestAnimationFrame(() => {
        const navbar = document.getElementById('navbar');
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
        isScrolling = false;
    });
}

// Navbar scroll effect
function initNavbarScroll() {
    // ลบ listener เก่าถ้ามี
    if (scrollListener) {
        window.removeEventListener('scroll', scrollListener);
    }
    
    window.addEventListener('scroll', optimizedScrollHandler, { passive: true });
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80; // ลบความสูงของ navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // ปิด mobile menu หากเปิดอยู่
                const navLinks = document.querySelector('.nav-links');
                if (navLinks && navLinks.classList.contains('mobile-active')) {
                    navLinks.classList.remove('mobile-active');
                }
            }
        });
    });
}

// Animation on scroll
function initScrollAnimations() {
    // ลบ observer เก่าถ้ามี
    if (portfolioObserver) {
        portfolioObserver.disconnect();
    }
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    portfolioObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-on-scroll');
                // หยุดการสังเกตหลังจาก animate แล้ว
                portfolioObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('section').forEach(section => {
        portfolioObserver.observe(section);
    });
}

// Mobile Menu Function
function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('mobile-active');
        });
        
        // ปิด mobile menu เมื่อคลิกที่ link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                navLinks.classList.remove('mobile-active');
            });
        });
        
        // ปิด mobile menu เมื่อคลิกนอกพื้นที่
        document.addEventListener('click', function(event) {
            if (!mobileMenuBtn.contains(event.target) && !navLinks.contains(event.target)) {
                navLinks.classList.remove('mobile-active');
            }
        });
    }
}

// Portfolio modal functions
function openModal(modalId) {
    const modal = document.getElementById('portfolioModal');
    const modalContent = document.getElementById('modalContent');
    
    if (!modal || !modalContent) return;
    
    // เคลียร์เนื้อหาเก่า
    modalContent.innerHTML = '';
    
    // สร้างเนื้อหาตาม modalId
    if (modalId === 'modal1') {
        modalContent.innerHTML = `
            <div class="modal-header">
                <h2>ONLINE MEDIA</h2>
                <p>ผลงานการออกแบบสื่อออนไลน์</p>
            </div>
            
            <div class="modal-gallery">
                <img src="https://res.cloudinary.com/dzjxxbhfp/image/upload/v1756027078/Onlinenew-01_owvch2.jpg" class="modal-image" alt="Online Media Design">
            </div>
            
            <div class="modal-description">
                <h3>รายละเอียดโครงการ</h3>
                <p>การออกแบบสื่อโฆษณาออนไลน์ รวมถึง Facebook Ads, Instagram Posts, Line Official Account และ E-commerce platforms</p>
                <ul>
                    <li>Facebook & Instagram Advertising</li>
                    <li>Line Official Account Design</li>
                    <li>Shopee & Lazada Store Design</li>
                    <li>Logo Design & Branding</li>
                </ul>
            </div>
        `;
    } else if (modalId === 'modal2') {
        modalContent.innerHTML = `
            <div class="modal-header">
                <h2>OFFLINE MEDIA</h2>
                <p>ผลงานการออกแบบสื่อออฟไลน์</p>
            </div>
            
            <div class="modal-gallery">
                <img src="https://res.cloudinary.com/dzjxxbhfp/image/upload/v1756026447/Online-02_j0kjhl.jpg" class="modal-image" alt="Offline Media Design">
            </div>
            
            <div class="modal-description">
                <h3>รายละเอียดโครงการ</h3>
                <p>การออกแบบสื่อสิ่งพิมพ์และการจัดแสดง</p>
                <ul>
                    <li>Event Design & Setup</li>
                    <li>Product Catalog Design</li>
                    <li>Standee & Display Design</li>
                    <li>Packaging Design</li>
                    <li>Billboard & Outdoor Media</li>
                </ul>
            </div>
        `;
    } else if (modalId === 'modal3') {
        modalContent.innerHTML = `
            <div class="modal-header">
                <h2>VIDEO PRODUCTION</h2>
                <p>ผลงานการผลิตวิดีโอ</p>
            </div>
            
            <div class="modal-gallery">
                <div class="video-placeholder">
                    <i class="fas fa-play-circle"></i>
                    <p>Video content coming soon...</p>
                </div>
            </div>
            
            <div class="modal-description">
                <h3>รายละเอียดโครงการ</h3>
                <p>การผลิตวิดีโอสำหรับสื่อต่างๆ</p>
                <ul>
                    <li>Content Video Production</li>
                    <li>TV Commercial (TVC)</li>
                    <li>Online Advertising Video</li>
                    <li>Corporate Video</li>
                    <li>Social Media Video Content</li>
                </ul>
            </div>
        `;
    } else if (modalId === 'modal4') {
        modalContent.innerHTML = `
            <div class="modal-header">
                <h2>UX DESIGN</h2>
                <p>ผลงานการออกแบบประสบการณ์ผู้ใช้</p>
            </div>
            
            <div class="modal-gallery">
                <div class="ux-showcase">
                    <i class="fas fa-mobile-alt"></i>
                    <p>UX Design Portfolio</p>
                </div>
            </div>
            
            <div class="modal-description">
                <h3>รายละเอียดโครงการ</h3>
                <p>การออกแบบประสบการณ์ผู้ใช้และการวิจัยผู้ใช้</p>
                <ul>
                    <li>Empathize - การทำความเข้าใจผู้ใช้</li>
                    <li>Define - การกำหนดปัญหา</li>
                    <li>Ideate - การระดมความคิด</li>
                    <li>Prototype - การสร้างต้นแบบ</li>
                    <li>Test - การทดสอบและปรับปรุง</li>
                </ul>
            </div>
        `;
    } else if (modalId === 'modal5') {
        modalContent.innerHTML = `
            <div class="modal-header">
                <h2>UI DESIGN</h2>
                <p>ผลงานการออกแบบส่วนติดต่อผู้ใช้</p>
            </div>
            
            <div class="modal-gallery">
                <div class="ui-showcase">
                    <i class="fas fa-desktop"></i>
                    <p>UI Design Collection</p>
                </div>
            </div>
            
            <div class="modal-description">
                <h3>รายละเอียดโครงการ</h3>
                <p>การออกแบบส่วนติดต่อผู้ใช้สำหรับแอปพลิเคชันและเว็บไซต์</p>
                <ul>
                    <li>Wireframe Design</li>
                    <li>Design System & Style Guide</li>
                    <li>High-Fidelity Mockups</li>
                    <li>Interactive Prototypes</li>
                    <li>Responsive Design</li>
                </ul>
            </div>
        `;
    } else if (modalId === 'modal6') {
        modalContent.innerHTML = `
            <div class="modal-header">
                <h2>AWARDS & CERTIFICATES</h2>
                <p>รางวัลและใบประกาศนียบัตร</p>
            </div>
            
            <div class="modal-gallery">
                <div class="awards-showcase">
                    <i class="fas fa-trophy"></i>
                    <p>Awards & Achievements</p>
                </div>
            </div>
            
            <div class="modal-description">
                <h3>ความสำเร็จและการยอมรับ</h3>
                <p>รางวัลและใบประกาศนียบัตรที่ได้รับตลอดการทำงาน</p>
                <ul>
                    <li>Design Excellence Awards</li>
                    <li>Adobe Certified Expert</li>
                    <li>UX/UI Design Certification</li>
                    <li>Creative Industry Recognition</li>
                    <li>Professional Development Certificates</li>
                </ul>
            </div>
        `;
    }
    
    // แสดง modal
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // เพิ่ม animation
    const modalContentElement = modal.querySelector('.modal-content');
    if (modalContentElement) {
        modalContentElement.style.transform = 'translateY(-50px)';
        modalContentElement.style.opacity = '0';
        
        requestAnimationFrame(() => {
            modalContentElement.style.transition = 'all 0.3s ease';
            modalContentElement.style.transform = 'translateY(0)';
            modalContentElement.style.opacity = '1';
        });
    }
}

function closeModal() {
    const modal = document.getElementById('portfolioModal');
    if (modal) {
        const modalContentElement = modal.querySelector('.modal-content');
        
        if (modalContentElement) {
            modalContentElement.style.transform = 'translateY(-50px)';
            modalContentElement.style.opacity = '0';
            
            setTimeout(() => {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }, 300);
        } else {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    }
}

// Download resume function
function downloadResume() {
    const cloudinaryURL = 'https://res.cloudinary.com/dzjxxbhfp/image/upload/v1756026506/Resume_Achara_Buttama_2025web-01_qd2bt9.jpg';
    
    // สร้าง link element ชั่วคราว
    const link = document.createElement('a');
    link.href = cloudinaryURL;
    link.download = 'Resume_Achara_Buttama_2025.jpg';
    link.target = '_blank';
    
    // เพิ่มลงใน DOM และคลิก
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // แสดงข้อความยืนยัน
    const notification = document.createElement('div');
    notification.innerHTML = `
        <i class="fas fa-download"></i>
        <span>กำลังดาวน์โหลด Resume...</span>
    `;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--primary);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 10px;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Add interactive animations to portfolio items
function initPortfolioAnimations() {
    document.querySelectorAll('.portfolio-item').forEach(item => {
        item.addEventListener('mouseenter', function() {
            if (window.innerWidth > 768) { // เฉพาะ desktop
                this.style.transform = 'translateY(-10px)';
                this.style.boxShadow = '0 15px 30px rgba(0,0,0,0.2)';
                this.style.transition = 'all 0.3s ease';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            if (window.innerWidth > 768) { // เฉพาะ desktop
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = '0 5px 20px rgba(0,0,0,0.1)';
            }
        });
        
        // เพิ่ม touch feedback สำหรับ mobile
        item.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.98)';
            this.style.transition = 'all 0.1s ease';
        });
        
        item.addEventListener('touchend', function() {
            this.style.transform = 'scale(1)';
        });
    });
}

// Performance optimization
function optimizeImages() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.loading = 'lazy';
        img.decoding = 'async';
        
        // เพิ่ม error handling
        img.addEventListener('error', function() {
            this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIG5vdCBmb3VuZDwvdGV4dD48L3N2Zz4=';
        });
    });
}

// การทำความสะอาด memory
function cleanup() {
    if (portfolioObserver) {
        portfolioObserver.disconnect();
        portfolioObserver = null;
    }
    if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
    }
    if (scrollListener) {
        window.removeEventListener('scroll', optimizedScrollHandler);
        scrollListener = null;
    }
}

// Event Listeners
function initEventListeners() {
    // Modal close events
    const modal = document.getElementById('portfolioModal');
    if (modal) {
        // Close modal เมื่อคลิกนอกพื้นที่
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });
        
        // Close modal เมื่อกด ESC
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && modal.style.display === 'block') {
                closeModal();
            }
        });
    }
    
    // Handle visibility change
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            cleanup();
        } else {
            // รี-initialize เมื่อกลับมาที่หน้า
            setTimeout(() => {
                initScrollAnimations();
                initNavbarScroll();
            }, 100);
        }
    });
    
    // Handle resize
    window.addEventListener('resize', function() {
        // ปิด mobile menu เมื่อเปลี่ยนขนาดหน้าจอ
        const navLinks = document.querySelector('.nav-links');
        if (navLinks && window.innerWidth > 768) {
            navLinks.classList.remove('mobile-active');
        }
    });
}

// Initialize all functions when page loads
document.addEventListener('DOMContentLoaded', function() {
    console.log('Portfolio website loaded successfully!');
    
    // Initialize components
    initSmoothScrolling();
    initScrollAnimations();
    initNavbarScroll();
    initPortfolioAnimations();
    initMobileMenu();
    initEventListeners();
    
    // Performance optimizations
    setTimeout(() => {
        optimizeImages();
    }, 100);
    
    console.log('All components initialized successfully!');
});

// เมื่อ page load เสร็จสมบูรณ์
window.addEventListener('load', function() {
    optimizeImages();
    
    // ซ่อน loading spinner หากมี
    const loader = document.getElementById('loading');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => {
            if (document.body.contains(loader)) {
                document.body.removeChild(loader);
            }
        }, 300);
    }
});

// เมื่อออกจากหน้า
window.addEventListener('beforeunload', function() {
    cleanup();
});

// เพิ่ม notification animations ใน head
if (!document.querySelector('#notification-animations')) {
    const style = document.createElement('style');
    style.id = 'notification-animations';
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
        
        .video-placeholder,
        .ux-showcase,
        .ui-showcase,
        .awards-showcase {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 3rem;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border-radius: 15px;
            margin: 1rem 0;
        }
        
        .video-placeholder i,
        .ux-showcase i,
        .ui-showcase i,
        .awards-showcase i {
            font-size: 4rem;
            margin-bottom: 1rem;
            opacity: 0.8;
        }
        
        .video-placeholder p,
        .ux-showcase p,
        .ui-showcase p,
        .awards-showcase p {
            font-size: 1.2rem;
            font-weight: 500;
        }
        
        .modal-description ul {
            list-style: none;
            padding: 0;
        }
        
        .modal-description li {
            padding: 0.5rem 0;
            padding-left: 1.5rem;
            position: relative;
        }
        
        .modal-description li:before {
            content: "✓";
            position: absolute;
            left: 0;
            color: var(--primary);
            font-weight: bold;
        }
    `;
    document.head.appendChild(style);
}