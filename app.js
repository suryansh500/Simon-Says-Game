let started=false;
let user_seq=[];
let game_seq=[];
let boxes=["red","yellow","green","blue"];
let level=0;
let highest_score=0;
let h2=document.querySelector("h2");
let h3=document.querySelector("h3");
document.addEventListener("keypress",function() {
    if(started==false) {
        started=true;
        setTimeout(levelup,300);
    }
})
function user_flash(box){
    box.classList.add("user_flash");
    setTimeout(function() {
        box.classList.remove("user_flash");
    },300);
}
function flash(box){
    box.classList.add("flash");
    setTimeout(function() {
        box.classList.remove("flash");
    },300);
}
function levelup(){
    user_seq=[];
    level++;
    h2.innerText=`Level ${level}`;
    let rndmidx=Math.floor(Math.random() * 4);
    let rndmcolor=boxes[rndmidx];
    let rndmbox=document.querySelector(`.${rndmcolor}`);
    game_seq.push(rndmcolor);
    flash(rndmbox);
}
function check(idx){
    if(user_seq[idx]==game_seq[idx]){
        if(user_seq.length == game_seq.length){
            setTimeout(levelup,1000);
        }
    } else {
        h2.innerHTML=`Game over ! Your score is <b>${level}<b> <br> Press any key to restart`;
        document.querySelector("body").style.backgroundColor="red";
        setTimeout(function(){
             document.querySelector("body").style.backgroundColor="white";
        },200);
        reset();
    }
}
function press(){
    let box=this;
    user_flash(box);
    usercolor=box.getAttribute("id");
    user_seq.push(usercolor);
    check(user_seq.length-1);
}
let allboxes=document.querySelectorAll(".box");
for(box of allboxes){
    box.addEventListener("click",press)
}
function reset(){
    started=false;
    user_seq=[];
    game_seq=[];
    if(highest_score<=level) {
        highest_score=level;
        h3.innerText=`Highest Score = ${highest_score}`;
    }
    level=0;
}
