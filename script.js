
let userName= prompt('Por favor, insira um nome:')
let recipientName= "Todos"
let messageMode="Público"

      


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

function message(){
    let getMessage = document.querySelector('.textarea')
    let message = getMessage.value
    let messageList = document.querySelector('ul')
    
    
    if(messageMode === 'Público' && recipientName !== ""){
      messageList.innerHTML+=
      ` <li class="white-box chat">
          <p class="message"><time datetime="2024-10-01 15:01:00">(15:01:00)</time> <b>${userName}</b> para <b>${recipientName}</b>: ${message}</p>
        </li>`
  
      document.querySelector('.textarea').value = ""
  

    } else if(messageMode === 'Reservadamente' && recipientName !== "" && recipientName !== 'Todos'){

      messageList.innerHTML+=
      `<li class="red-box private">
        <p class="message"><time datetime="2024-10-01 15:01:00">(15:01:00)</time> <b class="name">${userName}</b> reservadamente para <b class="recipient">${recipientName}</b>: ${message}</p> 
      </li>`
      document.querySelector('.textarea').value = ""

    } else{ 
      alert("Por favor, escolha um Contato e a Visibilidade")
      document.querySelector('.textarea').value = ""

    }

    console.log(recipientName)
    console.log(messageMode)
    listRefresh()
  //*******Para atualizar a lista: console.log(messageList.lastChild)
   
}

function recipient(element){
  let selectedBefore = document.querySelector('.selected');
  let selectedNow =element.classList.value;
  let checked = element.querySelector('.mark');
  let chosen = element.querySelector('.name');


  if(selectedBefore !== null && selectedNow.includes('selected') === false){
    let checkedBefore = selectedBefore.querySelector('.mark');
    selectedBefore.classList.remove('selected');
    checkedBefore.classList.add('invisible');
    element.classList.add('selected');
    checked.classList.remove('invisible');
    return recipientName = chosen.innerHTML

  } else if(selectedBefore === null){
    element.classList.add('selected');
    checked.classList.remove('invisible');
    return recipientName = chosen.innerHTML

  }  else{
    element.classList.remove('selected');
    checked.classList.add('invisible');
    //return recipientName = ""

  }


}

function statusMode(element2){
  let selectedBefore2 = document.querySelector('.selected2');
  let selectedNow2 =element2.classList.value;
  let checked2 = element2.querySelector('.mark2');
  let chosen2 = element2.querySelector('.status');

  

  if(selectedBefore2 !== null && selectedNow2.includes('selected2') === false){
    let checkedBefore2 = selectedBefore2.querySelector('.mark2');
    selectedBefore2.classList.remove('selected2');
    checkedBefore2.classList.add('invisible2');
    element2.classList.add('selected2');
    checked2.classList.remove('invisible2');
    return messageMode = chosen2.innerHTML
 
 
  } else if(selectedBefore2 === null){
    element2.classList.add('selected2');
    checked2.classList.remove('invisible2');
    return messageMode = chosen2.innerHTML;

  }  else{
    element2.classList.remove('selected2');
    checked2.classList.add('invisible2');
    //return messageMode = ""

  }


}


function listRefresh(){

  /// reload the page a cada 3s
  /// a cada 5s atualizar status de quem esta na sala

  /// manter a ultima mensagem visivel
  
  let messageList = document.querySelector('ul');
  let lastMessage = messageList.lastChild
  lastMessage.scrollIntoView();


}

function reloading() {
  location.reload();
}

