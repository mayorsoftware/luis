import React, { useState, useRef, useEffect } from "react"
import * as yup from "yup"
import parse from "html-react-parser"
import SignaturePad from "react-signature-canvas"
import ScrollIntoView from "react-scroll-into-view"

import Layout from "./../layout"
import { Link } from "react-scroll"
import { Formik, ErrorMessage } from "formik"
import { useStaticQuery, graphql } from "gatsby"
import {
  Input as InputS,
  Typography,
  Checkbox,
  Upload as UploadS,
  Icon,
  Button as ButtonS,
  Modal,
  DatePicker as DatePickerS,
  Tooltip,
  message,
} from "antd"
import Header, { HomeLink } from "./../MainHeader"
import { Filler, Flex, Container, media } from "./../styles"
import styled from "styled-components"
import Camera from "react-html5-camera-photo"
import "./index.css"
const { Text } = Typography

const footerSpanishString = `Luis Muñoz - Photography le informa que los datos personales serán tratados de conformidad con lo dispuesto en el Reglamento (UE) 2016/679 del Parlamento Europeo y del Consejo, de 27 de abril de 2016 (RGPD), relativo a la protección de las personas físicas en lo que respecta al tratamiento de datos personales y a la libre circulación de estos datos. Puede ejercer los derechos que le asisten mediante solicitud expresa en la dirección de correo: privacy@luismunoz.photography`

const footerEnglishString = `Luis Muñoz - Photography informs you that personal data will be processed in accordance with Regulation (EU) 2016/679 of the European Parliament and of the Council of 27 April 2016 (RGPD) on the protection of individuals with regard to the processing of personal data and on the free movement of such data. You can exercise your rights by sending an express request to the following e-mail address: privacy@luismunoz.photography`

const Footer = styled.footer`
  font-size: 14px;
  color: rgba(0, 0, 0, 0.6);
  padding: 20px 0px;
  text-align: left;
`

const Image = styled.img`
  height: 300px;
  width: auto;
`

const TextS = styled(Text)`
  display: block;
  margin: 20px 0px;
  font-size: var(--textSize);
  font-weight: 600;
`

const Label = styled.label`
  display: block;
  margin: 10px 0px 10px 0px;
  font-size: ${({ small }) => (small ? "0px" : "var(--textSize)")};
  display: ${({ amount }) => (amount ? "none" : "block")};
  > span {
    color: red;
  }
`

const giveColor = (category, page) => {
  if (page === "form_a") {
    if (category === "adult") {
      return ["--legal"]
    }
    return ["--legal", "--underage"]
  }
  if (category === "adult") return ["--legal2"]
  return ["--legal2", "--underage2"]
}

const Strip1 = styled.div`
  width: 100%;
  border-left: solid 5px
    var(${({ category, page }) => giveColor(category, page)[0]});
  z-index: 750;
`

const Strip2 = styled.div`
  width: 100%;
  border-left: solid 5px
    var(${({ category, page }) => giveColor(category, page)[1]});
  z-index: 750;
`

const Input = styled(InputS)`
  width: 100%;
  max-width: ${({ amount }) => (amount ? "200px" : "400px")};
  padding: 3px 0px;
  &.ant-input {
    padding: 7px;
    ${({ touch }) => (touch ? "box-shadow: 0px 0px 5px green;" : "")};
    ${({ touch }) => (touch ? "border: 1px solid green;" : "")}
    ${({ touched }) => (touched ? "box-shadow: 0px 0px 5px red;" : "")};
    ${({ touched }) => (touched ? "border: 1px solid red;" : "")}
    ::placeholder {
      opacity: 0.7;
      color: black;
    }
  }
  > .ant-input {
    padding: 7px;
    ${({ touch }) => (touch ? "box-shadow: 0px 0px 5px green;" : "")};
    ${({ touch }) => (touch ? "border: 1px solid green;" : "")}
    ${({ touched }) => (touched ? "box-shadow: 0px 0px 5px red;" : "")};
    ${({ touched }) => (touched ? "border: 1px solid red;" : "")}
    ::placeholder {
      opacity: 0.7;
      color: black;
    }
  }
  &[type="date"] {
    display: none;
    ${media.phone`
      display: block;
    `}
  }
`
// const DatePicker = styled(DatePickerS)`
//   > div {
//     > .ant-input {
//       padding: 7px;
//       ${({ touch }) => (touch ? "box-shadow: 0px 0px 5px green;" : "")};
//       ${({ touch }) => (touch ? "border: 1px solid green;" : "")}
//       ${({ touched }) => (touched ? "box-shadow: 0px 0px 5px red;" : "")};
//       ${({ touched }) => (touched ? "border: 1px solid red;" : "")}
//       ::placeholder {
//         opacity: 0.7;
//         color: black;
//       }
//     }
//   }
//   ${media.phone`
//     display: none;
//   `}
// `

const DatePicker = styled(DatePickerS)`
  > div {
    > .ant-input {
      padding: 7px;
      ${({ touch }) => (touch ? "box-shadow: 0px 0px 5px green;" : "")};
      ${({ touch }) => (touch ? "border: 1px solid green;" : "")}
      ${({ touched }) => (touched ? "box-shadow: 0px 0px 5px red;" : "")};
      ${({ touched }) => (touched ? "border: 1px solid red;" : "")}
      ::placeholder {
        opacity: 0.7;
        color: black;
      }
    }
    > .ant-input,
    .ant-calendar-picker,
    .ant-calendar-picker-icon {
      ${media.phone`
      display: none;
    `}
    }
  }
  .ant-calendar-date {
    width: 30px;
  }
`

const TextNor = styled.div`
  font-size: 16px;
  padding: 10px 10px 10px 0px;
  flex: 12;
  > a {
    display: block;
    margin: 20px 0px;
  }
  button {
    opacity: 0.9;
    padding: 7px 30px;
    border-radius: 5px;
    width: 400px;
    color: white;
    transition: all 0.2s ease-in;
    &:hover {
      cursor: pointer;
      opacity: 1;
    }
  }

  #adult {
    background: var(--legal2);
  }

  #underage {
    background: var(--underage2);
  }
`

const Button = styled(ButtonS)`
  &.ant-btn {
    width: 170px;
    height: 104px;
  }
  ${media.phone`
    &.ant-btn {
  display: none;
    width: 100%;
    height: 104px;
    }
  `}
`

const Message = styled.div`
  color: red;
  padding: 5px;
  font-size: 14px;
`

const SubmitButton = styled(ButtonS)`
  &.ant-btn {
    width: 300px;
    margin-top: 30px;
  }
  ${media.phone`
    width: 100%;  
  `}
`

const IconS = styled(Icon)`
  font-size: 50px;
  color: white;
`

const Upload = styled(UploadS)`
  &.ant-upload.ant-upload-select-picture-card {
    width: 200px;
  }
`

const UploadDiv = styled.div`
  width: 170px;
  background: ${({ page }) =>
    page === "form_a" ? "var(--legal)" : "var(--legal2)"};
  ${media.phone`
    width: 83vw;
  `}
`

const Upper = styled.div`
  /* margin: 0px 0 0 0; */
  position: sticky;
  width: 100%;
  background: white;
  top: 0px;
  left: 0;
  display: flex;
  margin: 10px 0 0 0;
  flex-direction: column;
  z-index: 100;
  background: white;
  padding: 10px 0px 10px 0px;
  box-shadow: 0px 1px 0px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: row;
  align-items: center;
  ${media.phone`
    > span {
      width: 80%;
      }
  `}
`

const Lower = styled.div`
  margin: 20px 0 0 0;
  /* padding: 50px 0 0 0; */
`

const validationSchema = ({
  type,
  text,
  inputType,
  name_en,
  name_es,
  input,
  nameId,
  values,
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
  let scheme = null
  if (input === "input") {
    if (nameId === "name" || nameId === "surname") {
      return mandatory
        ? yup
            .string()
            .matches(/^([^0-9]*)$/, "Numbers are not accespted.")
            .required()
        : yup.string().matches(/^([^0-9]*)$/, "Numbers are not accespted.")
    } else if (inputType === "email") {
      return mandatory
        ? yup
            .string()
            .email()
            .required()
        : yup.string().email()
    } else if (inputType === "text") {
      return mandatory ? yup.string().required() : yup.string()
    } else if (inputType === "number") {
      return mandatory ? yup.number().required() : yup.number()
    }
  }
  if (input === "date") {
    return mandatory ? yup.string().required() : yup.string()
  }
  if (input === "upload") {
    return mandatory ? yup.string().required() : yup.string()
  }
  if (input === "signature") {
    return mandatory ? yup.string().required() : yup.string()
  }
  if (input === "checkboxes") {
    return mandatory ? yup.array().required() : yup.string()
  }
  if (mandatory) {
    return mandatory ? yup.string().required() : yup.string()
  }
}

const validation = data =>
  yup.object().shape(
    data
      .filter(item => item.type !== "text")
      .reduce(
        (prev, currKey) => ({
          [currKey.nameId]: validationSchema(currKey),
          ...prev,
        }),
        {}
      )
  )

class Signature extends React.Component {
  state = { trimmedDataURL: null }

  sigPad = {}

  clear = e => {
    e.preventDefault()
    this.sigPad.clear()
  }

  trim = e => {
    e.preventDefault()
    this.setState({
      trimmedDataURL: this.sigPad.getTrimmedCanvas().toDataURL("image/png"),
    })
    this.props.handleSignatureChange(
      this.sigPad.getTrimmedCanvas().toDataURL("image/png")
    )
  }

  render() {
    return (
      <Flex column w="500px" align="flex-end" res="width: 100%;">
        <Flex
          align="center"
          justify="space-between"
          style={{ marginTop: "20px", marginBottom: "10px", width: "100%" }}
          res="flex-direction: row;"
        >
          <Label>
            {!this.props.spanish ? this.props.name_en : this.props.name_es}
          </Label>
          <ButtonS onClick={this.clear}>Repeat Signature</ButtonS>
        </Flex>
        <SignaturePad
          penColor="black"
          ref={ref => {
            this.sigPad = ref
          }}
          canvasProps={{ className: "sigCanvas" }}
          onEnd={this.trim}
        />
      </Flex>
    )
  }
}

const Div = styled.div`
  height: 15px;
  position: relative;
  top: -60px;
  ${media.phone`
    height: 110px;
  `}
`

const StatusButton = styled.button`
  padding: 7px 0px;
  width: 400px;
  margin: 0px 0;
  color: white;
  border-radius: 5px;
  font-size: 18px;
  background: var(${({ bg, page }) => `--${bg}${page}`});
  cursor: pointer;
  ${media.phone`
    width: 100%;
  `}
`
const Status = ({ isValid, count, page }) => {
  const handleClick = e => {}
  console.log("Count -> ", count)
  return (
    <>
      <div style={{ height: 30 }} />
      <ScrollIntoView alignToTop selector="#adult">
        <StatusButton
          type="button"
          page={page === "form_a" ? "" : 2}
          onClick={handleClick}
          bg="legal"
        >
          Adult Information {"   "} {isValid && <Icon type="check" />}
        </StatusButton>
      </ScrollIntoView>
      <br />
      <ScrollIntoView alignToTop onClick={handleClick} selector="#underage">
        <StatusButton
          type="button"
          page={page === "form_a" ? "" : 2}
          bg="underage"
        >
          Underage Information
        </StatusButton>
      </ScrollIntoView>
      <Div
        name={count ? "adult" : "underage"}
        id={count ? "adult" : "underage"}
      />
    </>
  )
}
let count = 0

const RenderField = ({
  type,
  text,
  inputType,
  name_en,
  name_es,
  input,
  nameId,
  values,
  options,
  options_es,
  mandatory,
  placeholder_en,
  placeholder_es,
  text_en,
  text_es,
  handleChange,
  handleBlur,
  setFieldValue,
  spanish,
  touched,
  errors,
  setFieldTouched,
  index,
  data_lower,
  isValid,
  page,
}) => {
  const [image, setImage] = useState(null)
  const [location, setLocation] = useState("")
  const [signature, setSignature] = useState(null)
  const [modal, setModal] = useState(false)

  const toggleModal = () => setModal(!modal)

  const onTakePhoto = url => {
    setImage(url)
    setFieldValue(nameId, url)
    toggleModal()
  }

  if (!options_es) {
    options_es = options
  }

  const addImage = url => {
    setImage(url)
    setFieldValue(nameId, url)
  }

  const addLocation = display_name => {
    setLocation(display_name)
    setFieldValue(nameId, location)
  }

  function getBase64(img, callback) {
    const reader = new FileReader()
    reader.addEventListener("load", () => addImage(reader.result))
    reader.readAsDataURL(img)
  }

  function beforeUpload(file) {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png"
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!")
    }
    const isLt2M = file.size / 1024 / 1024 < 2
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!")
    }
    return isJpgOrPng && isLt2M
  }

  const handleUploadChange = info => {
    getBase64(info.file.originFileObj)
  }

  const handleSignatureChange = url => {
    setSignature(url)
    setFieldValue(nameId, url)
  }

  function onDateChange(date, dateString) {
    setFieldValue(nameId, dateString)
  }

  // const signature = this.refs.mySignature

  function onCheckboxChange(e, value, set, name, option) {
    const checked = e.target.checked
    if (checked) {
      if (name === "order") {
        set(name, [option])
      } else if (value[name]) {
        set(name, [...value[name], option])
      } else {
        set(name, [option])
      }
    } else {
      set(name, value[name].filter(options => options !== option))
    }
  }

  const uploadButton = (
    <div>
      {/* <Icon type={this.state.loading ? "loading" : "plus"} /> */}
      <UploadDiv page={page} className="ant-upload-text">
        <Icon style={{ fontSize: "50px", color: "white" }} h type="upload" />
      </UploadDiv>
    </div>
  )
  const Render = () => {
    if (type === "text") {
      if (text_en === "{{status}}") {
        count = count ? 0 : 1
        return <Status page={page} isValid={isValid} count={count} />
      }
      return (
        <TextNor
          dangerouslySetInnerHTML={{
            __html: !spanish ? text_en : text_es,
          }}
        ></TextNor>
      )
    }
    if (input === "input") {
      console.log(nameId)

      return (
        <>
          <Label
            dangerouslySetInnerHTML={{
              __html: `${!spanish ? name_en : name_es} ${
                !mandatory ? "" : "<span>*</span>"
              }`,
            }}
            amount={nameId === "amount"}
          ></Label>
          <Input
            touched={touched[nameId] && errors[nameId]}
            touch={touched[nameId] ? (!!errors[nameId] ? false : true) : false}
            onChange={handleChange}
            onBlur={handleBlur}
            type={inputType === "location" ? "text" : inputType}
            name={nameId}
            size="large"
            placeholder={!spanish ? placeholder_en : placeholder_es}
            required={mandatory}
            value={values[nameId] || location}
            allowClear={inputType === "location"}
            amount={nameId === "amount"}
            addonAfter={
              inputType === "location" ? (
                <Tooltip
                  placement="bottom"
                  title={<span>Get Location By GPS</span>}
                >
                  <Icon
                    style={{ fontSize: "16px", width: "50px" }}
                    onClick={() => {
                      if (!navigator.geolocation) {
                        return alert(
                          "Cannot perform the action as the support is not available on this device."
                        )
                      }

                      navigator.geolocation.getCurrentPosition(
                        ({ coords }) => {
                          const { latitude, longitude } = coords
                          fetch(
                            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
                          )
                            .then(res => res.json())
                            .then(({ display_name }) => {
                              // addLocation(display_name)
                              setFieldValue(nameId, display_name)
                            })
                            .catch(err => alert(JSON.stringify(err)))
                        },
                        error => {
                          return alert(error.message)
                        }
                      )
                    }}
                    type="environment"
                  />
                </Tooltip>
              ) : (
                ""
              )
            }
          />
          <Message>
            <ErrorMessage name={nameId} />
          </Message>
        </>
      )
    }
    if (input === "date") {
      return (
        <>
          <Label
            dangerouslySetInnerHTML={{
              __html: `${!spanish ? name_en : name_es} ${
                !mandatory ? "" : "<span>*</span>"
              }`,
            }}
          ></Label>
          <DatePicker
            touched={touched[nameId] && errors[nameId]}
            touch={touched[nameId] ? (!!errors[nameId] ? false : true) : false}
            onOpenChange={e => setFieldTouched(nameId, true)}
            onChange={onDateChange}
          />
          <Input
            type="date"
            name={nameId}
            touched={touched[nameId] && errors[nameId]}
            touch={touched[nameId] ? (!!errors[nameId] ? false : true) : false}
            onChange={handleChange}
            onBlur={handleBlur}
            size="large"
          />
          <Message>
            <ErrorMessage name={nameId} />
          </Message>
        </>
      )
    }
    if (input === "select") {
      return (
        <select name={nameId}>
          {options.map(option => (
            <option value={option}>{option}</option>
          ))}
        </select>
      )
    }
    if (input === "checkboxes") {
      return (
        <>
          <Label
            dangerouslySetInnerHTML={{
              __html: `${!spanish ? name_en : name_es} ${
                !mandatory ? "" : "<span>*</span>"
              }`,
            }}
            small={nameId === "tnc"}
          ></Label>
          {!spanish
            ? options.map(option => (
                <>
                  <Checkbox
                    style={{ color: "black" }}
                    onChange={e =>
                      onCheckboxChange(e, values, setFieldValue, nameId, option)
                    }
                    name={nameId}
                    onBlur={handleBlur}
                    required={mandatory}
                    style={{ fontSize: "var(--textSize)" }}
                    checked={
                      values[nameId] ? values[nameId].includes(option) : false
                    }
                  >
                    {nameId === "tnc" && (
                      <span style={{ color: "red" }}>*</span>
                    )}
                    {parse(`<span style="color: black">${option}</span>`)}{" "}
                  </Checkbox>
                  <ErrorMessage name={nameId} />
                  <br
                    style={{
                      display:
                        data_lower[index + 1] &&
                        data_lower[index + 1].nameId === "amount"
                          ? "none"
                          : "block",
                    }}
                  />
                </>
              ))
            : options_es.map(option => (
                <>
                  <Checkbox
                    onChange={e =>
                      onCheckboxChange(e, values, setFieldValue, nameId, option)
                    }
                    name={nameId}
                    onBlur={handleBlur}
                    required={mandatory}
                    style={{ fontSize: "var(--textSize)" }}
                    checked={
                      values[nameId] ? values[nameId].includes(option) : false
                    }
                  >
                    {nameId === "tnc" && (
                      <span style={{ color: "red" }}>*</span>
                    )}
                    {parse(option)}
                  </Checkbox>
                  <ErrorMessage name={nameId} />
                  <br
                    style={{
                      display:
                        data_lower[index + 1] &&
                        data_lower[index + 1].nameId === "amount"
                          ? "none"
                          : "block",
                    }}
                  />
                </>
              ))}
        </>
      )
    }
    if (input === "upload") {
      return (
        <>
          {/* <Label>{!spanish ? name_en : name_es}</Label> */}
          {image && <Image src={image} />}
          <Modal
            title="Take Photo"
            visible={modal}
            onOk={toggleModal}
            onCancel={toggleModal}
            footer={null}
          >
            {modal && (
              <Camera
                onTakePhoto={onTakePhoto}
                idealResolution={{ width: 200, height: 200 }}
              />
            )}
          </Modal>
          <Flex
            justify="space-between"
            w="500px"
            style={{ padding: "30px 0 0 0" }}
          >
            <div style={{ width: "200px" }}>
              <Label style={{ fontSize: 16 }}>
                {spanish ? "Subir fotografía" : "Upload Photo:"}
              </Label>
              <Upload
                style={{
                  width: "170px",
                  opacity: 1,
                  background:
                    page === "form_a" ? "var(--legal)" : "var(--legal2)",
                }}
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                beforeUpload={beforeUpload}
                onChange={handleUploadChange}
              >
                {uploadButton}
              </Upload>
            </div>
            <div>
              <Label style={{ fontSize: 16 }}>
                {spanish ? "Hacerse una foto ahora" : "Take a photo now:"}
              </Label>
              <Button
                onClick={toggleModal}
                style={{
                  background:
                    page === "form_a" ? "var(--legal)" : "var(--legal2)",
                  border: "none",
                }}
                type="primary"
              >
                <IconS style={{ color: "white" }} type="camera" />
              </Button>
            </div>
          </Flex>
          <ErrorMessage name={nameId} />
        </>
      )
    }
    if (input === "signature") {
      return (
        <>
          <Signature
            spanish={spanish}
            name_es={name_es}
            name_en={name_en}
            handleSignatureChange={handleSignatureChange}
          />
          <ErrorMessage name={nameId} />
        </>
      )
    }
  }

  return <>{Render()}</>
}

const RenderEngine = ({ data, spanish, category, page, link }) => {
  const [height, setHeight] = useState(0)
  const [state, setState] = useState({
    loading: false,
    confirmation: false,
    validation: false,
    loadingText: "Sending",
    ConfirmationText: "Form Send",
    normalText: "Send Form",
  })
  const [pdfUrl, setPdfUrl] = useState(0)
  const [disabled, setDisabled] = useState(false)
  const ref = useRef(null)
  const toggleDisabled = () => setDisabled(disabled)
  useEffect(() => {
    setHeight(ref.current.clientHeight)
  })

  const [homeLink, setHomeLink] = useState(false)

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) return setHomeLink(true)
      return setHomeLink(false)
    })
  }, [])

  const successMessage = () =>
    message.success(
      `The Form is successfully submitted, A copy of this has been sent to your mail. If not received, please check spam folder.`,
      10
    )

  const errorMessage = err =>
    message.error(
      `Something went wrong ${JSON.stringify(err)}. Please Try Again`,
      10
    )

  const data_upper = data.filter(({ part }) => part === "upper")

  const data_lower = data.filter(({ part }) => part === "lower")

  const validator = validation(data)

  return (
    <>
      <Layout>
        <Strip1 category={category} page={page}>
          <Strip2 category={category} page={page}>
            <Header spanish={spanish} link={link} />
            <Container>
              <Formik
                validationSchema={validator}
                onSubmit={data => {
                  setState({ ...state, loading: true })

                  fetch("/api/submit", {
                    method: "POST",
                    headers: {
                      "Content-type": "Application/json",
                    },
                    body: JSON.stringify({ ...data, page, category, spanish }),
                  })
                    .then(data => {
                      // console.log(data)
                      if (data.status === 500) {
                        setState({ ...state, loading: false })
                        errorMessage(data.statusText)
                      } else {
                        setState({ ...state, loading: false })
                        successMessage()
                      }
                    })
                    .catch(err => {

                        setState({ ...state, loading: false })
                      errorMessage(err)
                    })
                }}
              >
                {props => (
                  <form onSubmit={props.handleSubmit}>
                    <Upper ref={ref}>
                      {data_upper.map(field => (
                        <>
                          {
                            <RenderField
                              key={field.id}
                              {...field}
                              {...props}
                              spanish={spanish}
                            />
                          }
                        </>
                      ))}
                      <HomeLink
                        active={homeLink}
                        spanish={spanish}
                        link={link}
                      />
                    </Upper>
                    <Lower margin={height + 20}>
                      {data_lower.map((field, index) => (
                        <>
                          {
                            <RenderField
                              {...field}
                              {...props}
                              isValid={props.isValid}
                              spanish={spanish}
                              index={index}
                              data_lower={data_lower}
                              page={page}
                            />
                          }
                        </>
                      ))}
                    </Lower>
                    <SubmitButton
                      disabled={state.loading || !props.isValid}
                      type="primary"
                      onClick={props.handleSubmit}
                    >
                      Submit{" "}
                      {state.loading ? (
                        <Icon type="loading" />
                      ) : (
                        <Icon type="arrow-right" />
                      )}
                    </SubmitButton>
                  </form>
                )}
              </Formik>
              <Footer>
                {spanish ? footerSpanishString : footerEnglishString}
              </Footer>
            </Container>
          </Strip2>
        </Strip1>
      </Layout>
    </>
  )
}

export default RenderEngine
