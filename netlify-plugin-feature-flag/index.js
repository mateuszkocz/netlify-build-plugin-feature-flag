const removeProtocol = (url) => url.replace(/https?:\/\//, "")

module.exports = {
  onInit: (args) => {
    const {inputs, utils} = args
    const currentUrl = removeProtocol(process.env.URL)
    const configUrl = removeProtocol(inputs["for-url"])
    const branchPrefix = inputs["branch-prefix"]
    const currentBranch = process.env.HEAD
    const ignore = inputs["ignore"]
    const allow = inputs["allow"]

    // DEBUG
    console.log(args.inputs)
    console.log(process.env)

    console.log("currentUrl", currentUrl)
    console.log("configUrl", configUrl)
    console.log("branchPrefix", branchPrefix)
    console.log("currentBranch", currentBranch)
    console.log("ignore", ignore)
    console.log("allow", allow)

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
