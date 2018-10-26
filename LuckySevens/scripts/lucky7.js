function rollDice() {
    return Math.floor(Math.random() * 6) + 1;
}

function startGame() {
    var startingBet = parseFloat(document.forms['betForm']['startingBet'].value);
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

    document.getElementById('tableStartingBet').textContent = startingBet;
    document.getElementById('tableRollCountTotal').textContent = rollCountTotal;
    document.getElementById('tableHighestAmount').textContent = highestAmount;
    document.getElementById('tableRollCountAtHighest').textContent = rollCountAtHighest;
}

function initialize() {
    document.getElementById('btnPlay').addEventListener('click', function(){
        startGame();
    });
}