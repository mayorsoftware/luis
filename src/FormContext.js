import React, { useState, useEffect } from "react"
import uuid from "uuid"
import ni from "netlify-identity-widget"
import { notification } from "antd"
const Context = React.createContext()

const FormContext = props => {
  const [data, setData] = useState([])
  const [addModal, setAddModal] = useState(false)
  const [editModal, setEditModal] = useState(false)
  const [selectedField, setSelectedField] = useState(false)
  const [load, setLoad] = useState({ loading: false, error: false })
  const [authentication, setAuthentication] = useState({
    isAuthenticated: false,
    user: null,
  })

  function login(callback) {
    ni.open()
    ni.on("login", user => {
      setAuthentication({ isAuthenticated: true, user })
    })
  }

  function logout(callback) {
    ni.logout()
    ni.on("logout", () => {
      setAuthentication({ isAuthenticated: true, user: null })
    })
  }

  function updateUser() {
    const user = ni.currentUser()
    if (user) setAuthentication({ isAuthenticated: true, user })
  }

  const toggleAddModal = () => setAddModal(!addModal)
  const toggleEditModal = id => {
    setSelectedField(data.find(field => field.id === id))
    setAddModal(!editModal)
  }

  useEffect(() => {
    setLoad({ loading: true, error: false })
    if (!window.netlifyIdentity) {
      ni.init()
      window.netlifyIdentity = ni
    }
    updateUser()
    fetch("/api")
      .then(response => response.json())
      .then(jsonResponse => {
        setLoad({ loading: false, error: false })
        setData(sortData(jsonResponse))
      })
      .catch(() => setLoad({ loading: false, error: true }))
  }, [])

  const addData = field => {
    if (field.selectOptions || field.checkboxOptions) {
      let toChop = field.selectOptions || field.checkboxOptions
      let toChop_es = field.checkboxOptions_es
      field.options_es = toChop_es.split("\n")
      field.options = toChop.split("\n")
    }

    const { order } = field

    const elementIndexWithThatOrder = data.findIndex(
      element => element.order === order
    )

    let newData = []

    if (elementIndexWithThatOrder > 0) {
      const fieldsBeforeTheFieldToBeAdded = data.slice(
        0,
        elementIndexWithThatOrder
      )

      const fieldsAfterTheFieldToBeAdded = data.slice(elementIndexWithThatOrder)

      const modifiedFieldsAfterTheFieldToBeAdded = data.map(data => ({
        ...data,
        order: data.order + 1,
      }))

      newData = [
        ...fieldsBeforeTheFieldToBeAdded,
        { ...field, id: uuid() },
        ...modifiedFieldsAfterTheFieldToBeAdded,
      ]
    } else {
      newData = [...data, { ...field, id: uuid() }]
    }

    setData(newData)
    setAddModal(false)
  }

  const editData = (field, id) => {
    const fieldsWithoutTheOneToBeEdited = data.filter(field => field.id !== id)
    const fieldsToBeEdited = data.find(field => field.id === id)

    if (field.selectOptions || field.checkboxOptions) {
      let toChop = field.selectOptions || field.checkboxOptions
      let toChop_es = field.checkboxOptions_es
      field.options_es = toChop_es.split("\n")
      field.options = toChop.split("\n")
    }

    const { order } = field

    const elementIndexWithThatOrder = data.findIndex(
      element => element.order === order
    )

    const currentIndex = data.findIndex(
      el => el.order === fieldsToBeEdited.order
    )

    let newData = []

    if (fieldsToBeEdited.order !== field.order) {
      const [c1, c2] =
        currentIndex > elementIndexWithThatOrder
          ? [elementIndexWithThatOrder, currentIndex]
          : [currentIndex, elementIndexWithThatOrder]

      const fieldsBeforeTheFieldToBeReplace = fieldsWithoutTheOneToBeEdited.slice(
        0,
        c1
      )

      const fieldsBetweenElementToBeReplaceAndToReplace = fieldsWithoutTheOneToBeEdited.slice(
        c1,
        c2
      )
      const fieldsAfterElementToReplace = fieldsWithoutTheOneToBeEdited.slice(
        c2
      )

      const modifiedFieldsAfterTheFieldToBeAdded = fieldsBetweenElementToBeReplaceAndToReplace.map(
        data => ({
          ...data,
          order:
            currentIndex > elementIndexWithThatOrder
              ? data.order + 1
              : data.order - 1,
        })
      )
      newData = [
        ...fieldsBeforeTheFieldToBeReplace,
        ...modifiedFieldsAfterTheFieldToBeAdded,
        field,
        ...fieldsAfterElementToReplace,
      ]
    } else {
      newData = [...fieldsWithoutTheOneToBeEdited, field]
    }

    // const newData = [...fieldsWithoutTheOneToBeEdited, { ...field, id }]
    setData(sortData(newData))
    setAddModal(false)
  }

  const deleteData = ({ id }) => {
    const filteredData = data.filter(fields => fields.id !== id)
    setData("Deleting Data ->", sortData(filteredData))
  }

  const saveData = () => {
    setLoad({ loading: true, error: false })
    fetch("/api/upload", {
      method: "POST",
      headers: {
        "Content-type": "Application/json",
      },
      body: JSON.stringify(data),
    })
      .then(() => {
        notification.success({
          message: "Saved",
          description: "The data has been saved successfully!",
        })
        setLoad({ loading: false, error: false })
      })
      .catch(err => {
        notification.success({
          message: "Some Error Happened",
          description: JSON.stringify(err),
        })
        setLoad({ loading: false, error: true })
      })
  }

  const sortData = data =>
    data.sort(({ order: order1 }, { order: order2 }) =>
      order1 < order2 ? -1 : 1
    )

  return (
    <Context.Provider
      value={{
        data,
        addData,
        editData,
        deleteData,
        modal: addModal,
        toggleModal: toggleAddModal,
        editModal,
        toggleEditModal,
        saveData,
        load,
        selectedField,
        setSelectedField,
        authentication,
        login,
        logout,
      }}
    >
      {props.children}
    </Context.Provider>
  )
}

export { Context }
export default FormContext
