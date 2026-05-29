function start(){
    loadParticles();
}
function Wordlebtn() {
    document.getElementById("title").innerHTML = "Select Game Mode";
    document.getElementById("WordleBtn").innerHTML = "Wordle";
    document.getElementById("WordleGerBtn").style.visibility = "visible";
    document.getElementById("MathleBtn").style.visibility = "visible";
    document.getElementById("WordleBtn").addEventListener("click", function(event) {
        window.location.href = "game.html?language=english";
    });
}
function WordleGerbtn() {
    window.location.href = "game.html?language=german";
}
function Mathlebtn() {
    window.location.href = "mathle.html";
}
function loadParticles(){
    particlesJS.load('particles-js', 'particles.json', function() {
        console.log('callback - particles.js config loaded');
    });
}