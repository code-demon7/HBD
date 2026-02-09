let audioContext;
let analyser;
let mic;
let dataArray;

function startMic() {  
    navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {     audioContext = new AudioContext();    
        analyser = audioContext.createAnalyser();    
        mic = audioContext.createMediaStreamSource(stream);    
        mic.connect(analyser);    
        analyser.fftSize = 256;    
        dataArray = new Uint8Array(analyser.frequencyBinCount);    
        listen();   });
}

function listen() {  
    analyser.getByteFrequencyData(dataArray);  
    let volume = dataArray.reduce((a, b) => a + b) / dataArray.length;  
    if (volume > 35) { // 👈 قوة النفخ
             blowOut();     return;   }  
    requestAnimationFrame(listen);
}

function blowOut() {  
    document.querySelectorAll('.flame').forEach(f => {     f.style.opacity = '0';    
        f.style.transform = 'scale(0)';   });  
    startCelebration();  
    setTimeout(() => {     window.location.href = "page3.html";   }, 1500);
}

function startCelebration() {  
    const container = document.body;  
    for (let i = 0; i < 15; i++) {     let el = document.createElement("span");    
        el.innerText = Math.random() > 0.5 ? "🎈" : "💖";    
        el.className = "celebration";    
        el.style.left = Math.random() * 100 + "vw";    
        el.style.animationDuration = (2 + Math.random() * 2) + "s";    
        container.appendChild(el);    
        setTimeout(() => el.remove(), 3000);   }
}
async function startMic() {  
    try {     const stream = await navigator.mediaDevices.getUserMedia({ audio: true });    
        console.log("الميك شغال ✅");   } catch (err) {     console.log("الميك مش شغال ❌", err);    
        alert("ادّي إذن المايك يا نجم");   }
}