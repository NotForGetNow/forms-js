document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('add-form');
    const inputs = form.querySelectorAll('.input-field');
    const btn = form.querySelector('.send-btn');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const errMessages = document.querySelectorAll('.error-message');
        errMessages.forEach(errMessage => {
            errMessage.remove();
        });

        inputs.forEach(input => {
            input.classList.remove('error');
        });

        inputs.forEach(input => {
            const value = input.value.trim();
            const required = input.getAttribute('data-required');
            const minLength = parseInt(input.getAttribute('data-min-length')) || 0;
            const maxLength = parseInt(input.getAttribute('data-max-length')) || Infinity;

            let errMessages = [];

            if (required && value === '') {
                errMessages.push('Поле не заполнено');
                input.classList.add('error');
            } else {
                if (value.length < minLength) {
                    errMessages.push(`Минимальное кол-во символов: ${minLength}`);
                    input.classList.add('error');
                } else if (value.length > maxLength) {
                    errMessages.push(`Максимальное кол-во символов: ${maxLength}`);
                    input.classList.add('error');
                }
            }

            if (value.length > 0 && value.length < 2 && errMessages.length === 0) {
                errMessages.push('Минимальное кол-во символов: 2');
                input.classList.add('error');
            }

            if (errMessages.length > 0) {
                const errContainer = document.createElement('div');
                errContainer.classList.add('error-message');

                errMessages.forEach(errMessage => {
                    const errParagraph = document.createElement('p');
                    errParagraph.textContent = errMessage;
                    errContainer.appendChild(errParagraph);
                });

                input.parentNode.insertBefore(errContainer, input.nextSibling);
            }
        });

        const remainErr = document.querySelectorAll('.error-message');
        if (remainErr.length === 0) {
            window.location.href = '?.html';
        }
    });
});