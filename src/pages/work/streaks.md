---
templateKey: work
title: Streaks
type: Candusen page
date: 2020-07-29T15:51:12.213Z
featuredimage:
  - https://res.cloudinary.com/candusen/image/upload/v1600431836/Screen_Shot_2020-09-17_at_6.59.24_PM_vlju8t.png
paper_code:
  code: |
    
    var paths = [];
    var amt = 20;
    var placePoints = false;
    var start = new Point();
    var startV = Point.random().normalize();
    startV = startV-(startV/2)
    function onMouseDown(event){
    	colors = [prettyRaCo(),prettyRaCo(),prettyRaCo()]
    	startV = Point.random().normalize();
    	startV = startV-(startV/2)
    	if(placePoints){
    		placePoints = false;
    		return
    	}
    	paths = [];
    	for(var i=0;i<amt;i++){
    		paths[i] = (new Path({
    			'strokeColor': colors[Math.floor(Math.random()*3)],
    			'strokeWidth':Math.random()*3+5,
    			'segments': [event.point+startV*10*i]
    			}))
    	}
    	placePoints = true;
    	start = event.point
    }


    function onMouseMove(event){
    	if(placePoints)
    		paths.forEach(function(e,i){
    			e.add(e.segments[e.segments.length-1].point+event.delta)
    			e.smooth()
    		});
    }
interactivity:
  - click-and-move
---
