---
templateKey: work
title: Confetti
type: Candusen page
date: 2020-07-29T15:22:35.898Z
featuredimage:
  - https://res.cloudinary.com/candusen/image/upload/v1600431844/Screen_Shot_2020-09-17_at_6.47.24_PM_ihntpg.png
paper_code:
  code: >

    function rPt(){
    	return Math.random()*view.bounds.size
    }

    var types = [
    	function(){
    		return new Path.Rectangle(Math.random()*view.bounds.width,Math.random()*view.bounds.height,10,10);
    	},
    	function(){
    		return new Path.Circle(Math.random()*view.bounds.width,Math.random()*view.bounds.height,10);
    	},
    	function(){
    		var p = new Path();
    		p.add(Point.random()*view.bounds.size);
    		p.add(Point.random()*view.bounds.size);
    		 if(p.length>300){
    			 p.scale(.5)
    		 }
    		return p;
    	},
    	function (){
    		var pth = new Path({
    			segments: [[200,200]]
    		});
    		pth.cubicCurveTo([300+Math.random()*170,300], [350,250+Math.random()*200], [500,500]);
    		var vec  = pth.segments[0].point-pth.segments[1].point;
    		vec.rotate(90);

    		pth.bounds.center = Point.random()*view.bounds.size;
    		pth.rotate(Math.random()*180)
    		//nPth.segments[0](new Point(100));
    		return pth;
    	},
    	function(){
    		var tri = new Path.RegularPolygon(Point.random()*view.bounds.size, Math.floor(1+Math.random()*10), 10);
    		tri.scale(.8+Math.random()*.4)
    		return tri;
    	},
    	function(){
    		var thing = new Path.Arc(rPt(), rPt(), rPt());
    		thing.scale(.8+Math.random()*.4)
    		return thing;
    	}

    ];

    var group;

    function drawScene(){
    	project.activeLayer.clear();
    	group = new Group();
    	for(var i=0;i<100;i++){
    		var shape = types[Math.floor(Math.random()*types.length)]();
    		shape.set({
    			 strokeColor: prettyRaCo(),
    			 strokeWidth: 18+Math.random()*15,
    			 shadowBlur: Math.floor(Math.random()*200),
    			 shadowColor: prettyRaCo(),
    			 strokeCap: 'round'
    	  });
    		group.children.push(shape);
    	}
    }


    drawScene();

    var average;

    function onMouseMove(){
    	drawScene();
    	group.children = [];
    	average = [0,0]
    	group.children.map(function(e){
    			average[0]+= e.bounds.center.x;
    			average[1]+= e.bounds.center.y;
    	});
    	var averagg = new Point(average[0]/group.children.length, average[1]/group.children.length);
    	var toCenter = view.bounds.center-averagg;
    	group.bounds.center += toCenter;
    }


    if(window.location.href.indexOf("forpierre")>-1)
    	setInterval(function(){
    		drawScene();
    	group.children = [];
    	average = [0,0]
    	group.children.map(function(e){
    			average[0]+= e.bounds.center.x;
    			average[1]+= e.bounds.center.y;
    	});
    	var averagg = new Point(average[0]/group.children.length, average[1]/group.children.length);
    	var toCenter = view.bounds.center-averagg;
    	group.bounds.center += toCenter;

    	},1000)
---
