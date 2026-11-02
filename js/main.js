/* ===== 1. قاعدة البيانات (Events Database) ===== */
const allEvents = {
    "ai-seminar": {
        title: "ندوة في الذكاء الاصطناعي",
        date: "4 نيسان 2026 | 3 مساءً",
        location: "كلية الهمك",
        category: "تقنية",
        images: ["img/تفاصيل ندوة 1.jpg", "img/الهمك.jpg", "img/خريطة الهمك.png"],
        desc: "ندوة متخصصة تتناول أحدث التطورات في مجالات الذكاء الاصطناعي والتعلم الآلي وتطبيقاتها العملية في الهندسة."
    },
    "music-concert": {
        title: "حفل موسيقي",
        date: "9 ايار 2026 | 7 مساءً",
        location: "القاعة الشامية المتحف الوطني",
        category: "موسيقى",
        images: ["img/تفاصيل موسيقى.jpg", "img/القاعة.jpg", "img/خريطة القاعة.png"],
        desc: "أمسية فنية مميزة تجمع بين الموسيقى الشرقية التراثية والكلاسيكية في أجواء القاعة الشامية العريقة."
    },
    "art-exhibition": {
        title: "معرض فني",
        date: "15 ايار 2026 | 3 مساءً",
        location: "صالة المعارض",
        category: "ثقافة",
        images: ["img/معرض-فنون-تشكيلية.jpg", "img/المعرض-1050x525.png", "img/خريطة المعرض.png"],
        desc: "معرض تشكيلي يعرض لوحات ومنحوتات فنية لنخبة من الطلاب والفنانين المبدعين."
    },
    "cyber-security": {
        title: "محاضرة الأمن السيبراني",
        date: "8 ايار 2026 | 5 مساءً",
        location: "المركز الثقافي",
        category: "تقنية",
        images: ["img/cyper event.jfif", "img/المركز 3.jfif", "img/خريطة المركز.png"],
        desc: "محاضرة توعوية حول مخاطر الفضاء الرقمي وطرق حماية البيانات الشخصية والمؤسساتية."
    },
    "network-basics": {
        title: "أساسيات الشبكات",
        date: "20 حزيران 2026 | 1 مساءً",
        location: "كلية الحقوق",
        category: "تقنية",
        images: ["img/World-of-Networks1.jpg", "img/الحقوق 1.jfif", "img/خريطة الحقوق.png"],
        desc: "دورة تدريبية مكثفة تشرح المبادئ الأساسية لربط الشبكات وبروتوكولات الاتصال الحديثة."
    },
    "web-workshop": {
        title: "ورشة تطوير الويب",
        date: "23 ايار 2026 | 7 مساءً",
        location: "كلية الهندسة المعلوماتية",
        category: "تقنية",
        images: ["img/web.webp", "img/جامعة_دمشق_-_كلية_الهندسة_المعلوماتية.jpg", "img/خريطة المعلوماتية.png"],
        desc: "ورشة عمل تطبيقية تهدف لتعليم المشاركين كيفية بناء مواقع إلكترونية تفاعلية باستخدام تقنيات الويب."
    },
    "ai-conference": {
        title: "مؤتمر الذكاء الاصطناعي",
        date: "20 تموز 2026 | 5 مساءً",
        location: "أونلاين",
        category: "تقنية",
        images: ["img/تفاصيل مؤتمر 1.png", "img/ذكاء.jfif", "img/تفاصيل مؤتمر 2.jpg"],
        desc: "مؤتمر افتراضي يجمع خبراء لمناقشة مستقبل الذكاء الاصطناعي في التعليم والعمل الرقمي."
    },
    "football-match": {
        title: "بطولة كرة القدم",
        date: "10 أيار 2026 | 4 مساءً",
        location: "ملعب العباسيين",
        category: "رياضة",
        images: ["img/ملعب.jpg", "img/بطل.jfif", "img/خريطة الملعب.png"],
        desc: "البطولة السنوية لكرة القدم لطلاب الجامعة الافتراضية السورية، منافسات حماسية وجوائز للمراكز الأولى."
    }
};

/* ===== 2. وظائف السلايدر ===== */
let currentSlideIndex = 0;
let sliderInterval;

function moveSlide(direction) {
    const slider = document.getElementById('sliderImages');
    if (!slider) return;

    const images = slider.querySelectorAll('img');
    const totalImages = images.length;
    if (totalImages <= 1) return;

    images[currentSlideIndex].style.display = "none";
    images[currentSlideIndex].style.opacity = "0";

    currentSlideIndex = (currentSlideIndex + direction + totalImages) % totalImages;

    images[currentSlideIndex].style.display = "block";
    setTimeout(() => {
        images[currentSlideIndex].style.opacity = "1";
    }, 10);
}

function startAutoSlide() {
    stopAutoSlide();
    sliderInterval = setInterval(() => {
        moveSlide(1);
    }, 3000);
}

function stopAutoSlide() {
    if (sliderInterval) clearInterval(sliderInterval);
}

/* ===== 3. وظيفة تحديد الرابط النشط ===== */
function setActiveNavLink() {
    const currentPath = window.location.pathname.split("/").pop() || "index.html";
    const navLinks = document.querySelectorAll(".nav-link");

    navLinks.forEach(link => {
        const linkHref = link.getAttribute("href");
        if (linkHref === currentPath) {
            link.classList.add("active");
        } else {
            link.classList.remove("active");
        }
    });
}

/* ===== 4. وظائف صفحة التفاصيل ===== */
function initEventPage() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');

    if (id && allEvents[id]) {
        const event = allEvents[id];

        const elements = {
            'event-title': event.title,
            'event-date': event.date,
            'event-location': event.location,
            'event-category': event.category,
            'event-desc': event.desc
        };

        for (let key in elements) {
            const el = document.getElementById(key);
            if (el) el.innerText = elements[key];
        }

        const sliderContainer = document.getElementById('sliderImages');
        if (sliderContainer) {
            sliderContainer.innerHTML = '';
            currentSlideIndex = 0;

            event.images.forEach((imgSrc, index) => {
                if (imgSrc.trim() !== "") {
                    const img = document.createElement('img');
                    img.src = imgSrc;
                    img.alt = event.title;
                    img.className = "slider-img";
                    img.style.transition = "opacity 0.5s ease-in-out";

                    if (index === 0) {
                        img.style.display = "block";
                        img.style.opacity = "1";
                    } else {
                        img.style.display = "none";
                        img.style.opacity = "0";
                    }
                    sliderContainer.appendChild(img);
                }
            });
            if (event.images.length > 1) startAutoSlide();
        }
        document.title = event.title + " - تفاصيل الفعالية";
        displayRelatedEvents(id);
    }
}

/* ===== 5. وظيفة عرض الفعاليات المتعلقة ===== */
function displayRelatedEvents(currentId) {
    const grid = document.getElementById('relatedEventsGrid');
    if (!grid) return;

    grid.innerHTML = '';
    const otherKeys = Object.keys(allEvents).filter(key => key !== currentId);
    const shuffled = otherKeys.sort(() => 0.5 - Math.random());
    const selectedKeys = shuffled.slice(0, 3);

    selectedKeys.forEach(key => {
        const ev = allEvents[key];
        const cardHtml = `
            <div class="col">
                <a href="event.html?id=${key}" class="card h-100 border-0 shadow-sm related-card text-decoration-none text-dark">
                    <img src="${ev.images[0]}" class="card-img-top" alt="${ev.title}" style="height: 180px; object-fit: cover;">
                    <div class="card-body text-end">
                        <h5 class="card-title fw-bold text-primary" style="font-size: 1.1rem;">${ev.title}</h5>
                        <p class="card-text small text-muted mb-2">📍 ${ev.location}</p>
                        <span class="badge bg-light text-secondary border">${ev.category}</span>
                    </div>
                </a>
            </div>
        `;
        grid.innerHTML += cardHtml;
    });
}

/* ===== 6. نظام الفلترة والبحث ===== */
function applyFilters() {
    const searchQuery = document.getElementById('searchInput')?.value.toLowerCase() || "";
    const categorySelect = document.getElementById('categoryFilter');
    const locationSelect = document.getElementById('locationFilter');

    let selectedCat = categorySelect ? categorySelect.value : (document.querySelector('.filter-btn.active')?.getAttribute('data-category') || "الكل");
    const selectedLoc = locationSelect ? locationSelect.value : "الكل";

    const cards = document.querySelectorAll('.filter-item');

    cards.forEach(card => {
        const cardCat = card.getAttribute('data-category');
        const cardLoc = card.getAttribute('data-location');
        const cardTitle = card.querySelector('h3, .card-title')?.innerText.toLowerCase() || "";

        const matchSearch = cardTitle.includes(searchQuery);
        const matchCat = (selectedCat === "الكل" || cardCat === selectedCat);
        const matchLoc = (selectedLoc === "الكل" || cardLoc === selectedLoc);

        card.style.display = (matchSearch && matchCat && matchLoc) ? "block" : "none";
    });
}

/* ===== 7. نظام التنبيهات ===== */
function showAlert(message, type = 'success') {
    const alertContainer = document.getElementById('alert-container');
    if (!alertContainer) return;

    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show shadow-lg border-0 mb-2 text-end`;
    alertDiv.role = 'alert';

    let icon = (type === 'success') ? '✅' : (type === 'danger' ? '❌' : '🔔');

    alertDiv.innerHTML = `
        <div class="d-flex align-items-center justify-content-between">
            <div class="d-flex align-items-center">
                <span class="ms-2 fs-5">${icon}</span>
                <div class="fw-bold">${message}</div>
            </div>
            <button type="button" class="btn-close ms-auto me-0" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    `;

    alertContainer.appendChild(alertDiv);
    setTimeout(() => {
        const bsAlert = bootstrap.Alert.getOrCreateInstance(alertDiv);
        if (bsAlert) bsAlert.close();
    }, 4000);
}

function triggerBooking() {
    const eventName = document.getElementById('event-title')?.innerText || "الفعالية";
    showAlert(`تمت إضافة "${eventName}" إلى تقويمك بنجاح!`, "success");
}

/* ===== 8. وظيفة المشاركة المطورة ===== */
function shareEvent() {
    const shareData = {
        title: document.title,
        text: "اطلع على هذه الفعالية من منصة فعاليات الجامعة الافتراضية:",
        url: window.location.href
    };

    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
        navigator.share(shareData).catch(console.error);
    } else {
        copyLinkToClipboard();
    }
}

function copyLinkToClipboard() {
    navigator.clipboard.writeText(window.location.href).then(() => {
        showAlert("تم نسخ رابط الفعالية بنجاح! يمكنك الآن مشاركته مع أصدقائك.", "info");
    }).catch(err => {
        console.error('فشل النسخ:', err);
    });
}

/* ===== 9. التحكم بالتمرير ===== */
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
}

window.addEventListener("scroll", () => {
    const backBtn = document.getElementById("backToTop");
    if (backBtn) {
        backBtn.style.display = (window.scrollY > 300) ? "flex" : "none";
    }
});

/* ===== 11. نظام الوضع الليلي (Dark Mode) - جديد ===== */
function initDarkMode() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const themeIcon = document.getElementById('theme-icon');
    const body = document.body;

    // التحقق من الإعداد المحفوظ
    if (localStorage.getItem('theme') === 'dark') {
        body.classList.add('dark-mode');
        if (themeIcon) themeIcon.innerText = '☀️';
    }

    // إضافة مستمع الحدث للزر
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', () => {
            body.classList.toggle('dark-mode');

            if (body.classList.contains('dark-mode')) {
                if (themeIcon) themeIcon.innerText = '☀️';
                localStorage.setItem('theme', 'dark');
            } else {
                if (themeIcon) themeIcon.innerText = '🌙';
                localStorage.setItem('theme', 'light');
            }
        });
    }
}

/* ===== 10. التشغيل عند التحميل ===== */
document.addEventListener('DOMContentLoaded', () => {
    setActiveNavLink();
    initEventPage();
    initDarkMode(); // تشغيل نظام الوضع الليلي

    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            applyFilters();
        });
    });

    document.getElementById('categoryFilter')?.addEventListener('change', applyFilters);
    document.getElementById('locationFilter')?.addEventListener('change', applyFilters);
    document.getElementById('searchInput')?.addEventListener('keyup', applyFilters);
});