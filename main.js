const cheerio = require("cheerio");
const axios = require("axios");
const fs = require("fs");
const { Webhook, MessageBuilder } = require("discord-webhook-node");

function run() {
  const hook = new Webhook("");

  let pageUrl =
    "https://www.ikea.com/ro/ro/p/markus-scaun-rotativ-vissle-gri-inchis-70261150/";

  axios.get(pageUrl).then((response) => {
    const $ = cheerio.load(response.data);
    let price = $(
      "#pip-buy-module-content > div.pip-temp-price-module.pip-temp-price-module--informational.pip-temp-price-module--small.pip-temp-price-module--regular.js-price-package > div.pip-temp-price-module__price > div > span > span:nth-child(1) > span.pip-temp-price__integer"
    ).text();

    let thumbnail = $(
      "#pip-media-1 > button.pip-media-grid__image-button > span > img"
    ).attr("src");

    let productTitle = $(
      "#pip-buy-module-content > div.pip-temp-price-module.pip-temp-price-module--informational.pip-temp-price-module--small.pip-temp-price-module--regular.js-price-package > div.pip-temp-price-module__information > div > span > h1 > div > div.pip-header-section__container-text > span.pip-header-section__title--big.notranslate"
    ).text();

    fs.readFile("data.json", "utf8", (err, data) => {
      if (err) {
        console.error(err);
        return;
      }
      let fileData = JSON.parse(data);

      const embed = new MessageBuilder()
        .setTitle(productTitle)
        .setURL(pageUrl)
        .setColor("#00b0f4")
        .setImage(
          "https://www.ikea.com/ro/ro/static/ikea-logo.f7d9229f806b59ec64cb.svg"
        )
        .setThumbnail(thumbnail)
        .setTimestamp();

      hook.setUsername("dekolorbot");

      if (Number(price) > Number(fileData.price)) {
        console.log(
          "pretul nou este mai mare: " + price + " > " + fileData.price
        );
        embed.setDescription("Pretul a crescut: " + price);
        hook.send(embed);
      }

      if (Number(price) < Number(fileData.price)) {
        console.log("pretul nou redus: " + price);
        embed.setDescription("Pret nou redus: " + price);
        hook.send(embed);
      }

      let writeObj = { price: price };
      let content = JSON.stringify(writeObj);

      fs.writeFile("data.json", content, (err) => {
        if (err) {
          console.error(err);
        }
        // file written successfully
      });
    });
  });
}

run();

setInterval(() => {
  run();
}, 5000);
