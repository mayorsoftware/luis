const functions = require("firebase-functions")

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//

const mongoose = require("mongoose")
const sgMail = require("@sendgrid/mail")
const pdf = require("html-pdf")

mongoose.connect("mongodb://luis:forms1234@ds127995.mlab.com:27995/forms", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
const Form = mongoose.model("forms", { data: String })

sgMail.setApiKey(
  "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"
)

const Render = values => ({
  type,
  text,
  inputType,
  name_en,
  name_es,
  input,
  nameId,
  options,
  mandatory,
  placeholder_en,
  placeholder_es,
  text_en,
  text_es,
  handleChange,
  handleBlur,
  setFieldValue,
  spanish,
}) => {
  if (type === "text") {
    return `<p class='text'>${!spanish ? text_en : text_es}</p>`
  } else if (input === "input") {
    return `
      <label>
      ${!spanish ? name_en : name_es}
      ${!mandatory ? "" : `<span>*</span>`}
      </label>
      <p class='answers'>${values[nameId]}</p>`
  } else if (input === "date") {
    return `<label>
            ${!spanish ? name_en : name_es} ${
      !mandatory ? "" : `<span>*</span>`
    }
          </label>
          <p 'answers'>${values[nameId]}</p>`
  }
  // if (input === "select") {
  //   return (
  //     <select name={nameId}>
  //       {options.map(option => (
  //         <option value={option}>{option}</option>
  //       ))}
  //     </select>
  //   )
  // }
  else if (input === "checkboxes") {
    return (
      `<label>
            ${!spanish ? name_en : name_es} ${
        !mandatory ? "" : `<span>*</span>`
      }
          </label>` +
      options.map(
        option =>
          `<input
                type="checkbox"
                ${values[nameId].includes(option) ? "checked" : ""}
                
                >
                ${option}
              `
      )
    )
  } else if (input === "upload") {
    return `
          <label>${!spanish ? name_en : name_es}</label>
          <img src='${values[nameId]}'/>
        `
  } else if (input === "signature") {
    return `
          <label>${!spanish ? name_en : name_es}</label>
          <img src='${values[nameId]}'/>`
  }
}

const HTMLRenderString = (data, inputData) => {
  const HTMLString = data.map(Render(inputData)).join("")

  const footerSpanishString = `Luis Muñoz - Photography le informa que los datos personales serán tratados de conformidad con lo dispuesto en el Reglamento (UE) 2016/679 del Parlamento Europeo y del Consejo, de 27 de abril de 2016 (RGPD), relativo a la protección de las personas físicas en lo que respecta al tratamiento de datos personales y a la libre circulación de estos datos. Puede ejercer los derechos que le asisten mediante solicitud expresa en la dirección de correo: privacy@luismunoz.photography`

  const footerEnglishString = `Luis Muñoz - Photography informs you that personal data will be processed in accordance with Regulation (EU) 2016/679 of the European Parliament and of the Council of 27 April 2016 (RGPD) on the protection of individuals with regard to the processing of personal data and on the free movement of such data. You can exercise your rights by sending an express request to the following e-mail address: privacy@luismunoz.photography`

  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="X-UA-Compatible" content="ie=edge" />
        <title>Authorization</title>
        <link href="https://fonts.googleapis.com/css?family=Roboto&display=swap" rel="stylesheet">

        <style>
      * {
        font-family: sans-serif;
        padding: 0;
        margin: 0;
      }
      header {
        font-size: 20px;
        margin: 40px 0px;
        font-family: sans-serif;
      }
      label {
        font-size: 15px;
        color: rgba(0, 0, 0, 0.6);
        display: block;
        margin: 20px 0px 10px 0px;
      }
      label > span {
        color: red;
      }
      /* img {
        padding: 10px;
        box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.21);
      } */
      .text {
        text-align: justify;
        margin: 10px 0px;
        line-height: 1.5;
        font-size: 15px;
      }
      .answers {
        font-weight: bold;
        font-family: sans-serif;
        font-size: 17px;
        margin: 0 0 30px 0;
      }
      .container {
        width: 90%;
        margin: 0 auto;
      }

      hr {
        border: solid 1px rgba(0, 0, 0, 0.05);
        margin: 20px 0px;
      }

      .strip1 {
        background: blue;
        position: fixed;
        top: 0;
        left: 0;
        width: 5px;
        height: 100%;
      }

      footer {
        font-size: 12px;
        color: rgba(0, 0, 0, 0.6);
        text-align: justify;
        padding: 30px 0px 30px 0px;
      }
    </style>
      </head>
      <body>
              <div class="container">
        <div class="strip1"></div>
        <header>
          <div>Luis Munoz Photography</div>
            <hr />

        </header>
        <main>${HTMLString}</main>
              <footer>
        Luis Muñoz - Photography informs you that personal data will be
        processed in accordance with Regulation (EU) 2016/679 of the European
        Parliament and of the Council of 27 April 2016 (RGPD) on the protection
        of individuals with regard to the processing of personal data and on the
        free movement of such data. You can exercise your rights by sending an
        express request to the following e-mail address:
        privacy@luismunoz.photography
      </footer>
                <div class="container">
      </body>
    </html>
  `
}

const config = {
  border: {
    top: "0.5in", // default is 0, units: mm, cm, in, px
    bottom: "0.5in",
  },
}

exports.send_pdf = functions.https.onRequest((request, response) => {
  // context.callbackWaitsForEmptyrequestLoop = false;

  const { body, isBase64Encoded } = request

  // if (isBase64Encoded) {
  const decodedBody = Buffer.from(body, "base64").toString("utf-8")
  // }

  let inputData = decodedBody

  if (typeof decodedBody === "string") {
    inputData = JSON.parse(decodedBody)
  }

  Form.findOne()
    .then(data => {
      const HTMLString = HTMLRenderString(
        JSON.parse(JSON.parse(data.data)).filter(
          ({ page, category }) => page === "form_a" && category === "adult"
        ),
        inputData
      )
      pdf.create(HTMLString, config).toBuffer(function(err, buffer) {
        if (err) {
          response({
            statusCode: 500,
            body: err,
          })
        }
        response({
          statusCode: 200,
          body: "done",
        })
        const bufferString = Buffer.from(buffer).toString("base64")
        const msg = (email, name) => ({
          to: email,
          from: "noreply@luismunoz.photography",
          subject: "Your from has been successfully submitted",
          text: `You have signed an agreement with Luis Munoz.`,
          html: `Here is a copy of the agreement as an attachment. Please do not reply to this email, it is an automated email. Thanks You/`,
          attachments: [
            {
              content: bufferString,
              filename: "agreement_luismunoz_photography.pdf",
              type: "application/pdf",
              disposition: "attachment",
              contentId: "mytext",
            },
          ],
        })

        const emails = ["s.r.aman.sra@gmail.com", inputData.email]
        emails.map(email => (email ? sgMail.send(msg(email)) : ""))
        // callback(null, {
        //   statusCode: 200,
        //   body: "Email Done!",
        // })
      })
    })
    // })
    .catch(error => {
      response({
        statusCode: 500,
        body: error,
      })
    })
})
