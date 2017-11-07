/*global $*/

/**
 * 年齢を算出する
 *
 * @param {number} birthYear - 生まれた年
 * @param {number} birthYear - 生まれた月
 * @param {number} birthDate - 生まれた日
 * @return {number} 年齢
 */
function getAge(birthYear, birthMonth, birthDate) {
  var date = new Date();
  var currentYear = date.getFullYear();
  var currentMonth = date.getMonth() + 1;
  var currentDate = date.getDate();
  var age = currentYear - birthYear;

  if (
    currentMonth < birthMonth ||
    (
      currentMonth == birthMonth &&
      currentDate < birthDate
    )
  ) {
    age--;
  }
  return age;
}

$('#js-age').text(getAge(1979, 1, 13));

/**
 * プロジェクトのサムネイルを拡大する
 *
 * @param {Object} ev - イベントオブジェクト
 */
// 準備
var container = $('<div>')
                  .addClass('js-project-img-container')
                  .appendTo('body')
                  .click(function() {
                    $(this).hide();
                  });
var wrapper   = $('<div>')
                  .addClass('js-project-img-wrapper')
                  .appendTo(container);
var img       = $('<img>').appendTo(wrapper);

$('.project-thumbnail').click(function() {
  $(img).attr('src', $(this).attr('src'))
  $(container).show();
});

// ESCキーを押されたら拡大を解除する
$(document).keydown(function(ev) {
  if (ev.keyCode == 27) {
    $(container).hide();
  }
})