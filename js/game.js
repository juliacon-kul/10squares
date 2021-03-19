const numDivs = 36;
const maxHits = 10;

let hits = 0;
let firstHitTime = 0;

function round() {
  //Эта функция рандомно выбирает слот и добавляет ей класс таргет, 
  //чтобы окрасить ее в зеленый цвет
  // FIXME: надо бы убрать "target" прежде чем искать новый
  
  $(".game-field").removeClass("target");

  let divSelector = randomDivId();
  $(divSelector).addClass("target");
  $(divSelector).text(hits+1);

  // TODO: помечать target текущим номером

  if (hits==1) {
    firstHitTime=getTimestamp()
  };
  console.log(firstHitTime);// FIXME: тут надо определять при первом клике firstHitTime

  if (hits === maxHits) {
    endGame();
  }
}

function endGame() {
  // FIXME: спрятать игровое поле сначала
//здесь рассчитывается итоговое время игры в секундах
  $(".game-field").addClass("d-none");
  let totalPlayedMillis = getTimestamp() - firstHitTime;
  console.log(totalPlayedMillis);
  let totalPlayedSeconds = Number(totalPlayedMillis / 1000).toPrecision(3);
  $("#total-time-played").text(totalPlayedSeconds); //вставляет общее время игры в текстовое поле

  $("#win-message").removeClass("d-none");//удаляет класс невидимости
}

function handleClick(event) {
  
  // FIXME: убирать текст со старых таргетов. Кажется есть .text?
  $(event.target).text("");
  if ($(event.target).hasClass("target")) {

    hits = hits + 1;
    round();
  }
  
  // TODO: как-то отмечать если мы промахнулись? См CSS класс .miss
}

function init() {
  


  // TODO: заказчик просил отдельную кнопку, запускающую игру а не просто по загрузке
  round();
  
  $(".game-field").click(handleClick);
  $("#button-reload").click(function() {
    location.reload();
  });
}

$(document).ready(init);
