// const colorPicker = document.getElementById('color');

// colorPicker.addEventListener('change', e => {
//   document.body.style.setProperty('--main-bg', colorPicker.value);
// });

const themes = {
  white: {
    '--box-bg': 'white',
    '--box-text-color': 'black',
  },
  black: {
    '--box-bg': 'black',
    '--box-text-color': 'white',
  },
};

const themeSelect = document.getElementById('themes');
const form = document.forms['customThemeFrom'];
const colorInputs = document.querySelectorAll('[data-var]');
const inputThemeName = form.elements['themeName'];

themeSelect.addEventListener('change', e => {
  const themeVariables = themes[themeSelect.value];
  Object.entries(themeVariables).forEach(([key, value]) => {
    document.body.style.setProperty(key, value);
  });
});

form.addEventListener('submit', e => {
  e.preventDefault();
  const newTheme = {};
  const newThemeName = inputThemeName.value;
  colorInputs.forEach(input => {
    const key = input.dataset.var;
    const value = input.value;
    newTheme[key] = value;
  });

  themes[newThemeName] = newTheme;
  const newSelectOption = new Option(newThemeName, newThemeName);
  themeSelect.appendChild(newSelectOption);
  form.reset();
});
