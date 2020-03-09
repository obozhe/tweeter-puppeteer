const puppeteer = require('puppeteer');
const { performance } = require('perf_hooks');

const autoScroll = async page => {
  await page.evaluate(async () => {
    await new Promise((resolve, reject) => {
      let totalHeight = 0;
      const distance = 300;
      const timer = setInterval(() => {
        const scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;
        console.log(totalHeight);
        if (totalHeight >= scrollHeight || totalHeight >= 5000) {
          clearInterval(timer);
          resolve();
        }
      }, 100);
    });
  });
};

const delay = time =>
  new Promise(function(resolve) {
    setTimeout(resolve, time);
  });

const typeText = async (page, selector, text) => {
  await page.waitForSelector(selector);
  await page.type(selector, text);
};

async function getTweetsBySearch(searchString) {
  const tweetsSet = new Set();

  const filterTweets = async tweets => {
    for await (let tweet of tweets) {
      const text = await (await tweet.getProperty('innerText')).jsonValue();
      if (!text.includes('Replying to')) {
        tweetsSet.add(text);
      }
    }
  };

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox']
  });

  const page = await browser.newPage();
  await page.setUserAgent(
    'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36'
  );
  await page.goto('https://twitter.com/explore');
  await typeText(page, 'input[data-testid=SearchBox_Search_Input]', searchString);
  await page.keyboard.press('Enter');
  await page.waitForSelector('div[data-testid=tweet]');

  const t0 = performance.now();
  for (let i = 0; i < 15; i++) {
    await autoScroll(page);
    await delay(200);
    const tweets = await page.$$('div[data-testid=tweet] > div:nth-child(2) > div:nth-child(2)');
    await filterTweets(tweets);
  }
  const t1 = performance.now();
  console.log("Getting tweets: " + ((t1 - t0)/1000).toFixed(2) + " seconds.");
  return tweetsSet;
}

module.exports = {
  getTweetsBySearch
};
