const mongoose = require("mongoose")
mongoose.connect("mongodb://luis:forms1234@ds127995.mlab.com:27995/forms", {
  useNewUrlParser: true,
})

const Form = mongoose.model("forms", { data: String })

exports.handler = function(event, context, callback) {
  const { body } = event
  context.callbackWaitsForEmptyEventLoop = false
  Form.findOne()
    .then(data => {
      callback(null, {
        statusCode: 200,
        body: data.data,
      })
    })
    .catch(error => {
      callback(null, {
        statusCode: 500,
        body: error,
      })
    })
}
