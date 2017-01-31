const fs = require('fs')
const spawn = require('child_process').spawn
const babel = require('babel-core')
require('colors')

const pkg = JSON.parse(fs.readFileSync('package.json'))
console.log(`\nWatching ${pkg.name} v${pkg.version}\n`.underline.bold)

const build = spawn('yarn', ['run', 'build'])
build.on('close', code => console.log('Initial build ready\n'.grey)) // ready
build.on('error', error => console.log(error))

const fileChanged = function (filename) {
  if (filename.endsWith('.less')) {
    const build = spawn('yarn', ['run', 'build-styles'])
    // build.on('close', code => console.log('Build ready')) // ready
    build.on('error', error => console.log(error))
  } else if (filename.endsWith('.js')) {
    try {
      const result = babel.transformFileSync('./src/' + filename).code
      fs.writeFileSync('./lib/' + filename, result)
    } catch (error) {
      console.log(error.message.red + '\n')
      if (error._babel) {
        console.log(error.codeFrame)
        console.log('')
      } else {
        console.log(error)
      }
    }
  } else if (fs.lstatSync('./src/' + filename).isDirectory()) {
    fs.mkdirSync('./lib/' + filename)
    fs.readdirSync('./src/' + filename).forEach(file => {
      fileChanged(filename + '/' + file)
      console.log(filename.grey + '/' + file)
    })
  }
}

const deleteFile = function (filename) {
  if (fs.lstatSync(filename).isDirectory()) {
    fs.readdirSync(filename).forEach(file => deleteFile(filename + '/' + file))
    fs.rmdirSync(filename)
  } else {
    fs.unlinkSync(filename)
  }
}

const fileEvent = function (eventType, filename) {
  const existsInLib = fs.existsSync('./lib/' + filename)
  const existsInSrc = fs.existsSync('./src/' + filename)
  const action = eventType === 'rename' ? !existsInSrc ? 'deleted' : 'created' : 'changed'

  console.log(filename.bold + ` ${action}`.grey)
  if (action === 'deleted' && existsInLib) {
    deleteFile('./lib/' + filename)
  } else {
    fileChanged(filename)
  }
}

fs.watch('./src', {recursive: true}, fileEvent)
