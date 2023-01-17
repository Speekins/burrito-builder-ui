const getOrders = () => {
  return fetch('http://localhost:3001/api/v1/orders')
    .then(response => response.json())
}

const postOrder = (body) => {
  return fetch('http://localhost:3001/api/v1/orders', {
    method: 'POST',
    headers: { 'CONTENT-TYPE': 'application/json' },
    body: JSON.stringify(body)
  })
    .then(response => response.json())
}

const deleteOrder = (id) => {
  return fetch(`http://localhost:3001/api/v1/orders/${id}`)
}

export { getOrders, postOrder, deleteOrder }