const id = document.getElementById('advice-id');
const advice = document.getElementById('advice-container');
const dice = document.getElementById('dice-button');

async function getAdvice() {
    let response = await fetch('https://api.adviceslip.com/advice');
    let received = (await response.json()).slip;
    // console.log(received);
    id.innerHTML = `#${received.id}`;
    advice.innerHTML = `"${received.advice}"`
}

getAdvice();

dice.addEventListener('click', getAdvice);