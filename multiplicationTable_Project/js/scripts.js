// Seleção de elementos
const multiplicationForm = document.querySelector("#multiplication-form");
const numberInput = document.querySelector("#number");
const multiplicationInput = document.querySelector("#multiplicator");
const multiplicationTable = document.querySelector("#multiplication-operations");

// Funções
const createTable = (number, multiplicatorNumber) => {
    multiplicationTable.innerHTML = "";

    for(i = 1; i <= multiplicatorNumber; i++){
        const result = number * i;
        const template = `<div class="row">
                            <div class="operation">${number} X ${i} = </div>
                            <div class="result">${result}</div>
                          </div>`;
        
        const parser = new DOMParser();

        const templateHTML = parser.parseFromString(template, "text/html");
        
        const row = templateHTML.querySelector(".row");
    
        multiplicationTable.appendChild(row);
    }  
}

// Eventos
multiplicationForm.addEventListener("submit", (e) => {
    e.preventDefault();
    
    // colocar um '+' na frente faz com que retorne um inteiro
    const multiplicatorNumber = +numberInput.value;

    const multiplicationNumber = +multiplicationInput.value;
    
    if(multiplicatorNumber <= 0){
        multiplicationTable.innerHTML = 'Multiplicador não pode ser 0';
        return;
    }

    if(!multiplicatorNumber || !multiplicationNumber) return;
   
    createTable(multiplicatorNumber, multiplicationNumber);
});