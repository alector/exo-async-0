const fsPromises = require('fs/promises')
const axios = require('axios')
var path = require('path')

const getHtml = async (url, save_name) => {
	const saveFileName = `${save_name}.html`
	const saveFilePath = path.join('downloads', saveFileName)

	try {
		const response = await axios.get(url)
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

getHtml('https://www.goodreads.com/author/quotes/903.Homer', 'HomerQuotes')

getHtml(
	'https://www.successories.com/iquote/author/5/marcus-tullius-cicero-quotes/1',
	'CiceroQuotes'
)
