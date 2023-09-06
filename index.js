var current_word = "hello world";
const guess_check = document.getElementById('guess_check');
const image = document.getElementById('img');
const start_over = document.getElementById('menu');
var blank_word = '';
var guess_left = current_word.length;
var won = false;
var lost = false;
var guesser_increm = 0;

function game(){
    while(true){

    }
}

function reset(){
    blank_word = "";
    guesser_increm = 0;
    won = false;
    lost = false;
    image.src= 'images/hang0.png'
    for(let x = 0; x<=current_word.length-1; x++){
        if(current_word[x] === ' '){
            blank_word += " ";
        }
        else{
            blank_word += '_';
        }
    }
    
    guess_check.innerHTML = blank_word;
    start_over.style.visibility = "hidden";
}

function wrong_guess(){
    guesser_increm += 1;
    switch(guesser_increm){
        case 1:
            image.src = 'images/hang1.png';
            break;
        case 2:
            image.src = 'images/hang2.png';
            break;
        case 3:
            image.src = 'images/hang3.png';
            break;
        case 4:
            image.src = 'images/hang4.png';
            break;
        case 5:
            image.src = 'images/hang5.png';
            break;
        case 6:
            image.src = 'images/hang6.png';
            lost = true;
            break;
        default:
            image.src = 'images/hang0.png';
            break; 
    }
}

for(let x = 0; x<=current_word.length-1; x++){
    if(current_word[x] === ' '){
        blank_word += " ";
    }
    else{
        blank_word += '_';
    }
}

guess_check.innerHTML = blank_word;


function replaceChar(origString, replaceChar, index) {
    let firstPart = origString.substr(0, index);

    let lastPart = origString.substr(index + 1);

    let newString =
        firstPart + replaceChar + lastPart;

    return newString;
}

function check(){
    let text_area = document.getElementById('input').value;
    console.log(text_area)
    if(text_area === current_word){
        guess_check.innerHTML = current_word;
        won = true;
    }
    if(text_area.length>1){
        wrong_guess()
    }
    if(text_area.length === 1){
        let found_word = false;
        for(let i = 0; i<current_word.length; i++){
            if(current_word[i] === text_area){
                found_word = true;
                //TODO REPLACE BLANK_WORD WITH CORRECT GUESS
                blank_word = replaceChar(blank_word, text_area, i)
            }
        }
        if(found_word === true){
            guess_check.innerHTML = blank_word;
            console.log('true')
        }
        if(found_word === false){
            wrong_guess()
        }
    }

    if (won || lost){
        //Ask to play again
        start_over.style.visibility = "visible";
    }

    //clear text area
    document.getElementById('input').value = "";
}

// Add an event listener to the document
document.addEventListener("keydown", function(event) {
    // Check the key code of the pressed key
    if (event.keyCode === 13) { // 13 represents the Enter key
      // Perform an action when the Enter key is pressed
      console.log("Enter key pressed!");
      check();
      //stop newline
      event.preventDefault();
    }
  });