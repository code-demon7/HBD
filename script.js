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

const micBtn = document.getElementById("mic-btn");

micBtn.addEventListener("click", async() => {
    try {
        // يطلع Allow microphone
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

        const audioContext = new AudioContext();
        const mic = audioContext.createMediaStreamSource(stream);
        const analyser = audioContext.createAnalyser();

        mic.connect(analyser);
        analyser.fftSize = 256;

        const dataArray = new Uint8Array(analyser.frequencyBinCount);

        function detectBlow() {
            analyser.getByteFrequencyData(dataArray);
            let volume = dataArray.reduce((a, b) => a + b) / dataArray.length;

            // لو نفخ
            if (volume > 60) {
                window.location.href = "wish.html";
            } else {
                requestAnimationFrame(detectBlow);
            }
        }

        detectBlow();

    } catch (err) {
        alert("شغلي الميك ينن عيني مش تشليني 😅");
    }
});