document.addEventListener('DOMContentLoaded', function() {
console.log('DOM загружен, ищем элементы...');

const dlg = document.getElementById('contactDialog');
const openBtn = document.getElementById('openDialog');
const closeBtn = document.getElementById('closeDialog');
const form = document.getElementById('contactForm');

// Проверяем, что элементы найдены
if (!dlg) console.error('Элемент contactDialog не найден');
if (!openBtn) console.error('Элемент openDialog не найден');
if (!closeBtn) console.error('Элемент closeDialog не найден');
if (!form) console.error('Элемент contactForm не найден');

let lastActive = null;

// Обработчик открытия модалки
openBtn.addEventListener('click', () => {
    console.log('Кнопка открытия нажата');
    lastActive = document.activeElement;

    // Проверяем поддержку showModal
    if (typeof dlg.showModal === "function") {
        dlg.showModal();
        console.log('Модальное окно открыто');
    } else {
        console.error('Метод showModal не поддерживается');
        // Альтернатива для браузеров без поддержки dialog
        dlg.setAttribute('open', '');
        dlg.style.display = 'block';
    }

    // Фокусируемся на первом поле формы
    const firstField = dlg.querySelector('input, select, textarea, button');
    if (firstField) {
        firstField.focus();
    }
});


closeBtn.addEventListener('click', () => dlg.close('cancel'));
form?.addEventListener('submit', (e) => {
// валидация см. 1.4.2; при успехе закрываем окно
});
dlg.addEventListener('close', () => { lastActive?.focus(); });
// Esc по умолчанию вызывает событие 'cancel' и закрывает <dialog>


const form = document.getElementById('contactForm');
form?.addEventListener('submit', (e) => {
// 1) Сброс кастомных сообщений
    [...form.elements].forEach(el => el.setCustomValidity?.(''));
// 2) Проверка встроенных ограничений
    if (!form.checkValidity()) {
        e.preventDefault();
// Пример: таргетированное сообщение
        const email = form.elements.email;
        if (email?.validity.typeMismatch) {
            email.setCustomValidity('Введите корректный e-mail, например name@example.com');
        }
        form.reportValidity(); // показать браузерные подсказки
// A11y: подсветка проблемных полей
        [...form.elements].forEach(el => {
            if (el.willValidate) el.toggleAttribute('aria-invalid',
                !el.checkValidity());
        });
        return;
    }
// 3) Успешная «отправка» (без сервера)
    e.preventDefault();
// Если форма внутри <dialog>, закрываем окно:
    document.getElementById('contactDialog')?.close('success');
    form.reset();
});