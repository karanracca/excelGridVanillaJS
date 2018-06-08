const addColumn = document.getElementById("addColumn");
const addRow = document.getElementById("addRow");
const table = document.getElementById("table");
const tx = require('tableexport');

window.onload = function() {
    createTable(6, 10);
};

createCellNumbers = ()=> {
    let trColumns = document.getElementsByTagName("tbody")[0].getElementsByTagName('tr')[0].getElementsByTagName("td");
    for (let i=1;i<trColumns.length;i++) {
        if (trColumns[i].getElementsByTagName("span")[0]) trColumns[i].removeChild(trColumns[i].getElementsByTagName("span")[0]);
        let span = document.createElement('span');
        span.setAttribute("class", "labels");
        span.appendChild(document.createTextNode(i));
        trColumns[i].insertBefore(span, trColumns[i].childNodes[0]);
    }

    let rowList = document.getElementsByTagName("tbody")[0].getElementsByTagName('tr');
    for (let i=1;i<rowList.length;i++) {
        if (rowList[i].getElementsByTagName("td")[0].getElementsByTagName("span")[0]) rowList[i].getElementsByTagName("td")[0].removeChild(rowList[i].getElementsByTagName("td")[0].getElementsByTagName("span")[0]);
        let span = document.createElement('span');
        span.setAttribute("class", "labels");
        span.appendChild(document.createTextNode(i));
        rowList[i].getElementsByTagName("td")[0].insertBefore(span, rowList[i].getElementsByTagName("td")[0].childNodes[0]);
    }

};

function createCell() {
    let newCell = document.createElement("td");
    let input = document.createElement("input");
    input.setAttribute("class", "cell-input");
    newCell.appendChild(input);
    return newCell;
}

function createDelRowButton() {
    let td = document.createElement("td");
    td.setAttribute("class", "labelRowCell");
    let button = document.createElement("i");
    button.setAttribute('class', 'deleteRow fa fa-minus-circle');
    button.setAttribute('aria-hidden', 'true');
    button.setAttribute('onclick', 'deleteRow(event)');
    //button.appendChild(document.createTextNode('Delete Row'));
    td.appendChild(button);
    return td;
}

function createDeleteColumnCell() {
    let td = document.createElement("td");
    let button = document.createElement("i");
    button.setAttribute('class', 'deleteColumn fa fa-minus-circle');
    button.setAttribute('aria-hidden', 'true');
    button.setAttribute('onclick', 'deleteColumn(event)');
    //button.appendChild(document.createTextNode('Delete Column'));
    td.appendChild(button);
    return td;
}

function createDeleteColumnRow(col) {
    let tr = document.createElement("tr");
    tr.appendChild(document.createElement("td"));
    for(let i=1; i<col; i++) {
        tr.appendChild(createDeleteColumnCell())
    }
    return tr;
}

createRow = (col)=> {
    let tr = document.createElement("tr");
    tr.appendChild(createDelRowButton(col));
    for(let i=1; i<col; i++) {
        tr.appendChild(createCell())
    }
    return tr;
};

createTable = (col, rows) => {
    let tbody = document.createElement('tbody');
    tbody.appendChild(createDeleteColumnRow(col));
    for (let i = 1; i < rows; i++) {
        tbody.appendChild(createRow(col));
    }
    table.appendChild(tbody);
    createCellNumbers(tbody);
    new tx(table, {formats: ['csv'], bootstrap: true, exportButtons: true});
}

/*getResult = (input)=> {
    let digits = input.value.match(getDigitsRegex);
    let cells = digits.map(i=>i.match(/.{1}/g));
    input.value = calculateSum(cells);
};

table.addEventListener("change", (event)=>{
    let trList = table.getElementsByTagName("tr");
    let tdList = trList[1].getElementsByTagName("td");

    for (let i=1;i<trList.length;i++) {
        for (let j=1;j<tdList.length;j++) {
            if (table.getElementsByTagName("tr")[i].getElementsByTagName("td")[j].getElementsByTagName("input")[0].value.match(checkFunctionRegex)) {
                getResult(table.getElementsByTagName("tr")[i].getElementsByTagName("td")[j].getElementsByTagName("input")[0]);
            }
        }
    }


    /!*if (event.target.value.match(checkFunctionRegex)) {
        let functionCell = event.target;
        let digits = event.target.value.match(getDigitsRegex);
        let cells = digits.map(i=>i.match(/.{1}/g));
        event.target.value = calculateSum(cells);
        attachEventListner(cells, functionCell);
    }*!/
});*/

function createDeleteColumnButton() {
    let td = document.createElement("td");
    let button = document.createElement("i");
    button.setAttribute('class', 'deleteColumn fa fa-minus-circle');
    button.setAttribute('aria-hidden', 'true');
    button.setAttribute('onclick', 'deleteColumn(event)');
    td.appendChild(button);
    return td;
}


function createDeleteRowButton() {
    let button = document.createElement("button");
    button.setAttribute('class', 'deleteRow');
    button.setAttribute('onclick', 'deleteRow(event)');
    button.appendChild(document.createTextNode('Delete Row'));
    return button;
}

addColumn.addEventListener('click', (event)=>{
    let trList = document.getElementById("table").getElementsByTagName("tr");
    trList[0].appendChild(createDeleteColumnButton());
    for (let i=1; i< trList.length; i++){
        trList[i].appendChild(createCell());
    }
    createCellNumbers();
});

addRow.addEventListener('click', (event)=>{
    let col = document.getElementById("table").getElementsByTagName("tr")[0].getElementsByTagName("td").length;
    table.getElementsByTagName('tbody')[0].appendChild(createRow(col));
    createCellNumbers();
});

deleteRow = function (event) {
  //console.log(event);
    let tableBody = document.getElementById("table").getElementsByTagName('tbody')[0];
    tableBody.removeChild(event.target.parentElement.parentElement);
    createCellNumbers();
};

deleteColumn = function (event) {
    let cellIndex = event.target.parentElement.cellIndex;
    let rowList = document.getElementById("table").getElementsByTagName("tr");
    for (let i=0; i< rowList.length; i++){
        rowList[i].removeChild(rowList[i].children[cellIndex]);
    }
    createCellNumbers();
};

