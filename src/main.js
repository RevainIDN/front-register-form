import './style.css'

const firstStep = document.getElementById('first-form');
const secondStep = document.getElementById('second-form');
const thirdStep = document.getElementById('third-form');

const inputText = document.getElementById('name');
const inputEmail = document.getElementById('email');
const nameError = inputText.closest('label').querySelector('.input--empty');
const emailError = inputEmail.closest('label').querySelector('.input--empty');

const topicBtns = document.querySelectorAll('.topic-btn');

const continueBtn = document.querySelector('.continue-btn');
const stepsCount = document.querySelector('.pagination-steps');
const paginationBtns = document.querySelectorAll('.pagination-item');

let step = 1;
let maxStep = 1;
const userTopics = [];

function updateStepVisibility() {
	firstStep.style.display = step === 1 ? 'flex' : 'none';
	secondStep.style.display = step === 2 ? 'flex' : 'none';
	thirdStep.style.display = step === 3 ? 'flex' : 'none';

	if (step === 3) {
		updateThirdForm();
	}
}

function updateProgress() {
	stepsCount.textContent = `Step ${step} of 3`;
	paginationBtns.forEach((btn, index) => {
		const paginationDot = btn.querySelector('.pagination-btn');

		paginationDot.classList.remove('pagination-btn--active', 'pagination-btn--after-active');

		if (index < step - 1) {
			paginationDot.classList.add('pagination-btn--after-active');
		} else if (index === step - 1) {
			paginationDot.classList.add('pagination-btn--active');
		}
	});
}

paginationBtns.forEach((btn, index) => {
	btn.addEventListener('click', () => {
		if (index + 1 <= maxStep) {
			step = index + 1;
			updateStepVisibility();
			updateProgress();
		}
	});
});

function processFirstStep() {
	const userName = inputText.value.trim();
	const userEmail = inputEmail.value.trim();
	let isValid = true;

	if (userName.length === 0) {
		nameError.style.display = 'flex';
		inputText.style.border = '2px #B22222 solid';
		isValid = false;
	} else {
		nameError.style.display = 'none';
		inputText.style.border = '2px #4D5562 solid';
	}

	if (userEmail.length === 0) {
		emailError.style.display = 'flex';
		inputEmail.style.border = '2px #B22222 solid';
		isValid = false;
	} else if (!inputEmail.validity.valid) {
		emailError.textContent = 'Please enter a valid email address';
		emailError.style.display = 'flex';
		inputEmail.style.border = '2px #B22222 solid';
		isValid = false;
	} else {
		emailError.style.display = 'none';
		inputEmail.style.border = '2px #4D5562 solid';
	}

	return isValid;
}

topicBtns.forEach(button => {
	button.addEventListener('click', () => {
		button.classList.toggle('topic-btn--active');
		if (button.classList.contains('topic-btn--active')) {
			userTopics.push(button.textContent);
		} else {
			const index = userTopics.indexOf(button.textContent);
			if (index !== -1) {
				userTopics.splice(index, 1);
			}
		}
	});
});

function processSecondStep() {
	if (userTopics.length === 0) {
		return false;
	}

	return true;
}

function updateThirdForm() {
	const userNameField = document.querySelector('.user-name span');
	const userEmailField = document.querySelector('.user-email span');
	const topicsList = document.querySelector('.topics-list');

	continueBtn.textContent = 'Confirm';
	userNameField.textContent = inputText.value.trim();
	userEmailField.textContent = inputEmail.value.trim();

	topicsList.innerHTML = '';
	userTopics.forEach(topic => {
		const listItem = document.createElement('li');
		listItem.className = 'topic-item';
		listItem.textContent = topic;
		topicsList.appendChild(listItem);
	});
}

function processThirdStep() {
	updateThirdForm();
	alert('The form has been successfully completed!');
}

continueBtn.addEventListener('click', (event) => {
	event.preventDefault();

	if (step === 1) {
		if (processFirstStep()) {
			step = 2;
			maxStep = Math.max(maxStep, step);
		}
	} else if (step === 2) {
		if (processSecondStep()) {
			step = 3;
			maxStep = Math.max(maxStep, step);
		}
	} else if (step === 3) {
		processThirdStep();
	}

	updateStepVisibility();
	updateProgress();
});

updateStepVisibility();
updateProgress();