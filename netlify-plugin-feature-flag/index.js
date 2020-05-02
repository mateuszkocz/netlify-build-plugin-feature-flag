module.exports = {
  onPreBuild: (...args) => {
    console.log(args)
    console.log(process.env)
  }
}
