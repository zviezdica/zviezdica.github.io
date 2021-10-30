//**************ŠIJAVICA HOMEPAGE**************
const playerNameInput = document.querySelector(".player-name")
const arrowBackAvatars = document.querySelector(".arrow-back-avatars");
const selectAvatarDiv = document.querySelector(".select-avatar-div");
const chooseAvatarBtn = document.querySelector(".avatar-btn");
const avatarContainers = document.querySelectorAll(".avatar-container");
const playBtns = document.querySelectorAll(".play-btn");
const yesMusicBtn = document.querySelector(".answer-yes");
const noMusicBtn = document.querySelector(".answer-no");
const audio = document.querySelector("audio");
const soundIcon = document.querySelector(".sound-icon");
const musicChoiceDiv = document.querySelector(".music-choice");
const instructionsBtn = document.querySelector(".instructions-btn");
const instructionsDiv = document.querySelector(".instructions-div");
const nextBtn = document.querySelector(".next-btn");
const gotItBtn = document.querySelector(".got-it-btn");
const arrowBackInstructions = document.querySelector(".arrow-back-div-instructions");

//if šijavica homepage
if (chooseAvatarBtn){

//background music
//event: yes music
yesMusicBtn.addEventListener("click", ()=>{
    audio.play();
    soundIcon.setAttribute("src", "./slike/other/sound-on.png");
    musicChoiceDiv.classList.add("music-choice-hidden");
    //localStorage.setItem("music", "on");
    })
//event: no music
noMusicBtn.addEventListener("click", ()=>{
    soundIcon.setAttribute("src", "./slike/other/sound-off.png");
    musicChoiceDiv.classList.add("music-choice-hidden");
    //localStorage.setItem("music", "off");
    })

//event: sound-icon
soundIcon.addEventListener("click", ()=>{
    let currentMusicState = soundIcon.getAttribute("src");
    //from pause to play
    if (currentMusicState ==="./slike/other/sound-off.png"){
        let newMusicState = "./slike/other/sound-on.png";
        soundIcon.setAttribute("src", newMusicState);
        audio.play();
    }
    //from play to pause
    else{
        let newMusicState = "./slike/other/sound-off.png";
        soundIcon.setAttribute("src", newMusicState);
        audio.pause();
    }
})

//event: show music question
window.addEventListener("DOMContentLoaded", () =>{
    setTimeout(()=>{
        musicChoiceDiv.classList.remove("music-choice-hidden");
    },500)
})

//event: player name
playBtns.forEach((playBtn) =>{
    playBtn.addEventListener("click", ()=>{
        let playerName = playerNameInput.value;
        //for using player name in šijavica game
        localStorage.setItem("playerName", playerName);
    })
})                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
//INSTRUCTIONS
//event:instructions-btn
instructionsBtn.addEventListener("click", () => {
    instructionsDiv.classList.remove("menu-option-div-hidden");
})

//functions:next-btn
const currentParagraphIdF = () =>{
    let paragraphs = document.querySelectorAll(".instructions-text");
    let paragraphsArr = [...paragraphs];
    let currentParagraph = paragraphsArr.filter(paragraph =>!paragraph.classList.contains("p-hidden"));
    let currentParagraphIdNum = currentParagraph[0].getAttribute("id").replace("p","");
    paragraphsArr.forEach((paragraph)=>{
        paragraph.classList.add("p-hidden");
    })
    return currentParagraphIdNum;
}
const nextParagraph = (currentParagraphIdNum) => {
    let nextParagraphIdNum = parseInt(currentParagraphIdNum)+1;
    let nextParagraphId = "p"+ nextParagraphIdNum;
    let nextParagraph = document.getElementById(nextParagraphId);
    nextParagraph.classList.remove("p-hidden");
    }

const goToNextParagraph = () => {
    let currentParagraphIdNum = currentParagraphIdF();
    nextParagraph(currentParagraphIdNum);
    //if 1. paragraph
    if (currentParagraphIdNum==1){
        if (!arrowBackInstructions.classList.contains("arrow-back-div-instructions-hidden")){
            arrowBackInstructions.classList.add("arrow-back-div-instructions-hidden");
        }
    }
    //if 2.-3. paragraph
    if (1<currentParagraphIdNum<4){
        if (arrowBackInstructions.classList.contains("arrow-back-div-instructions-hidden")){
            arrowBackInstructions.classList.remove("arrow-back-div-instructions-hidden");
        }
        else if (currentParagraphIdNum==3){
            nextBtn.classList.add("next-btn-hidden");
            gotItBtn.classList.remove("got-it-btn-hidden");
        }
    }
}
//event:next-btn
nextBtn.addEventListener("click", goToNextParagraph);

//functions:arrow back in instructions
const previousParagraphF = (currentParagraphIdNum) =>{
    let previousParagraphIdNum = parseInt(currentParagraphIdNum)-1;
    let previousParagraphId = "p"+previousParagraphIdNum;
    let previousParagraph = document.getElementById(previousParagraphId);
    previousParagraph.classList.remove("p-hidden");
    return previousParagraphIdNum;
}

const goToPreviousParagraph = () =>{
    let currentParagraphIdNum = currentParagraphIdF();
    let previousParagraphIdNum = previousParagraphF(currentParagraphIdNum);

    if (!gotItBtn.classList.contains("got-it-btn-hidden")){
    gotItBtn.classList.add("got-it-btn-hidden");
    }  
    if (nextBtn.classList.contains("next-btn-hidden")){
        nextBtn.classList.remove("next-btn-hidden");
    } 
    if (previousParagraphIdNum == 1){
            arrowBackInstructions.classList.add("arrow-back-div-instructions-hidden");  
    }  
}
//event: arrow-back in instructions
arrowBackInstructions.addEventListener("click", goToPreviousParagraph);

//functions:got it button
const closeInstructions = () =>{
    //for switching to first paragraph for future click on instructions
    let paragraphs = document.querySelectorAll(".instructions-text");
    let paragraphsArr = [...paragraphs];
    let currentParagraph = paragraphsArr[0];
    paragraphsArr.forEach((paragraph)=>{
        paragraph.classList.add("p-hidden");
    })
    currentParagraph.classList.remove("p-hidden");
    if (!arrowBackInstructions.classList.contains("arrow-back-div-instructions-hidden")){
        arrowBackInstructions.classList.add("arrow-back-div-instructions-hidden");
    }
    if (!gotItBtn.classList.contains("got-it-btn-hidden")){
        gotItBtn.classList.add("got-it-btn-hidden");
        }  
    if (nextBtn.classList.contains("next-btn-hidden")){
        nextBtn.classList.remove("next-btn-hidden");
    }
    //for closing instructions
    instructionsDiv.classList.add("menu-option-div-hidden");
}

//event:got it button
gotItBtn.addEventListener("click", closeInstructions);

//AVATARS
//functions:choose your avatar
const goToAvatars = () =>{
    selectAvatarDiv.classList.remove("menu-option-div-hidden");
}
//event:choose your avatar
chooseAvatarBtn.addEventListener("click", goToAvatars);

//event:chosen avatar
avatarContainers.forEach((avatarContainer) =>{
    avatarContainer.addEventListener("click", () =>{
        //if some avatar is already selected, cancel it
        avatarContainers.forEach((previuslySelectedAvatar) => {
            if (previuslySelectedAvatar.classList.contains("avatar-container-clicked")){
                previuslySelectedAvatar.classList.remove("avatar-container-clicked");
                selectedAvatarImgSrc="";
            }
        })
        //for newly chosen avatar
        avatarContainer.classList.add("avatar-container-clicked");
        let avatarId = avatarContainer.querySelector(".avatar-img").getAttribute("id");
        //for using avatar in šijavica game
        selectedAvatarImgSrc = "../sijavica-homepage/slike/slike avatars/" + avatarId + ".png";
        localStorage.setItem("selectedAvatarImgSrc", selectedAvatarImgSrc);
    });
})

//function: back to menu from avatars
const goBackFromAvatars = () =>{
    selectAvatarDiv.classList.add("menu-option-div-hidden");  
}

//event: back to menu from avatars
arrowBackAvatars.addEventListener("click", goBackFromAvatars);


/*window.addEventListener("DOMContentLoaded", () =>{
    let musicOption = localStorage.getItem("music");
    console.log(musicOption);
    if (!musicOption){
        return;
    }
    else{console.log(localStorage.getItem("music"));
        if(localStorage.getItem("music")=="on"){
            audio.play();
            soundIcon.setAttribute("src", "./slike/other/sound-on.png");
            musicChoiceDiv.classList.add("music-choice-hidden");
        }
        if(localStorage.getItem("music")=="off"){
            soundIcon.setAttribute("src", "./slike/other/sound-off.png");
            musicChoiceDiv.classList.add("music-choice-hidden");
        }
    }
    
})
window.addEventListener("unload", () =>{
    localStorage.clear();
})*/
}

//**************ŠIJAVICA GAME**************
const playerFingersNum = document.querySelector(".player-fingers-number");
const playerGuessSum = document.querySelector(".player-guess-sum");
const computerFingersNum = document.querySelector(".computer-fingers-number");
const computerGuessSum = document.querySelector(".computer-guess-sum");
const playerFingersImg = document.querySelector(".player-fingers-img");
const computerFingersImg = document.querySelector(".computer-fingers-img");
const playerResultDiv = document.querySelector(".player-result");
const computerResultDiv = document.querySelector(".computer-result");
let playerResult = 9;
let computerResult = 0;

//if šijavica game page
if(playerFingersNum){
playerGuessSum.disabled = true;
computerFingersNum.disabled = true;
computerGuessSum.disabled = true;

//function: get player name and chosen avatar from šijavica homepage
const showPlayerInfo = () =>{
    let selectedAvatarImgSrc = localStorage.getItem("selectedAvatarImgSrc");
    const playerAvatarGameImg = document.querySelector(".player-avatar-game-img");
    playerAvatarGameImg.setAttribute("src", selectedAvatarImgSrc);
    let playerName = localStorage.getItem("playerName");
    let playerNamePlaceholder = document.querySelector(".player-name");
    playerNamePlaceholder.innerText = playerName;
    //if player doesn't add player name
    if (!playerName || playerName.trim()===""){
        playerNamePlaceholder.innerText="Incognito";
    }
}

//event: get player name and chosen avatar
window.addEventListener("DOMContentLoaded", showPlayerInfo);

//GAME AREA
//function: set strict numbers range for thrown fingers and show fingers img
const strictRangeNum = (e) =>{
    let target = e.target;
    let min = 1;
    let max = 5;
    //if pressed 2 or more numbers
    if (target.value.length>=2){
        let pressed = target.value;
        target.value = pressed.slice(0,1);
        playerGuessSum.value = pressed.slice(1,2);
        console.log(playerGuessSum.value);
    }
    //if fingers<min or max<fingers
    target.value>max ? target.value = max : target.value;
    target.value<min ? target.value = min : target.value;
    playerFingersNum.disabled = true;
    //show appropriate img
    playerFingersImg.setAttribute("src", `./slike/slike_prsti/${playerFingersNum.value}.png`);
}

//events: playerFingersNum
playerFingersNum.addEventListener("keyup", strictRangeNum);
playerFingersNum.addEventListener("keyup", () =>{
    playerGuessSum.disabled = false;
    playerGuessSum.focus();
});

//function: set strict numbers range for guessing sum of fingers
const strictRangeSum = (e) =>{
    playerGuessSum.disabled = true;
    let target = e.target;
    let min = 2;
    let max = 10;
    //if press 0 get 10
    target.value==0 ? target.value = 10 : target.value;
    //if guessSum > fingersNum + 5
    parseInt(target.value)>parseInt(playerFingersNum.value)+5 ? target.value = parseInt(playerFingersNum.value)+5 : target.value;
    //if guessSum <= fingersNum
    parseInt(target.value)<=parseInt(playerFingersNum.value)? target.value = parseInt(playerFingersNum.value)+1 : target.value; 
    //if guessSum<min or max<guessSum
    target.value>max ? target.value = max : target.value;
    target.value<min ? target.value = min : target.value;
}

//function: random computer's number of fingers, guessSum and show fingers img
const computerTurn = () =>{
    computerFingersNum.value = Math.ceil(Math.random()*5);
    computerGuessSum.value = parseInt(computerFingersNum.value) + Math.ceil(Math.random()*5);

    //show appropriate img
    computerFingersImg.setAttribute("src", `./slike/slike_prsti/${computerFingersNum.value}.png`);
}

//function: calculate sum of fingers and show result
const getResult = () =>{
    let playerNum = parseInt(playerFingersNum.value);
    let computerNum = parseInt(computerFingersNum.value);
    let playerGuess = parseInt(playerGuessSum.value);
    let computerGuess = parseInt(computerGuessSum.value);
    let sum = playerNum + computerNum;
    if(playerGuess===sum && computerGuess===sum){
        return;
    }
    if (playerGuess===sum){
        playerResult+=1;
        playerResultDiv.innerHTML = playerResult;
    }
    if (computerGuess===sum){
        computerResult+=1;
        computerResultDiv.innerHTML = computerResult;
    }
    
    const resultMessageDiv = document.querySelector(".hidden-div");
    const resultMessage = document.querySelector(".result-message");

    //if player won
    if (playerResult==10){
        resultMessageDiv.classList.add("victory");
        resultMessage.innerText = "You won!"
        //animations
        const fireWorksImg = document.querySelector(".fireworks-img");
        fireWorksImg.classList.add("fireworks-img-animate");

        const prosciuttoImg = document.querySelector(".prosciutto-img");
        prosciuttoImg.classList.add("prosciutto-img-animate");

        const mugImg = document.querySelector(".mug-img");
        mugImg.classList.add("mug-img-animate");
    }
    //if player lost
    if (computerResult==10){ 
        resultMessageDiv.classList.add("defeat");
        resultMessage.innerText = "You lost!"
    }
    //when anyone wins
    if(playerResult==10||computerResult==10){
        playerResult=0;
        computerResult=0;
        playerResultDiv.innerHTML = 0;
        computerResultDiv.innerHTML = 0;
        resultMessageDiv.classList.remove("hidden");
        resultMessageDiv.classList.add("result-message-div");

        const playAgainBtn = document.querySelector(".play-again-btn");
        playAgainBtn.addEventListener("click",() => {
            if(resultMessageDiv.classList.contains("victory")){
                resultMessageDiv.classList.remove("victory");
            }
            if(resultMessageDiv.classList.contains("defeat")){
                resultMessageDiv.classList.remove("defeat");
            }
            resultMessageDiv.classList.remove("result-message-div");
            resultMessageDiv.classList.add("hidden");
            playerFingersNum.focus();
        })
    }
}

//function: set to default
const setDefault = () =>{
    setTimeout(function(){
    playerFingersNum.value=""; 
    playerGuessSum.value=""; 
    computerFingersNum.value="";  
    computerGuessSum.value="";
    playerFingersNum.disabled = false; 
    playerFingersNum.focus();
    playerFingersImg.setAttribute("src", "./slike/slike_prsti/zero.png");
    computerFingersImg.setAttribute("src", "./slike/slike_prsti/zero.png");
    }
    ,1000)
}

//events: playerGuessSum
playerGuessSum.addEventListener("keyup", strictRangeSum);
playerGuessSum.addEventListener("keyup", computerTurn);
playerGuessSum.addEventListener("keyup", getResult);
playerGuessSum.addEventListener("keyup", setDefault);
}
