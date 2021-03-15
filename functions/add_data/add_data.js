const mongoose = require("mongoose")
const axios = require("axios")
mongoose.connect("mongodb://luis:forms1234@ds127995.mlab.com:27995/forms", {
  useNewUrlParser: true,
})

const Form = mongoose.model("forms", { data: String })

exports.handler = function(event, context, callback) {
  const { body } = event
  context.callbackWaitsForEmptyEventLoop = false

  const { user } = context.clientContext

  if (!user) {
    callback(null, { statusCode: 404, body: "You should not be doing this. " })
  }

  Form.findOne()
    .then(data => {
      return Form.findByIdAndUpdate(data.id, {
        data: JSON.stringify(body),
      })
    })
    .then(data => {
      axios
        .post(
          "https://api.netlify.com/build_hooks/5da9946e88ac2c71a38b9b2b?trigger_title=Triggere+from+admin+panel"
        )
        .then(() => {
          callback(null, {
            statusCode: 200,
            body:
              "Data is successfully added. Triggered the build also. Wait for 5 minutes for changes to appear or check the dashboard.",
          })
        })
        .catch(() => {
          callback(null, {
            statusCode: 200,
            body:
              "Data is successfully added. But the triggered is failed. Go in netlify dashboard and trigger manually.",
          })
        })
    })
    .catch(() => {
      const form = new Form({ data: JSON.stringify({ name: "aman" }) })
      return form.save()
    })
}
