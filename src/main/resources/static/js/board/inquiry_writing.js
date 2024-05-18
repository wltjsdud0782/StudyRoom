function goWriting(){
   const checked = document.querySelector(".boardSecret").checked;
   const checkBox =document.querySelector(".boardSecret").value;
   const title = document.querySelector(".boardTitle")
   const board = document.querySelector(".boardContent");

   const popUp3 = document.querySelector(".popUp-3")
   const popUp4 = document.querySelector(".popUp_4")

   if(checked){
    checkBox.value = 'YES'
   }else(
    checkBox.value = 'NO'
   )
   
   if(title.value == '' ){

      popUp3.style.display = 'block';

      document.querySelector(".pop_up_close").addEventListener('click', function(){
         popUp3.style.display = 'none';
      })

      return;
   }

   if(board.value == ''){

      popUp4.style.display = 'block';

      document.querySelector(".close").addEventListener("click",function(){
         popUp4.style.display = 'none';
      })

      return;
   }
   


   document.querySelector(".writingForm").submit();
}

function readURL(input){
   let fileTag = document.querySelector('input[name=file]'); 
   let tdTag =document.querySelector(".tdTag");

   const popUp = document.querySelector('.popUp');

   if(fileTag.files.length <= 3) {
      const popUp2 = document.querySelector('.popUp-2');
      const popDelete = document.querySelector(".popDelet");
      //파일 올렸을때
      
      // 이미지 scr에 들어갈 데이터 구하기
      for(let i = 0; i < fileTag.files.length; i++){
         
         let reader = new FileReader();

         reader.onload = function(e) {

            //이미지 태그 만들기
            let imgTag = document.createElement('img');

            //이미지 속성
            imgTag.setAttribute('src', e.target.result);
            imgTag.setAttribute('width', '170');
            imgTag.setAttribute('height', '170');
            imgTag.setAttribute('class', 'imgTag')
            //이미지 태그 집어넣기
            tdTag.appendChild(imgTag);
   
            document.querySelector(".file_one").style.display = 'none';

            imgTag.addEventListener("click", function(){
               popUp2.style.display = 'block'; 
            });
            popDelete.addEventListener("click", function(){
               imgTag.remove();
               popUp2.style.display = 'none';
               document.querySelector(".file_one").style.display = 'block';
            })  
         }
         reader.readAsDataURL(fileTag.files[i]);

        
      }
   }else{
      popUp.style.display = 'block';
      document.querySelector(".popClose").addEventListener("click", function(){
         popUp.style.display = "none";
      })
   }


   





   // if(input.files.length <= 3 ){

   //    let reader = new FileReader();

   //    for(let i = 0; )
   //    reader.onload = function(e){
   //       document.querySelector(".preview").src = e.target.result;
   //    }
      
   //    fileOne.innerHTML = '';
      
   //    reader.readAsDataURL(input.files.length);
   // }else{
   //    alert("사진은 최대 3장까지 첨부할 수 있습니다.")
   // }

   // for(let i = 0; i < input.files.length; i++){
   //    let reader = new FileReader();

   //    reader.onload = function(e){
   //    }


   // }
   
   // const text = document.querySelector(".img_text")
   // const fileOne =document.querySelector(".file_one")

   // if(input != ''){
   //    text.textContent = '이미지 첨부 완료.';
   // }

   // if(input.files && input.files[0]){
   //     let reader = new FileReader();

     
   //     reader.onload = function(e){
   //        document.querySelector(".preview").src = e.target.result;
   //     }
      
   //     fileOne.innerHTML = '';
   //     //input.closest('td').insertAdjacentHTML('beforeend', str);
   //     reader.readAsDataURL(input.files[0]);


      // let str = '';
      // reader.onload = function(e){
   
      //    for(let i = 0 ; i < input.files.length ; i++){
      //       alert(e.target.result);
      //       str += `
      //          <img class="preview" style="border: 1px solid #000" src="${e.target.result}">
      //       `;
      //       reader.readAsDataURL(input.files[i]);
      //    }
      // }
      // fileOne.innerHTML = '';
      // input.closest('td').insertAdjacentHTML('beforeend', str);

   // }
   // else {
   //    document.querySelector(".preview").src = "";
   // }

}
const popUp2 = document.querySelector('.popUp-2');
const imgPop = document.querySelector('.imgTag');

// function popDelete(){
//    imgPop.remove();
// }

function popReset(){

   popUp2.style.display = 'none';

}


