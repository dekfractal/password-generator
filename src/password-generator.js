class PasswordGenerator {

  // コンストラクタ
  constructor() {}

  // パスワードを生成する
  password(length) {

    let char = '';
    let validChars = [];
    let password = '';

    // パスワードで使用する文字をセットする
    for (let i=33; i<=126; ++i) {
      char = String.fromCharCode(i);
      validChars.push(char);
    }

    // ランダムな文字からパスワードの文字列を作成する
    while (password.length < length) {
      char = validChars[this.rand(0, validChars.length)];
      password = password + char;
    }

    return password;
  }

  // 乱数を生成する
  rand(min, max) {

    let arr = new Uint8Array(max);
    crypto.getRandomValues(arr);

    // 条件を満たしている乱数が見つかったら返す
    for (let value of arr) {
      if (value >= min && value < max) {
        return value;
      }
    }

    return this.rand(min, max);
  }

}
