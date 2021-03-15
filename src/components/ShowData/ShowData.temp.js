import React, { useContext, useState } from "react"
import FormContext, { Context } from "./../../FormContext"
import uuid from "uuid"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
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

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const ListItem = ({ showDeleteConfirm, item, index }) => {
  const [modal, setModal] = useState(false)
  const toggleModal = () => setModal(!modal)

  return (
        <Draggable draggableId={item.id} index={index}>
      {provided => (
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
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
                {item.type === "text" ? (
        <List.Item.Meta title={item.text_en} description={item.type} />
      ) : (
        <List.Item.Meta title={item.name_en} description={item.inputType} />
      )}
      <Form edit visible={modal} id={item.id} toggleEditModal={toggleModal} />
        </List.Item>
      )}
    </Draggable>
  )
}

function ListItemDraggable({ item, showDeleteConfirm, index }) {
  return (
    <Draggable draggableId={item.id} index={index}>
      {provided => (
        <ListItem
        showDeleteConfirm={showDeleteConfirm}
        item={item}
        key={item.id}
      />
      )}
    </Draggable>
  );
}

const FeildList = React.memo(function FeildList({ data, context, showDeleteConfirm }) {
  return (
    <List
    loading={context.load.loading}
    itemLayout="horizontal"
    dataSource={data}
    renderItem={(item, index) => (
      <ListItemDraggable key={item.id} index={index} item={item} showDeleteConfirm={showDeleteConfirm}/>
    )}
    />
  )
});

const ShowData = ({ page, category }) => {
  const context = useContext(Context)
  const [data, setData] = useState(context.data)
  const [ID, setID] = useState(null)
  const toggleModal = id => {
    setID(id)
    context.toggleEditModal(id)
  }

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
  function onDragEnd(result) {
    if (!result.destination) {
      return;
    }

    if (result.destination.index === result.source.index) {
      return;
    }

    const data = reorder(
      data,
      result.source.index,
      result.destination.index
    );

    setData(data);
  }

  console.log(context, data)

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="list">
          {provided => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              <FeildList context={context} data={context.data} showDeleteConfirm={showDeleteConfirm} />
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </>
  )
}

export default ShowData
