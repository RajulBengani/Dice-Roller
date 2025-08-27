document.addEventListener('DOMContentLoaded', ()=>{
    
    //Math.random() generates a number between inclusive 0 and exclusive 1
    //Math.floor() rounds it
    //+1 is to shift the range from 0-6 to 1-6
    const roll = document.querySelector('#roll');
    const outcome=document.querySelector('#outcome');
    const numDiceSelect=document.querySelector('#numDice');
    const expSumInput=document.querySelector('#expSum');
    const result=document.querySelector('#result');
    const diceSound = document.querySelector('#diceSound');

    const diceFaces = ["⚀","⚁","⚂","⚃","⚄","⚅"];

    roll.addEventListener('click', function(){
        const numDice=parseInt(numDiceSelect.value,10);
        const expSum=parseInt(expSumInput.value,10);
        let results="";
        let sum=0;

        diceSound.currentTime=0;
        diceSound.play();

        outcome.classList.add('shake');
        let flickerInterval=setInterval(() => {
            let flicker="";
            for (let i = 0; i < numDice; i++) {
                const roll = Math.floor(Math.random() * 6);
                flicker += diceFaces[roll] + " ";
        }
        outcome.textContent=flicker.trim();
    },100);

    setTimeout(() =>{
        clearInterval(flickerInterval);

        diceSound.pause();
        diceSound.currentTime=0;

        for (let i=0; i<numDice; i++){
            const roll=Math.floor(Math.random()*6);
            results+=diceFaces[roll]+ " ";
            sum=sum+roll+1;
        }
        outcome.classList.remove('shake');
        outcome.textContent=results.trim();

        if (Number.isNaN(expSum)){
            result.textContent="Enter a valid expected sum.";
            result.style.color="orange";
        } else if (sum === expSum) {
            result.textContent= `🎉 You Win! Rolled sum = ${sum}`;
            result.style.color="yellow";
        } else {
            result.textContent=`❌ You Lose! Rolled sum = ${sum} (Expected ${expSum})`;
            result.style.color="red";
        }
        }, 600);

    });
});
