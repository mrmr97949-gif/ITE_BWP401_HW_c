/*  1. قاعدة البيانات (Events Database)  */
const allEvents = {
    "ai-seminar": {
        title: "ندوة الذكاء الاصطناعي",
        date: "4 نيسان 2026 | 3 مساءً",
        location: "كلية الهمك",
        category: "تقنية",
        images: ["assets/img/events 2.webp", "assets/img/الهمك.jpg", "assets/img/خريطة الهمك.png"],
        desc: "التعرف على أهم مزايا الذكاء الصناعي في الهندسة وأحدث التطبيقات العملية في مجالات التعلم الآلي."
    },
    "music-concert": {
        title: "حفل موسيقي تراثي",
        date: "9 أيار 2026 | 7 مساءً",
        location: "المتحف الوطني",
        category: "موسيقى",
        images: ["assets/img/events 4.jpg", "assets/img/القاعة.jpg", "assets/img/خريطة القاعة.png"],
        desc: "أمسية فنية مميزة تجمع بين الموسيقى الشرقية التراثية والكلاسيكية في أجواء القاعة الشامية العريقة."
    },
    "art-exhibition": {
        title: "معرض الفنون التشكيلية",
        date: "15 أيار 2026 | 3 مساءً",
        location: "صالة المعارض",
        category: "ثقافة",
        images: ["assets/img/art.webp", "assets/img/المعرض-1050x525.png", "assets/img/خريطة المعرض.png"],
        desc: "معرض تشكيلي يعرض لوحات ومنحوتات فنية لنخبة من الطلاب والفنانين المبدعين."
    },
    "cyber-security": {
        title: "محاضرة الأمن السيبراني",
        date: "8 أيار 2026 | 5 مساءً",
        location: "المركز الثقافي",
        category: "تقنية",
        images: ["assets/img/events 5.jpg", "assets/img/المركز 3.jfif", "assets/img/خريطة المركز.png"],
        desc: "محاضرة توعوية حول مخاطر الفضاء الرقمي وطرق حماية البيانات الشخصية والمؤسساتية."
    },
    "network-basics": {
        title: "اساسيات الشبكات",
        date: "20 حزيران 2026 | 1 مساءً",
        location: "كلية الحقوق",
        category: "تقنية",
        images: ["assets/img/events 6.jfif", "assets/img/الحقوق 1.jfif", "assets/img/خريطة الحقوق.png"],
        desc: "دورة تدريبية مكثفة تشرح المبادئ الأساسية لربط الشبكات وبروتوكولات الاتصال الحديثة."
    },
    "web-workshop": {
        title: "ورشة تطوير الويب",
        date: "23 أيار 2026 | 7 مساءً",
        location: "كلية الهندسة المعلوماتية",
        category: "تقنية",
        images: ["assets/img/تطوير الويب.png", "assets/img/جامعة_دمشق_-_كلية_الهندسة_المعلوماتية.jpg", "assets/img/خريطة المعلوماتية.png"],
        desc: "ورشة عمل تطبيقية تهدف لتعليم المشاركين كيفية بناء مواقع إلكترونية تفاعلية باستخدام تقنيات الويب."
    },
    "ai-conference": {
        title: "مؤتمر الذكاء الاصطناعي",
        date: "20 تموز 2026 | 5 مساءً",
        location: "أونلاين",
        category: "تقنية",
        images: ["assets/img/events 1.jpeg", "assets/img/ذكاء.jfif", "assets/img/تفاصيل مؤتمر 2.jpg"],
        desc: "مؤتمر افتراضي يجمع خبراء لمناقشة مستقبل الذكاء الاصطناعي في التعليم والعمل الرقمي."
    },
    "football-match": {
        title: "بطولة كرة القدم",
        date: "10 أيار 2026 | 4 مساءً",
        location: "ملعب الجامعة",
        category: "رياضة",
        images: ["assets/img/events 3.jpg", "assets/img/بطل.jfif", "assets/img/خريطة الملعب.png"],
        desc: "البطولة السنوية لكرة القدم لطلاب الجامعة الافتراضية السورية، منافسات حماسية وجوائز للمراكز الأولى."
    }
};

/*  2. وظائف السلايدر  */
let currentSlideIndex = 0;
let sliderInterval;

function moveSlide(direction) {
    const slider = document.getElementById('sliderImages');
    if (!slider) return;

    const images = slider.querySelectorAll('.slider-img');
    const totalImages = images.length;
    if (totalImages <= 1) return;

    images[currentSlideIndex].classList.remove('active');
    currentSlideIndex = (currentSlideIndex + direction + totalImages) % totalImages;
    images[currentSlideIndex].classList.add('active');
}

function startAutoSlide() {
    stopAutoSlide();
    sliderInterval = setInterval(() => {
        moveSlide(1);
    }, 3500);
}

function stopAutoSlide() {
    if (sliderInterval) clearInterval(sliderInterval);
}

/*  3. وظيفة تحديد الرابط النشط  */
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

/*  4. وظائف صفحة التفاصيل  */
function initEventPage() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');

    if (!id || !allEvents[id]) return;

    const event = allEvents[id];

    const titleEl = document.getElementById('event-title');
    const dateEl = document.getElementById('event-date');
    const locEl = document.getElementById('event-location');
    const catEl = document.getElementById('event-category');
    const descEl = document.getElementById('event-desc');

    if (titleEl) titleEl.innerText = event.title;
    if (dateEl) dateEl.innerText = event.date;
    if (locEl) locEl.innerText = event.location;
    if (catEl) catEl.innerText = event.category;
    if (descEl) descEl.innerText = event.desc;

    document.title = event.title + " - تفاصيل الفعالية";

    const sliderContainer = document.getElementById('sliderImages');
    if (sliderContainer) {
        sliderContainer.innerHTML = '';
        currentSlideIndex = 0;

        event.images.forEach((imgSrc, index) => {
            if (imgSrc.trim() !== "") {
                const img = document.createElement('img');
                img.src = imgSrc;
                img.alt = event.title;
                img.className = `slider-img w-100 ${index === 0 ? 'active' : ''}`;
                img.style.height = "420px";
                img.style.objectFit = "cover";
                img.onerror = function () {
                    this.src = 'https://via.placeholder.com/800x450?text=Event+Image';
                };
                sliderContainer.appendChild(img);
            }
        });

        if (event.images.length > 1) {
            startAutoSlide();
        }
    }

    displayRelatedEvents(id);
}

/*  5. عرض الفعاليات المقترحة  */
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
                <a href="event.html?id=${key}" class="card h-100 border-0 shadow-sm text-decoration-none text-dark">
                    <img src="${ev.images[0]}" class="card-img-top" alt="${ev.title}" style="height: 180px; object-fit: cover;" onerror="this.src='https://via.placeholder.com/300x180?text=Event'">
                    <div class="card-body text-end">
                        <h5 class="card-title fw-bold text-primary mb-2">${ev.title}</h5>
                        <p class="card-text small text-muted mb-2">📍 ${ev.location}</p>
                        <span class="badge bg-light text-secondary border">${ev.category}</span>
                    </div>
                </a>
            </div>
        `;
        grid.innerHTML += cardHtml;
    });
}

/*  6. نظام الفلترة والبحث  */
function applyFilters() {
    const searchInput = document.getElementById('searchInput');
    const categorySelect = document.getElementById('categoryFilter');
    const locationSelect = document.getElementById('locationFilter');

    const searchQuery = searchInput ? searchInput.value.toLowerCase().trim() : "";
    let selectedCat = categorySelect ? categorySelect.value : "الكل";
    let selectedLoc = locationSelect ? locationSelect.value : "الكل";

    if (categorySelect) {
        localStorage.setItem('preferred_category', selectedCat);
    }

    const cards = document.querySelectorAll('.filter-item');

    cards.forEach(card => {
        const cardCat = card.getAttribute('data-category') || "";
        const cardLoc = card.getAttribute('data-location') || "";
        const cardTitle = card.querySelector('.card-title, h3')?.innerText.toLowerCase() || "";

        const matchSearch = cardTitle.includes(searchQuery);
        const matchCat = (selectedCat === "الكل" || cardCat === selectedCat);
        const matchLoc = (selectedLoc === "الكل" || cardLoc === selectedLoc);

        card.style.display = (matchSearch && matchCat && matchLoc) ? "block" : "none";
    });
}

function initQuickCategories() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    if (filterBtns.length === 0) return;

    filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const chosenCat = btn.getAttribute('data-category');
            localStorage.setItem('preferred_category', chosenCat);

            const gridItems = document.querySelectorAll('#eventsGrid .filter-item');
            if (gridItems.length > 0) {
                gridItems.forEach(item => {
                    const itemCat = item.getAttribute('data-category');
                    if (chosenCat === "الكل" || itemCat === chosenCat) {
                        item.style.display = "block";
                    } else {
                        item.style.display = "none";
                    }
                });
            }
        });
    });
}

/*  7. التنبيهات والعمليات  */
function showAlert(message, type = 'success') {
    let alertContainer = document.getElementById('alert-container');
    if (!alertContainer) {
        alertContainer = document.createElement('div');
        alertContainer.id = 'alert-container';
        alertContainer.className = 'position-fixed top-0 start-50 translate-middle-x p-3';
        alertContainer.style.zIndex = '9999';
        alertContainer.style.minWidth = '320px';
        document.body.appendChild(alertContainer);
    }

    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show shadow-lg border-0 mb-2 text-end`;
    alertDiv.role = 'alert';

    let icon = (type === 'success') ? '✅' : '🔔';

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
    }, 3500);
}

function triggerBooking() {
    const eventName = document.getElementById('event-title')?.innerText || "الفعالية";
    showAlert(`تمت إضافة "${eventName}" إلى تقويمك بنجاح!`, "success");
}

function shareEvent() {
    if (navigator.share) {
        navigator.share({
            title: document.title,
            url: window.location.href
        }).catch(() => { });
    } else {
        navigator.clipboard.writeText(window.location.href).then(() => {
            showAlert("تم نسخ رابط الفعالية بنجاح!", "info");
        });
    }
}

/*  8. التحقق من نموذج الاتصال  */
function validateForm() {
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');

    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const msgError = document.getElementById('msgError');

    if (nameError) nameError.innerText = '';
    if (emailError) emailError.innerText = '';
    if (msgError) msgError.innerText = '';

    let isValid = true;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!nameInput || nameInput.value.trim().length < 3) {
        if (nameError) nameError.innerText = 'يرجى إدخال اسم ثلاثي صحيح.';
        isValid = false;
    }

    if (!emailInput || !emailPattern.test(emailInput.value.trim())) {
        if (emailError) emailError.innerText = 'يرجى إدخال بريد إلكتروني صالح.';
        isValid = false;
    }

    if (!messageInput || messageInput.value.trim().length < 10) {
        if (msgError) msgError.innerText = 'يجب ألا تقل الرسالة عن 10 أحرف.';
        isValid = false;
    }

    if (isValid) {
        showAlert(`شكراً لتواصلك معنا يا ${nameInput.value.trim()}! تم استلام رسالتك بنجاح.`, 'success');
        document.getElementById('contactForm')?.reset();
    }

    return false;
}

/*  9. زر العودة للأعلى  */
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
}

window.addEventListener("scroll", () => {
    const backBtn = document.getElementById("backToTop");
    if (backBtn) {
        backBtn.style.display = (window.scrollY > 300) ? "flex" : "none";
    }
});

/*  10. نظام الوضع الليلي  */
function initDarkMode() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const themeIcon = document.getElementById('theme-icon');
    const body = document.body;

    const savedTheme = localStorage.getItem('svu_theme') || localStorage.getItem('theme');

    if (savedTheme === 'light') {
        body.classList.remove('dark-mode');
        if (themeIcon) themeIcon.innerText = '🌙';
    } else {
        body.classList.add('dark-mode');
        if (themeIcon) themeIcon.innerText = '☀️';
    }

    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            const isDark = body.classList.contains('dark-mode');
            localStorage.setItem('svu_theme', isDark ? 'dark' : 'light');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
            if (themeIcon) {
                themeIcon.innerText = isDark ? '☀️' : '🌙';
            }
        });
    }
}

/*  11. التشغيل عند التحميل  */
document.addEventListener('DOMContentLoaded', () => {
    setActiveNavLink();
    initEventPage();
    initDarkMode();
    initQuickCategories();

    const categoryFilter = document.getElementById('categoryFilter');
    if (categoryFilter) {
        const savedCat = localStorage.getItem('preferred_category');
        if (savedCat && savedCat !== "الكل") {
            categoryFilter.value = savedCat;
            applyFilters();
        }
    }

    document.getElementById('categoryFilter')?.addEventListener('change', applyFilters);
    document.getElementById('locationFilter')?.addEventListener('change', applyFilters);
    document.getElementById('searchInput')?.addEventListener('keyup', applyFilters);
});
