function writeReview(inoutList){
    console.log(inoutList)
    const popup = document.querySelector(".review-pop")
    const popClose = document.querySelector(".pop-close")

    if(inoutList.length != 0){
        location.href="/review/writeReview";
    }else{
        popup.style.display = "block";
        popup.style.opacity = "1";

        popClose.addEventListener("click", () =>{
            popup.style.opacity = "0";
        })
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