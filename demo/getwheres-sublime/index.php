<?php
$root = 'C:\xampp\htdocs';
$exclude = '.git,.gitignore,.htaccess,.AppleDouble';
$filter = '*.html,*.shtml,*.css,*.js';
$result = '';

if (isset($_POST['root'])) {
  $root = h($_POST['root']);
  $exclude = h($_POST['exclude']);
  $filter = h($_POST['filter']);

  $result = getWheres(
    $root,
    $exclude,
    $filter
  );
}

/**
 * HTMLエスケープ用
 */
function h ($str) {
  return htmlspecialchars($str, ENT_QUOTES, 'UTF-8');
}

/**
 * SublimeTextのファイル横断検索で、
 * あるディレクトリを除外したい場合に対応した
 * `Wheres`の指定文を生成する。
 * @param string $root 一覧を取得する場所
 * @param Array $exclude=array() 除外したいディレクトリ、またはファイル
 * @param string $filter='' その他の抽出条件
 */
function getWheres($root, $exclude, $filter) {
  $arr_exclude = explode(',', $exclude);
  foreach ($arr_exclude as $key => $val) {
    $arr_exclude[$key] = str_replace('"', '', trim($val));
  }

  // ディレクトリを開く
  $handle = opendir($root);
  if (!$handle) {
    return 'File could not open.';
  }

  // 出力内容を格納する変数を用意
  $wheres = '';
  $arrange = '';

  // ディレクトリ内の一覧を取得 (現在の階層のみ)
  $files = array();
  $dirs = array();
  while (false !== ($entry = readdir($handle))) {
    if ($entry == "." || $entry == ".." || array_search($entry, $arr_exclude) !== false ) { continue; }
    if (is_file("$root\\$entry")) {
      $files[] = $entry;
    } else {
      $dirs[] = $entry;
    }
  }
  sort($dirs);
  sort($files);
  foreach ($files as $file) {
    array_push($dirs, $file);
  }

  foreach ($dirs as $item) {
    $wheres .= "$root\\$item,";
    $arrange .= "$root\\$item,\n";
  }
  closedir($handle);

  // 結果を返す
  return <<< EOF
## Wheres
$wheres$filter

- - - - - - - -
## Arrange
$arrange$filter

- - - - - - - -
## Root
$root

## Exclude
$exclude

## Filter
$filter
EOF;
}
?>
<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>SublimeText3のファイル横断検索用にWheresを生成</title>
<link rel="stylesheet" href="style.css">
</head>
<body>
<article>
  <h1>SublimeText3のファイル横断検索用にWheresを生成</h1>
  <p>
    ファイル横断検索に指定したいフォルダの中に除外したいフォルダがある場合に使うツールです。<br>
    ExcludeとFilterはカンマ区切りで指定してください。
  </p>
  <form action="" method="post">
    <ul>
      <li>
        <label for="root">Root</label>
        <div class="wrap-input"><input type="text" id="root" name="root" value="<?php echo $root; ?>"></div>
      </li>
      <li>
        <label for="exclude">Exclude</label>
        <div class="wrap-input"><input type="text" id="exclude" name="exclude" value="<?php echo $exclude; ?>"></div>
      </li>
      <li>
        <label for="filter">Filter</label>
        <div class="wrap-input"><input type="text" id="filter" name="filter" value="<?php echo $filter; ?>"></div>
      </li>
    </ul>
    <button type="submit">Send</button>
  </form>
  <textarea><?php echo $result; ?></textarea>
</article>
</body>
</html>