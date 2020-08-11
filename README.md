# password-generator
ランダムなパスワードを生成します。
## 使い方
8文字のランダムなパスワードを生成するには、次のようにします。[参考](https://github.com/dekfractal/password-generator/blob/master/test/index.html)
```JavaScript
let pg = new PasswordGenerator();
let password = pg.password(8);
```
パスワードの条件として、次のような複雑な条件を設定することも可能です。[参考](https://github.com/dekfractal/password-generator/blob/master/src/password.js)
- 長さは8文字
- 「大文字の英字」を1文字以上含む
- 「小文字の英字」を1文字以上含む
- 「数字」を1文字以上含む
- 「記号の-か?いずれか」を1文字以上含む
```JavaScript
customPassword() {

  const PASSWORD_LENGTH = 8;
  let password = '';
  let passwordGenerator = new PasswordGenerator();

  while (!this.isStrongEnough(password)) {
    password = passwordGenerator.password(PASSWORD_LENGTH);
  }

  return password;
}

isStrongEnough(password) {

  let uppercaseMinCount = 1;
  let lowercaseMinCount = 1;
  let numberMinCount = 1;
  let specialMinCount = 1;

  const UPPERCASE_RE = /([A-Z])/g;
  const LOWERCASE_RE = /([a-z])/g;
  const NUMBER_RE = /[\d]/g;
  const SPECIAL_CHAR_RE = /[\-\?]/g;

  let uc = password.match(UPPERCASE_RE);
  let lc = password.match(LOWERCASE_RE);
  let n = password.match(NUMBER_RE);
  let sc = password.match(SPECIAL_CHAR_RE);

  return (
      uc && uc.length >= uppercaseMinCount &&
      lc && lc.length >= lowercaseMinCount &&
      n  && n.length >= numberMinCount &&
      sc && sc.length >= specialMinCount
  ) ? true : false;
}
```
## ライセンス
MIT License
## プログラムの詳細
プログラムの詳細については、下記のページを参照してください。  
[参考ページ](https://dekfractal.com/2020/08/08/%e3%80%90javascript%e3%80%91%e3%83%91%e3%82%b9%e3%83%af%e3%83%bc%e3%83%89%e3%82%b8%e3%82%a7%e3%83%8d%e3%83%ac%e3%83%bc%e3%82%bf%e3%82%92%e4%bd%9c%e3%81%a3%e3%81%a6%e3%81%bf%e3%82%88%e3%81%86%ef%bc%81/)
