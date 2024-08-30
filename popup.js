document.addEventListener("DOMContentLoaded", () => {
  const phraseInput = document.getElementById("phrase");
  const convertButton = document.getElementById("convert");
  const passwordInput = document.getElementById("password");
  const copyButton = document.getElementById("copy");

  function getRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
  }

  function convertPhraseToPassword(phrase) {
    const substitutions = {
      a: ["4", "@"],
      b: ["8"],
      e: ["3"],
      g: ["9"],
      i: ["1", "!"],
      l: ["1", "|"],
      o: ["0"],
      s: ["5", "$"],
      t: ["7", "+"],
      z: ["2"],
    };

    let password = phrase
      .replace(/\s+/g, "") // Remove all whitespace
      .split("")
      .map((char) => {
        const lowerChar = char.toLowerCase();
        if (substitutions[lowerChar]) {
          return getRandomElement(substitutions[lowerChar]);
        }
        return char;
      })
      .join("");

    // Capitalize the first letter
    password = password.charAt(0).toUpperCase() + password.slice(1);

    // Append a random symbol at the end of the password
    const symbols = "!@$%^&*()_+~";
    password += getRandomElement(symbols);

    return password;
  }

  convertButton.addEventListener("click", () => {
    const phrase = phraseInput.value;
    if (phrase.trim() === "") {
      alert("Please enter a phrase.");
      return;
    }
    const password = convertPhraseToPassword(phrase);
    passwordInput.value = password;
  });

  copyButton.addEventListener("click", () => {
    passwordInput.select();
    document.execCommand("copy");
    alert("Password copied to clipboard");
  });
});
