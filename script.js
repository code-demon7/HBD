function unlock() {
    const password = document.getElementById("password").value;
    const card = document.getElementById("card");

    if (password === "8209") {
        card.style.animation = "pop 0.5s reverse";
        setTimeout(() => {
            window.location.href = "page2.html"; // الصفحة التانية
        }, 400);
    } else {
        card.classList.remove("shake");
        void card.offsetWidth;
        card.classList.add("shake");
    }
}