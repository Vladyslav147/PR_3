
const $btnKick = document.getElementById('btn-kick');
const $btnSpecial = document.getElementById('btn-special');

const character = {
  name: 'Pikachu',
  defaultHP: 100,
  damageHP: 100,
  elHP: document.getElementById('health-character'),
  elProgressBar: document.getElementById('progressbar-character'),
};

const enemy = {
  name: 'Charmander',
  defaultHP: 100,
  damageHP: 100,
  elHP: document.getElementById('health-enemy'),
  elProgressBar: document.getElementById('progressbar-enemy'),
};

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function renderHPLife(person) {
  person.elHP.innerText = `${person.damageHP} / ${person.defaultHP}`;
}

function renderProgressBarHP(person) {
  const percent = (person.damageHP / person.defaultHP) * 100;
  person.elProgressBar.style.width = `${percent}%`;

  person.elProgressBar.classList.remove('low', 'critical');

  if (percent <= 20) {
    person.elProgressBar.classList.add('critical');
  } else if (percent <= 60) {
    person.elProgressBar.classList.add('low');
  }
}

function renderHP(person) {
  renderHPLife(person);
  renderProgressBarHP(person);
}

function disableButtons() {
  $btnKick.disabled = true;
  $btnSpecial.disabled = true;
}

function changeHP(count, person) {
  person.damageHP -= count;

  if (person.damageHP <= 0) {
    person.damageHP = 0;
    renderHP(person);
    alert(`Бідний ${person.name} програв бій!`);
    disableButtons();
    return true; 
  }

  renderHP(person);
  return false;
}


function executeRound(playerMinDmg, playerMaxDmg, enemyMinDmg, enemyMaxDmg) {
  // Атака игрока
  const isEnemyDefeated = changeHP(random(playerMinDmg, playerMaxDmg), enemy);


  if (!isEnemyDefeated) {
    changeHP(random(enemyMinDmg, enemyMaxDmg), character);
  }
}


$btnKick.addEventListener('click', function () {
  console.log('Thunder Jolt!');
  executeRound(8, 20, 5, 15);
});


$btnSpecial.addEventListener('click', function () {
  console.log('Special Attack!');
  executeRound(20, 35, 10, 25);
});


function init() {
  console.log('Start Game!');
  renderHP(character);
  renderHP(enemy);
}

init();