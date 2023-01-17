import React from 'react'
import './Orders.css'

const Orders = props => {

  if (props.error) {
    return (
      <>
        <h1>That order was not deleted for some reason!</h1>
        <button className='confirm-error' onClick={props.clearError}>Bummer!</button>
      </>
    )
  }

  const orderEls = props.orders.map(order => {
    return (
      <div className="order" key={order.id}>
        <h3>{order.name}</h3>
        <ul className="ingredient-list">
          {order.ingredients.map((ingredient, idx) => {
            return <li key={idx}>{ingredient}</li>
          })}
        </ul>
        <button className='delete-order' onClick={() => props.handleDelete(order.id)}>X</button>
      </div>
    )
  })

  return (
    <section>
      {orderEls.length ? orderEls : <p>No orders yet!</p>}
    </section>
  )
}

export default Orders