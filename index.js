var current_word = "hello world";
const guess_check = document.getElementById('guess_check');
const image = document.getElementById('img');
const start_over = document.getElementById('menu');
const used_words = document.getElementById('used_words');
const enter = document.getElementById('enter');
var blank_word = '';
var guess_left = current_word.length;
var won = false;
var lost = false;
var guesser_increm = 0;
var guessed_words = [];

function new_word(){
    fetch('https://gist.githubusercontent.com/cjhveal/3753018/raw/287f964268afbd6dad7b8e6bd7860e4538c1a80a/gistfile1.txt')
    .then(response => response.text())
    .then(data => {
      // Process the contents of the text file
      const words = data.split('\n');
      const randomIndex = Math.floor(Math.random() * words.length);
      const randomWord = words[randomIndex];
      console.log(randomWord);
      current_word = randomWord;
      //setup guess check
      for(let x = 0; x<=current_word.length-1; x++){
          if(current_word[x] === ' '){
              blank_word += " ";
          }
          else{
              blank_word += '_';
          }
      }
  
      guess_check.innerHTML = blank_word;
    })
    .catch(error => {
      // Handle any errors
      console.error('Error:', error);
    });
}

new_word();

function reset(){
    new_word();
    used_words.innerHTML = "used words: ";
    guessed_words = [];
    blank_word = "";
    guesser_increm = 0;
    won = false;
    lost = false;
    image.src= 'images/hang0.png'
    
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
        let word_used = false;
        for(let k = 0; k < guessed_words.length; k++){
            if(text_area === guessed_words[k]){
                console.log('already used word');
                word_used = true;
                break;
            }
        }
        if (word_used === false){
            let found_word = false;
            for(let i = 0; i<current_word.length; i++){
                if(current_word[i] === text_area){
                    found_word = true;            
                    blank_word = replaceChar(blank_word, text_area, i);
                }
            }
            if(found_word === true){
                guess_check.innerHTML = blank_word;
                console.log('found a word');
                guessed_words.push(text_area);
                if(guess_check.innerHTML.trim() === current_word){
                    won = true;
                }
            }
            if(found_word === false){
                wrong_guess();
                guessed_words.push(text_area);
            }
        }
    }

    if (won || lost){
        //Ask to play again
        start_over.style.visibility = "visible";
        text_area.disabled = true;
        enter.disabled = true;
    }

    //clear text area
    document.getElementById('input').value = "";
    //display used words
    used_words.innerHTML = "used words: ";
    for(let i = 0; i<guessed_words.length; i++){
        if(i === 0){
            used_words.innerHTML += guessed_words[i];
        }else{
            used_words.innerHTML += ", " + guessed_words[i];
        }
    }
    
}

// Add an event listener to the document
document.addEventListener("keydown", function(event) {
    // Check the key code of the pressed key
    if (event.keyCode === 13) { // 13 represents the Enter key
      // Perform an action when the Enter key is pressed
      console.log("Enter key pressed!");
      if(!won && !lost){
        check();
      }
      //stop newline
      event.preventDefault();
    }
  });