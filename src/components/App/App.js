import React, { Component } from 'react'
import './App.css'
import { getOrders, postOrder, deleteOrder } from '../../apiCalls'
import Orders from '../../components/Orders/Orders'
import OrderForm from '../../components/OrderForm/OrderForm'

class App extends Component {
  constructor(props) {
    super()
    this.state = {
      orders: [],
      error: false
    }
  }

  componentDidMount() {
    getOrders()
      .then((data) => {
        this.setState({ orders: data.orders })
      })
      .catch(err => console.error('Error fetching:', err))
  }

  submitOrder = (body) => {
    postOrder(body)
      .then(data => this.setState({ orders: [...this.state.orders, data] }))
      .then(() => console.log(this.state.orders))
  }

  handleDelete = (id) => {
    deleteOrder(id)
      .then(response => {
        const filteredOrders = this.state.orders.filter(order => order.id !== id)
        if (response.ok) {
          this.setState({ orders: filteredOrders })
        } else {
          this.setState({ error: true })
        }
      })
  }

  clearError = () => {
    this.setState({ error: false })
  }

  render() {
    return (
      <main className="App">
        <header>
          <h1>Burrito Builder</h1>
          <OrderForm submitOrder={this.submitOrder} />
        </header>
        <Orders
          orders={this.state.orders}
          handleDelete={this.handleDelete}
          clearError={this.clearError}
          error={this.state.error}
        />
      </main>
    )
  }
}


export default App
