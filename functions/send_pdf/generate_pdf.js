const GoogleSpreadSheet = require("google-spreadsheet")
const { promisify } = require("util")

const creds = require("./credentials.json")

async function accessSpreadsheet() {
  const doc = new GoogleSpreadSheet(
    "1EEvBSJq9jcobWNS_5mK9mieoH5-15kr1HU3gaq5PSMQ"
  )
  await promisify(doc.useServiceAccountAuth)(creds)
  const info = await promisify(doc.getInfo)()
  const sheet = info.worksheets[0]

  const userData = {
    name: "Aman",
    email: "s.r.aman.sra@gmail",
    passcode: "hmm",
  }

  promisify(sheet.getRows)().then(temp => console.log(temp[0]))

  promisify(sheet.setHeaderRow)([
    "name",
    "passcode",
    "email",
    "yolo",
    "afsdfas",
    "afsdfasd",
  ])
    .then(promisify(sheet.addRow)(userData))
    .then(promisify(sheet.setTitle)("FormsData"))
    .then(() => console.log("set"))
    .catch(console.log)
  // console.log(`Title: ${sheet.title}, Rows: ${sheet.rowCount}`)
}

accessSpreadsheet()
// exports.handler = function(event, context, callback) {
//   callback("Hello", {
//     statusCode: 200,
//     body: "error",
//   })
// }
