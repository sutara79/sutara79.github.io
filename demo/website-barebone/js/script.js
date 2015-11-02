/**
 * グローバルナビをPC/スマホで切り替える。
 * jQueryで要素を非表示にしているため、CSSのブレークポイントでは再表示することができない。
 * そのため、下記の関数は必要。
 */
function globalNavi () {
  if ($(window).width() > 767) $('.globalnavi').show(); // PC向け
  else                         $('.globalnavi').hide(); // スマホ向け
}
/**
 * ページ読込み後に行う処理
 */
$(function () {
  /**
   * 事前実行
   */
  globalNavi();
  /**
   * レスポンシブ対応
   */
  $(window).on('resize', function() {
    globalNavi();
  });
  /**
   * for Mobile: ドロワーメニュー
   */
  $(document).on('click', function () {
    if ($(window).width() < 768) {
      $(this).toggleClass('toggle-menu-open');
      $('.toggle-menu').removeClass('toggle-menu-open');
      $('.globalnavi').slideUp('fast');
    }
  });
  $('.toggle-menu').on('click', function (ev) {
    ev.stopPropagation();
    $(this).toggleClass('toggle-menu-open');
    $('.globalnavi').slideToggle('fast');
  });
});