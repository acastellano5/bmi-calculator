const form = document.querySelector('form');
const usBtn = document.querySelector('#us-btn');
const metricBtn = document.querySelector('#metric-btn');

const weightInp = document.querySelector('#weight');
const heightInp = document.querySelector('#height');
const inInp = document.querySelector('#inches');

const removeFunc = (className) => {
    const elList = document.querySelectorAll(className);
    for (let el of elList) {
        el.remove();
    }
}

const removeResults = () => {
    removeFunc('.category');
    removeFunc('.bmi-text');
    removeFunc('.error');
}

usBtn.addEventListener('click', () => {
    removeResults();

    weightInp.value = '';
    heightInp.value = '';
    inInp.value = '';

    usBtn.classList.remove('inactive');
    usBtn.classList.add('active');
    metricBtn.classList.remove('active');
    metricBtn.classList.add('inactive');
    form.classList.remove('metric-units');
    form.classList.add('us-units');
    
    heightInp.setAttribute('placeholder', 'ft');

    inInp.classList.remove('d-none');
    inInp.classList.add('d-block');

    weightInp.setAttribute('placeholder', 'lbs');


})

metricBtn.addEventListener('click', () => {
    removeResults();

    weightInp.value = '';
    heightInp.value = '';
    inInp.value = '';
    metricBtn.classList.remove('inactive');
    metricBtn.classList.add('active');
    usBtn.classList.remove('active');
    usBtn.classList.add('inactive');
    form.classList.remove('us-units');
    form.classList.add('metric-units');

    heightInp.setAttribute('placeholder', 'cm');

    inInp.classList.remove('d-block');
    inInp.classList.add('d-none');

    weightInp.setAttribute('placeholder', 'kg');



})

const feetToInches = num => num * 12;

const cmToMeters = num => num * 0.01;

const bmiText = bmi => {
    const allBMIs = document.querySelectorAll('.bmi-text');
    for (let bmi of allBMIs) {
        bmi.remove();
    }

    const results = document.querySelector('.results');

    const bmiText = document.createElement('p');
    bmiText.classList.add('text-center', 'bmi-text', 'mb-2', 'mt-5');
    bmiText.innerText = bmi;
    
    results.append(bmiText);
}


const bmiCategory = bmi => {

    const allCategories = document.querySelectorAll('.category');
    for (let category of allCategories) {
        category.remove();
    }

    const category = document.createElement('p');
    category.classList.add('text-center', 'category');

    if (bmi < 18.5) {
        category.innerText = 'Underweight';
    } else if (bmi >= 18.5 && bmi <= 24.9) {
        category.innerText = 'Healthy';
    } else if (bmi >= 25 && bmi <= 29.9) {
        category.innerText = 'Overweight';
    } else {
        category.innerText = 'Obese';
    }
    
    const results = document.querySelector('.results');
    results.append(category);
}

const calcBtn = document.querySelector('.calc-btn');

const displayErr = () => {
    const error = document.createElement('div');
    error.classList.add('error', 'mt-4', 'px-3', 'py-3');
    const errMsg = document.createElement('p');
    errMsg.classList.add('mb-0');
    errMsg.innerText = 'Please fill out all the inputs accordingly';
    error.append(errMsg);
    const results = document.querySelector('.results');
    results.append(error);
}

calcBtn.addEventListener('click', () => {

    removeFunc('.bmi-text');
    removeFunc('.error');
    removeFunc('.category')

    const height = parseInt(heightInp.value);
    const weight = parseInt(weightInp.value);
    const inches = parseInt(inInp.value);


    if (form.classList.contains('us-units')){
        if (height && weight && inches) {
            const formula = (weight / ((feetToInches(height) + inches) ** 2) * 703);
            const BMI = Math.round(10 * formula) / 10;
            bmiText(BMI);
            bmiCategory(BMI);
            
        } else {
            displayErr();
        }
    } else {
        if (height && weight) {
            const formula = weight / (cmToMeters(height) ** 2);
            const BMI = Math.round(10 * formula) / 10;
            bmiText(BMI);
            bmiCategory(BMI);
        }
        else {
            displayErr();
        }
    }
})

const clearBtn = document.querySelector('.clear-btn');

clearBtn.addEventListener('click', () => {
    inInp.value = '';
    heightInp.value = '';
    weightInp.value = '';

    removeResults();
})