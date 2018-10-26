function displayResults(startingBet, rollCountTotal, highestAmount, rollCountAtHighest) {
    document.getElementById('tableStartingBet').textContent = startingBet.toFixed(2);
    document.getElementById('tableRollCountTotal').textContent = rollCountTotal;
    document.getElementById('tableHighestAmount').textContent = highestAmount.toFixed(2);
    document.getElementById('tableRollCountAtHighest').textContent = rollCountAtHighest;
    document.getElementById('results').style.display = 'block';
    document.getElementById('btnPlay').textContent = 'Play Again';
}

function displayErrorMsg() {
    document.getElementById('errorMsg').textContent = 'Please enter a number greater than zero';
    document.getElementById('errorMsg').style.display = 'block';
}

function resetStartingBet() {
    document.forms['betForm']['startingBet'].value = '';
    document.forms['betForm']['startingBet'].focus();
}

function resetOutput() {
    document.getElementById('errorMsg').textContent = '';
    document.getElementById('errorMsg').style.display = 'none';
    document.getElementById('results').style.display = 'none';
    document.getElementById('tableStartingBet').textContent = '';
    document.getElementById('tableRollCountTotal').textContent = '';
    document.getElementById('tableHighestAmount').textContent = '';
    document.getElementById('tableRollCountAtHighest').textContent = '';
}

function parseStartingBet() {
    var startingBet = document.forms['betForm']['startingBet'].value;

    if (startingBet[0] == '$') {
        startingBet = parseFloat(startingBet.slice(1));
    }
    else {
        startingBet = parseFloat(startingBet);
    }

    return startingBet;
}

function validateStartingBet() {
    var startingBet = parseStartingBet();

    if (isNaN(startingBet) || startingBet <= 0) {
        return false;
    }
    else {
        return startingBet;
    }
}

function rollDice() {
    return Math.floor(Math.random() * 6) + 1;
}

function startGame(startingBet) {
    var currentAmount = startingBet;
    var highestAmount = startingBet;
    var rollCountTotal = 0;
    var rollCountAtHighest = 0;

    while (currentAmount > 0) {
        var r = rollDice() + rollDice();
        rollCountTotal++;

        if (r == 7) {
            currentAmount = currentAmount + 4;

            if (currentAmount > highestAmount) {
                highestAmount = currentAmount;
                rollCountAtHighest = rollCountTotal;
            }
        }
        else {
            currentAmount = currentAmount - 1;
        }
    }

    displayResults(startingBet, rollCountTotal, highestAmount, rollCountAtHighest);
    resetStartingBet();
}

function initialize() {
    document.forms['betForm'].addEventListener('submit', function(e){
        e.preventDefault();
        resetOutput();

        var startingBet = validateStartingBet();

        if (startingBet) {
            startGame(startingBet);
        }
        else {
            resetOutput();
            displayErrorMsg();
            resetStartingBet();
        }
    });
}