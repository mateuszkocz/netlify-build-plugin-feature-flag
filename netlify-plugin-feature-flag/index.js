const removeProtocol = (url) => url.replace(/https?:\/\//, "")

module.exports = {
  onInit: (args) => {
    const {inputs, utils} = args
    const currentUrl = removeProtocol(process.env.URL)
    const configUrl = removeProtocol(inputs["for-url"])
    const branchPrefix = inputs["branch-prefix"]
    const currentBranch = process.env.BRANCH
    const ignore = inputs["ignore"]
    const allow = inputs["allow"]

    // DEBUG
    console.log(args)
    console.log(process.env)
    console.log(args.utils.git)

    console.log(currentUrl === configUrl, currentBranch.startsWith(branchPrefix))
    console.log(currentUrl, configUrl)

    if (currentUrl === configUrl) {
      const match = currentBranch.startsWith(branchPrefix)
      if (match && ignore) {
        utils.build.cancelBuild(`Canceling build. Source branch [${currentBranch}] matches the ignored prefix [${branchPrefix}].`)
      } else if (!match && allow) {
        utils.build.cancelBuild(`Canceling build. Source branch [${currentBranch}] matches the not allowed prefix [${branchPrefix}].`)
      }
    }
  }
}
