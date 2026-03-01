/**
 * PENTHAM LAW - Website Scripts
 * จัดการระบบธีม, เมนูมือถือ และ Modal การติดต่อ
 */

// --- การเลือกองค์ประกอบ ---
const modal = document.getElementById('contact-modal');
const modalContent = document.getElementById('modal-content');
const viewMain = document.getElementById('view-main');
const viewLine = document.getElementById('view-line');
const modalTitle = document.getElementById('modal-title');
const modalSubtitle = document.getElementById('modal-subtitle');
const toast = document.getElementById('copy-toast');
const mobileMenu = document.getElementById('mobile-menu');
const menuIcon = document.getElementById('menu-icon');

const themeToggleBtn = document.getElementById('theme-toggle');
const themeToggleMobileBtn = document.getElementById('theme-toggle-mobile');
const themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
const themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');

// --- ระบบเมนูมือถือ ---
document.getElementById('mobile-menu-button')?.addEventListener('click', () => {
    const isActive = mobileMenu.classList.toggle('active');
    if (isActive) {
        menuIcon.classList.replace('fa-bars', 'fa-times');
    } else {
        menuIcon.classList.replace('fa-times', 'fa-bars');
    }
});

function closeMobileMenu() {
    mobileMenu.classList.remove('active');
    menuIcon.classList.replace('fa-times', 'fa-bars');
}

// --- ระบบ Modal การติดต่อ ---
function toggleModal() {
    if (modal.classList.contains('hidden')) {
        switchView('view-main');
        modal.classList.replace('hidden', 'flex');
        setTimeout(() => {
            modalContent.classList.replace('modal-enter', 'modal-enter-active');
        }, 10);
    } else {
        modalContent.classList.replace('modal-enter-active', 'modal-enter');
        setTimeout(() => {
            modal.classList.replace('flex', 'hidden');
        }, 300);
    }
}

function switchView(viewId) {
    if (viewId === 'view-line') {
        viewMain.classList.add('view-hidden');
        viewLine.classList.remove('view-hidden');
        modalTitle.innerText = "LINE Official";
        modalSubtitle.innerText = "สแกน QR Code หรือคัดลอก ID เพื่อเพิ่มเพื่อน";
    } else {
        viewLine.classList.add('view-hidden');
        viewMain.classList.remove('view-hidden');
        modalTitle.innerText = "ติดต่อเรา";
        modalSubtitle.innerText = "เลือกช่องทางที่คุณสะดวกเพื่อปรึกษาเบื้องต้น";
    }
}

// --- ระบบคัดลอกไปยังคลิปบอร์ด ---
function copyToClipboard(text) {
    const tempInput = document.createElement("input");
    tempInput.value = text;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);
    
    // แสดง Notification
    toast.style.display = 'block';
    setTimeout(() => {
        toast.style.display = 'none';
    }, 2500);
}

// --- ระบบจัดการธีม (Dark/Light Mode) ---
function updateThemeIcons() {
    if (document.documentElement.classList.contains('dark')) {
        themeToggleDarkIcon?.classList.add('hidden');
        themeToggleLightIcon?.classList.remove('hidden');
    } else {
        themeToggleLightIcon?.classList.add('hidden');
        themeToggleDarkIcon?.classList.remove('hidden');
    }
}

function setTheme(isDark) {
    if (isDark) {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
    updateThemeIcons();
}

// ตรวจสอบธีมเริ่มต้นจาก Local Storage หรือ System Settings
if (localStorage.getItem('color-theme') === 'dark' || 
    (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    setTheme(true);
} else {
    setTheme(false);
}

const toggleTheme = () => {
    const isDark = document.documentElement.classList.toggle('dark');
    localStorage.setItem('color-theme', isDark ? 'dark' : 'light');
    updateThemeIcons();
};

themeToggleBtn?.addEventListener('click', toggleTheme);
themeToggleMobileBtn?.addEventListener('click', toggleTheme);