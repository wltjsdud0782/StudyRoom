function goWriting(){
   const checked = document.querySelector(".boardSecret").checked;
   const checkBox =document.querySelector(".boardSecret").value;

   console.log(checked)
   console.log(checkBox)

   if(checked){
    checkBox.value = 'YES'
   }else(
    checkBox.value = 'NO'
   )
   document.querySelector(".writingForm").submit();
}
function readURL(input){
   const img = document.querySelector(".img_text").textContent;
   console.log(img)
   
   img.textContent = '이미지 첨부가 완료 되었습니다.';
}