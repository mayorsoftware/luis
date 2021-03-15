var co = require("co")
var mongoose = require("mongoose")

const lambdaParser = require("lambda-multipart-parser")

let conn = null

const uri = "mongodb://luis:forms1234@ds127995.mlab.com:27995/forms"

exports.handler = function(event, context, callback) {
  let { isBase64Encoded } = event

  let result = null

  // if (isBase64Encoded) {
  lambdaParser
    .parse(event)
    .then(console.log)
    .catch(console.log)
  // console.log(result)
  // }

  context.callbackWaitsForEmptyEventLoop = false

  // console.log(event.body)

  callback(null, { body: JSON.stringify(event.body), statusCode: 200 })
  // callback(null, { body: JSON.stringify(event), statusCode: 200 })
  // run().
  //   then(res => {
  //     callback(null, res);
  //   }).
  //   catch(error => callback(error));
}

function run() {
  return co(function*() {
    if (conn == null) {
      conn = yield mongoose.createConnection(uri, {
        bufferCommands: false,
        bufferMaxEntries: 0,
      })
      conn.model("forms", new mongoose.Schema("forms", { data: String }))
    }

    const Form = conn.model("forms")

    const doc = yield Form.findOne()
    return doc
  })
}
