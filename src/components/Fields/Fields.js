import React, { useState, useEffect, useContext } from "react"
import { Link } from "gatsby"
import { Typography, Divider, Input, Button, Select, Checkbox } from "antd"

const { Title, Paragraph, Text } = Typography
const { Option } = Select
const { TextArea } = Input

const Fields = ({ formState, setFormState }) => {
  // const [formState, setFormState] = useState({});
  // console.log(formState)

  const changeHandler = ({ target: { value, checked } }, field) => {
    setFormState({ ...formState, [field]: value })
  }

  const selectChangeHandler = (value, field) => {
    setFormState({ ...formState, [field]: value })
  }

  if (formState.input === "input") {
    return (
      <>
        <Text strong>Select The Type:</Text>
        <Select
          defaultValue={formState.inputType}
          style={{ width: "100%" }}
          onChange={e => selectChangeHandler(e, "inputType")}
        >
          <Option value="text">Text</Option>
          <Option value="number">Number</Option>
          <Option value="email">Email</Option>
          <Option value="location">Location</Option>
        </Select>
        <Text strong>Placeholder (English):</Text>
        <Input
          style={{ width: "100%" }}
          name="placeholder"
          value={formState.placeholder_en}
          onChange={e => changeHandler(e, "placeholder_en")}
        />
        <Text strong>Placeholder (Spanish):</Text>
        <Input
          style={{ width: "100%" }}
          name="placeholder"
          value={formState.placeholder_es}
          onChange={e => changeHandler(e, "placeholder_es")}
        />
      </>
    )
  } else if (formState.input === "select") {
    return (
      <>
        <Text strong>Add Options (Each Option in Each Line):</Text>
        <TextArea
          type="text"
          name="SelectOptions"
          style={{ width: "100%" }}
          value={formState.selectOptions}
          onChange={e => changeHandler(e, "selectOptions")}
        />
      </>
    )
  } else if (formState.input === "upload") {
    return <></>
  } else if (formState.input === "date") {
    return <></>
  } else if (formState.input === "checkboxes") {
    return (
      <>
        <Text strong>Add Options (Each Option in Each Line):</Text>
        <TextArea
          type="text"
          name="checkboxOptions"
          placeholder="English ones here."
          style={{ width: "100%" }}
          value={formState.checkboxOptions}
          onChange={e => changeHandler(e, "checkboxOptions")}
        />
        <br />
        <br />
        <TextArea
          type="text"
          placeholder="Spanish ones here."
          name="checkboxOptions_es"
          style={{ width: "100%" }}
          value={formState.checkboxOptions_es}
          onChange={e => changeHandler(e, "checkboxOptions_es")}
        />
      </>
    )
  } else if (formState.input === "signature") {
    return <></>
  }
  return <p>Please Select An Input Type.</p>
}

export default Fields
