// localStorage
const browserData = {
    "appName": navigator.appName,
    "appVersion": navigator.appVersion,
    "userAgent": navigator.userAgent,
    "platform": navigator.platform,
    "language": navigator.language
};
localStorage.setItem("browserInfo", JSON.stringify(browserData));

// Вивід у футер
const footer = document.getElementById("footer-info");
const info = JSON.parse(localStorage.getItem("browserInfo"));
footer.innerHTML = "<h3>Інформація про браузер:</h3>";
for (const [key, value] of Object.entries(info)) {
    const p = document.createElement("p");
    p.textContent = `${key}: ${value}`;
    footer.appendChild(p);
}

// Коментарі з API
fetch('https://jsonplaceholder.typicode.com/posts/22/comments')
    .then(res => res.json())
    .then(data => {
        const section = document.createElement("section");
        section.classList.add("comments-section");
        section.innerHTML = "<h2>Коментарі роботодавців</h2>";

        data.forEach(comment => {
            const commentDiv = document.createElement("div");
            commentDiv.className = "comment-card";
            commentDiv.innerHTML = `
                <h4>${comment.name}</h4>
                <p><em>${comment.email}</em></p>
                <p>${comment.body}</p>
            `;
            section.appendChild(commentDiv);
        });

        document.body.appendChild(section);
    });

// Модальне вікно
setTimeout(() => {
    document.getElementById("modal").classList.remove("hidden");
}, 60000);

document.getElementById("close-modal").onclick = () => {
    document.getElementById("modal").classList.add("hidden");
};

// Тема
function setTheme(theme) {
    document.body.classList.remove("day", "night");
    document.body.classList.add(theme);
}

function autoSetTheme() {
    const hour = new Date().getHours();
    const theme = (hour >= 7 && hour < 21) ? "day" : "night";
    setTheme(theme);
}

autoSetTheme();

document.getElementById("theme-toggle").onclick = () => {
    if (document.body.classList.contains("night")) {
        setTheme("day");
    } else {
        setTheme("night");
    }
};
