let characters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

function gertshortUrl() {
  let shortUrl = '';


    for (let i = 0; i < 5; i++) {
      let IndexRandom = Math.floor(Math.random() * characters.length);
      shortUrl += characters[IndexRandom];
      characters.splice(IndexRandom, 1);

    }


  return shortUrl
}

module.exports = gertshortUrl  //輸出檔案以供調用

