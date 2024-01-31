---
templateKey: work
title: Weave
type: Candusen page
date: 2020-07-06T04:32:46.053Z
description: a random weave... idk!
featuredimage:
  - https://res.cloudinary.com/candusen/image/upload/v1600431838/Screen_Shot_2020-09-17_at_6.53.50_PM_bosgyq.png
paper_code:
  code: >
    var grid = function(options){
          var style = {
            strokeWidth: 4,
            strokeCap: "square"
          }
          function getDefaults(opts){
            var smallerDim = view.bounds.width<view.bounds.height ? view.bounds.width : view.bounds.height;
            var largerDim = view.bounds.width>view.bounds.height ? view.bounds.width : view.bounds.height;
            var defaults = {
              x: 10,
              y: 10,
              strokeWidth: 4,
              color1: 'red',
              color2: 'blue',
              area: new Path.Rectangle(
                view.bounds.center-[smallerDim*.375,smallerDim*.375],
                smallerDim*.75,
                smallerDim*.75)
            }
            for(var i in opts){
              if(defaults.hasOwnProperty(i)){
                defaults[i] = opts[i];
              }
            }
            style.strokeWidth = defaults.strokeWidth
            return defaults;
          }

          var opts = getDefaults(options);

          var group = new Group();
          // opts.area.set(style)
          for (var i = 0; i < opts.x+1; i++) {
            var x = opts.area.bounds.topLeft.x+opts.area.bounds.width*(i/opts.x)
            var line = new Path({segments: [new Point(x,opts.area.bounds.y),new Point(x,opts.area.bounds.y+opts.area.bounds.height)]})
            line.set(style)
            var unit = opts.area.bounds.width/opts.x;
            var counter = 0;
            while(line.length>unit){
              var newPath = line.split(line.length - unit*(counter === 0 ? .5 : 1));
              newPath.strokeColor = opts.color1 === "random" ? prettyRaCo() : opts.color1
              newPath.data.coord = [i,counter,0]
              if(false)
              var txt = new PointText({
                content: newPath.data.coord,
                position:  newPath.position- [50,50]
              })
              group.children.push(newPath)
              group.children[group.children.length-1][counter%2===0 ? 'bringToFront' : 'sendToBack']();
              counter++;
            }
            line[counter%2===0 ? 'sendToBack' : 'bringToFront']()
            line.strokeColor = opts.color1 === "random" ? prettyRaCo() : opts.color1
            line.data.coord = [i,counter,1]
            group.children.push(line);
          }
          counter = 0;
          for (var i = 0; i < opts.y+1; i++) {
            var y = opts.area.bounds.topLeft.y+opts.area.bounds.height*(i/opts.y)
            var line = new Path({segments: [new Point(opts.area.bounds.x,y),new Point(opts.area.bounds.x+opts.area.bounds.width,y)]})
            line.set(style)
            var unit = opts.area.bounds.width/opts.y;
            var counter = 0;
            while(line.length>unit){
              var  newPath = line.split(line.length - unit*(counter === 0 ? .5 : 1));
              newPath.strokeColor = opts.color2 === "random"  ? prettyRaCo() : opts.color2
              newPath.data.coord = [i,counter,1]
              if(false)
              var txt = new PointText({
                content: newPath.data.coord,
                position:  newPath.position- [50,20],
                color:"green"
              })
              group.children.push(newPath)
              group.children[group.children.length-1][counter%2===0 ? 'sendToBack' : 'bringToFront']();
              counter++;
              // line.strokeColor =
            }
            line.data.coord = [i,counter,1]
            line.strokeColor = opts.color2 === "random" ? prettyRaCo() : opts.color2
            group.children.push(line);
            group.children[group.children.length-1][counter%2===0 ? 'sendToBack' : 'bringToFront']();
            // horizontal.children.push(line);
          }

          var horiCount = 0;
          var vertCount = 0;
          for (var i = 0; i < group.children.length; i++) {
            var p = group.children[i];

            var orientation = group.children[i].bounds.width > opts.strokeWidth
            if(orientation && Math.random()>.5){
              p[horiCount%2===0 ? 'bringToFront' : 'sendToBack']();
              horiCount++;
            }
            else {
              p[vertCount%2===0 ? 'sendToBack' : 'bringToFront']();
              vertCount++;
            }

          }
          group.data = opts;
          return  group;
        }
        var gr = new grid({x: 30,y:30,strokeWidth: 8,color1: prettyRaCo(),color2: prettyRaCo()});

        function onMouseDown(){
          project.activeLayer.children.forEach(function(item, i){
            item.remove()
          });
          project.activeLayer.clear();
          gr = new grid({x: 30,y:30,strokeWidth: 8,color1: prettyRaCo(),color2: prettyRaCo()});
        }
---
