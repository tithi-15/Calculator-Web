document.addEventListener("DOMContentLoaded",function(){

    let historyDiv = document.querySelector('.history');
    let screen = document.querySelector('.screen');
    let buttons = document.querySelectorAll('.btn');
    let history = "";

    buttons.forEach(function(button){
        button.addEventListener('click', function(){
            handleButtonClick(button.innerText);
        });
    });

    document.addEventListener('keydown', function(event) {
        const key = event.key;

        // Check if the pressed key is a number or an operation
        if ((key >= '0' && key <= '9') || ['+', '-', '*', '/'].includes(key)) {
            // Handle it as if the corresponding button was clicked
            handleButtonClick(key);
        }
        // Check if the pressed key is the equals sign or Enter key
        else if (key === '=' || key === 'Enter') {
            handleButtonClick('=');
        }
        // Check if the pressed key is the backspace key
        else if (key === 'Backspace') {
            handleButtonClick('DEL');
        }
        // Check if the pressed key is the escape key
        else if (key === 'Escape') {
            handleButtonClick('C');
        }
    });

    function handleButtonClick(value){
        if(value === 'C'){
            clearAll();
        }else if (value === 'DEL'){
            deleteLastChar();
        } else if (value === '='){
            evaluateExpression();
        } else{
            appendToScreen(value);
        }
    }

    function clearAll(){
        screen.textContent = "";
        history = "";
        updateHistory();
    }

    function deleteLastChar(){
        let currentText = screen.textContent;
        screen.textContent = currentText.slice(0, -1);
    }

    function appendToScreen(value){
        screen.textContent += value;
    }

    function evaluateExpression(){
        try{
            let expression = screen.textContent;
            let result = eval(expression);

            result = parseFloat(result.toFixed(5));

            history = expression + '=' + result;
            screen.textContent = result;
            updateHistory();
        }

        catch(error){
            screen.textContent = 'Error';

        }
    }

    function updateHistory(){
        historyDiv.textContent = history;
    }
});
