const React = require('react')
const Default = require('../layouts/SingleDefault')

class Show extends React.Component {
  render () {
    const { name, color, readyToEat, _id } = this.props.fruit
    const capName = name[0].toUpperCase() + name.substring(1)
    return (
      <Default title={`${capName} Show Page`} fruit={this.props.fruit}>
        <div className='user-content'>
          <h5 className='text-capitalize user-name'>{capName}</h5>
          <p className=' text-capitalize  medium '><b>Color: </b><br />{color}</p>
          <p>{readyToEat ? 'it\'s ready to eat' : 'it\'s not ready to eat'}</p>
          <a className='delete' href={`/fruits/${_id}/edit`}><i className='fa-solid fa-pencil' />  Edit </a><br />
          <a className='delete' href={`/fruits/${_id}`}><i className='fa-solid fa-eye' />  Details</a><br />

        </div>
      </Default>
    )
  }
}

module.exports = Show