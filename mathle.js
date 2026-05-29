//words in english from https://www-cs-faculty.stanford.edu/~knuth/sgb-words.txt
//words in german from https://gist.githubusercontent.com/MarvinJWendt/2f4f4154b8ae218600eb091a5706b5f4/raw/36b70dd6be330aa61cd4d4cdfda6234dcb0b8784/wordlist-german.txt
//emojis for js https://unicode.org/emoji/charts/full-emoji-list.html#1f600
let curRow = 1;
let win = false;
var date = new Date().getDate();
async function start(){
    await loadMath();
    const input = document.getElementById("inp");
    input.focus(    );
    document.addEventListener('click',function(event){
        input.focus(    );
    });
    document.addEventListener('keydown',function(event){
        if (event.key==='Enter' && document.getElementById("inp").value.length == 8 && !win && calcWorks(document.getElementById("inp").value)){
            let real = (String(numb1) + String(operator) + String(numb2) + String(result)).split('');
            alert(real);
            let given = String(document.getElementById("inp").value).split('');
            alert(given);
            alert("precolor");

            for (let i = 1; i <= given.length; i++){
                if (real[i-1]==given[i-1]){
                    alert("pregreen");
                    document.getElementById(String.fromCharCode(96 + curRow) + i).parentNode.style.animation = "bggreen 2s ease-in-out forwards";
                    alert(given[i-1]);
                    document.getElementById(real[i-1]).parentNode.style.animation = "bggreen 2s ease-in-out forwards";
                    alert("green");
                }
                else if(real.includes(given[i-1])){
                    alert("preyellow");
                    document.getElementById(String.fromCharCode(96 + curRow) + i).parentNode.style.animation = "bgyellow 0.5s ease-in-out forwards";
                    alert(given[i-1]);
                    document.getElementById(given[i-1]).parentNode.style.animation = "bgyellow 0.5s ease-in-out forwards";
                    alert("yellow");
                }
                else{
                    alert("pregray");
                    document.getElementById(String.fromCharCode(96 + curRow) + i).parentNode.style.animation = "bggray 0.5s ease-in-out forwards";
                    alert(given[i-1]);
                    document.getElementById(given[i-1]).parentNode.style.animation = "bggray 0.5s ease-in-out forwards";
                    alert("gray");
                }
            }
            alert("pretrue");
            if (calctrue(document.getElementById("inp").value)){
                win = true;
                document.getElementById("overnew").style.display = "block";
                document.getElementById("New Game").textContent = "You win! The Equation was " + String(numb1) + String(operator) + String(numb2) + " = " + String(result) + " " + String.fromCodePoint(0x1F973);
            }
            curRow += 1;
            alert(curRow);
            if (curRow == 6 && !win){
                win = true;
                document.getElementById("overnew").style.display = "block";
                document.getElementById("New Game").textContent = "You lose! The Equation was " + String(numb1) + String(operator) + String(numb2) + " = " + String(result) + " " + String.fromCodePoint(0x1F614);
            }
            document.getElementById("inp").value = null;
        } else if (event.key==='Enter' && document.getElementById("inp").value.length == 8 && !win && !calcWorks(document.getElementById("inp").value)){
            const dist = document.getElementById("overtext");
            dist.classList.remove('invalidanimation');
            
            setTimeout(function(){
                document.getElementById("Wrong Word").textContent = "Not a valid Equation " + String.fromCodePoint(0x1F914);
                dist.classList.add('invalidanimation');
            },10);
            document.getElementById("Wrong Word").textContent = ""; // DO NOT CHANGE OR THE OVERLAY WILL BUG OUT
        }
    });
}
function adjustFields(){
    let input = document.getElementById("inp").value.split('');
    for (let i  = 1; i<=8; i++){
        document.getElementById(String.fromCharCode(96 + curRow) + i).textContent = input[i-1];
    }
}
async function loadMath() {
    let result;
    let numb1;
    let numb2;
    let operator;
    switch (Math.floor(Math.random() * 4)){
        case 0:
            while (!(-1<result && result<1000 && result === Math.round(result))){
                numb1 = Math.floor(Math.random() * 1000);
                numb2 = Math.floor(Math.random() * 1000);
                result = numb1 + numb2;
                operator = "+";
            }
        case 1:
            while (!(-1<result && result<1000 && result === Math.round(result))){
                numb1 = Math.floor(Math.random() * 1000);
                numb2 = Math.floor(Math.random() * 1000);
                result = numb1 - numb2;
                operator = "-";
            }
        case 2:
            while (!(-1<result && result<1000 && result === Math.round(result))){
                numb1 = Math.floor(Math.random() * 100);
                numb2 = Math.floor(Math.random() * 10);
                result = numb1 * numb2;
                operator = "*";
            }
        case 3:
            while (!(-1<result && result<1000 && result === Math.round(result))){
                numb1 = Math.floor(Math.random() * 1000);
                numb2 = Math.floor(Math.random() * 10) + 1;
                result = numb1 / numb2;
                operator = "/";
            }
    }
    Object.defineProperty(window, 'numb1', {
        value: numb1,
        writable: false,
        configurable: false
    });
    Object.defineProperty(window, 'numb2', {
        value: numb2,
        writable: false,
        configurable: false
    });
    Object.defineProperty(window, 'result', {
        value: result,
        writable: false,
        configurable: false
    });
    Object.defineProperty(window, 'operator', {
        value: operator,
        writable: false,
        configurable: false
    });
}
function kbclick(grr){
    const txt = grr.childNodes[0].textContent;
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
function calcWorks(given){
    let n1;
    let n2;
    let op = -1;
    let res;
    given = given.split('');
    for (let i = 0; i < given.length; i++){
        if (given[i] == "+" || given[i] == "-" || given[i] == "*" || given[i] == "/"){
            op = given[i];
            n1 = parseInt(given.slice(0,i).join(''));
            n2 = parseInt(given.slice(i+1,given.length-3).join(''));
            res = parseInt(given.slice(given.length-3,given.length).join(''));
            alert(n1 + " " + op + " " + n2 + " = " + res);
        }
    }
    if (op === -1) {
        return false;
    }
    switch (op){
        case "+":
            alert(n1 + n2 == res);
            return n1 + n2 == res;
        case "-":
            alert(n1 - n2 == res);
            return n1 - n2 == res;
        case "*":
            alert(n1 * n2 == res);
            return n1 * n2 == res;
        case "/":
            alert(n1 / n2 == res);
            return n1 / n2 == res;
    }
}

function calctrue(given){
    let real = String(numb1) + String(operator) + String(numb2) + " = " + String(result);
    given = given.split('');
    for (let i = 0; i < given.length; i++){
        if (given[i] != real[i]){
            return false;
        }
    }
    return true;
}