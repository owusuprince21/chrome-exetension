
let myLeads = []
const input = document.getElementById("input-el");
const btn = document.getElementById("input-btn");
let uList = document.getElementById("ul-el");
const deleteBtn = document.getElementById("del-btn");
const tabBtn = document.getElementById("tab-btn");

// const tabs = [
//     {url:"https//www.ptechofficial.com"}
// ]
tabBtn.addEventListener("click", () =>{
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
    myLeads.push(tabs[0].url)
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    render(myLeads)
    })
    
})

let getLeads = JSON.parse(localStorage.getItem("myLeads")) || [];
if(getLeads){
    myLeads = getLeads;
    render(myLeads);
}
btn.addEventListener("click", saveInput);

function saveInput(){
    
    if(input.value == 0){
        alert("Enter links to save");
    }else{
        myLeads.push(input.value);
    }
    let regex = /([a-zA-Z0-9]+\.[a-zA-Z0-9_-][a-zA-Z0-9_.-])\w+/g
    let result = regex.test(input.value);
    if(!result){
        alert("Input field accept only url links eg.[www.example.com]");
        myLeads.pop();
    }
    input.value = ""
    localStorage.setItem("myLeads",JSON.stringify(myLeads));
    render(myLeads);
    
    
}

function render(leads){
    let listItems = ""
    for(i=0; i<leads.length; i++){
        listItems += `
        <li style="margin-top:5px;list-style:none;"><a href="${leads[i]}" style="color:#5f9341" target="_blank">
        ${leads[i]}</a></li>`;
        uList.innerHTML = listItems;
    }
     
    
}

deleteBtn.addEventListener("click", function (){
    localStorage.clear();
    myLeads = []
    uList.textContent = ""
    render(myLeads);
})

