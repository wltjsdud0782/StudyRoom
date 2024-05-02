function writeReview(inoutList, loginInfo){
    console.log(inoutList)
    const popup = document.querySelector(".review-pop")
    const popClose = document.querySelector(".pop-close")


    if(loginInfo == null){
        popup.style.display = "block";
        popup.style.opacity = "1";

        popClose.addEventListener("click", () =>{
            popup.style.opacity = "0";
        })
    }
    else if(loginInfo != null){
        if(inoutList.length != 0 || inoutList != ''){
            location.href="/review/writeReview";
        }else{
           console.log("!!!")
        }
    }
    
    // for (const inout of inoutList) {
    //     if(inout.inOut != ''){
    //         location.href="/review/writeReview";
    //     }else{
    //         alert("!!!!")
    //     }
    //     console.log(inout.inOut)
    // //    if(inout.inOut == IN || inout.inOut == OUT){
    // //     
    // //    }else(
    // //     alert("!!!")
    // //    )
    // }
    
} 
const reviewMain = document.querySelector(".reviewMain")

let cnt = null;

const move = e => {
    if(!e.target.classList.contains("review-body")) return;

    let shifhX = e.clientX - e.target.getBoundingClientRect().left;
    let shifhY = e.clientY - e.target.getBoundingClientRect().top;

    e.target.style.position = 'absolute';
    e.target.style.zIndex = 1000;

    reviewMain.append(e.target);

    moveAt(e.pageX , e.pageY);

    function moveAt(pageX , pageY){
        e.target.style.left = pageX - shifhX + 'px';
        e.target.style.top = pageY - shifhY + 'px';
    }

    function onMouseMove (event){
        moveAt(event.pageX, event.pageY);

        e.target.hidden = true;
        let elemBelow = document.elementFromPoint(event.clientX, event.clientY);
        e.target.hidden = false;

        if(!elemBelow) return;

        let droppableBelow = elemBelow.closest('.droppable')
        if(cnt != droppableBelow){
            if(cnt){
                leaveDroppable(cnt)
            }
            cnt = droppableBelow;
            if(cnt){
                enterDroppable(cnt);
                appendSideElement(e.target, droppableBelow);
            }
        }
    }

    document.addEventListener('mousemove' , onMouseMove);

    e.target.onmouseup = function (){
        document.removeEventListener('mousemove', onMouseMove);
        e.target.onmouseup = null;
    }
    function enterDroppable(elem) {
        elem.style.borderColor = 'blue';
      }

    function appendSideElement(elem, target) {
        const temp = elem;
        temp.style = "";
        temp.style.transition = 'transition: all 3s linear;';
        temp.className = "mini";
        elem.remove();
        target.append(temp);
      }
      
      function appendMainElement(elem) {
        elem.className = "mini";
        side.append(elem);
      
      }
      
      function leaveDroppable(elem) {
        elem.style.background = '';
      }
      
      con.ondragstart = function () {
        return false;
      };
      
      con.addEventListener('mousedown', moveContainer);
      
}