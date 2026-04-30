/* This is the main js file for the landing and other main functions 
here we are starting off with a custom cursor that is styled with css 
and it behavior is modeled with javascript */

/*
====================================================
MAIN JAVASCRIPT FILE
====================================================

This file controls:

1. Custom cursor movement and hover effect
2. Landing / intro screen behavior
3. Matrix rain canvas animation
4. Session-based intro skip logic

====================================================
*/

document.addEventListener("DOMContentLoaded", () => {
  /*
  DOMContentLoaded means:

  "Wait until the HTML is loaded before running JS."

  This is important because we are grabbing elements
  from the page like:
  - .custom-cursor
  - #enter-site
  - #intro-screen
  - #matrix-bg

  If the HTML is not ready yet, those selectors may return null.
  */

  const cursor = document.querySelector(".custom-cursor");
  const enterButton = document.getElementById("enter-site");
  const introScreen = document.getElementById("intro-screen");
  const matrixCanvas = document.getElementById("matrix-bg");
  const currentPage = window.location.pathname.split("/").pop() || "index.html";

  /*
  Breakdown of variables:

  cursor
  -> grabs the custom cursor element from the page

  enterButton
  -> grabs the "Enter Site" button from the intro screen

  introScreen
  -> grabs the full-screen landing overlay

  matrixCanvas
  -> grabs the canvas used for the matrix rain effect

  currentPage
  -> figures out what page file the user is currently on

  Example:
  If URL is:
  https://mysite.com/me.html

  then:
  currentPage = "me.html"

  If the URL ends with just "/" then it defaults to:
  "index.html"
  */

  /* Custom cursor movement + hover growth */
  if (cursor) {
    /*
    Safety check:

    Only run custom cursor logic if the element actually exists.

    This prevents errors on pages that may not include:
    <div class="custom-cursor"></div>
    */

    document.addEventListener("mousemove", (e) => {
      /*
      Every time the mouse moves,
      update the custom cursor position.
      */

      cursor.style.left = e.clientX + "px";
      cursor.style.top = e.clientY + "px";

      /*
      e.clientX = mouse X position inside browser window
      e.clientY = mouse Y position inside browser window

      We apply those values directly to the custom cursor.
      */
    });

    document.querySelectorAll("a, button").forEach((item) => {
      /*
      Here we select all links and buttons on the page.

      For each one, we add hover behavior so the cursor grows
      when the user moves over something interactive.
      */

      item.addEventListener("mouseenter", () => {
        /*
        When user hovers over link or button,
        make cursor bigger.
        */
        cursor.style.width = "40px";
        cursor.style.height = "40px";
      });

      item.addEventListener("mouseleave", () => {
        /*
        When user leaves link or button,
        restore cursor to normal size.
        */
        cursor.style.width = "18px";
        cursor.style.height = "18px";
      });
    });
  }

  /* Next we are implementing a custom landing page to intrigue those who 
  decide to inspect the site */
  if (matrixCanvas) {
    /*
    If the matrix canvas exists,
    start the matrix rain animation.
    */
    initMatrixRain(matrixCanvas);
  }

  if (
    introScreen &&
    sessionStorage.getItem("visited") === "true" &&
    currentPage === "index.html"
  ) {
    /*
    This block says:

    If:
    - the intro screen exists
    - the user has already visited this session
    - and we are on index.html

    Then hide the intro screen immediately.

    Why use sessionStorage?

    sessionStorage only lasts for the current browser tab/session.
    So:
    - first visit = show intro
    - later revisit during same session = skip intro
    */
    introScreen.classList.add("hide");
  }

  if (enterButton && introScreen) {
    /*
    Another safety check:
    only attach click behavior if both the button
    and intro screen exist.
    */

    enterButton.addEventListener("click", () => {
      /*
      When the user clicks Enter Site:

      1. Save "visited" in sessionStorage
      2. Hide the intro screen
      */

      sessionStorage.setItem("visited", "true");
      introScreen.classList.add("hide");
    });
  }
});

/* falling matrix code animation */

/*
====================================================
MATRIX RAIN FUNCTION
====================================================

This function creates the falling digital rain effect
using the HTML canvas element.

====================================================
*/

function initMatrixRain(canvas) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  /*
  canvas.getContext("2d") gives us the 2D drawing context.

  This is what lets us:
  - draw text
  - fill rectangles
  - animate frames

  If the browser cannot create the context,
  stop the function immediately.
  */

  const chars = "01ABCDEFGHIJKLMNOPQRSTUVWXYZ#$%&@{}[]<>/=+*";
  const fontSize = 16;
  let columns = 0;
  let drops = [];
  let animationId = null;

  /*
  chars
  -> all possible characters used in the rain

  fontSize
  -> size of each character

  columns
  -> number of vertical columns that fit across screen

  drops
  -> array that tracks the vertical position of each column's drop

  animationId
  -> stores the requestAnimationFrame id so it can be canceled later
  */

  function resizeCanvas() {
    /*
    This function makes sure the canvas always matches
    the browser window size.
    */

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.width = "100vw";
    canvas.style.height = "100vh";

    /*
    width/height affect the real drawing surface
    style.width/style.height affect CSS display size

    Setting both keeps the canvas visually correct
    and prevents scaling blur issues.
    */

    columns = Math.floor(canvas.width / fontSize);

    /*
    Example:
    If width = 1600 and fontSize = 16
    then columns = 100
    */

    drops = Array.from(
      { length: columns },
      () => Math.floor(Math.random() * -100)
    );

    /*
    Create one drop position per column.

    Each drop starts at a random negative number so the rain
    does not begin in a perfectly flat line.

    Negative values mean many characters begin above
    the visible screen and fall into view naturally.
    */
  }

  function draw() {
    /*
    This function draws one animation frame.
    Then it schedules the next frame.
    */

    ctx.fillStyle = "rgba(5, 8, 5, 0.03)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    /*
    Instead of clearing the canvas fully with a solid color,
    we draw a very transparent dark rectangle over it.

    This creates the ghosting / trail effect.
    Older letters slowly fade away instead of disappearing instantly.
    */

    ctx.fillStyle = "#39ff14";
    ctx.font = `${fontSize}px monospace`;

    /*
    Set text color and font style for the rain characters.
    */

    for (let i = 0; i < drops.length; i++) {
      /*
      Loop through each column.
      Each column gets one character drawn per frame.
      */

      const char = chars[Math.floor(Math.random() * chars.length)];
      const x = i * fontSize;
      const y = drops[i] * fontSize;

      /*
      char
      -> random character from the chars string

      x
      -> horizontal position based on column number

      y
      -> vertical position based on drop progress
      */

      ctx.fillText(char, x, y);

      /*
      Draw the character at this column position.
      */

      if (y > canvas.height && Math.random() > 0.975) {
        /*
        If the drop is below the screen,
        sometimes reset it back to top.

        The random chance keeps the motion less uniform
        and more organic.
        */
        drops[i] = 0;
      } else {
        /*
        Otherwise keep moving the drop downward.
        */
        drops[i] += 0.08;
      }
    }

    animationId = requestAnimationFrame(draw);

    /*
    requestAnimationFrame tells the browser:

    "Run draw() again on the next animation frame."

    This is smoother and more efficient than setInterval
    for visual animation.
    */
  }

  resizeCanvas();
  draw();

  /*
  Start by:
  1. sizing the canvas correctly
  2. starting the animation loop
  */

  window.addEventListener("resize", resizeCanvas);

  /*
  If browser window changes size,
  resize the canvas again so the effect still fills the screen.
  */

  const introScreen = document.getElementById("intro-screen");
  if (introScreen) {
    introScreen.addEventListener("transitionend", () => {
      /*
      transitionend fires after the CSS hide transition finishes.

      This is smart because the animation keeps running while
      the screen is fading out, then stops once it is fully hidden.
      */

      if (introScreen.classList.contains("hide") && animationId) {
        cancelAnimationFrame(animationId);

        /*
        Stop the animation loop once the intro screen is hidden.

        This saves performance and avoids wasting resources
        on an animation the user cannot even see anymore.
        */
      }
    });
  }
}

/*
====================================================
FULL FLOW SUMMARY
====================================================

PAGE LOAD FLOW:

1. Wait for DOMContentLoaded
2. Grab important page elements
3. Start custom cursor behavior if cursor exists
4. Start matrix animation if canvas exists
5. Check sessionStorage to decide whether intro should show
6. If user clicks Enter Site, mark session as visited and hide intro

MATRIX FLOW:

1. Get canvas 2D context
2. Resize canvas to fit screen
3. Create drop positions for each column
4. Draw random characters every frame
5. Move drops downward
6. Reset drops randomly after they pass the bottom
7. Stop animation after intro screen finishes hiding
*/
