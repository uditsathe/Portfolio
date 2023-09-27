

const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});

function firstPageAnim(){
    var tl=gsap.timeline();

    tl.from("#nav",{
        y:'-10',
        opacity:0,
        duration:2,
        ease:Expo.easeInOut
    })

    .from(".bounding",{
        x:-1200,
        duration:1,
        ease:Expo.easeInOut,
        stagger:.2
    })
    
    .from("#smallheadings",{
        y:100,
        duration:1,
        ease:Expo.easeInOut,
    })
    .to(".boundingTitle",{//.to indicates that we are operating with respect to the final position where anim. will end//
        y:0,//end position is y=0 with respect to the the boundingTitle div//
        duration:1.3,
        delay:-1,//this is because i think this anim. was lagging a bit//
        ease:Expo.easeInOut,//animation name
        stagger:.2 //puts a small gap in the time at which the animations are triggered//
    })

    
    // .to(".circle",{
    //     y:0,
    //     duration:1.3,
    //     ease:Expo.easeInOut
    // })
}


function circleSkew(bool){
    var xscale=1;
    var yscale=1;

    var xprev=0;
    var yprev=0;

    window.addEventListener("mousemove", function(details){

      var xdiff= details.clientX-xprev;//clientX tell the current location of mouse in x-axis//
      var ydiff= details.clientY-yprev;
      
      //the following function from gsap setails the value to 0.8 if it is smaller than that nad to 1.2 if it is greater
      //thses values that we will get we will use to determine degree of skewness of the mouseball 
      xscale = gsap.utils.clamp(.5,1.5, xdiff);
      yscale = gsap.utils.clamp(.5,1.5, xdiff);

      xprev=details.clientX;//changing prev values for next point calculation//
      yprev=details.clientY;

      circleMouseFollower(xscale,yscale);

      if(bool==true){
        timeout=setTimeout(function(){
            circleMouseFollower(5,5);//setting scale to 1:1 if the mouse is at rest for 100 miliseconds//
           },100);
      }
      timeout=setTimeout(function(){
       circleMouseFollower(1,1);//setting scale to 1:1 if the mouse is at rest for 100 miliseconds//
      },100);

    });
}

function circleMouseFollower(xscale, yscale){
    window.addEventListener("mousemove",function(details){
        //IMP LINE FOLLOWS NOTE HOW SCALES PASSED ABOVE ARE USED AND THE SYNTAX
       document.querySelector("#minicircle").style.transform =`translate(${details.clientX}px, ${details.clientY}px) scale(${xscale}, ${yscale})`;
    });
}

circleSkew();
circleMouseFollower();
firstPageAnim();

//the querySelectorAll will return a list of all the elemts for each of which we will apply function
document.querySelectorAll(".project").forEach(function(project){
    var rotate=0;
    var diffRot=0;
    project.addEventListener("mouseleave", function(details){
         gsap.to(project.querySelector("img"),{
           opacity : 0,
           duration:0.5,
         });
         });

    project.addEventListener("mousemove", function(details){//does the following if the mouse moves over any class= project element//
      
        var diff= details.clientY-project.getBoundingClientRect().top;//this line finds at what distance below the top border of the div is you mouse
       
       diffRot=details.clientX - rotate;
       rotate=details.clientX;
    
        gsap.to(project.querySelector("img"),{
          opacity: 1,
          top:diff,//this line finds at what distance below the top border of the div is you mouse,
          left:details.clientX,
          rotate:gsap.utils.clamp(-20,20,diffRot),
        });
    });
});
