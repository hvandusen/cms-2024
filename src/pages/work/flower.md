---
templateKey: work
title: Flower
type: Candusen page
date: 2024-01-29T15:21:00.000Z
featuredimage:
  - https://res.cloudinary.com/candusen/image/upload/v1707321014/Screenshot_2024-02-07_at_10.49.03_AM_dudq8t.png

paper_code:
  code: >- 
    var path;


    function onMouseDown(event){
    if(path) path.remove();
    project.activeLayer.removeChildren();
    flower(event.point);
    }

    function prettyRaCo(){
        var r = Math.floor(Math.random()*255);
        var g = Math.floor(Math.random()*255);
        var b = Math.floor(Math.random()*255);
        return "rgb("+r+","+g+","+b+")";
    }

    function petal(size,point,point2){
        path = new Path();
        var x1 = point.x * 0.20 + 0.30;
        var y1 = point.y * 0.24 + 0.20;
        midPoint1 = new Point(size * x1, size * y1);
        var x2 = point2.x * 0.50 + 0.15;
        var y2 = point2.y * 0.24 + 0.20;
        midPoint2 = new Point(size * x2, size * y2);
        path.add(new Point(size*.25, size*.5));
        path.curveTo(midPoint1,new Point(size*.75, size*.5));
        var copy = path.clone();
        copy.scale(1,-1);
        var diff = path.firstSegment.point.subtract(copy.firstSegment.point);
        copy.position = copy.position.add(diff);
        var result = path.join(copy);
        copy.remove();
        
        result.bounds.leftCenter = view.center;
        return result;
    }

    
    function angle(opposite,adjacent){
        return Math.atan(opposite/adjacent);
    }
    var flowerSize = view.bounds.width/3;
    function flower(pt){
        var petals = num(4)+20;
        var colorAmount = num(3)+1;
        var colors = [];
        for(var i = 0; i < colorAmount; i++){
            colors.push(prettyRaCo());
        }
        var group = new Group();
        var angle = 0;
        var point = Point.random();
        var point2 = Point.random();
        var budRadius = flowerSize*.05;
        var petalAngle;
        var bud = new Path.Circle(view.center, budRadius*2);
        bud.fillColor = colors[num(colors.length)];
        group.children.push(bud);
        var flowerBg = new Path.Circle(view.center, budRadius*6);
        flowerBg.fillColor = colors[num(colors.length)];
        group.children.push(flowerBg);
        var totalLoops = num(15)+2;
        for(var l = totalLoops; l > -1; l--){
            var alternation = num(50)/50;
            var loopAround = num(2);
            var petalsGroup = new Group();
            for(var i = 0; i < petals; i++){
            
            if(!loopAround && petalAngle*i>365) break;
            var pet = petal(flowerSize* (l*.5) * ( false && i % 2 === 0 ? alternation : 1 ),point,point2);
            var gradientStops = [colors[i%colors.length], colors[(i+1)%colors.length]];
            if(num(2)){
                gradientStops.push(colors[(i+2)%colors.length]);
            }
            var gradient = {
                gradient: {
                    stops: gradientStops
                },
                origin: pet.bounds.leftCenter,
                destination: pet.bounds.rightCenter
            }
            pet.fillColor = gradient;
            if(!petalAngle && pet.bounds.width && pet.bounds.height){
                var petalAspectRatio = pet.bounds.height/(pet.bounds.width);
                petalAngle = Math.tan(petalAspectRatio);
                petalAngle = Math.min(90,petalAngle / (2*Math.PI) * 360);
                console.log(pet.bounds)
            }
            pet.position +=[budRadius*.3*l,0];
            pet.rotate(petalAngle*i,bud.position);
            bud.bringToFront();
            petalsGroup.children.push(pet);
            }
            group.children.push(petalsGroup);
            petalAngle = null;
            var lastPetal = petalsGroup.children[petalsGroup.children.length-1];
            var intersected = [];
            for(var i = 1; i < petalsGroup.children.length-1; i++){
            if(lastPetal.intersects(petalsGroup.children[i])){
                intersected.push(petalsGroup.children[i]);
            }
            }
            var reduced = intersected.reduce(function(acc,cur){
                return acc.subtract(cur,{insert: false});
            },lastPetal);
            lastPetal.remove();
            petalsGroup.children.push(reduced);
            colorAmount = num(3)+1;
            colors = [];
            for(var i = 0; i < colorAmount; i++){
            colors.push(prettyRaCo());
            }
            petalsGroup.scale(.6+(num(100)/250));
            point = Point.random();
            point2 = Point.random();
        }
        group.rotate(num(360));

        var stem = new Path();
        stem.strokeColor = "green";
        stem.add(view.center);
        stem.add(view.center.add([0,group.bounds.height*1.5]));
        stem.rotate(num(6)-3,view.center);
        stem.add(view.center.add([0,group.bounds.height*2]));
        stem.strokeWidth = 3;
        stem.simplify();
        group.addChild(stem);
        group.sendToBack();
        group.fitBounds(view.bounds);
        group.scale(window.innerWidth > 480 ? 2 : 1.25);
        group.position = view.center;
        var budOffset = group.children[0].position.subtract(window.innerWidth < 480 ? [0,-300]:[0,0]).subtract(pt);
        group.position = group.position.subtract(budOffset);
        
        return group;
    }

    window.petal = petal;
---
