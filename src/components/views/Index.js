const React = require('react')
const Default = require('../layouts/Default.jsx')

class Index extends React.Component {
  render () {
    const { fruits } = this.props
    return (
      <Default title='Fruits Index Page'>

        {
                        fruits.map((fruit) => {
                          const { name, color, readyToEat, _id } = fruit
                          return (
                            <div class='col-lg-4 col-md-6 mb-4 pt-5' key={_id}>
                              <div class='card shadow-sm border-0'>
                                <div class='card-body'>
                                  <div class='user-content'>
                                    <h5 class='text-capitalize user-name'>
                                      <a href={`/fruits/${_id}`}>{name}</a>
                                    </h5>
                                    <p class=' text-capitalize  medium '>
                                      <b>Color: </b><br />{color}
                                    </p>
                                    <p>{
                                                        readyToEat
                                                          ? 'It\'s ready to eat'
                                                          : 'It\'s not ready to eat'
                                                    }
                                    </p>
                                    <form method='POST' action={`/fruits/${_id}?_method=DELETE`}>
                                      <input className='delete' type='submit' value={`Delete ${color} ${name}`} />
                                    </form>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )
                        })
                    }

      </Default>
    )
  }
}

module.exports = Index