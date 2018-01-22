
Intructions : 
- Play and pause : Buttons (big and little one), space bar and click on the video 
- Control of the advance of the video : click on the seek bar, drag the ball on the seek bar 
- Sound : drag bar, click on the sound icon 
- Full Screen : click on the button associated, double click on the video 
- Change the quality : click on the gear and chose the quality you want 

Features : 
- The play/pause buttons permits to know if the video is running or not 
- The timer is following the update of the time and the drag on the seek bar 
- Fly over on the buttons change the opacity and the cursor to improve UX 
- When you change the video time the video change at the same time : it permits to know where we are in the video 
- Same for the sound 
- When the quality of the video is changing, the video keep the timer 
- When the full screen option is on, the player adapts to the screen 

Some informations : 
- In the javascript I didn't used specific numbers to refer to the width, margin etc... So you can change the css and the player will continue to    work
- I tried to optimize the performance changing transform and opacity properties only and using "will-change" in the css 
- I spent lot of time trying to create the drag bar with the different events (mousemouse, mousedown, mouseup...)
- The quality option is not optimized : I used different video to change the source on click
- A bug is still there with the fullscreen option, the controls disappear when you active the fullscreen a second time   

Thanks to :
- My class mates for ideas and debug 
- The works of the previous years 
- My professor in Web Developement who helped me  


