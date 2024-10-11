let messages = [{from:"João", to: "Todos", text:"entra na sala...", type:"status", time:"08:01:50"},
  {from:"João", to: "Todos", text:"Bom dia", type:"message", time:"08:02:50"},
  {from:"Maria", to: "João", text:"Oi João :)",type:"message", time:"08:03:50" },
  {from:"João", to: "Maria", text:"Oi Maria, tudo bem contigo?", type:"message", time:"08:04:50"},
  {from:"Maria", to: "João", text:"Tudo e você, animado para começar o projeto?", type:"message", time:"08:04:50"}]

let statusMessage= {}

let users = [{name:"João"},{name:"Maria"}];
let user= addUser();


const roomID = "603bf686-f2a1-46d9-9bbb-494c9b917adc";
const adress = "https://mock-api.driven.com.br/api/v6/uol/";

let recipientName= "Todos"
let messageMode="Público"


//users
function processUserError(answer){
  let condition = answer.response.data === 'Bad Request';
  if(condition === true){
      userName = {name:prompt('Por favor, insira outro nome:')};
      addUser();
  }

  else{
      alert("Ocorreu um erro inesperado, tente mais tarde!")

    } 
}

function addUser(){
  let userName = {name:prompt('Por favor, insira um nome:')};
  let conditionName = userName === null;
  if(conditionName === true){
    while(conditionName === true){
      userName = {name:prompt('Por favor, insira um nome:')};
      conditionName = userName === null;
    } 
  }
  
  let postUser = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants/603bf686-f2a1-46d9-9bbb-494c9b917adc", userName)
  postUser.then(processSuccess);
  postUser.catch(processUserError)
  users.push(userName)
  
  return userName;

}

function addUsersToServer(){
  let usersList = document.querySelector('.userList');
  usersList.innerHTML=""
  users = users.sort()

    for(let i=0; i < users.length; i++){
      promiseUsers = axios.post(adress + "participants/" + roomID, users[i]);
      promiseUsers.then(processSuccess);
      promiseUsers.catch(processError);
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
  

function getUsersFromServer(){
  getUsers = axios.get(adress + "participants/" + roomID);
  getUsers.then(processList);
  getUsers.catch(processError);  

}

function processList(usersListServer){
  if(usersListServer.data.length === 0){
      addUsersToServer();
  
  } else{
    users = usersListServer.data
      addUsersToServer();
      return users
  } 
  
}


function keepUsersConnected(){
  for(let counter=0; counter < users.length; counter++){
    let promiseConnect = axios.post(adress+'participants/'+roomID, users[counter]);
    promiseConnect.then(processSuccess);
    promiseConnect.catch(processError);

  }

}

//messages
function addMessagesFromChat(){
  
    for(let c=0; c < messages.length; c++){
   
      let localMessage = axios.post(adress + "messages/"+ roomID, {from:messages[c].from, to:messages[c].to, text:messages[c].text, type:messages[c].type, time:messages[c].time})
      localMessage.then(processSuccess)
      localMessage.catch(processError) 
    }

   messageRender();

}

function addMessage(){ 
  let getMessage = document.querySelector('.textarea');
  let message = getMessage.value;
  let type = "";

   
  if(messageMode === 'Público'){
    type = "message"
    let localMessage = axios.post(adress + "messages/"+ roomID, {from:user.name, to: recipientName, text:message, type:type, time:"08:04:50"})
    messages.push(localMessage);
    localMessage.then(processSuccess)
    localMessage.catch(processError)
    
  } else{
    type = "private_message"
    let localMessage = axios.post(adress + "messages/"+ roomID, {from:user.name, to: recipientName, text:message, type:type, time:"08:04:50"})
    messages.push(localMessage);
    localMessage.then(processSuccess)
    localMessage.catch(processError)

  }

  document.querySelector('.textarea').value = ""

  getMessages()
}  

function getMessages(){
  let promise = axios.get(adress + "messages/"+ roomID);
  promise.catch(processError);
  promise.then(processData);
  
}

function processData(answer){

  if(answer.data.length === 0){
    addMessagesFromChat();
  } else{
    messages = answer.data;
    lastStatus = messages.filter(message => message.type === "status");
    messages = messages.filter( message => message.type === "message" || message.type === "private_message");
    statusMessage = lastStatus[lastStatus.length - 1]
    
    addMessagesFromChat()
    return messages, statusMessage; 
     
  } 

}

function messageRender(){ 
  let messageList = document.querySelector('.messages');
  messageList.innerHTML = "";
    for(let i=0; i < messages.length; i++){
      if(messages[i].type === "message"){
       messageList.innerHTML+= ` 
         <li class="white-box chat">
           <p class="message"><time datetime="2024-10-09 10:25:00">(${messages[i].time})</time> <b>${messages[i].from}</b> para <b>${messages[i].to}</b>: ${messages[i].text}</p>
         </li>`
     
     } else if(messages[i].type === "private_message" && messages[i].from === user || messages[i].to === user){
 
       messageList.innerHTML+=`
         <li class="red-box private">
           <p class="message"><time datetime="2024-10-09 10:25:00">(${messages[i].time})</time> <b class="name">${messages[i].from}</b> reservadamente para <b class="recipient">${messages[i].to}</b>: ${messages[i].text}</p> 
         </li>`

     } else if(messages[i].type === "status"){
       messageList.innerHTML+=`
         <li class="gray-box statusMessage">
           <p class="message"><time datetime="2024-10-09 10:25:00">(${messages[i].time})</time> <b class="name">${messages[i].from}</b> ${messages[i].text}</p> 
         </li>`

     } 

    }
    
  messages = []
  listRefresh();
  return messages

}

function listRefresh(){
  let messageList = document.querySelector('.messages');
  let lastMessage = messageList.lastChild
  lastMessage.scrollIntoView();

}

/*function reloading() {
  location.reload();
}*/

function processSuccess(answer){
  console.log(answer)

}

function processError(error){
  console.log(error)

}

//structure interaction functions
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

//start system 
addUsersToServer()
addMessagesFromChat()

//keep system running

setInterval(getMessages, 3000)
setInterval(keepUsersConnected, 5000)
setInterval(getUsersFromServer, 10000)


