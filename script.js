// ১. এনিমেশন সেটিংস
const initAnimation = () => {
    const canvas = document.getElementById('networkCanvas');
    if (!canvas) return; // ক্যানভাস না থাকলে এরর বন্ধ করবে

    const ctx = canvas.getContext('2d');
    let w, h, particles = [];

    const setSize = () => {
        w = canvas.width = window.innerWidth;
        h = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', setSize);
    setSize();

    for (let i = 0; i < 60; i++) {
        particles.push({
            x: Math.random() * w,
            y: Math.random() * h,
            vx: Math.random() * 0.4 - 0.2,
            vy: Math.random() * 0.4 - 0.2
        });
    }

    const draw = () => {
        ctx.clearRect(0, 0, w, h);
        ctx.fillStyle = "rgba(255, 204, 0, 0.4)";
        particles.forEach(p => {
            p.x += p.vx; p.y += p.vy;
            if (p.x < 0 || p.x > w) p.vx *= -1;
            if (p.y < 0 || p.y > h) p.vy *= -1;
            ctx.beginPath();
            ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
            ctx.fill();
        });
        requestAnimationFrame(draw);
    };
    draw();
};

// ২. ডাটাবেজ
const langDB = {
    bn: {
        name: "রাশেদুল করিম", home: "হোম", about: "সম্পর্কে", hello: "আসসালামু আলাইকুম", job: "সফটওয়্যার ডেভেলপার",
        tribute: "হাদী ভাই তোমায় মনে পড়ে", more: "আরো পড়ুন...", less: "কম দেখুন",
        desc: `আসসালামু আলাইকুম।
আমি রাশেদুল করিম। আমার জন্ম ও বেড়ে ওঠা কক্সবাজার জেলার টেকনাফ উপজেলার নতুন পল্লান পাড়া এলাকায়। পারিবারিকভাবে আমি একটি সাধারণ ও সুশৃঙ্খল পরিবেশে লালিত-পালিত। আমার বাবা একজন ব্যবসায়ী এবং মা একজন গৃহিণী—যাঁদের সততা, পরিশ্রম ও মূল্যবোধ আমার জীবনের পথচলায় গভীরভাবে প্রভাব ফেলেছে।

বর্তমানে আমি চাকরির পাশাপাশি গত এক বছর ধরে নিয়মিতভাবে ওয়েব ও সফটওয়্যার ডেভেলপমেন্ট নিয়ে কাজ করে যাচ্ছি। প্রযুক্তির জগতে নিজেকে দক্ষ ও যুগোপযোগী করে গড়ে তোলাই আমার প্রধান লক্ষ্য। নতুন কিছু শেখা, বাস্তব সমস্যার সমাধান তৈরি করা এবং আধুনিক প্রযুক্তিকে কাজে লাগিয়ে মানুষের উপকারে আসতে পারাই আমার আগ্রহের কেন্দ্রবিন্দু।

ওয়েব ও সফটওয়্যার ডেভেলপমেন্টকে আমি শুধু একটি পেশা নয়, বরং ভবিষ্যৎ গড়ার একটি শক্তিশালী মাধ্যম হিসেবে দেখি। এই ক্ষেত্রে নিজেকে আরও দক্ষ, দায়িত্বশীল ও সফল একজন ডেভেলপার হিসেবে প্রতিষ্ঠিত করার দৃঢ় প্রত্যয় নিয়ে আমি সামনে এগিয়ে যাচ্ছি, ইনশাআল্লাহ।

আপনাদের সকলের কাছে আমার জন্য দোয়া প্রার্থনা করছি—যেন আমি সততা, পরিশ্রম ও নিষ্ঠার সঙ্গে আমার লক্ষ্য অর্জনের পথে অবিচল থাকতে পারি।`
    },
    en: {
        name: "RASHEDUL KARIM", home: "Home", about: "About", hello: "Assalamu Alaikum", job: "Software Developer",
        tribute: "Hadi Bhai, we miss you", more: "Read More...", less: "See Less",
        desc: `Assalamu Alaikum.
I am Rashedul Karim. I was born and raised in the New Pallan Para area of Teknaf, Cox's Bazar. I grew up in a disciplined family environment. My father is a businessman and my mother is a homemaker—whose honesty and values have deeply influenced my life.

Currently, I have been working on web and software development for the past year alongside my job. My main goal is to make myself skilled and up-to-date in the technology world. Learning new things and creating solutions to real-world problems is my focus.

I see web and software development not just as a profession, but as a powerful medium for building the future. I am moving forward with the firm determination to establish myself as a skilled and successful developer, InshaAllah.

I seek prayers from all of you so that I can remain firm on the path to achieving my goals with honesty and dedication.`
    }
};

let currentL = 'bn';

// ৩. ফাংশনসমূহ
function applyLang() {
    const l = langDB[currentL];
    const safeSet = (id, text) => {
        const el = document.getElementById(id);
        if (el) el.innerText = text;
    };

    safeSet('h-myname', l.name);
    safeSet('h-hello', l.hello);
    safeSet('h-job', l.job);
    safeSet('tribute-head', l.tribute);
    safeSet('a-text', l.desc);
    
    const p = document.getElementById('a-text');
    const btn = document.getElementById('a-btn');
    if (btn && p) {
        btn.innerText = p.classList.contains('expanded') ? l.less : l.more;
    }
}

// ৪. ইভেন্ট লিসেনার
document.addEventListener('DOMContentLoaded', () => {
    initAnimation();
    applyLang();

    const langBtn = document.getElementById('lang-switcher');
    if (langBtn) {
        langBtn.onclick = () => {
            currentL = (currentL === 'bn') ? 'en' : 'bn';
            applyLang();
        };
    }
});

function toggleText() {
    const p = document.getElementById('a-text');
    if (p) {
        p.classList.toggle('expanded');
        applyLang();
    }
}

function scrollToSection(id) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
}

function openPrayer() {
    const modal = document.getElementById('prayer-modal');
    const times = document.getElementById('p-times');
    if (modal && times) {
        modal.style.display = 'block';
        times.innerHTML = "<p>ফজর: ০৫:১০</p><p>জোহর: ১২:১৫</p><p>আসর: ০৩:৫৫</p><p>মাগরিব: ০৫:৪৫</p>";
    }
}

function closePrayer() {
    const modal = document.getElementById('prayer-modal');
    if (modal) modal.style.display = 'none';
}

function closePrayerOutside(e) {
    if (e.target.id === 'prayer-modal') closePrayer();
}