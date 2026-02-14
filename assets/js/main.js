document.addEventListener('DOMContentLoaded', () => {
    // ==========================================
    // 0. PRELOADER & REVEAL LOGIC
    // ==========================================
    const preloader = document.getElementById('preloader');
    
    // Function to start the site
    const initSite = () => {
        // 1. Fade out preloader
        if(preloader) {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
                
                // 2. Trigger Hero Animations immediately
                document.querySelectorAll('header .reveal-up').forEach(el => {
                    el.classList.add('active');
                });
            }, 700); // Wait for fade out
        }
    };

    // Run when everything (video/images) is loaded
    window.addEventListener('load', initSite);
    
    // Fallback: If load takes too long (e.g. slow network), force open after 4 seconds
    setTimeout(initSite, 4000);


    // ==========================================
    // 0.5. SCROLL REVEAL OBSERVER (The "Fade In" Effect)
    // ==========================================
    const revealElements = document.querySelectorAll('.reveal-up');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Optional: Stop observing once revealed
                revealObserver.unobserve(entry.target); 
            }
        });
    }, {
        threshold: 0.15, // Trigger when 15% of element is visible
        rootMargin: "0px 0px -50px 0px" // Offset slightly
    });

    revealElements.forEach(el => revealObserver.observe(el));
    // ==========================================
    // 1. GLOBAL VARIABLES & SELECTORS
    // ==========================================
    const nav = document.getElementById('main-nav');
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileIcon = menuBtn ? menuBtn.querySelector('.material-icons-outlined') : null;
    const video = document.querySelector('video');

    // ==========================================
    // 2. NAVBAR SCROLL EFFECT
    // ==========================================
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('bg-primary/95', 'shadow-lg');
            nav.classList.remove('bg-primary/80', 'backdrop-blur-md', 'border-white/5');
            nav.classList.add('border-transparent');
        } else {
            nav.classList.remove('bg-primary/95', 'shadow-lg', 'border-transparent');
            nav.classList.add('bg-primary/80', 'backdrop-blur-md', 'border-white/5');
        }
    });

    // ==========================================
    // 3. MOBILE MENU LOGIC
    // ==========================================
    let isMenuOpen = false;

    if (menuBtn && mobileMenu && mobileIcon) {
        menuBtn.addEventListener('click', () => {
            isMenuOpen = !isMenuOpen;
            
            if (isMenuOpen) {
                // Open
                mobileMenu.classList.remove('hidden');
                mobileIcon.textContent = 'close'; 
                nav.classList.add('bg-primary'); // Solid background when menu open
            } else {
                // Close
                mobileMenu.classList.add('hidden');
                mobileIcon.textContent = 'menu';
                if(window.scrollY < 50) nav.classList.remove('bg-primary');
            }
        });

        // Close menu when a link is clicked
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                isMenuOpen = false;
                mobileMenu.classList.add('hidden');
                mobileIcon.textContent = 'menu';
            });
        });
    }

    // ==========================================
    // 4. VIDEO PLAYBACK SPEED
    // ==========================================
    if(video) {
        video.playbackRate = 0.75; 
    }

    // ==========================================
    // 5. NUMBER COUNTER ANIMATION
    // ==========================================
    const statsSection = document.getElementById('stats-section');
    const counters = document.querySelectorAll('.counter');
    let hasCounted = false;

    if(statsSection && counters.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !hasCounted) {
                    counters.forEach(counter => {
                        const target = +counter.getAttribute('data-target');
                        const duration = 2000; 
                        const increment = target / (duration / 16); 
                        
                        let current = 0;
                        const updateCount = () => {
                            current += increment;
                            if (current < target) {
                                counter.innerText = Math.ceil(current);
                                requestAnimationFrame(updateCount);
                            } else {
                                counter.innerText = target;
                            }
                        };
                        updateCount();
                    });
                    hasCounted = true; 
                }
            });
        }, { threshold: 0.5 });
        observer.observe(statsSection);
    }

    // ==========================================
    // 6. TYPEWRITER EFFECT
    // ==========================================
    const textElement = document.getElementById('typewriter-text');
    const words = ["STATUS QUO", "COMMONPLACE", "IMAGINABLE", "Ordinary"];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function type() {
        if (!textElement) return;
        const currentWord = words[wordIndex];

        if (isDeleting) {
            textElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50; 
        } else {
            textElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 150; 
        }

        if (!isDeleting && charIndex === currentWord.length) {
            isDeleting = true;
            typeSpeed = 2000; // Pause at end of word
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeSpeed = 500; // Pause before new word
        }
        setTimeout(type, typeSpeed);
    }

    type(); // Start Typewriter

    // ==========================================
    // 7. DESKTOP MOUSE PARALLAX EFFECT
    // ==========================================
    const aboutSection = document.getElementById('about');
    const parallaxLayers = document.querySelectorAll('.parallax-layer');

    if (aboutSection && parallaxLayers.length > 0) {
        aboutSection.addEventListener('mousemove', (e) => {
            // Only run on desktop (width > 1024px)
            if (window.innerWidth < 1024) return;

            const x = (e.clientX - window.innerWidth / 2) / 100;
            const y = (e.clientY - window.innerHeight / 2) / 100;

            parallaxLayers.forEach(layer => {
                const speed = layer.getAttribute('data-speed');
                const xPos = x * speed;
                const yPos = y * speed;
                
                // Apply the movement
                layer.style.transform = `translateX(${xPos}px) translateY(${yPos}px)`;
            });
        });
    }

    // ==========================================
    // 8. MOBILE SCROLL-TRIGGERED ANIMATION
    // ==========================================
    const track = document.getElementById('mobile-scroll-track');
    const filmstrip = document.getElementById('mobile-filmstrip');
    const progressBar = document.getElementById('scroll-progress-bar');

    if (track && filmstrip) {
        window.addEventListener('scroll', () => {
            // Only run on mobile (less than 1024px)
            if (window.innerWidth >= 1024) return;

            const rect = track.getBoundingClientRect();
            const viewportHeight = window.innerHeight;
            
            // Calculate how much we have scrolled into the track
            // When rect.top is 0, we are at start. 
            // When rect.top is negative (scrolling down), we progress.
            // The total scrollable distance is track height - 1 viewport height
            const trackHeight = track.offsetHeight - viewportHeight;
            
            // Percentage: 0 (start) to 1 (end)
            let percentage = -rect.top / trackHeight;
            
            // Clamp value between 0 and 1
            percentage = Math.max(0, Math.min(1, percentage));

            // Move the filmstrip
            // We want to move it 200vw to the left (to show the 3rd image)
            // (Total Width - Viewport Width)
            const moveAmount = percentage * (filmstrip.scrollWidth - window.innerWidth);
            
            filmstrip.style.transform = `translateX(-${moveAmount}px)`;
            
            // Update Progress Bar
            if(progressBar) {
                progressBar.style.width = `${percentage * 100}%`;
            }
        });
    }
    // ==========================================
    // 9. PROPERTY FILTERING LOGIC
    // ==========================================
    const filterBtns = document.querySelectorAll('.filter-btn');
    const propertyCards = document.querySelectorAll('.property-card');

    if (filterBtns.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // 1. Remove active class from all buttons
                filterBtns.forEach(b => {
                    b.classList.remove('text-white', 'border-gold');
                    b.classList.add('text-gray-400', 'border-transparent');
                });
                
                // 2. Add active class to clicked button
                btn.classList.remove('text-gray-400', 'border-transparent');
                btn.classList.add('text-white', 'border-gold');

                // 3. Filter the grid
                const filterValue = btn.getAttribute('data-filter');

                propertyCards.forEach(card => {
                    if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                        card.style.display = 'block';
                        // Add a small fade-in animation
                        card.animate([
                            { opacity: 0, transform: 'scale(0.95)' },
                            { opacity: 1, transform: 'scale(1)' }
                        ], {
                            duration: 300,
                            easing: 'ease-out'
                        });
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }
    // ==========================================
    // 10. SERVICES HOVER INTERACTION
    // ==========================================
    const serviceItems = document.querySelectorAll('.service-item');
    const serviceImg = document.getElementById('service-img-display');
    const serviceCaption = document.getElementById('service-img-caption');

    // Define the images and captions for each service
    // Note: Reusing your existing property images as placeholders. 
    // You should create specific images named service-1.jpg, etc.
    const serviceData = {
        'service-sales': {
            img: 'assets/images/prop-1.jpg',
            caption: 'The Art of the Deal'
        },
        'service-management': {
            img: 'assets/images/prop-2.jpg',
            caption: 'Effortless Living'
        },
        'service-legal': {
            img: 'assets/images/prop-3.jpg', 
            caption: 'Ironclad Trust'
        },
        'service-design': {
            img: 'assets/images/prop-4.jpg',
            caption: 'Curated Elegance'
        }
    };

    if (serviceItems.length > 0 && serviceImg) {
        serviceItems.forEach(item => {
            item.addEventListener('mouseenter', () => {
                const key = item.getAttribute('data-image');
                const data = serviceData[key];

                if (data) {
                    // 1. Fade out slightly
                    serviceImg.style.opacity = '0.8';
                    serviceImg.style.transform = 'scale(1.05)';
                    
                    setTimeout(() => {
                        // 2. Change Source
                        serviceImg.src = data.img;
                        if(serviceCaption) serviceCaption.innerText = data.caption;
                        
                        // 3. Fade In
                        serviceImg.style.opacity = '1';
                        serviceImg.style.transform = 'scale(1)';
                    }, 150); // Short delay for smooth transition
                }
            });
        });
    }
    // ==========================================
    // 11. LATEST LISTINGS: 3D TILT & SLIDER
    // ==========================================
    const slider = document.getElementById('latest-slider');
    const prevBtn = document.getElementById('prev-latest');
    const nextBtn = document.getElementById('next-latest');
    const tiltCards = document.querySelectorAll('[data-tilt]');

    // 3D Tilt Logic
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            // Rotation intensity
            const rotateX = (y - centerY) / 15;
            const rotateY = (centerX - x) / 15;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
        });
    });

    // Slider Buttons
    if (prevBtn && nextBtn && slider) {
        nextBtn.addEventListener('click', () => {
            slider.scrollBy({ left: 450, behavior: 'smooth' });
        });
        prevBtn.addEventListener('click', () => {
            slider.scrollBy({ left: -450, behavior: 'smooth' });
        });
    }

    // Scroll Fade Effect
    const observerOptions = {
        threshold: 0.1
    };

    const latestObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-active');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.latest-card').forEach(card => latestObserver.observe(card));

    // ==========================================
    // 12. LATEST LISTINGS: STACKING OVERLAY LOGIC
    // ==========================================
    const stackTrack = document.getElementById('latest-scroll-track');
    const stackCards = document.querySelectorAll('.latest-stack-card');
    const currentIndicator = document.getElementById('stack-current');

    if (stackTrack && stackCards.length > 0) {
        window.addEventListener('scroll', () => {
            const rect = stackTrack.getBoundingClientRect();
            const trackHeight = stackTrack.offsetHeight;
            const viewportHeight = window.innerHeight;

            // 1. Calculate total progress (0 to 1)
            // Starts when top of track hits top of screen
            let totalProgress = -rect.top / (trackHeight - viewportHeight);
            totalProgress = Math.max(0, Math.min(1, totalProgress));

            // 2. Map progress to individual cards
            // We have 4 cards, so each card "owns" 0.25 of the scroll
            const cardCount = stackCards.length;
            
            stackCards.forEach((card, index) => {
                // Card 0 is the base, it never moves.
                if (index === 0) return;

                // Each card starts sliding after the previous one
                const start = (index - 1) / (cardCount - 1);
                const end = index / (cardCount - 1);

                // Calculate progress for THIS specific card
                let cardProgress = (totalProgress - start) / (end - start);
                cardProgress = Math.max(0, Math.min(1, cardProgress));

                // Move from 100% (right) to 0% (center/stacked)
                const moveAmount = 100 - (cardProgress * 100);
                card.style.transform = `translateX(${moveAmount}%)`;
                
                // Optional: Add a subtle darkening to the card underneath
                const prevCard = stackCards[index - 1];
                if (prevCard) {
                    prevCard.style.filter = `brightness(${1 - (cardProgress * 0.4)}) blur(${cardProgress * 2}px)`;
                }
            });

            // 3. Update the 1/4 Counter
            const currentNum = Math.floor(totalProgress * (cardCount - 0.01)) + 1;
            if(currentIndicator) currentIndicator.innerText = currentNum;
        });
    }
// ==========================================
    // 14. FINALIZED CONTACT FORM LOGIC (PHP)
    // ==========================================
    const advisoryForm = document.getElementById('advisory-form');
    const errorDisplay = document.getElementById('form-error');
    const successDisplay = document.getElementById('form-success');
    const submitBtn = document.getElementById('submit-btn');

    if (advisoryForm) {
        advisoryForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Stop page reload

            // Reset messages
            errorDisplay.classList.add('hidden');
            successDisplay.classList.add('hidden');
            errorDisplay.innerText = "";

            // 1. Validation Logic
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value.trim();

            let errors = [];
            if (!name) errors.push("Please enter your name.");
            if (!email || !email.includes('@')) errors.push("Please enter a valid email.");
            if (!phone) errors.push("Phone number is required.");
            if (!subject) errors.push("Please select a subject.");
            if (!message) errors.push("Message field cannot be empty.");

            if (errors.length > 0) {
                errorDisplay.innerHTML = errors.join("<br>");
                errorDisplay.classList.remove('hidden');
                // Scroll to error so user sees it
                errorDisplay.scrollIntoView({ behavior: 'smooth', block: 'center' });
                return;
            }

            // 2. Preparation for Sending
            submitBtn.disabled = true;
            submitBtn.innerText = "Processing Inquiry...";
            
            const formData = new FormData(this);

            // 3. AJAX Fetch to PHP
            fetch('send-email.php', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.status === 'success') {
                    successDisplay.classList.remove('hidden');
                    advisoryForm.reset();
                    submitBtn.innerText = "Message Sent";
                    submitBtn.style.backgroundColor = "#25D366"; // Green
                } else {
                    errorDisplay.innerText = data.message || "Server Error. Please try again.";
                    errorDisplay.classList.remove('hidden');
                    submitBtn.innerText = "Try Again";
                    submitBtn.disabled = false;
                }
            })
            .catch(error => {
                console.error('Error:', error);
                errorDisplay.innerText = "Unable to connect to server. Check your connection.";
                errorDisplay.classList.remove('hidden');
                submitBtn.innerText = "Send Advisory Request";
                submitBtn.disabled = false;
            })
            .finally(() => {
                // Return button to normal after 4 seconds
                setTimeout(() => {
                    submitBtn.style.backgroundColor = "";
                    submitBtn.innerText = "Send Advisory Request";
                    submitBtn.disabled = false;
                }, 4000);
            });
        });
    }

    // Smooth Scroll for "Book Inspection" Card
    const bookBtn = document.querySelector('a[href="#main-nav"]');
    if (bookBtn) {
        bookBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            
            // Highlight the Nav CTA after a delay
            setTimeout(() => {
                const navCta = document.querySelector('nav a[href="#inspection"]');
                if(navCta) {
                    navCta.classList.add('scale-110', 'bg-white', 'text-gold');
                    setTimeout(() => navCta.classList.remove('scale-110', 'bg-white', 'text-gold'), 1000);
                }
            }, 800);
        });
    }

    // ==========================================
    // 15. GLASS FORM & WHATSAPP REDIRECTS
    // ==========================================
    const glassForm = document.getElementById('glass-contact-form');
    
    if (glassForm) {
        glassForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = glassForm.querySelector('button');
            const inputs = glassForm.querySelectorAll('input, textarea, select');
            
            // 1. Loading State
            btn.innerHTML = 'Submitting...';
            btn.classList.add('opacity-50', 'pointer-events-none');
            
            // 2. Simulate High-End Processing
            setTimeout(() => {
                btn.innerHTML = 'Success Received';
                btn.style.backgroundColor = '#25D366';
                btn.style.color = '#fff';
                
                // Reset form
                setTimeout(() => {
                    btn.innerHTML = 'Submit Inquiry';
                    btn.style.backgroundColor = '';
                    btn.style.color = '';
                    btn.classList.remove('opacity-50', 'pointer-events-none');
                    glassForm.reset();
                }, 3000);
            }, 1500);
        });
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('advisory-form');
    const errorBox = document.getElementById('form-error');
    const successBox = document.getElementById('form-success');
    const submitBtn = document.getElementById('submit-btn');

    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            // 1. Reset Displays
            errorBox.classList.add('hidden');
            successBox.classList.add('hidden');

            // 2. Collect Data
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());

            // 3. Real-Time Validation
            let errors = [];
            if (!data.name) errors.push("Name is required.");
            if (!data.email || !data.email.includes('@')) errors.push("Valid email is required.");
            if (!data.phone) errors.push("Phone number is required.");
            if (!data.subject) errors.push("Please select a subject.");
            if (!data.message) errors.push("Please enter your message.");

            if (errors.length > 0) {
                errorBox.innerHTML = errors.join("<br>");
                errorBox.classList.remove('hidden');
                return;
            }

            // 4. Send to PHP
            submitBtn.innerText = "Processing...";
            submitBtn.disabled = true;

            try {
                const response = await fetch('send-email.php', {
                    method: 'POST',
                    body: formData
                });

                const result = await response.json();

                if (result.status === 'success') {
                    successBox.classList.remove('hidden');
                    form.reset();
                } else {
                    errorBox.innerText = result.message;
                    errorBox.classList.remove('hidden');
                }
            } catch (err) {
                errorBox.innerText = "Server error. Please try again later.";
                errorBox.classList.remove('hidden');
            } finally {
                submitBtn.innerText = "Send Advisory Request";
                submitBtn.disabled = false;
            }
        });
    }
});