---
templateKey: work
title: Tile
type: Candusen page
featuredimage:
  - https://res.cloudinary.com/candusen/image/upload/v1707413163/Screenshot_2024-02-08_at_12.25.26_PM_zflkly.png
featured: false
draft: false
date: 2023-01-03T17:20:20.803Z
date-finish: 2023-01-03T17:20:00.000Z
paper_code:
  code: >-
  
    window.paper.project = project;

    function randomColor(){
        return "rgb("+num(256)+","+num(256)+","+num(256)+")"
    }

    function sample(array){
      return array[Math.floor(Math.random()*array.length)];
    }

    var biggestSquare = new Path.Rectangle(0,0,100,100);

    biggestSquare.fitBounds(view.bounds);

    var positions = ["topLeft","topCenter","topRight","leftCenter","center","rightCenter","bottomLeft","bottomCenter","bottomRight"];


    function positionIn(bounds){
        bounds[sample(positions)]
    };


    function pathFromPointsInSpace(n,space){
      var path = new Path();
      path.fillColor = prettyRaCo(); 
      var pos = positions.slice();
      for (var index = 0; index < n; index++) {
        var samp = sample(pos);
        path.add(space[samp]);
        pos = pos.filter(function(p){ return p!==samp; });
      }
      return path;
    }

    console.log(paper.view.bounds)


    var fillers = [
      function (space){
        var path = new Path.Circle(space.center,space.width/2);
        path.fillColor = prettyRaCo();
        path.scale([.5,.25,1,.75][num(4)],positionIn(space));
        return path;
      },
      function (space){ 
        return pathFromPointsInSpace(3,space);
      },
      function (space){ 
        return pathFromPointsInSpace(4,space);
      }
    ];


    
    function pattern(space){
        if(!space){
            space = biggestSquare.bounds
        }
      project.activeLayer.clear();
      var group = new Group();
      var shapes = 1 + num(6);
      var bg = new Path.Rectangle(space.topLeft,space.size);
      bg.fillColor = prettyRaCo();
      bg.strokeColor = "transparent";
      for (var index = 0; index < shapes; index++) {
        group.children.push(fillers[num(fillers.length)](space));
      }
      bg.sendToBack();
      group.children.unshift(bg);
      return group;
    }
    

    function tilify(p,iterations){
      var fitter = new Size(Math.max(view.bounds.width,view.bounds.height),Math.max(view.bounds.width,view.bounds.height));
      var g = new Group();
      g.children.push(p)
      p.fitBounds(fitter);
      for (var index = 0; index < 3; index++) {
        var copy = p.clone();
        copy.rotate(90,[fitter.width,0]);
        g.children.push(copy);
        p = copy;
      }
      return iterations > 0 ? tilify(g,iterations-1) : g;
    }


    function mirrorify(p,iterations){
      var fitter = new Size(Math.max(view.bounds.width,view.bounds.height),Math.max(view.bounds.width,view.bounds.height));
      var g = new Group();
      g.children.push(p)
      p.fitBounds(fitter);

      var copy = p.clone(); //UP
      copy.scale(1,-1);
      copy.position = copy.position - [0,copy.bounds.height];
      g.children.push(copy);
      p = copy;

      copy = p.clone(); //RIGHT
      copy.scale(-1,1);
      copy.position = copy.position + [copy.bounds.width,0];
      g.children.push(copy);
      p = copy;

      copy = p.clone(); //DOWN
      copy.scale(1,-1);
      copy.position = copy.position + [0,copy.bounds.height];
      g.children.push(copy);
      p = copy;

      return iterations > 0 ? mirrorify(g,iterations-1) : g;
    }


    function tileAndMirror(p,iterations){
      var parity = Math.random() > .5 ? 1 : 0;
      var g;
      if(parity === 0){
        g = mirrorify(p,0);
      } else {
        g = tilify(p,0);
      }
      return iterations > 0 ? tileAndMirror(g,iterations-1) : g;
    }




    draw();


    function onMouseDown(){
      draw();
    } 


    function draw(){
       [tileAndMirror,tilify,mirrorify][num(3)](pattern(),3+num(3));
    }
---
