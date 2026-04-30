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

  /*
  Translation:

  "If the button does NOT exist,
   stop the script immediately."

  Why this matters:

  You may use one shared JS file across multiple pages.

  Example:
  - index.html
  - me.html
  - projects.html
  - health.html

  Only health.html may have the BMR calculator.

  Without this check:
  JavaScript errors happen on every other page.
  */

  /*
  ====================================================
  STEP 4: Wait for user to click button
  ====================================================
  */

  bmrButton.addEventListener("click", () => {

    /*
    This means:

    "When the user clicks the Calculate button,
     run everything inside this function."
    */

    /*
    ====================================================
    STEP 5: Get User Input Values
    ====================================================
    */

    const sex = document.getElementById("bmr-sex").value;

    /*
    Gets selected value from dropdown

    Example:
    "male"
    or
    "female"
    */

    const age = Number(document.getElementById("bmr-age").value);

    /*
    Gets age input

    Example:
    User types: 25

    .value gives:
    "25" (string)

    Number() converts it to:
    25 (real number)

    VERY important for math.
    */

    const height = Number(document.getElementById("bmr-height").value);

    /*
    Gets height in centimeters

    Example:
    180 cm
    */

    const weight = Number(document.getElementById("bmr-weight").value);

    /*
    Gets weight in kilograms

    Example:
    85 kg
    */

    /*
    ====================================================
    STEP 6: Get Output Areas
    ====================================================
    */

    const result = document.getElementById("bmr-result");
    const note = document.getElementById("bmr-note");

    /*
    These are where results will be displayed.

    Example:

    result:
    "1850 kcal/day"

    note:
    "Estimated calories burned per day..."
    */

    /*
    ====================================================
    STEP 7: Validate Input
    ====================================================
    */

    if (
      !age ||
      !height ||
      !weight ||
      age <= 0 ||
      height <= 0 ||
      weight <= 0
    ) {

      /*
      This checks for bad input like:

      - empty fields
      - 0
      - negative numbers
      - invalid values

      Example bad input:
      Age = blank
      Weight = -50
      Height = 0
      */

      result.textContent = "—";

      /*
      Reset result display
      */

      note.textContent =
        "Enter valid age, height, and weight values.";

      /*
      Show helpful error message
      */

      return;

      /*
      VERY IMPORTANT:

      Stop the function here.

      Do NOT continue to BMR math.
      */
    }

    /*
    ====================================================
    STEP 8: Create BMR Variable
    ====================================================
    */

    let bmr = 0;

    /*
    We create an empty variable first.

    Later we fill it with the real answer.
    */

    /*
    ====================================================
    STEP 9: Calculate BMR
    ====================================================
    */

    if (sex === "male") {

      /*
      Male Formula:

      BMR =
      (10 × weight)
      + (6.25 × height)
      - (5 × age)
      + 5
      */

      bmr =
        (10 * weight) +
        (6.25 * height) -
        (5 * age) +
        5;

    } else {

      /*
      Female Formula:

      BMR =
      (10 × weight)
      + (6.25 × height)
      - (5 × age)
      - 161
      */

      bmr =
        (10 * weight) +
        (6.25 * height) -
        (5 * age) -
        161;
    }

    /*
    ====================================================
    STEP 10: Display Final Result
    ====================================================
    */

    result.textContent =
      `${Math.round(bmr)} kcal/day`;

    /*
    Math.round() removes decimals.

    Example:
    1847.6 → 1848

    Cleaner for users to read.
    */

    note.textContent =
      "Estimated calories burned per day at complete rest.";

    /*
    Final explanation shown below result
    */
  });
});

/*
====================================================
FINAL SUMMARY
====================================================

FLOW:

1. Page loads
2. Find button
3. Wait for click
4. Get user inputs
5. Validate inputs
6. Run formula
7. Show result

====================================================
*/
