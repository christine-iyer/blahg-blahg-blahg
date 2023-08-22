const React = require('react')
const Default = require('../layouts/SingleDefault')

class Edit extends React.Component {
  render () {
    const { name, _id, color, readyToEat } = this.props.fruit
    return (
      <Default title={`${name} Edit Page`} fruit={this.props.fruit}>
        <form method='POST' action={`/fruits/${_id}?_method=PUT`}>
          Name: <input type='text' className='form-control' name='name' defaultValue={name} /><br />
          Color: <input type='text' className='form-control' name='color' defaultValue={color} /><br />
          Is Ready To Eat: <input type='checkbox' className='checkbox' name='readyToEat' defaultChecked={readyToEat} /> <br />
          <input className='delete' type='submit' value='Edit Fruit' />
        </form>
      </Default>
    )
  }
}

module.exports = Edit