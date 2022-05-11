import throttle from "lodash.throttle";

const STORAGE_KEY = 'feedback-form-state';

let formData = localStorage.getItem(STORAGE_KEY) ? JSON.parse(localStorage.getItem(STORAGE_KEY)) : {};
console.log(formData)

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

    formData = {};
}

function populateTextarea() {

    refs.email.value = formData.email ? formData.email : '';
    refs.textarea.value = formData.message ? formData.message : '';
}