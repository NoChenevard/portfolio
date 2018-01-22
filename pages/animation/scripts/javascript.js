
const buttonActive =document.querySelector('.buttonActive');
const buttonBoost = document.querySelector('.button-boost');
const handle =document.querySelector('.handle');
const playerMachine = document.querySelector('#audioMachine');
const playerMac = document.querySelector('#audioMac');
const playerBug = document.querySelector('#audioBug');
const playerBroken = document.querySelector('#audioBroken');
const muteButton = document.querySelector(".mute");

handle.addEventListener('click',()=>{
    buttonActive.classList.toggle('is-active');
    buttonActive.classList.remove('is-boost');
    if (buttonActive.classList.contains('is-active')) {
        playerMachine.play();
         setTimeout(function() {
            playerMac.play();
        },5000);
    }
    else {
        playerMachine.pause();
        playerMac.pause();
        playerBug.pause();
        playerMachine.currentTime=0;
        playerMac.currentTime = 0;
        playerBug.currentTime = 0;
    };
})
buttonBoost.addEventListener('click',()=>{
    buttonActive.classList.toggle('is-boost');
    if(buttonActive.classList.contains('is-boost')){
        playerBug.play();
        setTimeout(function() {
            playerBroken.play();
        },3500);
    }
    else {
        playerBug.pause();
        playerBug.currentTime = 0;
        playerBroken.pause();
        playerBroken.currentTime = 0;
    };
    setTimeout(function() {
        playerBug.pause();
        playerMachine.volume=0.01;
    },3500);
})



// MUTE BUTTON

muteButton.addEventListener('click',()=>{
    muteButton.classList.toggle("is-mute");
    if (muteButton.classList.contains('is-mute')){
        playerBroken.volume=0;
        playerBug.volume=0;
        playerMac.volume=0;
        playerMachine.volume=0;
    }
    else {
        playerBroken.volume=0.3;
        playerBug.volume=0.15;
        playerMac.volume=0.1;
        playerMachine.volume=0.05;
    }
})