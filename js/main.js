const table = document.querySelector("#table-container");
const questions_dialog = document.querySelector("#questions-dialog")
const create = document.querySelector("#create-product")
const header = document.querySelector("#edit-header")

let users =[]
console.log(users);

function show(element){
    element.style.display =  "block"
}
function hide(element){
    element.style.display = "none"
}

function onAddButton(){
    create.textContent = "Create"
    header.textContent = "Dialoge for Create the User"

    document.querySelector("#input_first").value = ""
    document.querySelector("#input_last").value = ""
    document.querySelector("#input_email").value = ""

    show(questions_dialog)
}

function StorageUser() {
    //set data in localstorage
    localStorage.setItem("users",JSON.stringify(users))
}

function loadProduct(){
    let usersStorage = JSON.parse(localStorage.getItem("users"));
    if (usersStorage !== null){
      users = usersStorage
    }
    else{
        localStorage.removeItem("users")
    }
}

function renderUser(){
    loadProduct()
    let table_title = document.querySelector("#tbody");
    table_title.remove();

    table_title = document.createElement("tbody");
    table_title.setAttribute("id","tbody");

    table.appendChild(table_title)
    
    for (let index = 0; index < users.length; index++){ 
        let tr = document.createElement("tr");

        tr.setAttribute("id", "table-row")
        tr.dataset.index = index
        // console.log(tr)
        console.log(users[index]);
        let td1 = document.createElement("td");
        td1.setAttribute("id","firstname");
        td1.textContent = users[index].firstname
        
        let td2 = document.createElement("td");
        td2.setAttribute("id","lastname");
        td2.textContent = users[index].lastname
        
        let td3 = document.createElement("td");
        td3.setAttribute("id","email")
        td3.textContent = users[index].email
        
        let td4 = document.createElement("td");
        td4.setAttribute("id","action")
        
        let create = document.createElement("button");
        create.setAttribute("id","delete");
        create.textContent = "delete";
        create.addEventListener("click",onDelete)
        
        let edit = document.createElement("button");
        edit.setAttribute("id","edit");
        edit.textContent = "edit";
        edit.addEventListener("click",onEdit)
        
        let div = document.createElement("div");
        div.setAttribute("id","btn")
        div.appendChild(edit)
        div.appendChild(create)
        td4.appendChild(div)
        
        tr.appendChild(td1)
        tr.appendChild(td2)
        tr.appendChild(td3)
        tr.appendChild(td4)   
        table_title.appendChild(tr)
    }
}

let userIndex = null;
function createUser(event){
    event.preventDefault()
    // hide(questions_dialog)  //hide form input
    if (document.querySelector("#input_first").value != "" && document.querySelector("#input_last").value !="" && document.querySelector("#input_email").value != ""){
        if (userIndex !== null){
            let editUser = users[userIndex];
            editUser.firstname = document.querySelector("#input_first").value;
            editUser.lastname = document.querySelector("#input_last").value;
            editUser.email = document.querySelector("#input_email").value;
        }
        else{
            let newUser = {}
            newUser.firstname = document.querySelector("#input_first").value;
            newUser.lastname = document.querySelector("#input_last").value;
            newUser.email = document.querySelector("#input_email").value;
            users.unshift(newUser) 
        }
        hide(questions_dialog)
        StorageUser()
        renderUser()
    }
    else{
        alert("You must input a product")
    }
}

function onEdit(event){
    show(questions_dialog)
    let newUser = event.target.parentElement.parentElement.parentElement.dataset.index;
    userIndex = newUser
    let editUser = users[newUser];
    document.querySelector("#input_first").value = editUser.firstname;
    document.querySelector("#input_last").value = editUser.lastname;
    document.querySelector("#input_email").value = editUser.email;
    create.textContent = "Save"
    header.textContent = "Edit Info of the User"
}

function onDelete(event){
    event.preventDefault();
    let index = event.target.parentElement.parentElement.parentElement.dataset.index;
    console.log(users)
    users.splice(index, 1);
    StorageUser()
    renderUser()
}

function onCancel(event){
    event.preventDefault()
    hide(questions_dialog)
}
renderUser()
loadProduct()