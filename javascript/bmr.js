document.addEventListener("DOMContentLoaded", () => {
  const bmrButton = document.getElementById("bmr-calc-btn");

  if (!bmrButton) return;

  bmrButton.addEventListener("click", () => {
    const sex = document.getElementById("bmr-sex").value;
    const age = Number(document.getElementById("bmr-age").value);
    const height = Number(document.getElementById("bmr-height").value);
    const weight = Number(document.getElementById("bmr-weight").value);

    const result = document.getElementById("bmr-result");
    const note = document.getElementById("bmr-note");

    if (!age || !height || !weight || age <= 0 || height <= 0 || weight <= 0) {
      result.textContent = "—";
      note.textContent = "Enter valid age, height, and weight values.";
      return;
    }

    let bmr = 0;

    if (sex === "male") {
      bmr = (10 * weight) + (6.25 * height) - (5 * age) + 5;
    } else {
      bmr = (10 * weight) + (6.25 * height) - (5 * age) - 161;
    }

    result.textContent = `${Math.round(bmr)} kcal/day`;
    note.textContent = "Estimated calories burned per day at complete rest.";
  });
});