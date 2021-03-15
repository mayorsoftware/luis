import React, { useState, useEffect, useContext, useMemo } from "react"
import { Context } from "../../FormContext"
import {
  Typography,
  Divider,
  Input,
  Button,
  Select,
  Checkbox,
  Modal,
} from "antd"
import TextState from "../TextState"
import FormState from "../FormState"
import ShowData from "../ShowData"
import { Field } from "formik"

const { Title, Paragraph, Text } = Typography
const { Option } = Select
const { TextArea } = Input

const Form = ({
  edit,
  toggle,
  page,
  category,
  id,
  visible,
  toggleEditModal,
  arrayMap,
}) => {
  // const [initialState, setInitialState] = useState({ initialState: "none" })
  const context = useContext(Context)
  const [formState, setFormState] = useState({
    type: "field",
    part: "lower",
    page,
    category,
  })

  useEffect(() => {
    if (id) {
      const data = context.data.find(field => field.id === id)
      setFormState(data)
      console.log(data)
    }
  }, [])

  const changeHandler = ({ target: { value, checked } }, field) => {
    if (field === "mandatory") value = !!checked
    setFormState({ ...formState, [field]: value })
  }

  const selectChangeHandler = (value, field) => {
    setFormState({ ...formState, [field]: value })
  }

  const submitHandler = e => {
    context.addData(formState)
    setFormState({ type: "field", part: "lower", page, category })
  }

  const submitEditHandler = (e, id) => {
    console.log(formState)
    context.editData(formState, id)
    toggleEditModal()
  }
  const cancelHandler = e => {
    context.toggleModal(false)
    setFormState({ type: "field", part: "lower", page, category })
  }

  const props = {
    selectChangeHandler,
    changeHandler,
    formState,
    setFormState,
    id,
  }

  return (
    <>
      <Modal
        title={`${!edit ? "Add" : "Edit"} Field`}
        visible={!edit ? context.modal : visible}
        onOk={!edit ? submitHandler : e => submitEditHandler(e, id)}
        onCancel={!edit ? cancelHandler : toggleEditModal}
      >
        {arrayMap && (
          <Select
            defaultValue={formState.order}
            onChange={value => selectChangeHandler(value, "order")}
            style={{ width: "100%" }}
          >
            {arrayMap.map((item, index) => (
              <Option value={item}>{index + 1}</Option>
            ))}
          </Select>
        )}
        <Text strong>Select the thing you want to insert.</Text>
        <Select
          defaultValue={formState.type}
          style={{ width: "100%" }}
          onChange={value => setFormState({ ...formState, type: value })}
        >
          <Option value="text">Text - Insert Text in your form.</Option>
          <Option value="field">
            Field - Insert any type of input in your form.
          </Option>
        </Select>
        <Text strong>Where you want to insert.</Text>
        <Select
          defaultValue={formState.part}
          style={{ width: "100%" }}
          onChange={value => selectChangeHandler(value, "part")}
        >
          <Option value="upper">Upper - Non Scrolling</Option>
          <Option value="lower">Lower - Scrolling</Option>
        </Select>
        <Divider />
        {formState.type === "text" ? (
          <TextState {...props} />
        ) : (
          <FormState {...props} />
        )}
      </Modal>
    </>
  )
}

export default Form
