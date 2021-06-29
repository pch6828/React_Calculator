import React from "react";

import Screen from "./Screen";

class Calculator extends React.Component{
    state = {
        expression:undefined,
        show_prev_expression:false
    }

    componentDidMount(){
        window.localStorage.evaluate_history = [];
    }
    
    appendNumber(number){
        const {expression} = this.state;

        if(expression===undefined){
            this.setState({exprssion:number, show_prev_expression:false});
        }else{
            this.setState({expression:expression+number, show_prev_expression:false});
        }
    }

    appendOperator(operator){
        const {expression} = this.state;

        if(expression===undefined){
            const storage_length = window.localStorage.evaluate_history.length;
            const left_operand = storage_length===0?"0":window.localStorage.evaluate_history[storage_length-1];
            this.setState({exprssion:left_operand+operator, show_prev_expression:false});
        }else{
            this.setState({expression:expression+number, show_prev_expression:false});
        }
    }

    appendDot(){
        const {expression} = this.state;
        if(expression===undefined){
            this.setState({expression:"0.", show_prev_expression:false, valid_expression: true});
        }else{
            this.setState({expression:expression+".", show_prev_expression:false, valid_expression:true});
        }
    }

    getAnswer(){
        const {expression, valid_expression} = this.state;
        if(valid_expression){
            var new_answer = undefined;
            try {
                new_answer = String(eval(expression));
            } catch (error) {
                new_answer = "Error";
            }

            window.localStorage.evaluate_history.push({expression:expression,answer:new_answer});
            this.setState({expression:undefined, show_prev_expression:true, valid_expression:false});
        }
    }

    clearExpression(){
        this.setState({expression:undefined, show_prev_expression:false, valid_expression:false});
    }

    removeCharacter(){
        const {expression, valid_expression} = this.state;
        if(expression.undefined
    }

    render(){
        return (
            <section className="container">

            <button onClick="appendNumber(0);">0</button>
            <button onClick="appendNumber(1);">1</button>
            <button onClick="appendNumber(2);">2</button>
            <button onClick="appendNumber(3);">3</button>
            <button onClick="appendNumber(4);">4</button>
            <button onClick="appendNumber(5);">5</button>
            <button onClick="appendNumber(6);">6</button>
            <button onClick="appendNumber(7);">7</button>
            <button onClick="appendNumber(8);">8</button>
            <button onClick="appendNumber(9);">9</button>

            <button onClick="clearExpression();"></button>
            </section>
        )
    }
}

export default Calculator;