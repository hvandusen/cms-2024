---
templateKey: work
title: Caffeine
type: Candusen page
date: 2020-07-29T15:16:10.470Z
featuredimage:
  - https://res.cloudinary.com/candusen/image/upload/v1600431844/Screen_Shot_2020-09-17_at_6.45.53_PM_p7ujhi.png
paper_code:
  code: >
    d = new Date();

    width = 100//d.getHours()+1*15 +1

    var move = false;

    //width = 20//Math.random()*600+200;

    height =  10

    rot = Math.random()

    limit = 5000;

    var x =0;

    var shape = null;

    var currentColor = 'red';




    function makeShapes(point){
    	p =  new Shape.Rectangle([point.x,point.y],[100,10]);
    	p.fillColor = currentColor;
    	return p;

    }


    function onMouseMove(event){
    	var items = project.activeLayer.children.length;
      if(!move)
      makeShapes(event.point);
      if(items>limit)
        {project.activeLayer.children.pop(); }
      for(var i = 0;i<items;i++)
      {
        temp = project.activeLayer.children[i];
    	temp.size.height = height;
        temp.borderRadius = 1;

      //  temp.size = [width, Math.abs(event.delta.dy)+.1]//i%40-20]//Math.atan(Math.cos(event.count/-100))*200;
        temp.rotate(event.delta.x/3)
        if(move)
        {
    			temp.position.x += event.delta.x;
    			//temp.position.y += event.delta.y;

    			}
        else
        temp.fillColor.hue += Math.random();
        x++;
      }
    };




    function onMouseDown(event){

      move = !move;

    }
interactivity:
  - mousemove
---
