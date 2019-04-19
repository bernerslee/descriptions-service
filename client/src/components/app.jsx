import React from 'react';
import ReactDOM from 'react-dom';
import Address from './address.jsx';
import HouseStats from './houseStats.jsx';
import HouseDescription from './houseDescription.jsx';
import Price from './price.jsx';
import $ from 'jquery';

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      house: {},
      beds: 4,
      baths: 3,
      sqft: 2789,
      price: 899000
    }
  }

  componentDidMount() {
    let id = window.location.pathname.split('/')[1]; //revise
    console.log('pathname',window.location.pathname);
    $.get(`http://ec2-54-215-207-174.us-west-1.compute.amazonaws.com:3001/houses/${id}`, (data) => {

      let house = data[0];
      this.setState({
        house: {
          street: house.street,
          city: house.city,
          state: house.state,
          zipcode: house.zipcode,
          description: house.description
        }
      });

      $.get(`http://ec2-54-215-207-174.us-west-1.compute.amazonaws.com:3001/prices/${id}`, (data) => {
        this.setState({price: data[0].price})
      });

    });
  }

  render() {

    return (
      <div id='houseSummary'>
        <div id='addressPrice'>
          <div id='addressStats'>
            <Address house={this.state.house} />
            <HouseStats beds={this.state.beds} baths={this.state.baths} sqft={this.state.sqft}/>
          </div>
          <div id='housePrice'>
            <Price price={this.state.price}/>
          </div>
        </div>
        <div id='houseDescription'>
          <HouseDescription house={this.state.house} />
        </div>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('description'))