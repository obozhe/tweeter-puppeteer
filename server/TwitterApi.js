const puppeteer = require('puppeteer');
const { performance } = require('perf_hooks');

const autoScroll = async page => {
  await page.evaluate(async () => {
    await new Promise((resolve, reject) => {
      let totalHeight = 0;
      const distance = 100;
      const timer = setInterval(() => {
        const scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;
        if (totalHeight >= scrollHeight || totalHeight >= 5000) {
          clearInterval(timer);
          resolve();
        }
      }, 50);
    });
  });
};

const typeText = async (page, selector, text) => {
  await page.waitForSelector(selector);
  await page.type(selector, text);
};

async function getTweetsBySearch(searchString, socket) {
  const tweetsSet = new Set();
  socket.emit('status', { message: 'Connecting to Twitter...', done: false, error: false });
  const filterTweets = async response => {
    try {
      if (response.url().startsWith('https://api.twitter.com/2/search/adaptive.json')) {
        const {
          globalObjects: { tweets }
        } = await response.json();
        for (let [, tweet] of Object.entries(tweets)) {
          if (!tweet.in_reply_to_status_id) tweetsSet.add(tweet.full_text);
        }
      }
    } catch (e) {}
  };

  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });

  const page = await browser.newPage();
  await page.setUserAgent(
    'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36'
  );
  await page.setRequestInterception(true);
  page.on('request', request => {
    const type = request.resourceType();
    type === 'stylesheet' || type === 'image' ? request.abort() : request.continue();
  });
  try {
    await page.goto('https://twitter.com/explore');
    socket.emit('status', { message: 'Searching for tweets ...', done: false, error: false });
  } catch (error) {
    socket.emit('status', { message: 'Connection failed.', done: false, error: true });
    return;
  }
  await typeText(page, 'input[data-testid=SearchBox_Search_Input]', searchString);
  await page.keyboard.press('Enter');
  console.log(page.url());
  try {
    await page.waitForSelector('div[data-testid=tweet]');
  } catch (error) {
    socket.emit('status', {
      message: `No tweets found about ${searchString}.`,
      done: false,
      error: true
    });
    return;
  }
  socket.emit('status', { message: 'Parsing and analyzing tweets ...', done: false, error: false });

  const t0 = performance.now();
  for (let i = 0; i < 10; i += 1) {
    page.on('response', filterTweets);
    await autoScroll(page);
  }

  const t1 = performance.now();
  console.log('Getting tweets: ' + ((t1 - t0) / 1000).toFixed(2) + ' seconds.');
  return tweetsSet;
}

module.exports = {
  getTweetsBySearch
};
