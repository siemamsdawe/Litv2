document.querySelector("#button").addEventListener('click', check);
document.querySelectorAll('.key').forEach( element => { 
    element.addEventListener('click', function(){
        keyboardAddLetter(element.getAttribute('data-value'))
        });
});
document.getElementById("enter").addEventListener('click', check);
document.getElementById("cancel").addEventListener('click', cancel);

var valueInput = document.getElementById("txt");

const words = ["ROWER", "RURKA", "MYSZA", "LAMPA", "KOTKI"];
let word = words[Math.floor(Math.random() * 5)];

const randomWordArray = word.split("");
const randomWordString = word;
var counter = 0;
var helpArray = [0, 0, 0, 0, 0];

console.log(word)

function keyboardAddLetter(letter)
{
    if(valueInput.value.length < 5) valueInput.value += letter;
}

function cancel()
{
    let canceledOneLastLetter = valueInput.value.substring(0,valueInput.value.length-1)
    valueInput.value = canceledOneLastLetter;
}

function colorKeyboard(value, color)
{
    document.querySelectorAll('.key').forEach(element => {
        if(element.getAttribute('data-value') == value) element.style.backgroundColor = color;
        else console.log("nie")
    })
}

function check() 
{
    if (valueInput.value.length == 5) 
    {
        var valueInputArray = valueInput.value.toUpperCase().split("");

        helpArray = [0, 0, 0, 0, 0];
        for (i = 0; i < 5; i++) 
        {
            if (valueInputArray[i] == randomWordArray[i])
            {
                helpArray[i] = 1;
                colorKeyboard(valueInputArray[i], "rgb(52, 116, 52)");
            } 
            else if (randomWordString.indexOf(valueInputArray[i]) > -1)
            {
                helpArray[i] = 2;
                colorKeyboard(valueInputArray[i], "rgb(171, 171, 23)");
            } 
            else
            {
                colorKeyboard(valueInputArray[i], "rgb(71, 72, 71)");
            }
        }

        console.log(helpArray);

        let contentGenerated = "";
        for (i = 0; i < 5; i++)
        {
            if (helpArray[i] == 1)contentGenerated += `<div class="block green">${valueInputArray[i]}</div>`;
            else if (helpArray[i] == 2)contentGenerated += `<div class="block yellow">${valueInputArray[i]}</div>`;
            else contentGenerated += `<div class="block gray"> ${valueInputArray[i]}</div>`;
        }
        contentGenerated += "<div style='clear: both'></div>";

        document.querySelector(("#output" + (++counter))).innerHTML = contentGenerated;

        checIfWin();
    }
}

function checIfWin() 
{
    let flag = 0;
    for (i = 0; i < 5; i++) 
    {
        if(helpArray[i] == 1) flag++;
    }
    if (flag == 5) 
    {
        alert("win")
        valueInput.style.display = "none";
    }
    else if (counter == 6) 
    {
        alert("poprawne słoto to: " + randomWordString)
        valueInput.style.display = "none";
    }
}

