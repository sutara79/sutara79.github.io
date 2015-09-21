/**
 * テスト対象のメソッド
 * 引数に15を加えて返すだけ
 */
/*global window, console */
function myMethod(arg1) {
  return arg1 + 15;
}
window.onload = function() {
  console.table(console);
  console.log('5を与えると20となる');
  console.assert(myMethod(5) == 20, '20以外');
  var cnt = 1;
  while (cnt < 20) {
    console.count('ループ内実行');
    if (cnt > 10) {
      console.log('ループを抜ける');
      break;
    }
    cnt++;
  }
};