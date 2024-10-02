
let userName= prompt('Por favor, insira um nome:')
let recipientNames= ""

      


function accessSidebar(){
    element = document.querySelector(".sidebar");
    element.classList.remove('hidden');
    shadow = document.querySelector(".shadow")
    shadow.classList.remove("clear")

}

function hideSidebar(){
    element = document.querySelector(".sidebar");
    element.classList.add('hidden');
    shadow = document.querySelector(".shadow")
    shadow.classList.add("clear")

}

function messageMode(){
    let getMessage = document.querySelector('.textarea')
    let message = getMessage.value
    let messageList = document.querySelector('ul')
    

      messageList.innerHTML+=
    ` <li class="white-box chat">
        <p class="message"><time datetime="2024-10-01 15:01:00">(15:01:00)</time> <b>${userName}</b> para <b>Todos</b>: ${message}</p>
      </li>`

      document.querySelector('.textarea').value = ""

      messageList.innerHTML+=
      `<li class="red-box private">
        <p class="message"><time datetime="2024-10-01 15:01:00">(15:01:00)</time> <b class="name">${userName}</b> reservadamente para <b class="recipient">${recipient}</b>: ${message}</p> 
      </li>`
      document.querySelector('.textarea').value = ""
}

function recipient(element){
  let selectedBefore = document.querySelector('.selected')
  let selectedNow =element.classList.value;
  let checked = element.querySelector('.mark');


  if(selectedBefore !== null && selectedNow.includes('selected') === false){
    let checkedBefore = selectedBefore.querySelector('.mark')
    selectedBefore.classList.remove('selected')
    checkedBefore.classList.add('invisible');
    element.classList.add('selected');
    checked.classList.remove('invisible');

  } else if(selectedBefore === null){
    element.classList.add('selected');
    checked.classList.remove('invisible');

  }  else{
    element.classList.remove('selected');
    checked.classList.add('invisible');

  }


}

function statusMode(element){
  let selectedBefore = document.querySelector('.selected2')
  let selectedNow =element.classList.value;
  let checked = element.querySelector('.mark');


  if(selectedBefore !== null && selectedNow.includes('selected2') === false){
    let checkedBefore = selectedBefore.querySelector('.mark')
    selectedBefore.classList.remove('selected2')
    checkedBefore.classList.add('invisible');
    element.classList.add('selected2');
    checked.classList.remove('invisible');

  } else if(selectedBefore === null){
    element.classList.add('selected2');
    checked.classList.remove('invisible');

  }  else{
    element.classList.remove('selected2');
    checked.classList.add('invisible');

  }


}



