exports.handler = function(event, context, callback) {
  callback('Hello', {
    statusCode: 200,
    body: 'error',
  })
}
