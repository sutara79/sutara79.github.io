jQuery(document).ready(function($) {
  $.get('products.csv', function(data) {
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
     * テーブルで表示
     */
    var elem = '<table id="products">';
    elem += '<tr class="th"><th>id</th><th>name</th><th>price</th><th>amount</th><th>sum</th></tr>';
    for (var i = 0; i < data.length; i++) {
      elem += '<tr class="product-info">';
      elem += '<td>' + data[i][0] + '</td>';
      elem += '<td>' + data[i][1] + '</td>';
      elem += '<td class="price">' + data[i][2] + '</td>';
      elem += '<td><input class="amount" type="number" min="0" value="0"></td>';
      elem += '<td class="sum">0</td>';
      elem += '</tr>';
    }
    elem += '<tr class="th"><th colspan="4" class="th-total">total</th><td class="total">0</td></tr>'
    elem += '</table>';
    $('#result').append(elem);
  });

  /**
   * 金額を計算
   */
  $(document).on('change', '#products .amount', function(ev) {
    var amount = $(ev.target).val();

    // バリデーション
    // 入力値は数値か?
    amount = parseInt(
      amount.replace(/[０-９]/g, function(s) {
        return String.fromCharCode(s.charCodeAt(0) - 0xFEE0);
      }),
      10
    );
    if (isNaN(amount)) { // 数字以外は強制的にゼロとする。
      $(ev.target).val(0);
      return;
    }
    $(ev.target).val(amount); // 画面上の全角数字は、ここで半角となる。

    // 合計を算出・表示
    var tr = $(ev.target).parents('tr');
    var price = $(tr).children('.price').text();
    $(tr).children('.sum').text(amount * price);

    // 総計を算出・表示
    var total = 0;
    $('#products .sum').each(function(idx, elem) {
      total += parseInt($(elem).text(), 10);
    });
    $('#products .total').text(total);
  });
});