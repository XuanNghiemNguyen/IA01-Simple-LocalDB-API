const express = require('express')
const app = express()
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('./database/phap-anh.json')
const db = low(adapter)
const morgan = require('morgan')
var bodyParser = require('body-parser')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
app.use(morgan('dev'))


app.get('/', (req, res) => {
  const ret = {
    msg: 'hello'
  }
  res.status(200).json(ret)
})

app.get('/translate', (req, res) => {
  const ret = db.get('words')
  res.status(200).json(ret)
})

app.get('/translate/fr-en', (req, res) => {
  try {
    const { keyword } = req.query
    if (!keyword) {
      throw new Error('Hãy nhập từ khóa!')
    }
    const keySearch = new RegExp(keyword.toLowerCase())
    let results = db.get('words').value()
    results = results.filter(item => item.french.toLowerCase().match(keySearch))
    if (!results.length) {
      throw new Error(`Không tìm thấy kết quả nào với từ: '${keyword}'`)
    }
    results = results.map(item => {
      return (
        {
          word: item.french,
          mean: item.english
        }
      )
    })
    res.status(200).json({
      title: 'TỪ ĐIỂN PHÁP-ANH',
      message: `Tìm thấy ${results.length} kết quả cho từ khóa '${keyword}':`,
      results
    })
  } catch (error) {
    res.status(403).json({
      title: 'TỪ ĐIỂN PHÁP-ANH',
      message: error.toString().substring(7)
    })
  }
})

app.get('/translate/en-fr', (req, res) => {
  try {
    const { keyword } = req.query
    if (!keyword) {
      throw new Error('Hãy nhập từ khóa!')
    }
    const keySearch = new RegExp(keyword.toLowerCase())
    let results = db.get('words').value()
    results = results.filter(item => item.english.toLowerCase().match(keySearch))
    if (!results.length) {
      throw new Error(`Không tìm thấy kết quả nào với từ: '${keyword}'`)
    }
    results = results.map(item => {
      return (
        {
          word: item.english,
          mean: item.french
        }
      )
    })
    res.status(200).json({
      title: 'TỪ ĐIỂN ANH-PHÁP',
      message: `Tìm thấy ${results.length} kết quả cho từ khóa '${keyword}':`,
      results
    })
  } catch (error) {
    res.status(403).json({
      title: 'TỪ ĐIỂN ANH-PHÁP',
      message: error.toString().substring(7)
    })
  }
})

app.post('/add-word', (req, res) => {
  try {
    const { french, english } = req.body
    if (!french || !english) {
      throw new Error(`Hãy nhập cụm từ điển với key là 'french' và 'english' !`)
    }
    db.get('words')
      .push({ french, english })
      .write()
    res.status(201).json({
      success: true,
      message: 'Thêm mới thành công!',
      newWord: { french, english }
    })
  } catch (error) {
    res.status(403).json({
      title: 'TỪ ĐIỂN PHÁP/ANH',
      message: error.toString().substring(7)
    })
  }
})

const PORT = 3000

app.listen(PORT, () => {
  console.log(`Dictionary-API is running on port ${PORT}`)
})
