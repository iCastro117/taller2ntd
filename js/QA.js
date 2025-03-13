document.addEventListener('DOMContentLoaded', function() {

    const faqItems = document.querySelectorAll('.faq-item');


    faqItems.forEach(item => {
        item.classList.remove('active');
        const answer = item.querySelector('.faq-answer');
        answer.style.maxHeight = "0px";
        const arrowIcon = item.querySelector('.arrow-icon');
        arrowIcon.src = '../../assets/VECTOR1.png';
    });

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');

        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');


            faqItems.forEach(faqItem => {
                faqItem.classList.remove('active');
                const answer = faqItem.querySelector('.faq-answer');
                answer.style.maxHeight = null;
                const arrowIcon = faqItem.querySelector('.arrow-icon');
                arrowIcon.src = '../../assets/VECTOR1.png';
            });


            if (!isActive) {
                item.classList.add('active');
                const answer = item.querySelector('.faq-answer');
                answer.style.maxHeight = answer.scrollHeight + "px";
                const arrowIcon = item.querySelector('.arrow-icon');
                arrowIcon.src = '../../assets/VECTOR2.png';
            }
        });
    });

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

    document.querySelectorAll('.faq-item').forEach((item, index) => {
        item.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(item);
    });
});