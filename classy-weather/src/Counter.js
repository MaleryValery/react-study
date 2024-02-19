import React, { Component } from "react";

class Counter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      count: 5
    };

    this.handlerDecrement = this.handlerDecrement.bind(this);
    this.handlerIncrement = this.handlerIncrement.bind(this);
  }

  handlerIncrement() {
    this.setState((curState) => {
      return { count: curState + 1 };
    });
  }

  handlerDecrement() {
    this.setState((curState) => {
      return { count: curState.count - 1 };
    });
  }

  render() {
    const date = new Date("june 21 2027");
    date.setDate(date.getDate() + this.state.count)
    
    return (
      <div>
        <button onClick={this.handlerDecrement}>-</button>
        <span><span>{date.toDateString()}{this.state.count}</span></span>
        <button>+</button>
      </div>
    );
  }
}

export default Counter;
