---
templateKey: work
title: Trail
type: Candusen page
date: 2020-07-29T15:54:52.415Z
featuredimage:
  - https://res.cloudinary.com/candusen/image/upload/v1600531959/Screen_Shot_2020-09-19_at_12.10.36_PM_sqje39.png
paper_code:
  code: >

    var oval,oval2;

    var down = false;

    var dash= [Math.random()*100,Math.random()*300];

    var sw= Math.random()*300

    	function onMouseMove(event){
        if(down){
        	oval.add(event.point)
    		dash= [event.count,event.count];
    		sw= Math.random()*50
    		oval.size = [(event.point.x-oval.position.x)*2,(event.point.y-oval.position.y)*2]
    		temp = oval//.toPath()
    		new paper.Path({segments:temp.segments,closed:false,dashArray: dash,strokeColor: primary(),strokeWidth:sw})
    			if(project.activeLayer.children.length > 40)
    				{
    				a = project.activeLayer.children.pop()
    				for(var i = project.activeLayer.children.length-1; i > -1;i--){
    					project.activeLayer.children[i] = project.activeLayer.children[i-1]
    				}
    				project.activeLayer.children[0] = a
    				//project.activeLayer.children[0].fillColor = primary();
    				oval.segments[0].remove();
    				}

    		}
    	};
    	function primary(){
    		n = Math.random();
    		if(n<.3)
    			return 'red';
    		else if(n<.6)
    			return 'blue';
    		else
    		 	return 'yellow';
    	}

    	function onMouseDown(event){
        oval = new paper.Path(event.point);//project.view.center)//Shape.Ellipse(project.view.center);
    	};

    	function onMouseUp(event){
    		down = !down
    		if(down)
    		project.activeLayer.clear()
    		dash= [event.count,event.count];
    		return

    		/*temp = oval//.toPath()
    		//oval.remove()
    		oval = new paper.Path({segments:temp.segments,dashArray: [event.count,event.count],strokeColor: primary(),strokeWidth:30})
    		removed = oval.segments.pop().point
    		oval.add([removed.x+num(50)-25,removed.y+num(50)-25])
    		oval.smooth()
    		oval.fillColor = primary();
    		//oval.rotate(num(5)-2.5)*/
    	}

    	paper.view.onFrame = function(ev){

    	};
---
