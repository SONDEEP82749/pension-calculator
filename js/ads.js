// ads.js - AdSense integration (replace client & slot IDs with your own)

// 🟩 Top Ad
document.getElementById("topAd").innerHTML = `
  <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1234567890123456"
    crossorigin="anonymous"></script>
  <ins class="adsbygoogle"
      style="display:block"
      data-ad-client="ca-pub-1234567890123456"
      data-ad-slot="1234567890"
      data-ad-format="auto"
      data-full-width-responsive="true"></ins>
  <script>
      (adsbygoogle = window.adsbygoogle || []).push({});
  </script>
`;
