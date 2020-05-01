class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayCalc: '',
      displayChar: 0,
      number: '',
      operator: '',
      result: '',
      prevOperator: '' };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(item) {
    // Clear display
    if (item == 'AC') {
      this.setState({
        displayChar: 0,
        displayCalc: '',
        result: '',
        number: '',
        operator: '' });

    }
    //Result of calculation
    else if (item == '=') {
        this.setState({
          displayChar: eval(this.state.displayCalc),
          displayCalc: this.state.displayCalc + item,
          number: eval(this.state.displayCalc),
          operator: item,
          result: eval(this.state.displayCalc) });

      }
      //Deleting the value of last button clicked
      else if (item == 'DEL') {
          const copiedState = this.state.displayCalc.slice();
          const newState = copiedState.substring(0, copiedState.length - 1);
          //in case the displayed formula has more than one value
          if (copiedState.length > 1) {
            this.setState({
              displayChar: newState[newState.length - 1],
              displayCalc: newState });

          } else {//in case the displayed formula has only 1 value
            this.setState({
              displayChar: 0,
              displayCalc: '',
              number: '',
              operator: '' });

          }
        }
        //Adding the operator clicked by the user
        else if (['+', '-', '/', '*'].indexOf(item) > -1 && this.state.operator == '') {
            this.setState({
              displayChar: item,
              displayCalc: this.state.displayCalc + item,
              number: '',
              operator: item });

          }
          //After clicking the equal sign, if user wants to use the result for another operation he must click one of the operators - display will be cleared and only the result and operator will be shown
          else if (['+', '-', '/', '*'].indexOf(item) > -1 && this.state.operator == '=') {
              this.setState({
                displayChar: item,
                displayCalc: this.state.result + item,
                number: '',
                operator: item });

            }
            // In case the previous value input by the user was an operator
            else if (['+', '/', '*'].indexOf(this.state.operator) > -1) {
                // If consecutive input is a minus sign, consider it as to negate a value until next if statement
                if (item == '-') {
                  this.setState({
                    displayChar: item,
                    displayCalc: this.state.displayCalc + item,
                    number: '',
                    operator: item,
                    prevOperator: this.state.operator });

                }
                // If consecutive input is any operator besides minus sign, prevent user from inputting several operators consecutively
                else if (['+', '/', '*'].indexOf(item) > -1) {
                    this.setState({
                      displayChar: item,
                      displayCalc: this.state.displayCalc.slice(0, this.state.displayCalc.length - 1) + item,
                      number: '',
                      operator: item });

                  }
                  //Default case if none of the other 2 options are triggered - just as default case at the end of the if statement
                  else {
                      this.setState({
                        displayChar: this.state.number + item,
                        displayCalc: this.state.displayCalc + item,
                        number: this.state.number + item,
                        operator: '' });

                    }
              }
              // If there's an operator followed by a minus sign and then the user inputs another operator (3 operators in a row), replace these 3 operators with last operator inputted by the user
              else if (this.state.prevOperator != '' && this.state.operator == '-' && ['+', '-', '/', '*'].indexOf(item) > -1) {
                  this.setState({
                    displayChar: item,
                    displayCalc: this.state.displayCalc.slice(0, this.state.displayCalc.length - 2) + item,
                    number: '',
                    operator: item,
                    prevOperator: '' });

                }
                //After clicking the equal sign, if user wants to start another calculation he must click any of the numbers - display will be cleared and only the value clicked by user will be displayed
                else if (['+', '-', '/', '*'].indexOf(item) == -1 && this.state.operator == '=') {
                    this.setState({
                      displayChar: item,
                      displayCalc: item,
                      number: item,
                      operator: '' });

                  }
                  //Prevent the user from inputing several zeros if the first value is zero
                  else if (this.state.number.indexOf(0) == 0 && item == 0 && this.state.number.length == 1) {
                      this.setState({
                        displayChar: 0,
                        displayCalc: this.state.displayCalc,
                        number: this.state.number });

                    }
                    //Prevent the user from inputing other numbers if the first value is zero - only accepts decimal point '.'
                    else if (this.state.number.indexOf(0) == 0 && ['1', '2', '3', '4', '5', '6', '7', '8', '9', '(', ')'].indexOf(item) > -1 && this.state.number.length == 1) {
                        this.setState({
                          displayChar: 0,
                          displayCalc: this.state.displayCalc,
                          number: this.state.number });

                      }
                      //Prevent the user from inputing more than one decimal point in the given number
                      else if (item == '.' && this.state.number.indexOf('.') > -1) {
                          this.setState({
                            displayChar: this.state.displayChar,
                            displayCalc: this.state.displayCalc,
                            number: this.state.number });

                        }
                        //Default case - adding each number given by the user to the state strings
                        else {
                            this.setState({
                              displayChar: this.state.number + item,
                              displayCalc: this.state.displayCalc + item,
                              number: this.state.number + item,
                              operator: '' });

                          }
  }

  render() {
    return (
      React.createElement("div", { className: "container-fluid calculator" },
      React.createElement(Display, { displayCalc: this.state.displayCalc, displayChar: this.state.displayChar }),
      React.createElement(Characters, { onClick: this.handleClick })));


  }}


const Characters = props => {
  const chars = ['(', ')', 'DEL', 'AC', '7', '8', '9', '/', '4', '5', '6', '*', '1', '2', '3', '-', '0', '.', '=', '+'];
  const writtenChars = ['opening-parenthesis', 'closing-parenthesis', 'backspace', 'clear', 'seven', 'eight', 'nine', 'divide', 'four', 'five', 'six', 'multiply', 'one', 'two', 'three', 'subtract', 'zero', 'decimal', 'equals', 'add'];
  const listChars = chars.map((item, index) => {
    return (
      React.createElement("li", { onClick: () => props.onClick(item), id: writtenChars[index] }, item));

  });

  return (
    React.createElement("ul", null,
    listChars));


};

const Display = props => {
  return (
    React.createElement("div", { id: "display" },
    React.createElement("p", { id: "d1" }, props.displayCalc),
    React.createElement("p", { id: "d2" }, props.displayChar)));


};

ReactDOM.render(React.createElement(Calculator, null), document.getElementById("root"));