<?php
$dir_path = 'C:\xampp\htdocs';
$exclude = '.git,.gitignore,.htaccess,.AppleDouble';
$filter = '*.html,*.shtml,*.css,*.js';
$result = '';

if (isset($_POST['dir_path'])) {
  $dir_path = $_POST['dir_path'];
  $exclude = $_POST['exclude'];
  $filter = $_POST['filter'];

  $result = getWheres(
    $dir_path,
    $exclude,
    $filter
  );
}

/**
 * SublimeTextのファイル横断検索で、
 * あるディレクトリを除外したい場合に対応した
 * `Wheres`の指定文を生成する。
 * @param string $path 一覧を取得する場所
 * @param Array $exclude=array() 除外したいディレクトリ、またはファイル
 * @param string $filter='' その他の抽出条件
 */
function getWheres($path, $exclude, $filter) {
  $exclude = explode(',', $exclude);
  foreach ($exclude as $key => $val) {
    $exclude[$key] = str_replace('"', '', trim($val));
  }

  // ディレクトリを開く
  $handle = opendir($path);
  if (!$handle) {
    return 'ファイルを開けませんでした';
  }

  // 出力ファイルを用意する
  $filename_result = 'getwheres-result.txt';
  if (!file_exists($filename_result)) { touch($filename_result); }

  // 出力内容を格納する変数を用意
  $wheres = '';
  $log = '';
  $exclude = array_merge($exclude, array(
    basename($_SERVER['PHP_SELF']),
    $filename_result
  ));

  // ディレクトリ内の一覧を取得 (現在の階層のみ)
  $files = array();
  $dirs = array();
  while (false !== ($entry = readdir($handle))) {
    if ($entry == "." || $entry == ".." || array_search($entry, $exclude) !== false ) { continue; }
    if (is_file("$path\\$entry")) {
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
    $wheres .= "$path\\$item,";
    $log .= "$path\\$item,\n";
  }
  closedir($handle);

  // 結果を整形する
  $result = <<<END
## Wheres
$wheres

- - - - - - - -
## Exclude
$exclude

## Filter
$filter

## List
$log
END;

  // 結果を出力する
  file_put_contents($filename_result, $result . $log);
  return $result . $log;
}
?>
<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>SublimeText3のファイル横断検索用にWheresを生成</title>
<style>
  textarea {
    margin-top: 2em;
    width: 900px;
    height: 400px;
  }
  input[type="text"],
  textarea {
    font-size: 16px;
    font-family: Consolas, Meiryo, monospace;
  }
  label {
    display: inline-block;
    width: 80px;
  }
  input[type="text"] {
    width: 720px;
  }
</style>
</head>
<body>
<h1>SublimeText3のファイル横断検索用にWheresを生成</h1>
<form action="" method="post">
  <ul>
    <li>
      <label for="dir_path">Root</label>
      <input type="text" name="dir_path" value="<?php echo $dir_path; ?>">
    </li>
    <li>
      <label for="exclude">Exclude</label>
      <input type="text" name="exclude" value="<?php echo $exclude; ?>">
    </li>
    <li>
      <label for="filter">Filter</label>
      <input type="text" name="filter" value="<?php echo $filter; ?>">
    </li>
  </ul>
  <button type="submit">Send</button>
</form>
<textarea><?php echo $result; ?></textarea>
</body>
</html>