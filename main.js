// Replace with your actual API endpoint and key. 
// NOTE: For a live website, API keys should be hidden on a backend server, not exposed in the frontend code!
const API_URL = "YOUR_AI_API_ENDPOINT";
const API_KEY = "YOUR_API_KEY"; 

async function askAI() {
    const inputField = document.getElementById('userInput');
    const chatBox = document.getElementById('chatBox');
    const question = inputField.value;

    if (!question.trim()) return;

    // Display user's question
    chatBox.innerHTML += `<p><strong>You:</strong> ${question}</p>`;
    inputField.value = '';

    // Scroll to the bottom
    chatBox.scrollTop = chatBox.scrollHeight;

    try {
        // Example fetch setup (adjust headers/body according to the specific API documentation)
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_KEY}` 
            },
            body: JSON.stringify({
                prompt: question,
                // Add instructions to guide the AI's persona
                system_instruction: "You are a helpful STEM tutor. Explain concepts clearly and concisely."
            })
        });

        const data = await response.json();
        
        // Extract the AI's text response (this path changes depending on the API provider)
        const aiResponse = data.choices[0].text; 

        // Display AI's response
        chatBox.innerHTML += `<p><strong>AI:</strong> ${aiResponse}</p>`;
        chatBox.scrollTop = chatBox.scrollHeight;

    } catch (error) {
        chatBox.innerHTML += `<p style="color: red;"><strong>System:</strong> Connection error. Make sure your API key is configured.</p>`;
    }
}

// Allow pressing 'Enter' to send
document.getElementById('userInput').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        askAI();
    }
});

        // Scroll Animations
        const observerOptions = { root: null, rootMargin: '0px', threshold: 0.15 };
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

        // 3D Parallax Effect
        document.addEventListener('mousemove', function(e) {
            const dynamicObj = document.getElementById('dynamicObj');
            if(dynamicObj) {
                const xAxis = (window.innerWidth / 2 - e.pageX) / 40;
                const yAxis = (window.innerHeight / 2 - e.pageY) / 40;
                dynamicObj.style.transform = `translateY(0px) rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
            }
        });
        document.addEventListener('mouseleave', function() {
            const dynamicObj = document.getElementById('dynamicObj');
            if(dynamicObj) {
                dynamicObj.style.transform = `translateY(0px) rotateY(0deg) rotateX(0deg)`;
                dynamicObj.style.transition = 'transform 0.5s ease';
            }
        });

        // Navbar Active State
        // OPTIMIZED Navbar Active State
        const sections = document.querySelectorAll('section, main');
        const navLinks = document.querySelectorAll('.nav-links a');
        const navContainer = document.getElementById('navContainer');
        
        let isScrolling = false;

        window.addEventListener('scroll', () => {
            if (!isScrolling) {
                window.requestAnimationFrame(() => {
                    // 1. Shrink Navbar
                    if (window.scrollY > 50) navContainer.classList.add('scrolled');
                    else navContainer.classList.remove('scrolled');

                    // 2. Highlight Active Link
                    let current = '';
                    sections.forEach(section => {
                        const sectionTop = section.offsetTop;
                        if (scrollY >= (sectionTop - 250)) current = section.getAttribute('id');
                    });
                    
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') && link.getAttribute('href').includes(current)) {
                            link.classList.add('active');
                        }
                    });
                    isScrolling = false;
                });
            }
            isScrolling = true;
        });

        // AI Chat Panel
        function toggleChat() {
            const panel = document.getElementById('aiPanel');
            const overlay = document.getElementById('overlay');
            if (panel.classList.contains('active')) {
                panel.classList.remove('active');
                overlay.style.display = 'none';
            } else {
                panel.classList.add('active');
                overlay.style.display = 'block';
                setTimeout(() => document.getElementById('userInput').focus(), 500);
            }
        }
        function sendMessage() {
            const input = document.getElementById('userInput');
            const chatHistory = document.getElementById('chatHistory');
            const message = input.value.trim();
            if (message === '') return;
            chatHistory.innerHTML += `<div class="chat-msg msg-user">${message}</div>`;
            input.value = '';
            chatHistory.scrollTop = chatHistory.scrollHeight;
            setTimeout(() => {
                chatHistory.innerHTML += `<div class="chat-msg msg-ai">That's a great question! Once my backend is hooked up to an API, I'll be able to help you study that in detail.</div>`;
                chatHistory.scrollTop = chatHistory.scrollHeight;
            }, 800);
        }
        function handleEnter(event) { if (event.key === 'Enter') sendMessage(); }
        // --- Reveal More Schools List ---
function toggleMoreSchools() {
    const list = document.getElementById('moreSchoolsList');
    if (list.style.display === 'block') {
        list.style.display = 'none';
    } else {
        list.style.display = 'block';
    }
}