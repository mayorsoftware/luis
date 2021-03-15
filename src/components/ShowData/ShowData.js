import React, { useContext, useState } from "react"
import FormContext, { Context } from "./../../FormContext"
import uuid from "uuid"
import {
  Typography,
  Divider,
  Input,
  Button,
  Select,
  Checkbox,
  Descriptions,
  List,
  Modal,
} from "antd"
import TextState from "./../TextState"
import FormState from "./../FormState"
import Form from "../Form"

const { Title, Paragraph, Text } = Typography
const { confirm } = Modal

const ListItem = ({ showDeleteConfirm, item, arrayMap }) => {
  const [modal, setModal] = useState(false)
  const toggleModal = () => setModal(!modal)

  return (
    <List.Item
      actions={[
        <a
          onClick={e => {
            e.preventDefault()
            toggleModal()
          }}
        >
          Edit
        </a>,
        <a
          onClick={e => {
            e.preventDefault()
            showDeleteConfirm({ id: item.id })
          }}
        >
          Delete
        </a>,
      ]}
    >
      {item.type === "text" ? (
        <List.Item.Meta
          title={`${arrayMap.indexOf(item.order) + 1} : ${item.text_en}`}
          description={item.type}
        />
      ) : (
        <List.Item.Meta
          title={`${arrayMap.indexOf(item.order) + 1} : ${item.name_en}`}
          description={item.inputType || item.input}
        />
      )}
      <Form
        edit
        visible={modal}
        id={item.id}
        arrayMap={arrayMap}
        toggleEditModal={toggleModal}
      />
    </List.Item>
  )
}

const ShowData = ({ page, category }) => {
  const context = useContext(Context)
  const [ID, setID] = useState(null)
  const toggleModal = id => {
    setID(id)
    context.toggleEditModal(id)
  }

  const dataSource = context.data.filter(
    inputs => inputs.page === page && inputs.category === category
  )

  const arrayMap = dataSource.map(({ order }) => order)


  function showDeleteConfirm({ id }) {
    confirm({
      title: "Are you sure delete this Field?",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        context.deleteData({ id })
      },
      onCancel() {},
    })
  }

  return (
    <>
      <List
        loading={context.load.loading}
        itemLayout="horizontal"
        dataSource={dataSource}
        renderItem={item => (
          <ListItem
            showDeleteConfirm={showDeleteConfirm}
            item={item}
            key={item.id}
            arrayMap={arrayMap}
          />
        )}
      />
    </>
  )
}

export default ShowData
