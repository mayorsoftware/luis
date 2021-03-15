import React from "react"
import { Typography, Input } from "antd"

const { Text } = Typography
const { TextArea } = Input

const TextState = ({ id, toggle, changeHandler, formState }) => (
  <>
    <Text strong>Enter the text(English):</Text>
    <TextArea
      autosize={{ minRows: 3, maxRows: 8 }}
      onChange={e => changeHandler(e, "text_en")}
      value={formState.text_en}
    />
    <Text strong>Enter the text(Spanish):</Text>
    <TextArea
      autosize={{ minRows: 3, maxRows: 8 }}
      onChange={e => changeHandler(e, "text_es")}
      value={formState.text_es}
    />
  </>
)

export default TextState
