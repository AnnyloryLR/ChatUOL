
let userName= prompt('Por favor, insira um nome:')
let recipient= prompt('Quem pode ver essa mensagem?')

      


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
    

      messageList.innerHTML+=
    ` <li class="white-box chat">
        <p class="message"><time datetime="2024-10-01 15:01:00">(15:01:00)</time> <b>${userName}</b> para <b>${recipient}</b>: ${message}!</p>
      </li>`

}

