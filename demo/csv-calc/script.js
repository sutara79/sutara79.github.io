/**
 * CSVを元に注文表を作成する
 */
function csvCalc(file, selector, id_num) {
  $.get(file, function(data) {
    /**
     * CSVを配列に
     */
    var data = data.split('\r\n');
    data.shift(); // 先頭行を取り除く
    for (var i = 0; i < data.length; i++) {
      data[i] = data[i].split(',');
    }
    data.pop();

    /**
     * HTML内で整形して表示
     */
    var original = $(selector).find('[data-csvcalc-repeat]');
    for (var m = 0; m < data.length; m++) {
      var clone = $(original).clone();
      $(original).before(clone);

      // 値を挿入
      for (var n = 0; n < data[m].length; n++) {
        $(clone).find('[data-csvcalc-text="' + n + '"]').text(data[m][n]);
      }

      // id, priceの値を保存
      // ! 挿入した値の修飾はこの処理の後で行うこと。
      var elem_id = $(clone).find('[data-csvcalc-id]');
      $(elem_id).attr('data-csvcalc-id', $(elem_id).text());
      var elem_price = $(clone).find('[data-csvcalc-price]');
      $(elem_price).attr('data-csvcalc-price', $(elem_price).text());

      // name属性を作成
      $(clone).find('[data-csvcalc-input]').attr('name', data[m][id_num]);
    }
    $(original).remove();
  });

  /**
   * 金額を計算
   */
  $(document).on('change', selector + ' [data-csvcalc-input]', function(ev) {
    var amount = $(ev.target).val();

    // バリデーション
    // 入力値は数値か?
    amount = Number(
      amount.replace(/[０-９]/g, function(s) {
        return String.fromCharCode(s.charCodeAt(0) - 0xFEE0);
      })
    );
    if (isNaN(amount)) { // 数字以外は強制的にゼロとする。
      $(ev.target).val(0);
      return;
    }
    $(ev.target).val(amount); // 画面上の全角数字は、ここで半角となる。

    // 合計を算出・表示
    var parent = $(ev.target).parents('[data-csvcalc-repeat]');
    var price = $(parent).find('[data-csvcalc-price]').text();
    $(parent).find('[data-csvcalc-sum]')
      .text(amount * price)
      .attr('data-csvcalc-sum', amount * price);

    // 総計を算出・表示
    var total = 0;
    $(selector + ' [data-csvcalc-sum]').each(function(idx, elem) {
      var sum = Number($(elem).attr('data-csvcalc-sum'));
      if (!isNaN(sum)) total += sum;
    });
    $(selector + ' [data-csvcalc-total]')
      .text(total)
      .attr('data-csvcalc-total', total);
  });
}