---
templateKey: work
title: Mesh Bend
type: Candusen page
featured: false
draft: false
date: 2020-09-18T13:44:29.472Z
featuredimage:
  - https://res.cloudinary.com/candusen/image/upload/v1600436699/Screen_Shot_2020-09-18_at_9.44.04_AM_xhxmg5.png
paper_code:
  code: |-
    var draw = new Path();
    draw.strokeColor = "black"
    var colorThreads = [];

    function thread(path,amt,offset){
      var threads = new Group();
      var inc = path.length/(amt*2);
      for (var i = 0; i < amt; i++) {
        var line = new Path();
        line.add(path.getPointAt((offset+(inc*i))%path.length))
        line.add(path.getPointAt((offset+(path.length/2)-(inc*i))%path.length));
        threads.children.push(line);
        line = new Path();
        line.add(path.getPointAt((offset+path.length-(inc*i))%path.length))
        line.add(path.getPointAt((offset+(path.length/2)+(inc*i))%path.length));
        threads.children.push(line);
      }
      threads.strokeColor = "black"
      threads.strokeWidth = 1;
      return threads;
    }

    var drawing = false;

    function onMouseMove(e){
      draw.smooth();
      if(drawing){
        draw.smooth();
        draw.add(e.point);
      }
    }

    function onMouseDown(e){
      if(drawing){
        draw.closed = true;

        colorThreads.map(function(e){
          e.children.map(function(f){
            f.remove();
          })
          e.remove()
        })
        var threadColors = [
        thread(draw,100+num(100),0),
        thread(draw,100+num(100),draw.length/3),
        thread(draw,100+num(100),draw.length*.5)]
        threadColors[0].strokeColor = "red";
        threadColors[1].strokeColor = "blue";
        threadColors[2].strokeColor = "green";
        draw = new Path();
        draw.closed = true;
        draw.strokeColor = "black"
      }
      else{

      }

      drawing = !drawing;
    }
---
