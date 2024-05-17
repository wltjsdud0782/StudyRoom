function pageNo1(){
  const page = document.querySelector('#page-no').value;
  const a = document.querySelector(".asd");

  const b = document.querySelectorAll(".userSideMenu> li ")

  for(let i = 0 ; i<b.length ; i++){
      if(page == i+1){
          b[i].style.backgroundColor="#f1f1f186";
          b[i].style.color="#ffffff";
      }
      else{
          b[i].style.color="#ffffff";
      }
  }
  return;
}

pageNo1()