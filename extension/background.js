// firefox and safari use `browser` for web-extension APIs, chromium uses `chrome`
var extension = typeof browser == 'undefined' ? chrome: browser;

function generateNewsUrlWithTab(tab) {
  const { url, title } = tab;
  const params = new URLSearchParams({
    url,
    title
  });

  return `https://news.hada.io/write?${params.toString()}`;
}

extension.action.onClicked.addListener(async tab => {
  await extension.tabs.create({
        active: true,
        url: generateNewsUrlWithTab(tab)
    });
});
