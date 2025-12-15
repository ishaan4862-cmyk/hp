const defaultConfig = {
    company_name: "Sai Enterprises",
    company_tagline: "Complete IT, Security & AV Solutions",
    ceo_name: "Mr. Manav Arora",
    ceo_title: "Founder & CEO",
    contact_email: "saienterprises0024@gmail.com",
    contact_phone: "+91 6397807056",
    contact_address: "Ground Floor, Green Plaza Complex, Sahastradhara Road, Dehradun - 248001"
};

const WHATSAPP_BUSINESS_NUMBER = '916397807056';

async function onConfigChange(config) {
    const companyName = config.company_name || defaultConfig.company_name;
    const tagline = config.company_tagline || defaultConfig.company_tagline;
    const ceoName = config.ceo_name || defaultConfig.ceo_name;
    const ceoTitle = config.ceo_title || defaultConfig.ceo_title;
    const email = config.contact_email || defaultConfig.contact_email;
    const phone = config.contact_phone || defaultConfig.contact_phone;
    const address = config.contact_address || defaultConfig.contact_address;

    document.getElementById('nav-company-name').textContent = companyName.split(' ').slice(0, 2).join(' ');
    document.getElementById('nav-tagline').textContent = tagline;
    document.getElementById('hero-company-name').textContent = companyName;
    document.getElementById('hero-tagline').textContent = tagline;
    document.getElementById('about-ceo-name').textContent = ceoName;
    document.getElementById('about-ceo-display').textContent = ceoName;
    document.getElementById('about-ceo-title').textContent = ceoTitle;
    document.getElementById('contact-email-display').textContent = email;
    document.getElementById('contact-phone-display').textContent = phone;
    document.getElementById('contact-address-display').textContent = address;
    document.getElementById('map-address').textContent = address;
    document.getElementById('footer-company-name').textContent = companyName;
    document.getElementById('footer-company-name-2').textContent = companyName;
    document.getElementById('footer-ceo-name').textContent = ceoName;
}

if (window.elementSdk) {
    window.elementSdk.init({
        defaultConfig,
        onConfigChange,
        mapToCapabilities: (config) => ({
            recolorables: [],
            borderables: [],
            fontEditable: undefined,
            fontSizeable: undefined
        }),
        mapToEditPanelValues: (config) => new Map([
            ["company_name", config.company_name || defaultConfig.company_name],
            ["company_tagline", config.company_tagline || defaultConfig.company_tagline],
            ["ceo_name", config.ceo_name || defaultConfig.ceo_name],
            ["ceo_title", config.ceo_title || defaultConfig.ceo_title],
            ["contact_email", config.contact_email || defaultConfig.contact_email],
            ["contact_phone", config.contact_phone || defaultConfig.contact_phone],
            ["contact_address", config.contact_address || defaultConfig.contact_address]
        ])
    });
}

const dataHandler = {
    onDataChanged(data) {
        console.log('Form submissions:', data.length);
    }
};

let isInitialized = false;

async function initializeDataSdk() {
    if (isInitialized || !window.dataSdk) return;
    const result = await window.dataSdk.init(dataHandler);
    if (result.isOk) {
        isInitialized = true;
    }
}

initializeDataSdk();

function showToast(message, isSuccess) {
    const toast = document.getElementById('toast-notification');
    const toastText = document.getElementById('toast-text');
    toastText.textContent = message;
    toast.style.backgroundColor = isSuccess ? '#10B981' : '#EF4444';
    toast.style.color = 'white';
    toast.style.display = 'block';
    setTimeout(() => {
        toast.style.display = 'none';
    }, 5000);
}

function navigateToPage(pageId, event) {
    if (event) event.preventDefault();

    document.querySelectorAll('.page-content').forEach(page => {
        page.classList.remove('active');
    });

    document.getElementById(pageId + '-page').classList.add('active');

    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });

    const activeLink = document.querySelector(`.nav-link[href="#${pageId}"]`);
    if (activeLink) activeLink.classList.add('active');

    const mobileMenu = document.getElementById('mobile-menu');
    if (!mobileMenu.classList.contains('hidden')) {
        mobileMenu.classList.add('hidden');
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

document.getElementById('contact-form').addEventListener('submit', (e) => {
    const contactMethod = document.querySelector('input[name="contact-method"]:checked').value;

    if (contactMethod === 'whatsapp') {
        e.preventDefault();

        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            company: document.getElementById('company').value || 'N/A',
            inquiry_type: document.getElementById('inquiry_type').value,
            message: document.getElementById('message').value,
            submitted_at: new Date().toISOString()
        };

        // WhatsApp submission
        const whatsappMessage = `*📧 CONTACT FORM INQUIRY*

*Customer Details:*
👤 Name: ${formData.name}
📧 Email: ${formData.email}
📱 Phone: ${formData.phone}
 Company: ${formData.company}

*Inquiry Type:*
${formData.inquiry_type}

*Message:*
${formData.message}

---
_Our team will contact you shortly via your preferred method._`;

        const encodedMessage = encodeURIComponent(whatsappMessage);
        const whatsappUrl = `https://wa.me/${WHATSAPP_BUSINESS_NUMBER}?text=${encodedMessage}`;

        // Open WhatsApp in new tab using programmatic link click to bypass popup blockers
        const link = document.createElement('a');
        link.href = whatsappUrl;
        link.target = '_blank';
        link.rel = 'noopener,noreferrer';
        link.style.display = 'none';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        showToast('Opening WhatsApp... Please send the message to complete your request!', true);
        document.getElementById('contact-form').reset();

    } else {
        // Let Netlify handle the form submission
        // Optionally, you can add additional processing here if needed
    }
});

document.getElementById('mobile-menu-btn').addEventListener('click', () => {
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenu.classList.toggle('hidden');
});

// 3D Testimonial Carousel Functionality
let currentTestimonial = 0;
const totalTestimonials = 5;
let testimonialInterval;

function updateTestimonialPositions() {
    const slides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.testimonial-dot');

    slides.forEach((slide, index) => {
        slide.classList.remove('active', 'next', 'prev', 'hidden-next', 'hidden-prev');

        const position = (index - currentTestimonial + totalTestimonials) % totalTestimonials;

        if (position === 0) {
            slide.classList.add('active');
        } else if (position === 1) {
            slide.classList.add('next');
        } else if (position === totalTestimonials - 1) {
            slide.classList.add('prev');
        } else if (position > 1 && position < totalTestimonials - 1) {
            if (position <= Math.floor(totalTestimonials / 2)) {
                slide.classList.add('hidden-next');
            } else {
                slide.classList.add('hidden-prev');
            }
        }
    });

    dots.forEach((dot, index) => {
        if (index === currentTestimonial) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
            dot.style.background = '#d1d5db';
            dot.style.width = '12px';
        }
    });
}

function goToTestimonial(index) {
    currentTestimonial = index;
    updateTestimonialPositions();
    resetAutoplay();
}

function nextTestimonial() {
    currentTestimonial = (currentTestimonial + 1) % totalTestimonials;
    updateTestimonialPositions();
}

function previousTestimonial() {
    currentTestimonial = (currentTestimonial - 1 + totalTestimonials) % totalTestimonials;
    updateTestimonialPositions();
    resetAutoplay();
}

function resetAutoplay() {
    clearInterval(testimonialInterval);
    testimonialInterval = setInterval(nextTestimonial, 5000);
}

// Initialize positions
updateTestimonialPositions();

// Start autoplay
testimonialInterval = setInterval(nextTestimonial, 5000);

// Scroll Reveal Animation
function revealOnScroll() {
    const reveals = document.querySelectorAll('.scroll-reveal');

    reveals.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;

        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('revealed');
        }
    });
}

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// Service Modal Functions
const serviceDetails = {
    hardware: {
        title: 'IT Hardware Solutions',
        content: `
          <div class="space-y-6">
            <div class="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border-2 border-blue-200">
              <h3 class="text-2xl font-bold text-blue-900 mb-4">💻 HP Computing Solutions</h3>
              <div class="grid md:grid-cols-2 gap-4">
                <div class="bg-white p-4 rounded-xl">
                  <h4 class="font-bold text-gray-900 mb-2">Business Laptops</h4>
                  <ul class="text-gray-600 space-y-1 text-sm">
                    <li>• HP EliteBook Series - Premium business laptops</li>
                    <li>• HP ProBook Series - Professional workhorses</li>
                    <li>• HP ZBook - Mobile workstations</li>
                  </ul>
                </div>
                <div class="bg-white p-4 rounded-xl">
                  <h4 class="font-bold text-gray-900 mb-2">Consumer Laptops</h4>
                  <ul class="text-gray-600 space-y-1 text-sm">
                    <li>• HP Pavilion - Everyday computing</li>
                    <li>• HP Envy - Premium design & performance</li>
                    <li>• HP Spectre - Ultra-premium ultrabooks</li>
                  </ul>
                </div>
              </div>
            </div>

            <div class="bg-gradient-to-br from-red-50 to-red-100 rounded-2xl p-6 border-2 border-red-200">
              <h3 class="text-2xl font-bold text-red-900 mb-4">Gaming Solutions</h3>
              <div class="grid md:grid-cols-2 gap-4">
                <div class="bg-white p-4 rounded-xl">
                  <h4 class="font-bold text-gray-900 mb-2">HP OMEN Gaming Laptops</h4>
                  <ul class="text-gray-600 space-y-1 text-sm">
                    <li>• High-performance gaming laptops</li>
                    <li>• Latest NVIDIA RTX graphics</li>
                    <li>• Intel Core i7/i9 processors</li>
                    <li>• High refresh rate displays (144Hz+)</li>
                    <li>• RGB backlit keyboards</li>
                  </ul>
                </div>
                <div class="bg-white p-4 rounded-xl">
                  <h4 class="font-bold text-gray-900 mb-2">HP Victus Gaming Series</h4>
                  <ul class="text-gray-600 space-y-1 text-sm">
                    <li>• Budget-friendly gaming laptops</li>
                    <li>• NVIDIA GTX/RTX graphics</li>
                    <li>• Intel/AMD processors</li>
                    <li>• Perfect for students & casual gamers</li>
                    <li>• Affordable gaming performance</li>
                  </ul>
                </div>
              </div>
            </div>

            <div class="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6 border-2 border-purple-200">
              <h3 class="text-2xl font-bold text-purple-900 mb-4">Custom Gaming PC Builds</h3>
              <p class="text-gray-700 mb-4">We specialize in building high-performance custom gaming PCs tailored to your exact specifications and budget.</p>
              <div class="grid md:grid-cols-3 gap-4">
                <div class="bg-white p-4 rounded-xl">
                  <h4 class="font-bold text-gray-900 mb-2">Entry Level</h4>
                  <ul class="text-gray-600 space-y-1 text-sm">
                    <li>• 1080p Gaming</li>
                    <li>• AMD Ryzen 5 / Intel i5</li>
                    <li>• NVIDIA GTX 1650/1660</li>
                    <li>• 16GB RAM</li>
                    <li>• 500GB SSD</li>
                  </ul>
                </div>
                <div class="bg-white p-4 rounded-xl border-2 border-purple-400">
                  <h4 class="font-bold text-purple-900 mb-2">Mid Range ⭐</h4>
                  <ul class="text-gray-600 space-y-1 text-sm">
                    <li>• 1440p Gaming</li>
                    <li>• AMD Ryzen 7 / Intel i7</li>
                    <li>• NVIDIA RTX 3060/4060</li>
                    <li>• 32GB RAM</li>
                    <li>• 1TB NVMe SSD</li>
                  </ul>
                </div>
                <div class="bg-white p-4 rounded-xl">
                  <h4 class="font-bold text-gray-900 mb-2">High End</h4>
                  <ul class="text-gray-600 space-y-1 text-sm">
                    <li>• 4K Gaming</li>
                    <li>• AMD Ryzen 9 / Intel i9</li>
                    <li>• NVIDIA RTX 4070/4080</li>
                    <li>• 64GB RAM</li>
                    <li>• 2TB NVMe SSD</li>
                  </ul>
                </div>
              </div>
            </div>

            <div class="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 border-2 border-green-200">
              <h3 class="text-2xl font-bold text-green-900 mb-4">🖥️ Desktop & Workstation Solutions</h3>
              <div class="grid md:grid-cols-2 gap-4">
                <div class="bg-white p-4 rounded-xl">
                  <h4 class="font-bold text-gray-900 mb-2">Business Desktops</h4>
                  <ul class="text-gray-600 space-y-1 text-sm">
                    <li>• HP EliteDesk - Enterprise desktops</li>
                    <li>• HP ProDesk - Business PCs</li>
                    <li>• All-in-One PCs</li>
                    <li>• Mini PCs for space-saving</li>
                  </ul>
                </div>
                <div class="bg-white p-4 rounded-xl">
                  <h4 class="font-bold text-gray-900 mb-2">Printers & Peripherals</h4>
                  <ul class="text-gray-600 space-y-1 text-sm">
                    <li>• HP LaserJet & InkJet printers</li>
                    <li>�� Multi-function printers</li>
                    <li>• Genuine HP inks & toners</li>
                    <li>• Monitors, keyboards, mice</li>
                  </ul>
                </div>
              </div>
            </div>

            <div class="bg-blue-600 text-white rounded-2xl p-6 text-center">
              <h3 class="text-2xl font-bold mb-3">Ready to Upgrade Your Hardware?</h3>
              <p class="mb-4 opacity-90">Contact us for custom quotations, gaming PC builds, or HP products</p>
              <button onclick="closeServiceModal(); navigateToPage('contact');" class="bg-white text-blue-600 px-8 py-3 rounded-lg font-bold hover:bg-opacity-90 transition">
                Get a Quote Now
              </button>
            </div>
          </div>
        `
    },
    cctv: {
        title: 'CCTV Surveillance & Security',
        content: `
          <div class="space-y-6">
            <div class="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-2xl p-6 border-2 border-indigo-200">
              <h3 class="text-2xl font-bold text-indigo-900 mb-4">📹 CCTV Camera Systems</h3>
              <div class="grid md:grid-cols-2 gap-4">
                <div class="bg-white p-4 rounded-xl">
                  <h4 class="font-bold text-gray-900 mb-2">HD/4K IP Cameras</h4>
                  <ul class="text-gray-600 space-y-1 text-sm">
                    <li>• 2MP, 4MP, 5MP, 8MP resolutions</li>
                    <li>• Indoor & outdoor cameras</li>
                    <li>• Night vision (up to 30m)</li>
                    <li>• Wide-angle & PTZ cameras</li>
                    <li>• Weatherproof models</li>
                  </ul>
                </div>
                <div class="bg-white p-4 rounded-xl">
                  <h4 class="font-bold text-gray-900 mb-2">Recording Systems</h4>
                  <ul class="text-gray-600 space-y-1 text-sm">
                    <li>• NVR (Network Video Recorder)</li>
                    <li>• DVR (Digital Video Recorder)</li>
                    <li>• 4/8/16/32 channel systems</li>
                    <li>• Cloud storage options</li>
                    <li>• Local HDD storage</li>
                  </ul>
                </div>
              </div>
            </div>

            <div class="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6 border-2 border-purple-200">
              <h3 class="text-2xl font-bold text-purple-900 mb-4">Access Control & Security</h3>
              <div class="grid md:grid-cols-3 gap-4">
                <div class="bg-white p-4 rounded-xl">
                  <h4 class="font-bold text-gray-900 mb-2">Biometric Systems</h4>
                  <ul class="text-gray-600 space-y-1 text-sm">
                    <li>• Fingerprint scanners</li>
                    <li>• Face recognition</li>
                    <li>• Attendance systems</li>
                  </ul>
                </div>
                <div class="bg-white p-4 rounded-xl">
                  <h4 class="font-bold text-gray-900 mb-2">Access Control</h4>
                  <ul class="text-gray-600 space-y-1 text-sm">
                    <li>• RFID card systems</li>
                    <li>• Door locks</li>
                    <li>• Magnetic locks</li>
                  </ul>
                </div>
                <div class="bg-white p-4 rounded-xl">
                  <h4 class="font-bold text-gray-900 mb-2">Smart Features</h4>
                  <ul class="text-gray-600 space-y-1 text-sm">
                    <li>• Motion detection</li>
                    <li>• Mobile app access</li>
                    <li>• Email alerts</li>
                  </ul>
                </div>
              </div>
            </div>

            <div class="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border-2 border-blue-200">
              <h3 class="text-2xl font-bold text-blue-900 mb-4">🏢 Complete Security Solutions</h3>
              <div class="grid md:grid-cols-2 gap-4">
                <div class="bg-white p-4 rounded-xl">
                  <h4 class="font-bold text-gray-900 mb-2">For Businesses</h4>
                  <ul class="text-gray-600 space-y-1 text-sm">
                    <li>• Office security systems</li>
                    <li>• Warehouse monitoring</li>
                    <li>• Retail store surveillance</li>
                    <li>• Factory CCTV installation</li>
                  </ul>
                </div>
                <div class="bg-white p-4 rounded-xl">
                  <h4 class="font-bold text-gray-900 mb-2">For Homes</h4>
                  <ul class="text-gray-600 space-y-1 text-sm">
                    <li>• Residential CCTV systems</li>
                    <li>• Smart doorbell cameras</li>
                    <li>• Home automation integration</li>
                    <li>• Remote monitoring via mobile</li>
                  </ul>
                </div>
              </div>
            </div>

            <div class="bg-indigo-600 text-white rounded-2xl p-6 text-center">
              <h3 class="text-2xl font-bold mb-3">Secure Your Property Today</h3>
              <p class="mb-4 opacity-90">Free site survey & security audit for your premises</p>
              <button onclick="closeServiceModal(); navigateToPage('contact');" class="bg-white text-indigo-600 px-8 py-3 rounded-lg font-bold hover:bg-opacity-90 transition">
                Request Security Audit
              </button>
            </div>
          </div>
        `
    },
    av: {
        title: 'Audio-Visual Solutions',
        content: `
          <div class="space-y-6">
            <div class="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6 border-2 border-purple-200">
              <h3 class="text-2xl font-bold text-purple-900 mb-4">📽️ Display & Projection Systems</h3>
              <div class="grid md:grid-cols-2 gap-4">
                <div class="bg-white p-4 rounded-xl">
                  <h4 class="font-bold text-gray-900 mb-2">Projectors</h4>
                  <ul class="text-gray-600 space-y-1 text-sm">
                    <li>• Business projectors</li>
                    <li>• Home theater projectors</li>
                    <li>• Interactive projectors</li>
                    <li>• Short-throw projectors</li>
                  </ul>
                </div>
                <div class="bg-white p-4 rounded-xl">
                  <h4 class="font-bold text-gray-900 mb-2">LED & Display Solutions</h4>
                  <ul class="text-gray-600 space-y-1 text-sm">
                    <li>• LED video walls</li>
                    <li>• Smart displays</li>
                    <li>• Digital signage</li>
                    <li>• Interactive touchscreens</li>
                  </ul>
                </div>
              </div>
            </div>

            <div class="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border-2 border-blue-200">
              <h3 class="text-2xl font-bold text-blue-900 mb-4">🎤 Audio Solutions</h3>
              <div class="grid md:grid-cols-3 gap-4">
                <div class="bg-white p-4 rounded-xl">
                  <h4 class="font-bold text-gray-900 mb-2">Conference Systems</h4>
                  <ul class="text-gray-600 space-y-1 text-sm">
                    <li>• Video conferencing</li>
                    <li>• Conference microphones</li>
                    <li>• Speakers</li>
                  </ul>
                </div>
                <div class="bg-white p-4 rounded-xl">
                  <h4 class="font-bold text-gray-900 mb-2">PA Systems</h4>
                  <ul class="text-gray-600 space-y-1 text-sm">
                    <li>• Public address systems</li>
                    <li>• Sound amplifiers</li>
                    <li>• Zone audio control</li>
                  </ul>
                </div>
                <div class="bg-white p-4 rounded-xl">
                  <h4 class="font-bold text-gray-900 mb-2">Professional Audio</h4>
                  <ul class="text-gray-600 space-y-1 text-sm">
                    <li>• Auditorium systems</li>
                    <li>• Event audio setup</li>
                    <li>Background music</li>
                  </ul>
                </div>
              </div>
            </div>

            <div class="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 border-2 border-green-200">
              <h3 class="text-2xl font-bold text-green-900 mb-4"> Applications</h3>
              <div class="grid md:grid-cols-2 gap-4">
                <div class="bg-white p-4 rounded-xl">
                  <h4 class="font-bold text-gray-900 mb-2">Corporate</h4>
                  <ul class="text-gray-600 space-y-1 text-sm">
                    <li>• Meeting rooms & boardrooms</li>
                    <li>• Training centers</li>
                    <li>• Reception area displays</li>
                  </ul>
                </div>
                <div class="bg-white p-4 rounded-xl">
                  <h4 class="font-bold text-gray-900 mb-2">Education & Events</h4>
                  <ul class="text-gray-600 space-y-1 text-sm">
                    <li>• Classrooms & auditoriums</li>
                    <li>• Seminar halls</li>
                    <li>• Event venues</li>
                  </ul>
                </div>
              </div>
            </div>

            <div class="bg-purple-600 text-white rounded-2xl p-6 text-center">
              <h3 class="text-2xl font-bold mb-3">Transform Your Presentation Experience</h3>
              <p class="mb-4 opacity-90">Get custom AV solutions for your space</p>
              <button onclick="closeServiceModal(); navigateToPage('contact');" class="bg-white text-purple-600 px-8 py-3 rounded-lg font-bold hover:bg-opacity-90 transition">
                Request Consultation
              </button>
            </div>
          </div>
        `
    },
    services: {
        title: 'IT Services & Technical Support',
        content: `
          <div class="space-y-6">
            <div class="bg-gradient-to-br from-cyan-50 to-cyan-100 rounded-2xl p-6 border-2 border-cyan-200">
              <h3 class="text-2xl font-bold text-cyan-900 mb-4">🔧 Technical Support Services</h3>
              <div class="grid md:grid-cols-2 gap-4">
                <div class="bg-white p-4 rounded-xl">
                  <h4 class="font-bold text-gray-900 mb-2">Windows Support</h4>
                  <ul class="text-gray-600 space-y-1 text-sm">
                    <li>• Windows installation & setup</li>
                    <li>• Windows crash troubleshooting</li>
                    <li>• Blue screen error fixes</li>
                    <li>• System optimization</li>
                    <li>• Driver updates & installation</li>
                  </ul>
                </div>
                <div class="bg-white p-4 rounded-xl">
                  <h4 class="font-bold text-gray-900 mb-2">Hardware Repairs</h4>
                  <ul class="text-gray-600 space-y-1 text-sm">
                    <li>• Laptop screen replacement</li>
                    <li>• Keyboard & motherboard repair</li>
                    <li>• RAM & SSD upgrades</li>
                    <li>• Battery replacement</li>
                    <li>• Cooling system cleaning</li>
                  </ul>
                </div>
              </div>
            </div>

            <div class="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-6 border-2 border-orange-200">
              <h3 class="text-2xl font-bold text-orange-900 mb-4">📋 Annual Maintenance Contracts (AMC)</h3>
              <div class="grid md:grid-cols-3 gap-4">
                <div class="bg-white p-4 rounded-xl">
                  <h4 class="font-bold text-gray-900 mb-2">Basic AMC</h4>
                  <ul class="text-gray-600 space-y-1 text-sm">
                    <li>• Quarterly maintenance</li>
                    <li>• Remote support</li>
                    <li>• Email/phone assistance</li>
                    <li>• Software updates</li>
                  </ul>
                </div>
                <div class="bg-white p-4 rounded-xl border-2 border-orange-400">
                  <h4 class="font-bold text-orange-900 mb-2">Standard AMC ⭐</h4>
                  <ul class="text-gray-600 space-y-1 text-sm">
                    <li>• Monthly maintenance</li>
                    <li>• On-site support</li>
                    <li>• Priority helpdesk</li>
                    <li>• System health reports</li>
                  </ul>
                </div>
                <div class="bg-white p-4 rounded-xl">
                  <h4 class="font-bold text-gray-900 mb-2">Premium AMC</h4>
                  <ul class="text-gray-600 space-y-1 text-sm">
                    <li>• 24/7 support</li>
                    <li>• Dedicated engineer</li>
                    <li>• Parts replacement</li>
                    <li>• Performance optimization</li>
                  </ul>
                </div>
              </div>
            </div>

            <div class="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border-2 border-blue-200">
              <h3 class="text-2xl font-bold text-blue-900 mb-4">💼 Enterprise IT Services</h3>
              <div class="grid md:grid-cols-2 gap-4">
                <div class="bg-white p-4 rounded-xl">
                  <h4 class="font-bold text-gray-900 mb-2">Network Management</h4>
                  <ul class="text-gray-600 space-y-1 text-sm">
                    <li>• Network setup & configuration</li>
                    <li>• Router & switch installation</li>
                    <li>• WiFi network deployment</li>
                    <li>• Network security setup</li>
                  </ul>
                </div>
                <div class="bg-white p-4 rounded-xl">
                  <h4 class="font-bold text-gray-900 mb-2">Server Management</h4>
                  <ul class="text-gray-600 space-y-1 text-sm">
                    <li>• Server installation</li>
                    <li>• Data backup solutions</li>
                    <li>• Server maintenance</li>
                    <li>• Virtualization setup</li>
                  </ul>
                </div>
              </div>
            </div>

            <div class="bg-gradient-to-br from-red-50 to-red-100 rounded-2xl p-6 border-2 border-red-200">
              <h3 class="text-2xl font-bold text-red-900 mb-4">⚡ Emergency Services</h3>
              <div class="bg-white p-4 rounded-xl">
                <p class="text-gray-700 mb-3">We provide rapid response for critical IT issues:</p>
                <ul class="text-gray-600 space-y-2">
                  <li class="flex items-start">
                    <svg class="w-5 h-5 text-red-600 mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                    </svg>
                    <span>System crashes & data recovery</span>
                  </li>
                  <li class="flex items-start">
                    <svg class="w-5 h-5 text-red-600 mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                    </svg>
                    <span>Network outages & connectivity issues</span>
                  </li>
                  <li class="flex items-start">
                    <svg class="w-5 h-5 text-red-600 mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                    </svg>
                    <span>Security breaches & virus removal</span>
                  </li>
                  <li class="flex items-start">
                    <svg class="w-5 h-5 text-red-600 mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                    </svg>
                    <span>Hardware failures & component replacement</span>
                  </li>
                </ul>
              </div>
            </div>

            <div class="bg-cyan-600 text-white rounded-2xl p-6 text-center">
              <h3 class="text-2xl font-bold mb-3">Need Technical Support?</h3>
              <p class="mb-4 opacity-90">24/7 helpdesk available for urgent issues</p>
              <button onclick="closeServiceModal(); navigateToPage('contact');" class="bg-white text-cyan-600 px-8 py-3 rounded-lg font-bold hover:bg-opacity-90 transition">
                Contact Support Team
              </button>
            </div>
          </div>
        `
    }
};

function openServiceModal(serviceType) {
    const modal = document.getElementById('service-modal');
    const title = document.getElementById('modal-title');
    const content = document.getElementById('modal-content');

    const service = serviceDetails[serviceType];
    if (service) {
        title.textContent = service.title;
        content.innerHTML = service.content;
        modal.classList.remove('hidden');
        modal.classList.add('flex');
        document.body.style.overflow = 'hidden';
    }
}

function closeServiceModal(event) {
    if (event && event.target !== event.currentTarget) return;

    const modal = document.getElementById('service-modal');
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    document.body.style.overflow = 'auto';
}

// WhatsApp Quick Quote Functions
function openQuickQuoteModal() {
    const modal = document.getElementById('quick-quote-modal');
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.style.overflow = 'hidden';
}

function closeQuickQuoteModal(event) {
    if (event && event.target !== event.currentTarget) return;

    const modal = document.getElementById('quick-quote-modal');
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    document.body.style.overflow = 'auto';
    document.getElementById('whatsapp-quote-form').reset();
}

// WhatsApp business phone number (change this to your actual WhatsApp business number)
// const WHATSAPP_BUSINESS_NUMBER = '916397807056'; // Format: country code + number without + or spaces

document.getElementById('whatsapp-quote-form').addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('wa-name').value;
    const phone = document.getElementById('wa-phone').value;
    const company = document.getElementById('wa-company').value || 'Not provided';
    const category = document.getElementById('wa-category').value;
    const quantity = document.getElementById('wa-quantity').value;
    const details = document.getElementById('wa-details').value;

    // Format the WhatsApp message
    const message = `*QUOTATION REQUEST*

*Customer Details:*
Name: ${name}
Phone: ${phone}
Company: ${company}

*Product Information:*
Category: ${category}
Quantity: ${quantity}

*Additional Details:*
${details}

---
_This is an automated quotation request from HP World SAI Enterprises website._`;

    // Encode the message for URL
    const encodedMessage = encodeURIComponent(message);

    // Create WhatsApp URL
    const whatsappUrl = `https://wa.me/${WHATSAPP_BUSINESS_NUMBER}?text=${encodedMessage}`;

    // Open WhatsApp in new tab using programmatic link click to bypass popup blockers
    const link = document.createElement('a');
    link.href = whatsappUrl;
    link.target = '_blank';
    link.rel = 'noopener,noreferrer';
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Close modal and show success message
    closeQuickQuoteModal();
    showToast('Opening WhatsApp... Please send the message to complete your request!', true);

    // Reset form
    document.getElementById('whatsapp-quote-form').reset();

});
