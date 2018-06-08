const checkFunctionRegex = new RegExp(/^=[A-Z]{3}/g);
const getOperation = new RegExp(/^=(.*[A-Z])/g);
const getDigitsRegex = new RegExp(/\d+/g);
const getCells = new RegExp(/.{1}/g);
const table = document.getElementById("table");

calculate = (cells, operation)=>{
    let result=0;
    switch (operation) {
        case "SUM":{
            cells.map(i=>result += Number(table.getElementsByTagName("tr")[i[0]].getElementsByTagName("td")[i[1]].getElementsByTagName("input")[0].value));
            break;
        }
        case "MUL":{
            result = 1;
            cells.map(i=>result *= Number(table.getElementsByTagName("tr")[i[0]].getElementsByTagName("td")[i[1]].getElementsByTagName("input")[0].value));
            break;
        }
        case "SUB":{
            result = Number(table.getElementsByTagName("tr")[cells[0][0]].getElementsByTagName("td")[cells[0][1]].getElementsByTagName("input")[0].value);
            for (let i=1; i<cells.length; i++) {
                result -= Number(table.getElementsByTagName("tr")[cells[i][0]].getElementsByTagName("td")[cells[i][1]].getElementsByTagName("input")[0].value);
            }
            break;
        }
        case "DIV":{
            result = Number(table.getElementsByTagName("tr")[cells[0][0]].getElementsByTagName("td")[cells[0][1]].getElementsByTagName("input")[0].value);
            for (let i=1; i<cells.length; i++) {
                result /= Number(table.getElementsByTagName("tr")[cells[i][0]].getElementsByTagName("td")[cells[i][1]].getElementsByTagName("input")[0].value);
            }
            break;
        }
    }
    return result;
};

getResult = function(event) {
    if (this.formula && this.formula.match(checkFunctionRegex)) {
        getOperation.lastIndex = 0;
        let operation = getOperation.exec(this.formula)[1];
        let digits = this.formula.match(getDigitsRegex);
        let cells = digits.map(i=>i.match(getCells));
        this.value = calculate(cells, operation);
    }
};

table.addEventListener("change", function(event){
    if (event.target.value.match(checkFunctionRegex)) {
        getOperation.lastIndex = 0;
        let operation = getOperation.exec(event.target.value)[1];
        let functionCell = event.target;
        functionCell.formula = event.target.value;
        let digits = event.target.value.match(getDigitsRegex);
        let cells = digits.map(i=>i.match(getCells));
        event.target.value = calculate(cells, operation);
        attachEventListner(cells, functionCell);
    }
});
attachEventListner = function (cells, functionCell){
    cells.map(item=>{
        let cell = table.getElementsByTagName("tr")[item[0]].getElementsByTagName("td")[item[1]].getElementsByTagName("input")[0];
        cell.addEventListener('change', getResult.bind(functionCell));
    });
};
/*
exportToCSV = ()=> {
    new tx(table, {
        formats: ['csv'],            // (String[]), filetype(s) for the export, (default: ['xlsx', 'csv', 'txt'])
        bootstrap: true,                           // (Boolean), style buttons using bootstrap, (default: true)
        exportButtons: true,                        // (Boolean), automatically generate the built-in export buttons for each of the specified formats (default: true)

    })
};*/