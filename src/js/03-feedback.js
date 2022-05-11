import throttle from "lodash.throttle";

const STORAGE_KEY = 'feedback-form-state';

const formData = localStorage.getItem(STORAGE_KEY) ? JSON.parse(localStorage.getItem(STORAGE_KEY)) : {};

const refs = { 

    form: document.querySelector('.feedback-form'),
    email: document.querySelector('.feedback-form input'),
    textarea: document.querySelector('.feedback-form textarea'),
}

refs.form.addEventListener('submit', onFormSubmit);
refs.form.addEventListener('input',  throttle(onFormInput, 500));

populateTextarea();

function onFormInput(evt) {
        formData[evt.target.name] = evt.target.value;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(formData)); 
}

function onFormSubmit(evt) { 
    evt.preventDefault();

    evt.currentTarget.reset();
   
    const feedback = localStorage.getItem(STORAGE_KEY);
    console.log(feedback);

    localStorage.removeItem(STORAGE_KEY);
}

function populateTextarea() {
    const savedText = localStorage.getItem(STORAGE_KEY);

    if (savedText) {
        const parsedText = JSON.parse(savedText);
    
        refs.email.value = parsedText.email
        refs.textarea.value = parsedText.message;
    }
}