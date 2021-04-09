const fsPromises = require('fs/promises')

const readText = async (filePath) => {
	try {
		let txt1 = await fsPromises.readFile(filePath, 'utf-8')
		txt1 = txt1.toUpperCase()

		await fsPromises.writeFile(filePath, txt1)
	} catch (e) {
		console.log(e.message)
	}
}

readText('hello.txt')
