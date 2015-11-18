/**
 * PCとモバイルとでスライドショーの写真を切り替える
 */
function changeSlider() {
  // for PC
  if (window.innerWidth > 767) {
    $('.bx-wrapper:has(.slider-pc)').show();
    $('.bx-wrapper:has(.slider-mobile)').hide();
  }
  // for Mobile
  else {
    $('.bx-wrapper:has(.slider-pc)').hide();
    $('.bx-wrapper:has(.slider-mobile)').show();
  }
}
$(function () {
  /**
   * bxslider(スライダー)の適用・設定
   */
  $('.bxslider').bxSlider({
    auto: true,
    pause: 4000,
    autoHover: true,
    onSliderLoad: changeSlider,
    onSliderResize: changeSlider
  });
  // モバイルビューでのスライダーの矢印は隠す
  $('.bx-wrapper:has(.slider-mobile) .bx-controls-direction').hide();
});