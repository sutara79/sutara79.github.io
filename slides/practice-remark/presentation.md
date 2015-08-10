# remark 0.11.0 を<br>なるべく手軽に使う
Powerpointを使わずに  
ブラウザで気軽にプレゼンしたい…


---
## マークダウンで記述する
文書の中身はマークダウンで記述します。  
外部ファイルにすれば、さらに便利です。

```javascript
var slideshow = remark.create({
  sourceUrl: 'markdown.md'
});
```
- 参照: [Home · gnab/remark Wiki](//github.com/gnab/remark/wiki#external-markdown)

---
### ページの区切り
なお、ページの区切りは`---`で固定されているようです。

##### マークダウン記法
```markdown
## 1ページ目
1ページ目の本文

---
## 2ページ目
- リスト
- リスト
- リスト

```

---
## 注意: 画像は手間がかかる
画像をはみ出さずに表示するには、マークダウンではなくHTMLで記述して、CSSで調整する必要があるようです。  
reveal.jsと同じですね。

<p class="wrap-img"><img src="img1.jpg" id="img1"></p>

---
### 画像用の記述
##### HTML
```html
<p class="wrap-img"><img src="img1.jpg" id="img1"></p>
```

##### CSS
```css
p.wrap-img {
  /* 中央揃えにする。 */
  text-align: center;
}

#img1 {
  /* 設置場所の広さに合わせて個別にサイズを調整する。 */
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