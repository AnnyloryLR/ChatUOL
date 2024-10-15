let messages = []
let messagesFromServer = []
let lastStatus = []
let users = [];
let user={};


const roomID = "5a972b09-b6cb-423f-a5b1-857f07831167";
const adress = "https://mock-api.driven.com.br/api/v6/uol/";

let recipientName= "Todos"
let messageMode="Público"


//users
function processUserError(answer){
  let condition = answer.status === '400';
  if(condition === true){
      addUser();
  }

  else{
      alert("Ocorreu um erro inesperado, tente mais tarde!")
      reloading();
    } 
}

function processUserSuccess(answer){
  console.log(answer);
  getUsersFromServer();
  
}

function addUser(){
  user = {name:prompt('Por favor, insira um nome:')};
  let conditionName = user === null;
  if(conditionName === true){
    while(conditionName === true){
      user = {name:prompt('Por favor, insira outro nome:')};
      conditionName = user === null;
    } 
  }
   
  let postUser = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants/5a972b09-b6cb-423f-a5b1-857f07831167", user)
  postUser.then(processUserSuccess);
  postUser.catch(processUserError);
  users.push(user);
 
}

function processUsersSuccess(answer){
  users = [];
  let fixedUsers = [{name:"João"}, {name:"Maria"}]
  let loggedUsers = [];
  loggedUsers = fixedUsers.concat(answer.data);
  users = loggedUsers;
  renderUsers()
  loggedUsers = []

  return users
}

function renderUsers(){
  let usersList = document.querySelector('.userList');
  usersList.innerHTML="";
  users = users.sort();
  
  for(let i=0; i < users.length; i++){
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
  getUsers.then(processUsersSuccess);
  getUsers.catch(processError);  

} 

function processSuccess(answer){
  console.log(answer)

}

function processError(error){
  console.log(error)

}

function keepUserConnected(){
    let promiseConnect = axios.post(adress+'participants/'+roomID, user);
    promiseConnect.then(processSuccess);
    promiseConnect.catch(processError);

}

//messages

function processSuccessMessage(answer){
  getMessages();
  
}

function processErrorMessage(error){
  reloading();
}

function addMessage(){ 
  let getMessage = document.querySelector('.textarea');
  let message = getMessage.value;
  let type = "";

  if(messageMode === 'Público'){
    type = "message"
    let localMessage = axios.post(adress + "messages/"+ roomID, {from:user.name, to: recipientName, text:message, type:type, time:"08:04:50"})
    
    localMessage.then(processSuccessMessage)
    localMessage.catch(processErrorMessage)
   
    
  } else{
    type = "private_message"
    let localMessage = axios.post(adress + "messages/"+ roomID, {from:user.name, to: recipientName, text:message, type:type, time:"08:04:50"})
    console.log({from:user.name, to: recipientName, text:message, type:type, time:"08:04:50"})
    localMessage.then(processSuccessMessage)
    localMessage.catch(processErrorMessage)
    

  }

   getMessage.value = "";
   
 
}  

function processData(answer){
  if(answer.data.length === 0){
    console.log("list from server is empty", answer.data)
  
  } else{
    messagesFromServer = answer.data;
    lastStatus = messagesFromServer.filter(message => message.type === "status");
    messagesFromServer = messagesFromServer.filter( message => message.type === "message" || message.type === "private_message"); 
    addStatus()
    
    return messagesFromServer, lastStatus;
  }  
  
}

function addStatus(){
  messages = [{from:"João", to: "Todos", text:"entra na sala...", type:"status", time:"08:01:50"},
    {from:"João", to: "Todos", text:"Bom dia", type:"message", time:"08:02:50"},
    {from:"Maria", to: "João", text:"Oi João :)",type:"private_message", time:"08:03:50" },
    {from:"João", to: "Maria", text:"Oi gatinha quer tc?", type:"private_message", time:"08:04:50"},
    {from:"Maria", to: "Todos", text:"sai da sala...", type:"status", time:"08:04:50"}]
  lastStatus = lastStatus.slice((lastStatus.length - 10), lastStatus.length)
 
  for(let g =0; g < messagesFromServer.length; g++){
    messages.push(messagesFromServer[g]);
    messages.push(lastStatus[g]);
  }
  
  messageRender();
  messagesFromServer = [];
  messages = []
}


function getMessages(){
  let promise = axios.get(adress + "messages/"+ roomID);
  promise.then(processData);
  promise.catch(processError);
  
}



function listRefresh(){
  if(messages.length !== 0){
    let messageList = document.querySelector('.messages');
    let lastMessage = messageList.lastChild
    lastMessage.scrollIntoView();
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
     
     } else if(messages[i].type === "private_message"){
              if(messages[i].from === user.name || messages[i].to === user.name){
                
 
       messageList.innerHTML+=`
         <li class="red-box private">
           <p class="message"><time datetime="2024-10-09 10:25:00">(${messages[i].time})</time> <b class="name">${messages[i].from}</b> reservadamente para <b class="recipient">${messages[i].to}</b>: ${messages[i].text}</p> 
         </li>`
              }
       

    } else if(messages[i].type === "status"){
       messageList.innerHTML+=`
         <li class="gray-box statusMessage">
           <p class="message"><time datetime="2024-10-09 10:25:00">(${messages[i].time})</time> <b class="name">${messages[i].from}</b> ${messages[i].text}</p> 
         </li>`

     } 

    }
  
  listRefresh();

}

function reloading(){
  location.reload();
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

addUser()
messageRender()

//keep system running

setInterval(getMessages, 3000);
setInterval(keepUserConnected, 5000);
setInterval(getUsersFromServer, 10000);


