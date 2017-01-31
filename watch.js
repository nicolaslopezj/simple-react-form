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
    const result = babel.transformFileSync('./src/' + filename).code
    fs.writeFileSync('./lib/' + filename, result)
  }
}

fs.watch('./src', {recursive: true}, (eventType, filename) => {
  const existsInLib = fs.existsSync('./lib/' + filename)
  const existsInSrc = fs.existsSync('./src/' + filename)
  const action = eventType === 'rename' ? existsInLib && !existsInSrc ? 'deleted' : 'created' : 'changed'

  if (action === 'deleted') {
    fs.unlinkSync('./lib/' + filename)
  } else {
    fileChanged(filename)
  }

  console.log(filename.bold + ` ${action}`.grey)
})
