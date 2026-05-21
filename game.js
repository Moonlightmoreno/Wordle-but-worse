//words from https://gist.github.com/daemondevin/df09befaf533c380743bc2c378863f0c
let curRow = 1;
var date = new Date().getDate();
function start(){
    loadWord(Math.floor(Math.random() * 3104));
    const input = document.getElementById("inp");
    input.focus(    );
    document.addEventListener('keydown',function(event){
        if (event.key==='Enter' && document.getElementById("inp").value.length == 5){
            alert(word==document.getElementById("inp").value);

            let real = word.split('');
            let given = String(document.getElementById("inp").value).split('');
            alert(real); 
            alert(given);

            for (let i = 1; i <= given.length; i++){
                if (real[i-1]==given[i-1]){
                    document.getElementById(String.fromCharCode(96 + curRow) + i).parentNode.style.animation = "bggreen 2s ease-in-out forwards";
                }
                else if(word.includes(given[i-1])){
                    document.getElementById(String.fromCharCode(96 + curRow) + i).parentNode.style.animation = "bgyellow 0.5s ease-in-out forwards";
                }
            }

            curRow += 1;
            //alert(document.getElementById("inp").value);
            document.getElementById("inp").value = null;
        }
    });
}
function adjustFields(){
    let input = document.getElementById("inp").value.split('');
    for (let i  = 1; i<6; i++){
        document.getElementById(String.fromCharCode(96 + curRow) + i).textContent = input[i-1];
    }
}
async function loadWord(RandNum) {
    const res = await fetch('words.json');
    const data = await res.json();
    Object.defineProperty(window, 'ArrWord', {
        value: data.slice(0,3103),
        writable: false,
        configurable: false
    });
    //alert(grr[RandNum]);
    Object.defineProperty(window, 'word', {
        value: ArrWord[RandNum],
        writable: false,
        configurable: false
    });
}