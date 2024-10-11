//let userNameTest= prompt('nome:')

/*let user = {name: prompt('nome:')}
console.log(user)




const adress = "https://mock-api.driven.com.br/api/v6/uol/participants/" + roomID
const promise = axios.post(adress, user)
promise.then(processSuccess)
promise.catch(processError)

function processSuccess(){
  alert("Sucesso!")
  console.log(promise)
}
function processError(){
  alert("Houve um erro, tente novamente mais tarde!")

}*/

//https://mock-api.driven.com.br/api/v6/uol/participants/5c28a11f-e350-4b3f-97dd-ddeb552a1465;


//let data = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages/5c28a11f-e350-4b3f-97dd-ddeb552a1465")
//data.then(processSuccess)
//data.catch(processError)
/**/


//filtrar mensagens de log para aparecerem as ultimas somente
//privacidade das mensagens para cada usuario

/*let conversas = [{from:"João", to: "Todos", text:"entra na sala...", type:"status", time:"08:01:50"},
  {from:"João", to: "Todos", text:"Bom dia", type:"message", time:"08:02:50"},
  {from:"Maria", to: "João", text:"Oi João :)",type:"private_message", time:"08:03:50" },
  {from:"João", to: "Maria", text:"Oi gatinha quer tc?", type:"private_message", time:"08:04:50"},
  {from:"Maria", to: "Todos", text:"sai da sala...", type:"status", time:"08:04:50"},
  {from:"Maria", to: "Todos", text:"sai da sala...", type:"status", time:"08:04:50"},
  {from:"Maria", to: "Todos", text:"sai da sala...", type:"status", time:"08:04:50"}
]

let lastStatus = conversas.filter(messages => messages.type === "status")
lastStatus = lastStatus.slice((lastStatus.length -1), lastStatus.length)

conversas = conversas.filter(message => message.type === "status" )

console.log(conversas.slice((conversas.length - 2), conversas.length))


  conversas = conversas.filter( message => message.type === "message" || message.type === "private_message")

  
   novoArray = conversas.concat(lastStatus)

   console.log("This is a test", lastStatus,novoArray)*/
   //https://mock-api.driven.com.br/api/v6/uol/messages/603bf686-f2a1-46d9-9bbb-494c9b917adc"