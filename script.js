let viewXML = (xmlDocument) => {
  //取得した文字列をコンソール出力
  //console.log(xmlDocument);

  //XML形式に変換
  const parser = new DOMParser();
  const doc = parser.parseFromString(xmlDocument, "text/xml");
  let rss = doc.documentElement.getElementsByTagName("item");

  //HTMLタグの作成
  for(let i = 0;i < rss.length;i++){
      //RSSから取得したタイトルとリンク情報を格納
      let rssTitle = rss[i].getElementsByTagName("title")[0].textContent;
      let rssLink   = rss[i].getElementsByTagName("link")[0].textContent;
      let rssDescription = rss[i].getElementsByTagName("description")[0].textContent;
      rssDescription = rssDescription.split('。', 1);
      let today = new Date();
      let [year, month, day] = [today.getFullYear(), ("0" + (today.getMonth()+1)).slice(-2), ("0" + today.getDate()).slice(-2)];
      today = year + '/' + month + '/' + day;

      //テンプレート文字列を使ってアンカータグを作成
      const tagString = `
      <div class="p-2 border bg-light">
        <p class="fs-6 text-black-50 mb-0">タイトル</p>
        <p id="copyTitle${i}">${rssTitle}</p>
        <p class="text-end"><button id="copyTitleBtn${i}" onclick="copyTitleToCb(${i})">copy</button></p>
      </div>
      <div class="p-2 border bg-light">
        <p class"fs-6 text-black-50 mb-0"></p>
        <p id="copyLead${i}">${rssDescription}。${today}</p>
        <p class="text-end"><button id="copyLeadBtn${i}" onclick="copyLeadToCb(${i})">copy</button></p>
      </div>
      <p class="text-end">
        <a href="${rssLink}" target="_blank" rel="noopener noreferer">
          <span>記事ページを確認する→</span>
        </a>
      </p>
      <br/>`;

      //body以下にアンカータグを挿入
      document.getElementById('getRssField').insertAdjacentHTML('beforeend',tagString );
  }
};
const URL = 'https://newsdig.tbs.co.jp/list/feed/rss/rss4media?mediaid=rbc';
fetch(URL)
.then( response => response.text())
.then( xmlData => viewXML(xmlData));



function copyTitleToCb(n) {
  let copyBtn = document.getElementById("copyTitleBtn"+n);
  let copyTarget = document.getElementById("copyTitle"+n).innerHTML; // コピー対象をJavaScript上で変数として定義する
  console.log(copyTarget);
  navigator.clipboard.writeText(copyTarget); // 選択しているテキストをクリップボードにコピーする
  copyBtn.innerHTML = 'copied!';
}

function copyLeadToCb(n) {
  let copyBtn = document.getElementById("copyLeadBtn"+n);
  let copyTarget = document.getElementById("copyLead"+n).innerHTML; // コピー対象をJavaScript上で変数として定義する
  console.log(copyTarget);
  navigator.clipboard.writeText(copyTarget); // 選択しているテキストをクリップボードにコピーする
  copyBtn.innerHTML = 'copied!';
}