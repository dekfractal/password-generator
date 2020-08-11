class Password {

  // コンストラクタ
  constructor(trigger, options) {

    this.resolveOptions(options);
    this.listenClick(trigger);
  }

  // 属性を取得する関数を定義する
  // コンストラクタで渡されたカスタム関数を使用するか、クラスで定義されたデフォルトの関数を使用する
  resolveOptions(options = {}) {

    this.target = (typeof options.target === 'function') ? options.target : this.defaultTarget;
  }

  // 引数で渡されたトリガーにクリックイベントリスナーを追加する
  listenClick(trigger) {

    const triggers = document.getElementsByClassName(trigger);

    for (let trg of triggers) {
      trg.addEventListener('click', (e) => this.onClick(e));
    }
  }

  // クリックイベントを定義する
  onClick(e) {

    const trigger = e.currentTarget;
    const targets = this.target(trigger) || [];

    let password = this.customPassword();

    for (let tgt of targets) {
      tgt.value = password;
    }
  }

  // デフォルトの'target'のルックアップ関数
  defaultTarget(trigger) {

    const className =  getAttributeValue('target', trigger);

    if (className) {
      return document.getElementsByClassName(className);
    }
  }

  // パスワード生成する
  customPassword() {

    const PASSWORD_LENGTH = 8;
    let password = '';
    let passwordGenerator = new PasswordGenerator();

    while (!this.isStrongEnough(password)) {
      password = passwordGenerator.password(PASSWORD_LENGTH);
    }

    return password;
  }

  // パスワードが条件を満たしているか判定する
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

}

// 属性値を取得するヘルパー関数
function getAttributeValue(suffix, element) {

  const attribute = 'data-password-' + suffix;

  if (!element.hasAttribute(attribute)) {
    return ;
  }

  return element.getAttribute(attribute);
}
