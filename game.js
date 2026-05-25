//words in english from https://www-cs-faculty.stanford.edu/~knuth/sgb-words.txt
//words in german from https://gist.githubusercontent.com/MarvinJWendt/2f4f4154b8ae218600eb091a5706b5f4/raw/36b70dd6be330aa61cd4d4cdfda6234dcb0b8784/wordlist-german.txt
//emojis for js https://unicode.org/emoji/charts/full-emoji-list.html#1f600
let curRow = 1;
let win = false;
var date = new Date().getDate();
function start(){
    loadWord();
    const input = document.getElementById("inp");
    input.focus(    );
    document.addEventListener('click',function(event){
        input.focus(    );
    });
    document.addEventListener('keydown',function(event){
        if (event.key==='Enter' && document.getElementById("inp").value.length == 5 && !win && ArrWord.includes(document.getElementById("inp").value.toLowerCase())){
            //alert(word==document.getElementById("inp").value);

            let real = word.split('');
            let given = String(document.getElementById("inp").value.toLowerCase()).split('');
            //alert(real); 
            //alert(given);

            for (let i = 1; i <= given.length; i++){
                if (real[i-1]==given[i-1]){
                    document.getElementById(String.fromCharCode(96 + curRow) + i).parentNode.style.animation = "bggreen 2s ease-in-out forwards";
                    document.getElementById(real[i-1]).parentNode.style.animation = "bggreen 2s ease-in-out forwards";
                }
                else if(word.includes(given[i-1])){
                    document.getElementById(String.fromCharCode(96 + curRow) + i).parentNode.style.animation = "bgyellow 0.5s ease-in-out forwards";
                    document.getElementById(given[i-1]).parentNode.style.animation = "bgyellow 0.5s ease-in-out forwards";
                }
                else{
                    document.getElementById(String.fromCharCode(96 + curRow) + i).parentNode.style.animation = "bggray 0.5s ease-in-out forwards";
                    document.getElementById(given[i-1]).parentNode.style.animation = "bggray 0.5s ease-in-out forwards";
                }
            }

            if (word==document.getElementById("inp").value.toLowerCase()){
                win = true;
                document.getElementById("overnew").style.display = "block";
                document.getElementById("New Game").textContent = "You win! The word was " + word + " " + String.fromCodePoint(0x1F973);
                /*if (confirm("You win! The word was " + word + " " + String.fromCodePoint(0x1F973) + "\nDo you want to play again?")) {
                    txt = "You pressed OK!";
                    location.reload();
                }*/
            }
            curRow += 1;
            if (curRow == 7){
                win = true;
                document.getElementById("overnew").style.display = "block";
                document.getElementById("New Game").textContent = "You lose! The word was " + word + " " + String.fromCodePoint(0x1F614);
                /*setTimeout(() => {
                    win = true;
                    if (confirm("You lose! The word was " + word + " " + String.fromCodePoint(0x1F614) + "\nDo you want to play again?")) {
                        location.reload();
                    }
                }, 1000);*/
            }
            //alert(document.getElementById("inp").value);
            document.getElementById("inp").value = null;
        } else if (event.key==='Enter' && document.getElementById("inp").value.length == 5 && !ArrWord.includes(document.getElementById("inp").value.toLowerCase())){
            const dist = document.getElementById("overtext");
            dist.classList.remove('invalidanimation');
            
            setTimeout(function(){
                document.getElementById("Wrong Word").textContent = "Not a valid word " + String.fromCodePoint(0x1F914);
                dist.classList.add('invalidanimation');
            },10);
            document.getElementById("Wrong Word").textContent = ""; // DO NOT CHANGE OR THE OVERLAY WILL BUG OUT
        }
    });
}
function adjustFields(){
    let input = document.getElementById("inp").value.toLowerCase().split('');
    for (let i  = 1; i<6; i++){
        document.getElementById(String.fromCharCode(96 + curRow) + i).textContent = input[i-1];
    }
}
async function loadWord() {
    const params = new URLSearchParams(window.location.search);
    const language = params.get('language'); 
    let data;
    let lendata;
    if (language === 'german') {
        const res = await fetch('words_german.json');
        data = await res.json();
        lendata = 4539;
    } 
    if (language === 'english') {
        const res = await fetch('words.json');
        data = await res.json();
        lendata = 5708;
    }
    Object.defineProperty(window, 'ArrWord', {
        value: data.slice(0,lendata),
        writable: false,
        configurable: false
    });
    //alert(grr[RandNum]);
    Object.defineProperty(window, 'word', {
        value: ArrWord[Math.floor(Math.random() * lendata)],
        writable: false,
        configurable: false
    });
}
function kbclick(grr){
    const txt = grr.childNodes[0].textContent.toLowerCase();
    if (txt !== "enter" && txt !== "backspace"){
        document.getElementById("inp").value += txt;
        adjustFields();
    }else if (txt === "enter"){
        const event = new KeyboardEvent('keydown', {'key': 'Enter'});
        document.dispatchEvent(event);
    }else if (txt === "backspace"){
        const event = new KeyboardEvent('keydown', {'key': 'Backspace'});
        document.getElementById("inp").value = document.getElementById("inp").value.slice(0, -1);
        adjustFields();
    }
    const input = document.getElementById("inp");
    input.focus(    );
}