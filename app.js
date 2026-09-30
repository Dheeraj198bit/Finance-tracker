let salary =
Number(localStorage.getItem("salary")) || 0;

let categories =
JSON.parse(localStorage.getItem("categories")) || [];

let transactions =
JSON.parse(localStorage.getItem("transactions")) || [];

function login(){

const user =
document.getElementById("user").value;

const pass =
document.getElementById("pass").value;

if(user==="admin" && pass==="1234"){

document.getElementById("loginScreen").style.display="none";

document.getElementById("app").style.display="block";

loadData();

}else{

alert("Invalid Login");

}

}

function saveSalary(){

salary =
Number(document.getElementById("salary").value);

localStorage.setItem("salary",salary);

loadData();

}

function addCategory(){

const name =
document.getElementById("categoryName").value;

const budget =
Number(document.getElementById("categoryAmount").value);

categories.push({
name:name,
budget:budget,
balance:budget
});

saveAll();

}

function addExpense(){

const category =
document.getElementById("expenseCategory").value;

const amount =
Number(document.getElementById("expenseAmount").value);

const note =
document.getElementById("expenseNote").value;

categories = categories.map(c=>{

if(c.name===category){

c.balance -= amount;

}

return c;

});

transactions.unshift({

date:new Date().toLocaleDateString(),
category,
amount,
note

});

saveAll();

}

function saveAll(){

localStorage.setItem(
"categories",
JSON.stringify(categories)
);

localStorage.setItem(
"transactions",
JSON.stringify(transactions)
);

loadData();

}

function loadData(){

document.getElementById(
"salaryDisplay"
).innerText = "AED " + salary;

let totalRemaining = 0;

const categoryDiv =
document.getElementById("categoryList");

const categorySelect =
document.getElementById("expenseCategory");

categoryDiv.innerHTML="";
categorySelect.innerHTML="";

categories.forEach(c=>{

totalRemaining += c.balance;

categoryDiv.innerHTML += `
<div class="category">
<h3>${c.name}</h3>
<p>Budget: AED ${c.budget}</p>
<p>Balance: AED ${c.balance}</p>
</div>`;

categorySelect.innerHTML += `
<option>${c.name}</option>`;

});

document.getElementById(
"remainingDisplay"
).innerText =
"AED " + totalRemaining;

const trx =
document.getElementById("transactions");

trx.innerHTML="";

transactions.forEach(t=>{

trx.innerHTML += `
<div class="transaction">
${t.date} |
${t.category} |
AED ${t.amount}
<br>
${t.note}
</div>`;

});

}

function toggleDarkMode(){

document.body.classList.toggle("light");

}

if("serviceWorker" in navigator){

navigator.serviceWorker.register(
"service-worker.js"
);

}
