# DEPRECATED
This is the live graphics package used for [Tip of the Hats 2014](https://www.youtube.com/playlist?list=PLJUPqfTTJdNnxdK5YlAo3y2jQj188jl0_). This software is considered **obsolete**, and has been **replaced** by [NodeCG](https://github.com/nodecg/nodecg).

# Windows Installation
1. Download and install Node.js 32-bit, 64-bit will not work
2. From the Node.js command prompt, do the following:  
     
   ```
   cd /toth-overlay  
   npm install  
   node server.js  
   ```

# Linux Installation
1. Install Node.js, then do the following:  
     
   ```
   cd /toth-overlay  
   npm install  
   node server.js  
   ```
   
# Usage
1. Open either the main control widget or the Dota Fortress widget by navigating to http://localhost:1337/widget or http://localhost:1337/dotawidget, respectively.
2. Open the display page for the graphic you wish to control, or add it as a [CLR Browser Source](http://obsproject.com/forum/resources/clr-browser-source-plugin.22/) in OBS.

# Credits
[Lange](http://alexvancamp.com), lead programmer & designer  
[Atmo](https://github.com/atmosfar), original concept and code  
[Airon](http://aironaudio.weebly.com/), sound designer  
[Krunkidile](https://youtube.com/user/anangrysockpuppet), SFM portrait artist  
[Suyo](https://www.youtube.com/user/suyooo), SFM background artist

# Video Dependencies
[SFM Backgrounds](https://mega.co.nz/#!hN9zURDB!1EWRGyzW19SYwWvcWSnVruukp6RHV7wsGW7f7hXRHd8), extract to "toth-overlay/public/img/"

# Sound Dependencies
The Dota Fortress display page makes use of the "cheer" and "jeer" sounds from Team Fortress 2. If you wish to have these sounds play during the pick & ban events, you will have to extract and convert them yourself.

# Node Dependencies
[ejs](http://embeddedjs.com/)  
[express](http://expressjs.com/)  
[jade](http://jade-lang.com/)  
[jsdom](https://github.com/tmpvar/jsdom)  
[socket.io](http://socket.io/)  

# Font Dependencies
[Avenir](http://www.myfonts.com/fonts/linotype/avenir/)  
[Antonio](http://www.fontsquirrel.com/fonts/antonio) (Included)

# JavaScript & CSS Dependencies (Included)
[Ion.Sound](http://ionden.com/a/plugins/ion.sound/en.html)  
[jQuery.countdown](http://hilios.github.io/jQuery.countdown/)  
[jQuery.DateTimePicker](http://xdsoft.net/jqplugins/datetimepicker/)  
[jQuery.Transit](http://ricostacruz.com/jquery.transit/)  
[Masonry](http://masonry.desandro.com/)  
[Purl](https://github.com/allmarkedup/purl)  
[SeamlessLoop](https://github.com/Hivenfour/SeamlessLoop)  
[textFit](https://github.com/STRML/textFit)  
[Animate.css](http://daneden.github.io/animate.css/)  
