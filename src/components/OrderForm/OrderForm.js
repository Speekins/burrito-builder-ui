import React, { Component } from 'react'

class OrderForm extends Component {
  constructor(props) {
    super()
    this.props = props
    this.state = {
      name: '',
      ingredients: [],
      error: false
    }
  }

  handleIngredientChange = e => {
    e.preventDefault()
    const newIngredient = e.target.name
    this.setState({ ingredients: [...this.state.ingredients, newIngredient] })
  }

  handleNameChange = e => {
    e.preventDefault()
    const name = e.target.value
    this.setState({ name: name })
  }

  handleSubmit = e => {
    e.preventDefault()
    if (!this.state.name || !this.state.ingredients.length) {
      this.setState({ error: true })
      return
    }
    this.props.submitOrder({ name: this.state.name, ingredients: this.state.ingredients })
    this.clearInputs()
  }

  clearInputs = () => {
    this.setState({ name: '', ingredients: [] })
  }

  render() {
    const possibleIngredients = ['beans', 'steak', 'carnitas', 'sofritas', 'lettuce', 'queso fresco', 'pico de gallo', 'hot sauce', 'guacamole', 'jalapenos', 'cilantro', 'sour cream']
    const ingredientButtons = possibleIngredients.map(ingredient => {
      return (
        <button key={ingredient} className="ingredient-button" name={ingredient} onClick={e => this.handleIngredientChange(e)}>
          {ingredient}
        </button>
      )
    })

    return (
      <form>
        <input
          type='text'
          placeholder='Name'
          name='name'
          value={this.state.name}
          onChange={e => this.handleNameChange(e)}
        />

        {ingredientButtons}

        {this.state.error &&
          <div className='alert-message'>
            <h1 className='alert-message'>UH OH! Looks like you haven't added a name or ingredients!</h1>
            <button className='alert-button' onClick={() => this.setState({ error: false })}>Oops! Got It!</button>
          </div>
        }

        <p>Order: {this.state.ingredients.join(', ') || 'Nothing selected'}</p>

        <button className='submit-button' onClick={e => this.handleSubmit(e)}>
          Submit Order
        </button>
      </form>
    )
  }
}

export default OrderForm
