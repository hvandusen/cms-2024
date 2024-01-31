---
templateKey: work
title: Tree
type: Candusen page
draft: false
date: 2020-07-29T15:54:31.304Z
date-finish: 2021-05-19T19:53:46.517Z
featuredimage:
  - https://res.cloudinary.com/candusen/image/upload/v1600433826/Screen_Shot_2020-09-18_at_8.52.19_AM_eiug91.png
paper_code:
  code: >
    var spot;

    var output;

    var v;

    var lf;// = tree(4+Math.random()*4, view.center+[0,200],15+Math.random()*90);

    //console.dir(lf)

    var newp;

    var leaff ;


    var ctttr = view.center + [0,100]

    var nextThing = new Path();

    var shapps;

    var leafs = [];

    var leafSize = window.innerWidth<480 ? 50 : 100;


    function lineToLeaf(path,thickness){
    	var veinSkip = 10;
    	var rootAngle = false;
    	outGroup = new Group();
    	veinGroup = new Group();
    	output = new Path({segments: [path.segments[0].point]});
    	thisThickness = path.length*(.35)+.1*Math.random();
    	root = path.clone();
    	root.smooth();

    	for(var i =0;i<Math.floor(path.length+1);i+=2){
    		spot = path.getPointAt(i);
    		if(nextSpot = path.getPointAt(i+2)){
    			v = (nextSpot-spot);
    			v.length = Math.abs(Math.sin(3*i/path.length)*thickness);
    			v.angle += 90;
    			output.add(new Point(spot+v));
    			v.angle += 180;
    			output.insert(0,new Point(spot+v));
    		}
    		else {
    			v.angle +=90;
    			v.length *= path.length/thickness*.31;
    			//v.length *= path.length*.01800;
    			output.insert(0,new Point(spot+v));
    			output.simplify();
    			output.closed = 'true';
    		}

    	}
    	//leaf veins!!!!
    	for(var i =0;i<Math.floor(path.length+1);i+=2){
    		spot = path.getPointAt(i);
    		if(nextSpot = path.getPointAt(i+2)){
    			v = (nextSpot-spot);
    	if(i%veinSkip === 0 ){
    		p2 = new Point(spot+v*200);
    		vein = new Path([spot,p2]);
    		if(rootAngle)
    			vein.rotate(45,spot)
    		else {
    			vein.rotate(-45,spot)
    		}
        var intersections = output.getIntersections(vein)
        if(!intersections.length)
          return
    		veinEnd = output.getIntersections(vein)[0].point
    		rootAngle = !rootAngle;
    		finalVein = new Path([spot]);
    		toCurve = new Point(veinEnd-spot)/2;
    		//v.rotate(Math.random())
    		if(rootAngle)
    		toCurve.rotate(-32,spot);
    		else {
    		toCurve.rotate(32,spot);
    		}
    		finalVein.add(spot+toCurve+Point.random()*3);
    		finalVein.add(veinEnd);
    		finalVein.smooth();
    		finalVein.strokeColor = 'black';
    		finalVein.strokeWidth = .5;
    		veinGroup.children.push(finalVein);
    	}}
    }
    	output.fillColor = prettyRaCo();
    	darkness=200;
    	colorScheme = Math.floor(Math.random()*1536);
    	root.strokeColor='black';
    	root.bringToFront();
    	outGroup.children.push(output);
    	outGroup.children.push(root);
    	outGroup.children.push(veinGroup);
    	return outGroup;//utput;
    }


    //start point, direction, which level we are

    var branch = function(point,direction,level){
    	if(level>maxLevels)
    		return;

    	//higher levels have smaller branches, fit to window height by this constant
    	var bLength = Math.random()*100+(maxLevels-level)*30//(window.innerHeight/5)-level *200//((1+level)/maxLevels)*window.innerHeight/2);
    	var vec = direction*bLength;
    	var branches = [];
    	var randomBranchSkip = Math.floor(Math.random()*(maxBranches));
    	if(maxBranches-randomBranchSkip<0)
    		return
    	for(var i=0;i<maxBranches-randomBranchSkip;i++){
    		branches[i] = out1 = new Path();
    		branches[i].add(point);
    		vec.angle = Math.random()*120+(i*90)%180
    		if(false)
    		if(Math.random()>.5){
    			vec.angle = level*15+(Math.random()*20);//* Math.random()*180;
    		}
    		else {
    			vec.angle = 180-(level*15+(Math.random()*40));//* Math.random()*180;
    		}
    		branches[i].add(point-vec);
    		branches[i].strokeColor = 'black';
    		branches[i].subBranches = branch((point-vec),vec.normalize(),level+1);
    	}

    	return branches;
    }

    var rootWidth = .5*window.innerWidth*.1;

    var firstBranch = window.innerHeight*.1;

    var maxBranches = 4;

    var maxLevels = 4;

    function createRoot(point){
    	var trace = new Path({
    		segments: [point,(point-[0,firstBranch])],
    		strokeColor:'black'
    	});
    	return trace;
    }




    function tree(){
    	var st = new Point(view.bounds.center.x,view.bounds.height);
    	var rt = createRoot(st);
    	thetree = branch(rt.segments[rt.segments.length-1].point,new Point(0,-1),0);
    	return {
    		subBranches : thetree
    		};




    }

    var myTree = tree();

    function traverse(tree,effect){
    	if(tree.subBranches === undefined)
    		return
    	if(tree.hasOwnProperty('subBranches')){
    		tree.subBranches.map(function(e,i){
    			effect(e);
    			traverse(e,effect);
    		});
    	}
    }


    traverse(myTree,function(path){
    	applyLeafs(path);
    });


    function applyLeafs(path){
    	var cnt = Math.random()*2;
    	for(var i=0;i<cnt;i++){
    		pt = path.getPointAt(path.length*Math.random());
    		vec = new Point(40+Math.random()*5,40+Math.random()*5);
    		vec.angle = -Math.random()*180;
    		newp = new Path({segments: [pt,(pt+vec/2*Point.random()),pt+vec]})
    		var lTl = lineToLeaf(new Path({
          segments: [pt,(pt+vec/2*Point.random()),pt+vec]
        }),10+Math.random()*20)
        if(lTl)
          lTl.isLeaf = true
      }
    }

    var moved = null;

    function onMouseDown(e){
    	project.activeLayer.clear()
    	if(!tree)
    		return
    	myTree = tree();
    	traverse(myTree,function(path){
    		applyLeafs(path);
    	});
    }
---
