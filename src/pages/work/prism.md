---
templateKey: work
title: Prism
type: Candusen page
date: 2020-07-29T15:48:40.517Z
featuredimage:
  - https://res.cloudinary.com/candusen/image/upload/v1600431836/Screen_Shot_2020-09-17_at_6.52.42_PM_s5bvx6.png
paper_code:
  code: >
    var size = 900

    var variance = 10;

    var ang = 0.5;

    var center = new Point(screen.availWidth/2,screen.availHeight/2)

    //points from the center of screen minus size plus variance

    function ran(variance){
    	return Math.random()*variance-(variance/2)
    }


    function createShape(point){
      var path = new Path(center);
      var path2 = new Path();
      path.add(center+[200,0])
      var group = new Group();
      for(var i=0;i<4;i++){
      	num = Math.random()*50
      	path.rotate(num)
      	path2.add(path.segments[1])
      	path.rotate(90-num)
      }
      path2.fillColor = prettyRaCo()
      group.children.push(path2)
      // ok now random shape inscribed from cirlce

      protrusion = Math.floor(Math.random()*4)
      pointChoice = path2.segments[protrusion]
      proPath = new Path(pointChoice)
      proPath.add(path2.bounds.center)
      proPath.rotate(180+ran(50),pointChoice.point)
      //proPath.strokeColor = 'red'
      vector = proPath.segments[0].point-proPath.segments[1].point
      var fill1 = new Path(proPath.segments)
      num2 = ((protrusion+1)%4+1)-1
      num3 = ((protrusion+3)%4)
      p = new Point(path2.segments[num2].point+vector)
      fill1.add(path2.segments[num2].point-vector)
      fill1.add(path2.segments[num2])

      var fill2 = new Path(proPath.segments)
      fill2.add(path2.segments[num3].point-vector)
      fill2.add(path2.segments[num3])
      fill2.fillColor=prettyRaCo();
      group.children.push(fill1)
      group.children.push(fill2)
      var arr;
      fill1.closed=true;
      fill2.closed=true;
      	arr = [fill2.segments[0].point.x-fill2.segments[0].next.point.x,fill2.segments[0].point.y-fill2.segments[0].next.point.y]
      //while(Math.sin(arr[0]/arr[1])>0)
      while(Math.abs(Math.sin(arr[0]/arr[1])-ang)>0.1){
      	group.rotate(1)
      	arr = [fill2.segments[0].point.x-fill2.segments[0].next.point.x,fill2.segments[0].point.y-fill2.segments[0].next.point.y]
      }
      fill1.fillColor=prettyRaCo()
      group.position = [point.x,point.y]
      group.scale(Math.random()+.5)
    	return group
    }


    function onMouseDown(event){
    	createShape(event.point)
    };
---
