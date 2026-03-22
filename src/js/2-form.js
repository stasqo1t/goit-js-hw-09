const form = document.querySelector('.feedback-form');
const emailInput = form.elements.email;
const messageInput = form.elements.message;
const localStorageKey = 'input-elements';


const formData = {
  email: '',
  message: '',
};

function saveToLS(key, value) {
  const zip = JSON.stringify(value);
  localStorage.setItem(key, zip);
}

function loadFromLS(key) {
  const zip = localStorage.getItem(key);
  if (!zip) return null;

  try {
    return JSON.parse(zip);
  } catch (error) {
    return null;
  }
}

function initForm() {
  const savedData = loadFromLS(localStorageKey);

  if (savedData) {
    formData.email = savedData.email || '';
    formData.message = savedData.message || '';
  } else {
    formData.email = '';
    formData.message = '';
  }

  emailInput.value = formData.email;
  messageInput.value = formData.message;
};

initForm();

form.addEventListener('input', (e) => {
  const { name, value } = e.target;

  if (name !== 'email' && name !== 'message') return;

  formData[name] = value;
  saveToLS(localStorageKey, formData);
});

form.addEventListener('submit', (e) => {
  e.preventDefault();

  if (!formData.email.trim() || !formData.message.trim()) {
    alert('Fill all fields!');
    return;
  }

  console.log({ ...formData });

  localStorage.removeItem(localStorageKey);

  formData.email = '';
  formData.message = '';

  form.reset();
});
