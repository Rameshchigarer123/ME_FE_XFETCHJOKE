const API_URL = "https://official-joke-api.appspot.com/random_joke";
const btn = document.getElementById("fetch-btn");
const jokeEl = document.getElementById("joke");
const errorEl = document.getElementById("error");

btn.addEventListener("click", async () => {
  btn.disabled = true;
  btn.textContent = "Fetching...";
  errorEl.textContent = "";
  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error("Request failed");
    const data = await res.json();
    jokeEl.innerHTML = `<p>${data.setup}</p><p>${data.punchline}</p>`;
  } catch (e) {
    jokeEl.innerHTML = "";
    errorEl.textContent = "Error fetching joke. Please try again.";
  } finally {
    btn.disabled = false;
    btn.textContent = "Fetch Joke";
  }
});