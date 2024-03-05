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