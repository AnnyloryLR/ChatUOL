let chat = [{from:"João", to: "Todos", text:"entra na sala...", type:"status", time:"08:01:50"},
            {from:"João", to: "Todos", text:"Bom dia", type:"message", time:"08:02:50"},
            {from:"Maria", to: "João", text:"Oi João :)",type:"private_message", time:"08:03:50" },
            {from:"João", to: "Maria", text:"Oi gatinha quer tc?", type:"private_message", time:"08:04:50"},
            {from:"Maria", to: "Todos", text:"sai da sala...", type:"status", time:"08:04:50"}
]

const users = [{name:"João"},{name:"Maria"}]


const roomID = "5c28a11f-e350-4b3f-97dd-ddeb552a1465"
const adress = "https://mock-api.driven.com.br/api/v6/uol/"

let recipientName= "Todos"
let messageMode="Público"




/*function postMessages(){
  const sendMessages = axios.post("https://mock-api.driven.com.br/api/v6/uol/messages/" + roomID, chat);
  sendMessages.then(processSuccess);
  sendMessages.catch(processError);


}postMessages()*/
     


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

function addUser(){
  let user= {name:prompt('Por favor, insira um nome:')}
    
  users.push(user);
  
  addUsersToServer()

}

function addUsersToServer(){
  let usersList = document.querySelector('.userList');
  usersList.innerHTML = ""
  
  for(let i=0; i < users.length; i++){
    promise = axios.post(adress+'participants/'+roomID, users[i])
    promise.then(processSuccess);
    promise.catch(processError);

    usersList.innerHTML+=
      `<li class="options" onclick="recipient(this); statusText()">
        <ion-icon class="svg" name="people"></ion-icon>
        <p class="name">${users[i].name}</p>
        <svg class="mark invisible" width="9" height="7" margin viewBox="0 0 13 11" fill="none"           xmlns="http://www.w3.org/2000/svg">
          <path d="M11 2L4.7 9L2 6.375" stroke="#28BB25" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>   
      </li>`

    
  }

}


function getMessage(){
 
  let getMessage = document.querySelector('.textarea');
  let message = getMessage.value;
  let type = "";
  
  if(messageMode === 'Público'){
    type = "message"
    chat.push({from:user.name, to: recipientName, text:message, type:type, time:"08:04:50"})

  } else{

    type = "private_message"

    chat.push({from:user.name, to: recipientName, text:message, type:type, time:"08:04:50"})

  }

  document.querySelector('.textarea').value = ""

  messageRender()


}

function messageRender(){
    
    let messageList = document.querySelector('.messages');
    messageList.innerHTML = "";
    for(let i=0; i < chat.length; i++){

      if(chat[i].type === "message"){
        messageList.innerHTML+=
        ` <li class="white-box chat">
            <p class="message"><time datetime="2024-10-01 15:01:00">(15:01:00)</time> <b>${chat[i].from}</b> para <b>${chat[i].to}</b>: ${chat[i].text}</p>
          </li>`
       
  
      } else if(chat[i].type === "private_message"){
  
        messageList.innerHTML+=
        `<li class="red-box private">
          <p class="message"><time datetime="2024-10-01 15:01:00">(15:01:00)</time> <b class="name">${chat[i].from}</b> reservadamente para <b class="recipient">${chat[i].to}</b>: ${chat[i].text}</p> 
        </li>`
      

      } else{
        messageList.innerHTML+=
        `<li class="gray-box statusMessage">
          <p class="message"><time datetime="2024-10-01 15:01:00">(15:01:00)</time> <b class="name">${chat[i].from}</b> ${chat[i].text}</p> 
        </li>`


      }

    }
    
        
    listRefresh();
   
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

  }
 

}

function statusText(){
  let modeMessage = document.querySelector('span');

  if(messageMode === "Reservadamente" && recipientName !== "Todos"){
     modeMessage.innerHTML = `Enviando para ${recipientName} (reservadamente)`;

  } else if(messageMode === "Reservadamente" && recipientName === "Todos"){
     alert("Mensagens em modo reservado não podem ser enviadas para Todos");

  } else{
    modeMessage.innerHTML = `Enviando para ${recipientName} (público)`;
  }
}


function listRefresh(){

  let messageList = document.querySelector('.messages');
  let lastMessage = messageList.lastChild
  lastMessage.scrollIntoView();

}

function reloading() {
  location.reload();
}

function processSuccess(answer){
  alert("Sucesso!")
  console.log(answer)

}

function processError(error){
  alert("Houve um erro, tente novamente mais tarde!")
  console.log(error)

}
addUser()
messageRender()
