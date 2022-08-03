#! /usr/bin/env node

const path = require("path")
const process = require("process")
const child_process = require("child_process")
const fse = require("fs-extra")

const directory = process.argv[2]

if (!directory) {
  console.log("\nPlease specify the project directory:")
  console.log("  \x1b[36m%s\x1b[0m \x1b[32m%s\x1b[0m", "create-pixi3d-app", "<project-directory>")
  console.log("\nFor example:")
  console.log("  \x1b[36m%s\x1b[0m \x1b[32m%s\x1b[0m\n", "create-pixi3d-app", "my-pixi3d-app")
  process.exit()
}

const directoryPath = path.join(path.dirname(path.resolve()), directory)

console.log("\nCreating a new Pixi3D app in \x1b[32m%s\x1b[0m\n", directoryPath)

fse.mkdir(directory, () => {
  fse.copy(path.join(__dirname, "../template"), directory, (e) => {
    const install = child_process.spawn("npm", ["install"], {
      cwd: directory,
      stdio: "inherit"
    })
    install.on("close", (code) => {
      if (code === 0) {
        console.log("\nSuccess! We suggest that you begin by typing:\n")
        console.log("  \x1b[36m%s\x1b[0m %s", "cd", path.basename(directoryPath))
        console.log("  \x1b[36m%s\x1b[0m", "npm start\n")
      }
    })
  })
})