let stG = false;
function startBlock() {
    if (stG==false){
        document.getElementById("stGame").innerHTML = "No";
        document.getElementById("GameB").innerHTML = "Try again";
        stG = true;
    }else{
        window.location.href = "game.html";
    }
}
