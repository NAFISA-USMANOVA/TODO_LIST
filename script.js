//2 
const itemsArray = localStorage.getItem("items") ? JSON.parse(localStorage.getItem("items")) : []; //JSON.parse() is to transform the string back to object
//Ternary operation: if the "item" exists in localStorage, parse it. If not, set the "item"'s array equal to an empty array []
console.log(itemsArray);//[]an empty array bc we are not using LS yet 

document.querySelector("#enter").addEventListener("click", () => {
  const item = document.querySelector("#item");
  createItem(item);
}); // Graba el contenido de caja de input, y lo guarda cuando User da al boton Enter. Lo hace con function createItem(item).

function displayItems(){
  let items = "";
  for(let i = 0; i < itemsArray.length; i++){
    items += `<div class="item">
                <div class="input_controller">
                  <textarea disabled>${itemsArray[i]}</textarea>
                  <div class="edit_controller">
                    <i class="fa-solid fa-check deleteBtn"></i>
                    <i class="fa-sharp fa-solid fa-pen-to-square editBtn"></i>
                  </div>
                </div>
                <div class="update_controller">
                  <button class="saveBtn">Save</button>
                  <button class="cancelBtn">Cancel</button>
                </div>
              </div>`
  }
  document.querySelector(".to_do_list").innerHTML = items; //Do not forget to add the function displayItems() to the window.onload
  activateDeleteListeners();
  activateEditListeners();
  activateSaveListeners();
  activateCancelListeners();//Voy a crearlas
}
function activateDeleteListeners(){
  let deleteBtn = document.querySelectorAll(".deleteBtn");
  deleteBtn.forEach((db,i) =>{
    db.addEventListener("click", () => {deleteItem(i) }) 
  }); //Hay que crear deleteItem()
}
function activateEditListeners(){
  const editBtn = document.querySelectorAll(".editBtn");
  const updateController = document.querySelectorAll(".update_controller");
  const inputs = document.querySelectorAll(".input_controller textarea");
  editBtn.forEach((eb, i) => {
    eb.addEventListener("click", () => {
      updateController[i].style.display = "block";
      inputs[i].disabled = false;
    })
  })
}
function activateSaveListeners(){
  const saveBtn = document.querySelectorAll(".saveBtn");
  const inputs = document.querySelectorAll(".input_controller textarea");
  saveBtn.forEach((sb, i) => {
    sb.addEventListener("click", () => {
      updateItem(inputs[i].value, i)
    })
  })
}

function activateCancelListeners(){
  const cancelBtn = document.querySelectorAll(".cancelBtn");
  const updateController = document.querySelectorAll(".update_controller");
  const inputs = document.querySelectorAll(".input_controller taxtarea");
  cancelBtn.forEach((cb, i ) => {
    cb.addEventListener("click", () => {
      updateController[i].style.display = "none";
      inputs[i].disabled = true;
    })
  })

}
function updateItem(text, i){
  itemsArray[i] = text;
  localStorage.setItem("items", JSON.stringify(itemsArray));
  location.reload();
}

function deleteItem(i){
  itemsArray.splice(i, 1);
  localStorage.setItem("items", JSON.stringify(itemsArray));
  location.reload();
}

function createItem(item){
itemsArray.push(item.value);//I store the items inside of array
localStorage.setItem("items", JSON.stringify(itemsArray));//To see it in LS
location.reload();  //refresh the page
}

//1 Date
function displayDate(){
  let date =  new Date();//
  date = date.toString() //Me da:String-> Fri Jun 09 2023 09:48:19 GMT+0200 (Central European Summer Time) en consola. Yo necesito solo  "Jun 09 2023". Para eso aplico .split(" ")
  date = date.toString().split(" "); // Array: ['Fri', 'Jun', '09', '2023', '09:57:59', 'GMT+0200', '(Central', 'European', 'Summer', 'Time)']
  console.log(date);
  //voy a usar
  document.querySelector("#date").innerHTML = date[1] + " " + date[2] + " " + date[3]; //Sale en la pantalla la fecha de hoy
}
window.onload = function(){
  //El evento onload de Javascript se activa cuando se termina de cargar la página.
  displayDate();
  displayItems();
}
