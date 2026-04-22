/* This is the main js file for the landing and other main functions 
here we are starting off with a custom cursor that is styled with css 
and it behavior is modeled with javascript */

document.addEventListener("DOMContentLoaded", () => {
  const cursor = document.querySelector(".custom-cursor");
  const enterButton = document.getElementById("enter-site");
  const introScreen = document.getElementById("intro-screen");
  const matrixCanvas = document.getElementById("matrix-bg");
  const currentPage = window.location.pathname.split("/").pop() || "index.html";

  /* Custom cursor movement + hover growth */
  if (cursor) {
    document.addEventListener("mousemove", (e) => {
      cursor.style.left = e.clientX + "px";
      cursor.style.top = e.clientY + "px";
    });

    document.querySelectorAll("a, button").forEach((item) => {
      item.addEventListener("mouseenter", () => {
        cursor.style.width = "40px";
        cursor.style.height = "40px";
      });

      item.addEventListener("mouseleave", () => {
        cursor.style.width = "18px";
        cursor.style.height = "18px";
      });
    });
  }

  /* Next we are implementing a custom landing page to intrigue those who 
  decide to inspect the site */
  if (matrixCanvas) {
    initMatrixRain(matrixCanvas);
  }

  if (
    introScreen &&
    sessionStorage.getItem("visited") === "true" &&
    currentPage === "index.html"
  ) {
    introScreen.classList.add("hide");
  }

  if (enterButton && introScreen) {
    enterButton.addEventListener("click", () => {
      sessionStorage.setItem("visited", "true");
      introScreen.classList.add("hide");
    });
  }
});

/* falling matrix code animation */

function initMatrixRain(canvas) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const chars = "01ABCDEFGHIJKLMNOPQRSTUVWXYZ#$%&@{}[]<>/=+*";
  const fontSize = 16;
  let columns = 0;
  let drops = [];
  let animationId = null;

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.width = "100vw";
    canvas.style.height = "100vh";

    columns = Math.floor(canvas.width / fontSize);
    drops = Array.from(
      { length: columns },
      () => Math.floor(Math.random() * -100)
    );
  }

  function draw() {
    ctx.fillStyle = "rgba(5, 8, 5, 0.03)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#39ff14";
    ctx.font = `${fontSize}px monospace`;

    for (let i = 0; i < drops.length; i++) {
      const char = chars[Math.floor(Math.random() * chars.length)];
      const x = i * fontSize;
      const y = drops[i] * fontSize;

      ctx.fillText(char, x, y);

      if (y > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      } else {
        drops[i] += 0.08;
      }
    }

    animationId = requestAnimationFrame(draw);
  }

  resizeCanvas();
  draw();

  window.addEventListener("resize", resizeCanvas);

  const introScreen = document.getElementById("intro-screen");
  if (introScreen) {
    introScreen.addEventListener("transitionend", () => {
      if (introScreen.classList.contains("hide") && animationId) {
        cancelAnimationFrame(animationId);
      }
    });
  }
}