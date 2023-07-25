const buttonColours = ["red", "blue", "green", "yellow"]
let gamePattern = []
let userClickedPattern = []
let level = 0
let started = false
let clickCounter = 0

function gameStart(){
    if(!started){
        nextSequence()
        started = true
        $('body').css('background-color', '#011F3F')
    }
}

function runSequence(input){
    playSound(input)
    $(`#${input}`).fadeIn(100).fadeOut(100).fadeIn(100)
}

function nextSequence(){
    level ++
    $('h1').text(`Level ${level}`)
    let randomNumber = Math.floor(Math.random()*4)
    let randomChosenColour = buttonColours[randomNumber]
    gamePattern.push(randomChosenColour)

    for(let i = 0; i < gamePattern.length; i++){
        setTimeout(function(){runSequence(gamePattern[i])}, i * 500)
    }
}

function correctClick(){
    for(i = 0; i < userClickedPattern.length; i++){
        if(gamePattern[i] !== userClickedPattern[i]){
            return false
        }
    }
    return true
}

//plays sound based on passed through colour
function playSound(value){
    switch (value){
        case 'green':
            var greenAudio = new Audio('./sounds/green.mp3')
            greenAudio.play()
            break;
        case 'red':
            var redAudio = new Audio('./sounds/red.mp3')
            redAudio.play()
            break;
        case 'yellow':
            var yellowAudio = new Audio('./sounds/yellow.mp3')
            yellowAudio.play()
            break;
        case 'blue':
            var blueAudio = new Audio('./sounds/blue.mp3')
            blueAudio.play()
            break;
        case 'wrong':
            var wrongAudio = new Audio('./sounds/wrong.mp3')
            wrongAudio.play()
            break;
        default:
            console.log('Sound file not found.')
    }
}

//starts game on keypress
$(document).keydown(gameStart)

//main game setting
$('.btn').on('click',function(){
    let userChosenColour = $(this).attr('id')
    userClickedPattern.push(userChosenColour)
    $(`#${userChosenColour}`).addClass('pressed')
    setTimeout(function(){
        $('.btn').removeClass('pressed')
    },100)
    //checks if player hits the wrong button
    if(!correctClick()){
        $('h1').text('Game Over, Press Any Key to Restart')
        userChosenColour = 'wrong'
    }

    playSound(userChosenColour)
    //checks if player has got through without hitting wrong key, resets counters and then starts next round
    if(userChosenColour !== 'wrong'){
        clickCounter ++
        if(clickCounter === level){
            clickCounter = 0
            userClickedPattern = []
            setTimeout(function(){
                nextSequence() 
            }, 1000)
        }
    }
    //if they did hit the wrong key reset the game state and prime for another roundk
    else{
        console.log("reset hit")
        $('body').css('background-color', 'red')
        gamePattern = []
        userClickedPattern = []
        level = 0
        started = false
        clickCounter = 0
    }
})

