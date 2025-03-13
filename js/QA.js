document.addEventListener('DOMContentLoaded', function() {
    // FAQ Accordion functionality
    const faqItems = document.querySelectorAll('.faq-item');

    // Asegurar que todas las preguntas estén cerradas al cargar la página
    faqItems.forEach(item => {
        item.classList.remove('active'); // Elimina la clase 'active' al inicio
        const answer = item.querySelector('.faq-answer');
        answer.style.maxHeight = null; // Asegura que la respuesta esté oculta
        const arrowIcon = item.querySelector('.arrow-icon');
        arrowIcon.src = '../../assets/VECTOR1.png'; // Restaura el ícono a cerrado
    });

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');

        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            // Cierra todas las preguntas antes de abrir la seleccionada
            faqItems.forEach(faqItem => {
                faqItem.classList.remove('active');
                const answer = faqItem.querySelector('.faq-answer');
                answer.style.maxHeight = null;
                const arrowIcon = faqItem.querySelector('.arrow-icon');
                arrowIcon.src = '../../assets/VECTOR1.png';
            });

            // Si no estaba activa, la abre
            if (!isActive) {
                item.classList.add('active');
                const answer = item.querySelector('.faq-answer');
                answer.style.maxHeight = answer.scrollHeight + "px";
                const arrowIcon = item.querySelector('.arrow-icon');
                arrowIcon.src = '../../assets/VECTOR2.png';
            }
        });
    });

    // Add animation classes to elements as they appear in viewport
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe FAQ items for animation
    document.querySelectorAll('.faq-item').forEach((item, index) => {
        item.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(item);
    });
});