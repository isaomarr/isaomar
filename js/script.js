const status = document.getElementById("status");
const title = document.getElementById("title");

setInterval(() => {
    status.style.opacity = status.style.opacity === "0.3" ? "1" : "0.3";
}, 800);

title.addEventListener("mouseenter", () => {
    title.style.color = "#38bdf8";
});

title.addEventListener("mouseleave", () => {
    title.style.color = "white";
});

function updateDate() {
    const dateElement = document.getElementById("date");
    const now = new Date();

    const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
    };

    dateElement.textContent = now.toLocaleDateString("en-US", options);
}

// ilk load
updateDate();

// hər gün yenilə
setInterval(updateDate, 1000 * 60 * 60);

function updateDateTime() {
    const el = document.getElementById("date");
    const now = new Date();

    el.textContent = now.toLocaleString();
}

setInterval(updateDateTime, 1000);