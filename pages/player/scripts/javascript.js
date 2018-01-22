// Set variables 
// Generals variables
const $player = document.querySelector('.player')
const $video = $player.querySelector('video')
const $bigPlayPause = $player.querySelector('img')
const $myControls = $player.querySelector('.player_controls')
const $playPause=$myControls.querySelector('.play_pause')
const $imgPlayPause = $playPause.querySelector('img')
const $fullScreen=$myControls.querySelector('.full_screen_button')
const $videoTimer = $myControls.querySelector('.current_timer')

// Seek bar variables
const $timer = $myControls.querySelector('.timer')
const $seekBar=$myControls.querySelector('.seek-bar')
const $fillBar = $seekBar.querySelector('.fill-bar')
const $dragBall=$seekBar.querySelector('.drag_ball')

// Sound bar variables
const $soundContainer=$myControls.querySelector('.sound')
const $soundClick=$soundContainer.querySelector('.js-clickable')
const $soundBar=$soundContainer.querySelector('.sound-bar')
const $fillBarSound = $soundContainer.querySelector('.fill-bar')
const $soundImg = $soundContainer.querySelector('img')

// Quality variables
const $qualityButton=$myControls.querySelector('.quality')
const $quality720=$qualityButton.querySelector('.quality_720')
const $quality360=$qualityButton.querySelector('.quality_360')
const $quality240=$qualityButton.querySelector('.quality_240')

// Variables used to record informations
let videoCurrentTime= 0
let ballPosition= 0
let seconds = 0
let minutes = 0


// Show the controls when the player is overed 
    $player.addEventListener('mouseover',()=>
    {
        $player.classList.add('is_over')
    })
    $player.addEventListener('mouseleave',()=>
    {
        if(!$seekBar.classList.contains('in_progress')){
            $player.classList.remove('is_over')
        }
    
    })


//                  TIMER
function myVideoTimer()
{
    seconds = Math.floor(($video.currentTime))-59*minutes
    minutes = Math.floor($video.currentTime/59)
    $timer.innerHTML=minutes+":"+seconds
}

//                  PLAY AND PAUSE FEATURES 


// Listen to click on the pause & play button 
$playPause.addEventListener('click', ()=> 
{
    // Permits to create an unique button for play and pause
    $playPause.classList.toggle("is_active")
    if ($playPause.classList.contains("is_active"))
    {
        $video.currentTime=videoCurrentTime
        $video.play()
        $imgPlayPause.src="images/pause.png"
        intervalSetting() 
    }
    else 
    {
        $video.pause()
        $imgPlayPause.src="images/play-button.png"
    }
})

// Space bar option for play and pause 

document.addEventListener('keypress', (e)=> 
{

    // Permits to create an unique button for play and pause
    if(e.keyCode===32)
    {
        $playPause.classList.toggle("is_active")
        if ($playPause.classList.contains("is_active"))
        {
            $video.currentTime=videoCurrentTime
            $video.play()
            $imgPlayPause.src="images/pause.png"
            intervalSetting() 
        }
        else 
        {
            $video.pause()
            $imgPlayPause.src="images/play-button.png"
        }
    }
})


// click on the video to play and pause 

$video.addEventListener('click', ()=> 
{
        $playPause.classList.toggle("is_active")
        if ($playPause.classList.contains("is_active"))
        {
            $video.currentTime=videoCurrentTime
            $video.play()
            $imgPlayPause.src="images/pause.png"
            intervalSetting() 
        }
        else 
        {
            $video.pause()
            $imgPlayPause.src="images/play-button.png"
        }
})

// Big play and pause button on the middle 
$bigPlayPause.addEventListener('click',()=>
{
    $playPause.classList.toggle("is_active")
    if ($playPause.classList.contains("is_active"))
    {
        $video.currentTime=videoCurrentTime
        $video.play()
        $imgPlayPause.src="images/pause.png"
        intervalSetting() 
    }
    else 
    {
        $video.pause()
        $imgPlayPause.src="images/play-button.png"
    }
})
$video.addEventListener("pause",()=>
{
    $bigPlayPause.src='images/bigPlay.png'
    $bigPlayPause.style.opacity="1"
})
$video.addEventListener("play",()=>
{
    $bigPlayPause.src='images/bigPause.png'
    $bigPlayPause.style.opacity="0"
})


//                  FILL BAR FOLLOWING THE CURRENT TIME OF THE VIDEO 


// listen timeupdate to adjust the fill-bar and the current time
function intervalSetting() {
    if(!$video.paused){
        $video.currentTime=videoCurrentTime
    setInterval(function(){
        // do it only when the video is playing 
                const ratio2=$video.currentTime/$video.duration
                $fillBar.style.transform=`scaleX(${ratio2})`
                $dragBall.style.transform=`translateX(${ratio2*$seekBar.offsetWidth-($dragBall.offsetWidth/3)}px)`
                videoCurrentTime=$video.currentTime
                myVideoTimer()
        }
    // every seconds
    ,1000)
}
}
// Listen to mousedown event on sound bar 
$seekBar.addEventListener('mousedown', (event)=>
{
    event.preventDefault()
    $player.classList.add('is_over')
    $seekBar.classList.add("in_progress")
        dragFunction()
        endDragFunction()
        // Permits to avoid bug when the user leave the focus on the controls durinf the drag 
        $myControls.addEventListener('mouseleave', (event)=>{
            if(event.clientX<0+$player.offsetLeft+$seekBar.offsetLeft && $seekBar.classList.contains("in_progress") ){
                $dragBall.style.transform=`translateX(${0}px)`
                $fillBar.style.transform=`scaleX(${0})`
                $seekBar.classList.remove("in_progress")
                const ratio= (event.clientX-$seekBar.offsetLeft-$player.offsetLeft) / $seekBar.offsetWidth
                const videoTime = ratio * $video.duration
                $video.currentTime = videoTime
            }
            else if (event.clientX>$seekBar.offsetWidth+$player.offsetLeft+$seekBar.offsetLeft && $seekBar.classList.contains("in_progress")){
                $dragBall.style.transform=`translateX(${$seekBar.offsetWidth-($dragBall.offsetWidth)}px)`
                $fillBar.style.transform=`scaleX(${1})`
                $seekBar.classList.remove("in_progress")
                const ratio= (event.clientX-$seekBar.offsetLeft-$player.offsetLeft) / $seekBar.offsetWidth
                const videoTime = ratio * $video.duration
                $video.currentTime = videoTime
                
            }
        })

})


// Listen to mousemove to move the fill bar 
// fill bar action during the drag 

function dragFunction() {document.addEventListener('mousemove',(event)=>
{
    event.preventDefault()
    endDragFunction()
    if ($seekBar.classList.contains("in_progress"))
    {  
        myVideoTimer()
        // if the mouse is before the seek bar 
        if  (event.clientX<0+$player.offsetLeft+$seekBar.offsetLeft)
        {
            $dragBall.style.transform=`translateX(${0-($dragBall.offsetWidth/3)}px)`
            $fillBar.style.transform=`scaleX(${0})`
            const ratio= (event.clientX-$seekBar.offsetLeft-$player.offsetLeft) / $seekBar.offsetWidth
            const videoTime = ratio * $video.duration
            $video.currentTime = videoTime
        }
        // if the mouse is on the seek bar 
       else if (event.clientX-$player.offsetLeft-$seekBar.offsetLeft>0 && event.clientX<$seekBar.offsetWidth+$player.offsetLeft+$seekBar.offsetLeft )
        {
            $dragBall.style.transform=`translateX(${event.clientX-$player.offsetLeft-$seekBar.offsetLeft-($dragBall.offsetWidth/3)}px)`
            $fillBar.style.transform=`scaleX(${(event.clientX-$player.offsetLeft-$seekBar.offsetLeft)/$seekBar.offsetWidth})`
            const ratio= (event.clientX-$seekBar.offsetLeft-$player.offsetLeft) / $seekBar.offsetWidth
            const videoTime = ratio * $video.duration
            $video.currentTime = videoTime
            
        }
        // if the mouse is after the seek bar 
        else
        {
            $dragBall.style.transform=`translateX(${$seekBar.offsetWidth-$seekBar.offsetLeft+$seekBar.offsetLeft-($dragBall.offsetWidth)}px)`
            $fillBar.style.transform=`scaleX(${1})`
            const ratio= (event.clientX-$seekBar.offsetLeft-$player.offsetLeft) / $seekBar.offsetWidth
            const videoTime = ratio * $video.duration
            $video.currentTime = videoTime
        }}

})
}
// Permits to set the position at the end of the action = at the mouseup 
function endDragFunction()
{
        document.addEventListener('mouseup', (event)=>
        {
            if ($seekBar.classList.contains("in_progress"))
            {
            $seekBar.classList.remove("in_progress")
            if (event.clientX<0+$player.offsetLeft+$seekBar.offsetLeft)
            {
                $dragBall.style.transform=`translateX(${0+($dragBall.offsetWidth/3)}px)`
                $fillBar.style.transform=`scaleX(${0})`
                const ratio= (event.clientX-$seekBar.offsetLeft-$player.offsetLeft) / $seekBar.offsetWidth
                const videoTime = ratio * $video.duration
                $video.currentTime = videoTime
            }
            else if (event.clientX>0+$player.offsetLeft+$seekBar.offsetLeft && event.clientX<$seekBar.offsetWidth+$player.offsetLeft+$seekBar.offsetLeft)
            {
                $dragBall.style.transform=`translateX(${event.clientX-$player.offsetLeft-$seekBar.offsetLeft-($dragBall.offsetWidth/3)}px)`
                $fillBar.style.transform=`scaleX(${(event.clientX-$player.offsetLeft-$seekBar.offsetLeft)/$seekBar.offsetWidth})`
                const ratio= (event.clientX-$seekBar.offsetLeft-$player.offsetLeft) / $seekBar.offsetWidth
                const videoTime = ratio * $video.duration
                $video.currentTime = videoTime
            }
            else 
            {
                $dragBall.style.transform=`translateX(${$seekBar.offsetWidth-($dragBall.offsetWidth)}px)`
                $fillBar.style.transform=`scaleX(${1})`
                const ratio= (event.clientX-$seekBar.offsetLeft-$player.offsetLeft) / $seekBar.offsetWidth
                const videoTime = ratio * $video.duration
                $video.currentTime = videoTime
            }
        }
        videoCurrentTime=$video.currentTime
        })
    }



// SOUND FEATURES 
// Hover the sound button to see the sound bar 

$soundImg.addEventListener('mouseover',()=>
{
    $fillBarSound.style.opacity="1"
    $soundBar.style.opacity="1"
})
$soundContainer.addEventListener('mouseleave',()=>
{
    if(!$soundContainer.classList.contains('in_progress')){
        $fillBarSound.style.opacity="0"
        $soundBar.style.opacity="0"
    }
})

// DRAG FUNCTION FOR THE SOUND 
//Listen to mousedown event on seek bar 
$soundClick.addEventListener('mousedown', (event)=>
{
    event.preventDefault()
    $fillBarSound.style.opacity="1"
    $soundBar.style.opacity="1"
    // call of the move and mouseup functions 
    dragFunctionSound()
    endDragFunctionSound()
    // control that you have clicked on the sound bar 
    $soundContainer.classList.add('in_progress')
    // permits to avoid bug when the user leave the focus on the sound bar 
    $myControls.addEventListener("mouseleave",(event)=>
    {
        if ($soundContainer.classList.contains("in_progress"))
        {  
            if  (event.clientX<0+$player.offsetLeft+$soundContainer.offsetLeft+$soundBar.offsetLeft)
            {
                $fillBarSound.style.transform=`scaleX(${0})`
                $video.volume=0
            }
            else
            {
    
                $fillBarSound.style.transform=`scaleX(${1})`
                $video.volume=1
            }}
    })
})


// Listen to mousemove to move the fill bar 
// fill bar action during the drag 

function dragFunctionSound() {document.addEventListener('mousemove',(event)=>
{
    $player.classList.add('is_over')
    event.preventDefault()
    endDragFunctionSound()
    if ($soundContainer.classList.contains("in_progress"))
    {  
        if  (event.clientX<0+$player.offsetLeft+$soundContainer.offsetLeft+$soundBar.offsetLeft)
        {
            $fillBarSound.style.transform=`scaleX(${0})`
            $video.volume=0
        }
        else if (event.clientX>0+$player.offsetLeft+$soundContainer.offsetLeft+$soundBar.offsetLeft && event.clientX<$soundBar.offsetWidth+$player.offsetLeft+$soundContainer.offsetLeft+$soundBar.offsetLeft)
        {
            // Permits to find x positon following the mouse
            $fillBarSound.style.transform=`scaleX(${(event.clientX-$player.offsetLeft-$soundContainer.offsetLeft-$soundBar.offsetLeft)/$soundBar.offsetWidth})`
            $video.volume=(event.clientX-$player.offsetLeft-$soundContainer.offsetLeft-$soundBar.offsetLeft)/$soundBar.offsetWidth
        }
        else
        {
            $fillBarSound.style.transform=`scaleX(${1})`
            $video.volume=1
        }}

})
}
// Permits to set the position at the end of the action = at the mouseup 
function endDragFunctionSound()
{
    document.addEventListener('mouseup', (event)=>
    {
        if ($soundContainer.classList.contains("in_progress"))
        {
        $soundContainer.classList.remove("in_progress")
        if (event.clientX<0+$player.offsetLeft+$soundContainer.offsetLeft+$soundBar.offsetLeft)
        {
            $fillBarSound.style.transform=`scaleX(${0})`
            $video.volume=0
        }
        else if (event.clientX>0+$player.offsetLeft+$soundContainer.offsetLeft+$soundBar.offsetLeft && event.clientX<$soundBar.offsetWidth+$player.offsetLeft+$soundContainer.offsetLeft+$soundBar.offsetLeft)
        {
            $fillBarSound.style.transform=`scaleX(${(event.clientX-$player.offsetLeft-$soundContainer.offsetLeft-$soundBar.offsetLeft)/$soundBar.offsetWidth})`
            $video.volume=(event.clientX-$player.offsetLeft-$soundContainer.offsetLeft-$soundBar.offsetLeft)/$soundBar.offsetWidth
        }

        else 
        {
            $fillBarSound.style.transform=`scaleX(${1})`
            $video.volume=1
        }
        }
        currentVolume=$video.volume
        // UX amelioration on the sound 
        if ($video.volume===0){
            $soundImg.src="images/mute.png"
        }
        else {
            $soundImg.src="images/speaker.png"
        }
            
    })
}
// Mute the sound on click 
$soundImg.addEventListener("click",()=>
{

    $soundImg.classList.toggle('is-mute')
    if($soundImg.classList.contains('is-mute'))
    {
        $video.volume=0
        $soundImg.src="images/mute.png"
    }
    else 
    {
        $video.volume=0.5
        $fillBarSound.style.transform=`scaleX(${0.5})`
        $soundImg.src="images/speaker.png"
    }

})




// QUALITY FEATURES
// toggle clicked class to show the quality option 
$qualityButton.addEventListener('click', (e)=>{
    e.preventDefault()
    $qualityButton.classList.toggle('is_clicked')
})
// setting the quality of the video 
$quality720.addEventListener('click',()=>
{
    const switchTime=$video.currentTime
    $video.src="video/video.mp4"
    $video.currentTime=switchTime
})
$quality360.addEventListener('click',()=>
{
    const switchTime=$video.currentTime
    $video.src="video/video-360.mp4"
    $video.currentTime=switchTime
})
$quality240.addEventListener('click',()=>
{
    const switchTime=$video.currentTime
    $video.src="video/video-240.mp4"
    $video.currentTime=switchTime
})



// FULL SCREEN FEATURES 
// Update the style of the player on fullscreen
function fullScreenUpdate()
{
        $player.style.left="0"
        $player.style.marginTop="0"
        $player.style.width="100%"
        $player.style.height="100%"
        $video.style.width="100%"
        $myControls.style.width="100%"
}
// Reset the style of the player when you left the fullscreen
function fullScreenReset()
{
        $player.style.left="23%"
        $player.style.marginTop="5%"
        $player.style.width="800px"
        $player.style.height="40px"
        $video.style.width="800px"
        $myControls.style.width="800px"
        // avoid unwanted bug
        $bigPlayPause.style.top="452%"
        $myControls.style.top="1030%"
}

// Full screen on click on the button with requestFullscreen
$fullScreen.addEventListener("click", function() 
{
    $player.classList.toggle('is_fullScreen')
    if($player.classList.contains('is_fullScreen'))
    {
        if ($player.requestFullscreen) 
        {
          $player.requestFullscreen()
          fullScreenUpdate()
        } 
        // Firefox
        else if ($player.mozRequestFullScreen) 
        {
          $player.mozRequestFullScreen()
          fullScreenUpdate()
        } 
         // Chrome and Safari
        else if ($player.webkitRequestFullscreen) 
        {
          $player.webkitRequestFullscreen()
          fullScreenUpdate()
        }
    }
    else 
    {
        if (document.exitFullscreen) {
            document.exitFullscreen()
          } else if (document.msExitFullscreen) {
            document.msExitFullscreen()
          } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen()
          } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen()
          }
        fullScreenReset()
    }
  })

  // Full screen on double 
  $video.addEventListener('dblclick',()=>
  {
    $player.classList.toggle('is_fullScreen')
    if($player.classList.contains('is_fullScreen'))
    {
        if ($player.requestFullscreen) 
        {
          $player.requestFullscreen()
          fullScreenUpdate()
        } 
        // Firefox
        else if ($player.mozRequestFullScreen) 
        {
          $player.mozRequestFullScreen()
          fullScreenUpdate()
        } 
         // Chrome and Safari
        else if ($player.webkitRequestFullscreen) 
        {
          $player.webkitRequestFullscreen()
          fullScreenUpdate()
        }
    }
    else 
    {
        if (document.exitFullscreen) {
            document.exitFullscreen();
          } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
          } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
          } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
          }
        fullScreenReset()
    }
  })

//   document.addEventListener('fullscreenchange', exitHandler);
//   document.addEventListener('webkitfullscreenchange', exitHandler);
//   document.addEventListener('mozfullscreenchange', exitHandler);
//   document.addEventListener('MSFullscreenChange', exitHandler);
  
//   function exitHandler() {
//       if (!document.fullscreenElement && !document.webkitIsFullScreen && !document.mozFullScreen && !document.msFullscreenElement) {
//         fullScreenReset()
//       }
//   }  