/* ===== EDIT YOUR FIVE WEBSITES HERE =====
   For each one: change title, description, live (your GitHub Pages link),
   repo (your GitHub repository link) and tags. */
const projects = [
  { title: "Beauty Website",   desc: "A modern and elegant beauty website featuring stylish layouts, skincare-inspired visuals, and a polished user experience", live: "https://maryamarshad656.github.io/Beauty-Website/",   repo: "https://github.com/MaryamArshad656/Beauty-Website",   tags: ["HTML", "CSS", "JavaScript"] },
  { title: "Phone Website",   desc: "A modern smartphone showcase website featuring stylish product displays and a clean, user-friendly interface.", live: "https://maryamarshad656.github.io/Nova-Mobile-Website/",   repo: "https://github.com/MaryamArshad656/Nova-Mobile-Website",   tags: ["HTML", "CSS", "Bootstrap"] },
  { title: "Shoes Website", desc: "A stylish footwear website featuring modern shoe collections, attractive product displays, and a sleek shopping-inspired design.", live: "https://maryamarshad656.github.io/Luxe-Shoes-Website/", repo: "https://github.com/MaryamArshad656/Luxe-Shoes-Website", tags: ["HTML", "CSS", "JavaScript"] },
  { title: "Space Website",  desc: "A visually engaging space-themed website exploring the beauty of the universe through immersive design and cosmic visuals", live: "https://maryamarshad656.github.io/Space-Explorer/",  repo: "https://github.com/MaryamArshad656/Space-Explorer",  tags: ["HTML", "Bootstrap"] },
  { title: "Food Website",  desc: "A responsive restaurant website showcasing delicious food, bestsellers, special offers, and an elegant dining experience.", live: "https://maryamarshad656.github.io/Cravora-Food-Website/",  repo: "https://github.com/MaryamArshad656/Cravora-Food-Website",  tags: ["HTML", "CSS", "JavaScript"] }
];
const EMAIL = "maryamarshad.m28@gmail.com";
const $ = s => document.querySelector(s);

/* Projects */
const colors = [["#4F46E5","#06B6D4"],["#EC4899","#F59E0B"],["#10B981","#3B82F6"],["#8B5CF6","#EC4899"],["#F97316","#EF4444"]];
$("#projectGrid").innerHTML = projects.map((p, i) => `
  <article class="card project" style="--c1:${colors[i%5][0]};--c2:${colors[i%5][1]}">
    <div class="thumbwrap"><div class="thumb">${p.title.charAt(0)}</div></div>
    <div class="pbody">
      <h3>${p.title}</h3><p>${p.desc}</p>
      <div class="chips">${p.tags.map(t => `<i>${t}</i>`).join("")}</div>
      <div class="plinks">
        <a class="btn small primary" href="${p.live}" target="_blank" rel="noopener">View live site</a>
        <a class="btn small" href="${p.repo}" target="_blank" rel="noopener">Code</a>
      </div>
    </div>
  </article>`).join("");

/* Theme */
const root = document.documentElement, icon = $("#themeIcon");
const paint = () => icon.textContent = root.dataset.theme === "dark" ? "☀️" : "🌙";
paint();
$("#themeBtn").onclick = () => {
  root.dataset.theme = root.dataset.theme === "dark" ? "light" : "dark";
  try { localStorage.setItem("theme", root.dataset.theme); } catch (e) {}
  paint();
};

/* Mobile menu */
const menu = $("#menu"), burger = $("#burger");
burger.onclick = () => burger.setAttribute("aria-expanded", menu.classList.toggle("open"));
menu.addEventListener("click", e => { if (e.target.tagName === "A") { menu.classList.remove("open"); burger.setAttribute("aria-expanded", "false"); } });

/* Typing effect */
const words = ["responsive websites", "clean, semantic code", "ideas that work", "things with React soon"];
let w = 0, c = 0, del = false;
(function type() {
  const word = words[w];
  $("#typed").textContent = word.slice(0, c);
  if (!del && c === word.length) { del = true; return setTimeout(type, 1400); }
  if (del && c === 0) { del = false; w = (w + 1) % words.length; }
  c += del ? -1 : 1;
  setTimeout(type, del ? 35 : 80);
})();

/* Scroll reveal + active nav link */
const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: .12 });
document.querySelectorAll(".reveal").forEach(el => io.observe(el));
const links = [...document.querySelectorAll(".nav nav a")];
const spy = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) links.forEach(a => a.classList.toggle("active", a.getAttribute("href") === "#" + e.target.id));
}), { rootMargin: "-45% 0px -50% 0px" });
document.querySelectorAll("section[id]").forEach(s => spy.observe(s));

/* Cursor glow */
const glow = $(".glow");
addEventListener("pointermove", e => { glow.style.left = e.clientX + "px"; glow.style.top = e.clientY + "px"; });

/* Contact form: opens the visitor's email app with the message filled in */
$("#form").addEventListener("submit", e => {
  e.preventDefault();
  const f = [$("#fName"), $("#fEmail"), $("#fMsg")];
  f.forEach(i => i.classList.remove("bad"));
  const bad = f.filter(i => !i.value.trim() || (i.type === "email" && !/^\S+@\S+\.\S+$/.test(i.value)));
  bad.forEach(i => i.classList.add("bad"));
  const note = $("#formNote");
  if (bad.length) { note.textContent = "Please fill in every field with a valid email."; bad[0].focus(); return; }
  const body = `${f[2].value}\n\nFrom: ${f[0].value} (${f[1].value})`;
  location.href = `mailto:${EMAIL}?subject=${encodeURIComponent("Portfolio message from " + f[0].value)}&body=${encodeURIComponent(body)}`;
  note.textContent = "Opening your email app to send it…";
});
$("#copyMail").onclick = async () => {
  try { await navigator.clipboard.writeText(EMAIL); $("#formNote").textContent = "Email copied."; } catch (e) { $("#formNote").textContent = EMAIL; }
};
$("#year").textContent = new Date().getFullYear();
