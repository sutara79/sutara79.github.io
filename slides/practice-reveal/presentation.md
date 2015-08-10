# reveal.js 3.1.0 を<br>なるべく手軽に使う

---

## 1. CDNを利用する
CDNを使えば、わざわざダウンロードして設置する必要はありません。

- [cdnjs.com/libraries/reveal.js](//cdnjs.com/libraries/reveal.js)

---

## 2. マークダウンで記述する
文書の中身はマークダウンで記述します。  
外部ファイルにすれば、さらに便利です。

###### index.html
```html
<div class="reveal">
  <div class="slides">
    <section data-markdown="presentation.md"
             data-separator="\n---\n$"
             data-separator-vertical="\n--\n">
    </section>
  </div>
</div>
```

---

## 注意-1. 公式の`index.html`は、そのまま使わない
公式に配布されている`index.html`は、一部を書き換える必要があります。  
理由は、文書の中身がマークダウン記法のみの場合、シンタックスハイライトが機能しないからです。

- 参照:[Highlight doesn&#39;t work with markdown-only · Issue #1225 · hakimel/reveal.js](https://github.com/hakimel/reveal.js/issues/1225)

--

###### index.html (末尾近く)

```javascript
// 変更前
{
  src: '//cdnjs.cloudflare.com/ajax/libs/reveal.js/3.1.0/plugin/highlight/highlight.min.js',
  async: true,
  condition: function() { return !!document.querySelector( 'pre code' ); },
  callback: function() { hljs.initHighlightingOnLoad(); }
},

// 変更後
//// 「<pre><code>が存在する場合」という条件を削除する
{
  src: '//cdnjs.cloudflare.com/ajax/libs/reveal.js/3.1.0/plugin/highlight/highlight.min.js',
  async: true,
  callback: function() { hljs.initHighlightingOnLoad(); }
},
```

---

## 注意-2. 画像は手間がかかる
画像をはみ出さずに表示するには、マークダウンではなくHTMLで記述して、CSSで調整する必要があるようです。

<p class="wrap-img"><img src="img1.jpg" id="img1"></p>

--

###### HTML
```html
<p class="wrap-img"><img src="img1.jpg" id="img1"></p>
```

###### CSS
```css
p.wrap-img {
  /* デフォルトのテーマから変更して左揃えにしているため、
     改めて中央揃えにする必要がある。 */
  text-align: center;
}

#img1 {
  /* 各画像の縦横比や設置場所の広さに合わせて、
     個別にサイズを調整する必要がある。 */
  max-width: 50%;
  max-height: 50%;
}
```

---

## おわり
- <ruby>宮崎<rt>みやざき</rt></ruby> <ruby>雄策<rt>ゆうさく</rt></ruby>
- Mail:[toumin.m7@gmail.com](mailto:toumin.m7@gmail.com)
- Twitter:[@sutara_lumpur](//twitter.com/sutara_lumpur)
- Blog:[はてなブログ](http://sutara79.hatenablog.com/entry/2015/08/08/145608)