const themes = {
  black: {
    "--box-bg": "black",
    "--box-text-color": "white"
  },
  white: {
    "--box-bg": "white",
    "--box-text-color": "black"
  },
  oceanic: {
    "--box-bg": "blue",
    "--box-text-color": "pink"
  }
};

generateThemes(themes);
function generateThemes(themes) {
  //UI elements
  const ROOT = document.documentElement;
  ROOT.style.setProperty("--box-bg", "black");
  ROOT.style.setProperty("--box-text-color", "white");

  const box = document.querySelector(".box");
  const p = document.querySelector(".box p");

  box.style.background = "var(--box-bg)";
  p.style.color = "var(--box-text-color)";

  const themeSelect = document.createElement("select");
  themeSelect.setAttribute("name", "themes");
  themeSelect.classList.add("custom-select");
  themeSelect.setAttribute("id", "themes");

  document.body.insertBefore(themeSelect, box);

  const formHead = document.createElement("h5");
  formHead.textContent = "Custom theme";

  const formDiv = document.createElement("div");
  formDiv.classList.add("custom-theme-controls");

  const form = document.createElement("form");
  form.setAttribute("name", "customThemeFrom");

  const formTextInputDiv = document.createElement("div");
  formTextInputDiv.classList.add("controls-item");

  const inputThemeName = document.createElement("input");
  inputThemeName.setAttribute("type", "text");
  inputThemeName.setAttribute("name", "themeName");
  inputThemeName.setAttribute("id", "themeName");

  formTextInputDiv.appendChild(inputThemeName);
  form.appendChild(formTextInputDiv);
  formDiv.appendChild(form);

  document.body.appendChild(formHead);
  document.body.appendChild(formDiv);
  let colorInputs = [];

  renderThemes(themes);

  //Functions
  function renderThemes(obj) {
    const settingsKeys = Object.keys(obj);

    settingsKeys.forEach(el => {
      const option = document.createElement("option");
      option.setAttribute("value", `${el}`);
      option.textContent = `${el}`;

      themeSelect.appendChild(option);
    });

    Object.entries(obj[settingsKeys[0]]).forEach(
      ([themeSettingsName, themeSettingsValue]) => {
        const colorInput = document.createElement("input");
        colorInput.setAttribute("type", "color");
        colorInput.setAttribute("name", "color");
        colorInput.setAttribute("id", `theme${themeSettingsName}`);
        colorInput.setAttribute("data-var", `${themeSettingsName}`);

        const controlsItem = document.createElement("div");
        const labelControlsItem = document.createElement("label");
        labelControlsItem.setAttribute("for", `${colorInput.id}`);
        labelControlsItem.textContent = `${themeSettingsName}`;

        labelControlsItem.appendChild(colorInput);
        controlsItem.appendChild(labelControlsItem);
        form.appendChild(controlsItem);

        colorInputs.push(colorInput);
      }
    );

    const submitBtn = document.createElement("button");
    submitBtn.setAttribute("type", "submit");
    submitBtn.textContent = "Set custom theme";
    form.appendChild(submitBtn);
  }

  themeSelect.addEventListener("change", e => {
    const themeVariables = themes[themeSelect.value];
    Object.entries(themeVariables).forEach(([key, value]) => {
      document.body.style.setProperty(key, value);
    });
  });

  form.addEventListener("submit", e => {
    e.preventDefault();
    const newTheme = {};
    const newThemeName = inputThemeName.value;

    if (!newThemeName) {
      alert("Enter a theme name");
      return;
    }

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
}
