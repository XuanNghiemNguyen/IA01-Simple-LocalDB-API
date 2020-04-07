const checkServer = async () => {
  await axios
    .get(`http://127.0.0.1:3000`)
    .then((_) => {
      console.log('server Pháp - Anh đang hoạt động.')
    })
    .catch((_) => {
      document.getElementById('modal-body').innerHTML =
        'Server Pháp - Anh không hoạt động'
      document.getElementById('errorBtn').click()
      return false
    })
  await axios
    .get(`http://127.0.0.1:4000`)
    .then((_) => {
      console.log('server Anh - Việt đang hoạt động.')
    })
    .catch((_) => {
      document.getElementById('modal-body').innerHTML =
        'Server Anh - Việt không hoạt động'
      document.getElementById('errorBtn').click()
      return false
    })
  return true
}
checkServer()
const translation = async () => {
  const keyword = document.getElementById('keyword').value
  if (!keyword) {
    document.getElementById('resultField').value = 'Hãy nhập từ khóa!'
    return
  }
  await axios
    .get(`http://127.0.0.1:3000/translate/fr-en?keyword=${keyword}`)
    .then(async (response) => {
      if (response.data) {
        const { results, message, count } = response.data
        document.getElementById('resultField').value = message
        if (count > 0) {
          await results.forEach(async (item) => {
            axios.get(`http://127.0.0.1:4000/translate/en-vie?keyword=${item.mean}`)
              .then((response1) => {
                if (response1.data && response1.data.results && response1.data.count) {
                  document.getElementById('resultField').value += '\n *  ' + item.word + ': ' + response1.data.results[0].mean
                } else {
                  document.getElementById('resultField').value += '\n *  ' + item.word + ': ' + `chưa rõ nghĩa, ý của bạn là từ '${item.mean}' trong tiếng anh?`
                }
              })
              .catch((err) => {
                console.log('API-2:', err)
              })
          })
        }
        document.getElementById('resultNumber').innerHTML = count
      }
    })
    .catch((err) => {
      console.log('API-1:', err)
      document.getElementById('resultField').value = ''
      document.getElementById('resultNumber').innerHTML = ''
    })
}
