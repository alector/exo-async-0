const fsPromises = require('fs/promises')

const readText = async (filePath) => {
	try {
		let txt1 = await fsPromises.readFile(filePath, 'utf-8')
		console.log(txt1)
	} catch (e) {
		console.log(e.message)
	}
}

readText('hello.txt')
