const fsPromises = require('fs/promises')
const axios = require('axios')
var path = require('path')
let readlineSync = require('readline-sync')
var validUrl = require('valid-url')

const urlValidate = (url) => {
	if (!validUrl.isUri(url)) {
		let msg = `⚠️  This doesn't look like a valid URL. \n Please enter a correct url:\n `
		url = readlineSync.question(msg)
		return urlValidate(url)
	}

	return url
}
const getHtml = async () => {
	let msg = 'Please enter a URL to download: '
	const url = readlineSync.question(msg)

	const verifiedUrl = urlValidate(url)

	try {
		const response = await axios.get(verifiedUrl)
		const save_name = response.request.socket.servername
		const saveFileName = `${save_name}.html`
		const saveFilePath = path.join('downloads', saveFileName)

		await fsPromises.writeFile(saveFilePath, response.data)

		const stats = await fsPromises.stat(saveFilePath)
		const lengthHeaders = response.headers['content-length']

		const msg = `
	===== new download ====
	Downloaded: ${save_name}.html
	Size found in Headers: 	${lengthHeaders}
	Size of saved html: 	${stats.size}
	`
		console.log(msg)
	} catch (e) {
		console.log(e.message)
	}
}

getHtml()
// getHtml('https://www.goodreads.com/author/quotes/903.Homer', 'HomerQuotes')
//
// getHtml(
// 	'https://www.successories.com/iquote/author/5/marcus-tullius-cicero-quotes/1',
// 	'CiceroQuotes'
// )
