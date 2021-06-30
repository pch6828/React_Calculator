import React from "react";

import Screen from "./components/Screen";
import EvalHistory from "./components/EvalHistory";

import "./Calculator.css";
class Calculator extends React.Component{
    state = {
        expression:undefined,
        show_prev_expression:false
    }
    
    componentDidMount(){
        window.sessionStorage.history_size = 0;
    }

    appendNumber(number){
        const {expression} = this.state;
        
        if(expression===undefined){
            this.setState({expression:String(number), show_prev_expression:false});
        }else{
            this.setState({expression:expression+number, show_prev_expression:false});
        }
    }

    appendOperator(operator){
        const {expression} = this.state;

        if(expression===undefined){
            
            const history_size = Number(window.sessionStorage.history_size);
            const left_operand = history_size===0?"0":(window.sessionStorage["answer_"+history_size]==="Error"?"0":window.sessionStorage["answer_"+history_size]);
            this.setState({expression:left_operand+operator, show_prev_expression:false});
        }else{
            this.setState({expression:expression+operator, show_prev_expression:false});
        }
    }

    appendDot(){
        const {expression} = this.state;
        if(expression===undefined){
            this.setState({expression:"0.", show_prev_expression:false});
        }else{
            this.setState({expression:expression+".", show_prev_expression:false});
        }
    }

    getAnswer(){
        const {expression} = this.state;
        
        var new_answer = undefined;
        try {
            new_answer = String(eval(expression));
        } catch (error) {
            new_answer = "Error";
        }
        
        const history_size = Number(window.sessionStorage.history_size);
        window.sessionStorage.history_size = history_size+1;
        window.sessionStorage["expression_"+(history_size+1)] = expression;
        window.sessionStorage["answer_"+(history_size+1)] = new_answer;
        this.setState({expression:undefined, show_prev_expression:true});
        
    }

    clearExpression(){
        this.setState({expression:undefined, show_prev_expression:false});
    }

    removeCharacter(){
        const {expression} = this.state;

        if(expression!==undefined){
            this.setState({expression:expression.slice(0, expression.length-1), show_prev_expression:false});
        }
    }

    setExpression(expression){
        this.setState({expression:expression, show_prev_expression:false});
    }

    render(){
        const {expression, show_prev_expression} = this.state;
        return (
            <section className="container">
                <EvalHistory callback={(expression) => this.setExpression(expression)}/>
                <Screen expression={expression} show_prev_expression={show_prev_expression}/>
                <div className="button_container">
                    <button className="middle_button" onClick={() => this.clearExpression()}>AC</button>
                    <button className="middle_button" onClick={() => this.removeCharacter()}>CE</button>
                    <button className="small_button" onClick={() => this.appendOperator("%")}>%</button>

                    <button className="small_button" onClick={() => this.appendNumber(7)}>7</button>
                    <button className="small_button" onClick={() => this.appendNumber(8)}>8</button>
                    <button className="small_button" onClick={() => this.appendNumber(9)}>9</button>
                    <button className="small_button" onClick={() => this.appendOperator("/")}>/</button>
                    
                    <button className="small_button" onClick={() => this.appendNumber(4)}>4</button>
                    <button className="small_button" onClick={() => this.appendNumber(5)}>5</button>
                    <button className="small_button" onClick={() => this.appendNumber(6)}>6</button>
                    <button className="small_button" onClick={() => this.appendOperator("*")}>*</button>
                    
                    <button className="small_button" onClick={() => this.appendNumber(1)}>1</button>
                    <button className="small_button" onClick={() => this.appendNumber(2)}>2</button>
                    <button className="small_button" onClick={() => this.appendNumber(3)}>3</button>
                    <button className="small_button" onClick={() => this.appendOperator("-")}>-</button>
                    
                    <button className="small_button" onClick={() => this.appendDot()}>.</button>
                    <button className="small_button" onClick={() => this.appendNumber(0)}>0</button>
                    <button className="small_button" onClick={() => this.getAnswer()}>=</button>
                    <button className="small_button" onClick={() => this.appendOperator("+")}>+</button>
                    
                </div>
            </section>
        );
    }
}

export default Calculator;