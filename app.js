const express = require('express')
const { engine } = require('express-handlebars')
const app = express()
const port = 3000
const fs = require('fs');
const shortUrl = require('./shortUrl/randomURL'); //調用檔案
// const originalURL1 = document.querySelector('#inputURL')  服務器端無法使用document等語法 只能在客戶端使用

app.engine('.hbs', engine({ extname: '.hbs' }));
app.set('view engine', '.hbs');
app.set('views', './views');

app.use(express.static('public')) //使用靜態文件
app.use(express.urlencoded({ extended: true })) //解析post數據

app.get('/', (req, res) => {
  res.redirect('/URL_Shortener')
})

app.get('/URL_Shortener', (req, res) => {
  res.render('index')
})

let urldata = {}   //讀取json檔案 
if (fs.existsSync('./data.json')) {
  try {
    const jsonData = fs.readFileSync('./data.json')
    urldata = JSON.parse(jsonData)

  }
  catch (error) {
    console.error(error)
  }
}

app.post('/URL_Shortener', (req, res) => {
  const originalURL = req.body.inputURL
  
  if (!originalURL) {
    res.render('index', { error: '請輸入正確的URL' })

    }

  if (!originalURL.toLowerCase().trim().startsWith("http")) {
    res.render('index', { error: '請輸入正確的URL' })

    return
  }


  if (Object.keys(urldata).includes(originalURL)) {   //辨認是否有同樣的縮網址
    useshortUrl = urldata[originalURL]
    res.render('index', { useshortUrl })
  }

  else {
    const useshortUrl = shortUrl() //執行 randomURL檔案內的函數
    urldata[`${originalURL}`] = `${useshortUrl}`
    fs.writeFileSync('./data.json', JSON.stringify(urldata)) //輸入進data.json檔案裡

    res.render('index', { useshortUrl })
  }

})

app.get('/:ShortUrl' , (req, res) => {
  const url = req.params.ShortUrl
  for (const key in urldata){
    if(url === urldata[key]){
      res.redirect(key)  //[key] 匹配到 url 這時可以直接使用key來代表相對應的鍵
      return
    }
  }
  red.status(404).send('Short URL not found')
})

app.listen(port, (req, res) => {
  console.log(`express server is running on http:/localhost:${port}`)
})

