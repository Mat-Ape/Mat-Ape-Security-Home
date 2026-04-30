/*
====================================================
BMR CALCULATOR SCRIPT
====================================================

BMR = Basal Metabolic Rate

This calculates how many calories your body burns
per day at COMPLETE REST.

Example:
Even if you stayed in bed all day, your body still
burns calories for:

- breathing
- heart function
- brain activity
- digestion
- temperature regulation

This uses the Mifflin-St Jeor Equation,
which is one of the most commonly used formulas.

====================================================
STEP 1: Wait for the page to fully load
====================================================
*/

document.addEventListener("DOMContentLoaded", () => {

 /*
  We wait for "DOMContentLoaded" so JavaScript does
  not try to grab HTML elements before they exist.

  Without this:
  JS may run too early and break.

  Example:
  If JS loads before the button exists,
  getElementById() returns null.
  */

  /*
  ====================================================
  STEP 2: Find the Calculate Button
  ====================================================
  */
  
  const bmrButton = document.getElementById("bmr-calc-btn");

   /*
  This grabs:

  <button id="bmr-calc-btn">

  and stores it in the variable:
  bmrButton
  */

  /*
  ====================================================
  STEP 3: Safety Check
  ====================================================
  */

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
