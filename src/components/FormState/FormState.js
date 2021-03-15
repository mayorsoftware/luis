import React, { useState, useEffect, useContext } from "react"
import { Typography, Divider, Input, Button, Select, Checkbox } from "antd"
import FormContext, { Context } from "./../../FormContext"
import Fields from "./../Fields"

const { Title, Paragraph, Text } = Typography
const { Option } = Select
const { TextArea } = Input

const FormState = ({
  id,
  toggle,
  formState,
  changeHandler,
  selectChangeHandler,
  setFormState,
}) => (
  <>
    <Text strong>Select the name of the Input (English):</Text>
    <Input
      type="text"
      name="name"
      value={formState.name_en}
      style={{ width: "100%" }}
      onChange={e => changeHandler(e, "name_en")}
    />

    <Text strong>Select the name of the Input (Spanish):</Text>
    <Input
      type="text"
      name="name"
      value={formState.name_es}
      style={{ width: "100%" }}
      onChange={e => changeHandler(e, "name_es")}
    />
    <Text strong>Select the ID of the Input (Unique):</Text>
    <Input
      type="text"
      name="nameId"
      value={formState.nameId}
      style={{ width: "100%" }}
      onChange={e => changeHandler(e, "nameId")}
    />
    <Text strong>Select the type of the Input:</Text>
    <Select
      style={{ width: "100%" }}
      defaultValue={formState.input}
      onChange={e => selectChangeHandler(e, "input")}
    >
      <Option value="input">Input Field</Option>
      <Option value="upload">Image Upload (Taking picture or Uploading)</Option>
      <Option value="date">Date</Option>
      <Option value="select">Select</Option>
      <Option value="checkboxes">Checkboxes</Option>
      <Option value="signature">Signature Pad</Option>
    </Select>
    <Fields formState={formState} setFormState={setFormState} />
    <Text strong>Add a note(Will be added below a Input)(English):</Text>
    <Input
      type="text"
      name="note"
      value={formState.note_en}
      onChange={e => changeHandler(e, "note_en")}
      style={{ width: "100%" }}
    />
    <Text strong>Add a note(Will be added below a Input)(Spanish):</Text>
    <Input
      type="text"
      name="note"
      value={formState.note_es}
      onChange={e => changeHandler(e, "note_es")}
      style={{ width: "100%" }}
    />
    <Checkbox
      name="mandatory"
      checked={formState.mandatory}
      onChange={e => changeHandler(e, "mandatory")}
    >
      Mandatory
    </Checkbox>
  </>
)

export default FormState
