import React from "react";

import Screen from "./components/Screen";
import EvalHistory from "./components/EvalHistory";

import "./Calculator.css";
class Calculator extends React.Component{
    state = {
        expression:undefined,
        show_prev_expression:false, 
        leading_zero:false,
        end_with_operator:false, 
        decimal_point:false,
        unary_minus:false
    }
    
    componentDidMount(){
        window.sessionStorage.history_size = 0;
        document.body.addEventListener('keydown', (e) => this.keyboard_event_handler(e))
    }

    keyboard_event_handler(e){
        const key = e.key;
        console.log(key);
        if(key==="+"||key==="-"||key==="/"||key==="*"||key==="%"){
            this.appendOperator(key);
        }else if(key==="Enter"||key==="="){
            this.getAnswer();
        }else if(key==="Backspace"){
            this.removeCharacter();
        }else if(key==="."){
            this.appendDot();
        }else if(!isNaN(Number(key))){
            this.appendNumber(key);
        }
    }

    appendNumber(number){
        const {expression, leading_zero, end_with_operator, decimal_point} = this.state;
        
        if(expression===undefined){
            this.setState({
                            expression:String(number), 
                            show_prev_expression:false, 
                            leading_zero:(number===0),
                            end_with_operator:false,
                            decimal_point:false,
                            unary_minus:false
                        });
        }else if(leading_zero){
            this.setState({
                            expression:expression.slice(0, expression.length-1)+number, 
                            show_prev_expression:false, 
                            leading_zero:(number===0),
                            end_with_operator:false, 
                            decimal_point:decimal_point,
                            unary_minus:false
                        });
        }else if(end_with_operator){
            this.setState({
                            expression:expression+number, 
                            show_prev_expression:false, 
                            leading_zero:(number===0), 
                            end_with_operator:false, 
                            decimal_point:false,
                            unary_minus:false
                        });
        }else if(decimal_point){
            this.setState({
                            expression:expression+number, 
                            show_prev_expression:false, 
                            leading_zero:false, 
                            end_with_operator:false, 
                            decimal_point:decimal_point,
                            unary_minus:false
                        });
        }else{
            this.setState({
                            expression:expression+number, 
                            show_prev_expression:false, 
                            leading_zero:false, 
                            end_with_operator:false, 
                            decimal_point:decimal_point,
                            unary_minus:false
                        });
        }
    }

    appendOperator(operator){
        const {expression, end_with_operator, unary_minus} = this.state;

        if(expression===undefined){
            if(operator==="-"){
                this.setState({
                                expression:operator,
                                show_prev_expression:false,
                                leading_zero:false,
                                end_with_operator:true,
                                decimal_point:false,
                                unary_minus:true
                            })
            }else{
                const history_size = Number(window.sessionStorage.history_size);
                const left_operand = history_size===0?"0":(window.sessionStorage["answer_"+history_size]==="Error"?"0":window.sessionStorage["answer_"+history_size]);
                this.setState({
                                expression:left_operand+operator, 
                                show_prev_expression:false, 
                                leading_zero:false, 
                                end_with_operator:true, 
                                decimal_point:false,
                                unary_minus:false
                            });         
            } 
        }else if(unary_minus){
            if(end_with_operator){
                this.setState({
                                expression:expression.slice(0, expression.length-1)+operator, 
                                show_prev_expression:false, 
                                leading_zero:false, 
                                end_with_operator:true,
                                decimal_point:false
                            });
            }else{
                this.setState({
                                expression:expression+operator, 
                                show_prev_expression:false, 
                                leading_zero:false, 
                                end_with_operator:true,
                                decimal_point:false
                            });
            }
        }
    }

    appendDot(){
        const {expression, end_with_operator, decimal_point} = this.state;
        if(expression===undefined){
            this.setState({
                            expression:"0.", 
                            show_prev_expression:false, 
                            leading_zero:false, 
                            end_with_operator:false,
                            decimal_point:true
                        });
        }else if(end_with_operator){
            this.setState({
                            expression:expression+"0.", 
                            show_prev_expression:false, 
                            leading_zero:false, 
                            end_with_operator:false,
                            decimal_point:true
                        });
        }else if(!decimal_point){
            this.setState({
                            expression:expression+".", 
                            show_prev_expression:false, 
                            leading_zero:false, 
                            end_with_operator:false,
                            decimal_point:true
                        });
        }
    }

    getAnswer(){
        const {expression, end_with_operator} = this.state;
        if(expression!==undefined&&!end_with_operator){
            let new_answer = undefined;
            try {
                new_answer = String(eval(expression));
                if(new_answer.length > 12){
                    new_answer = String(Number(new_answer).toExponential());
                }
            } catch (error) {
                new_answer = "Error";
            }
            
            const history_size = Number(window.sessionStorage.history_size);
            window.sessionStorage.history_size = history_size+1;
            window.sessionStorage["expression_"+(history_size+1)] = expression;
            window.sessionStorage["answer_"+(history_size+1)] = new_answer;
            this.setState({
                            expression:undefined, 
                            show_prev_expression:true, 
                            leading_zero:false,
                            end_with_operator:false,
                            decimal_point:false
                        });
        }
    }

    clearExpression(){
        this.setState({
                        expression:undefined, 
                        show_prev_expression:false, 
                        leading_zero:false,
                        end_with_operator:false,
                        decimal_point:false
                    });
    }

    removeCharacter(){
        const {expression} = this.state;

        if(expression!==undefined){
            const new_expression = expression.slice(0, expression.length-1);
            
            if(new_expression.length===0){
                this.setState({
                                expression:undefined, 
                                show_prev_expression:false, 
                                leading_zero:false,
                                end_with_operator:false,
                                decimal_point:false
                            });
            }else{
                const last_character = new_expression.slice(-1);
                const end_with_operator = (last_character==="+"||last_character==="-"||last_character==="/"||last_character==="*"||last_character==="%");
                let leading_zero = true;
                let decimal_point = false;
                if(!end_with_operator){
                    let temp = new_expression;
                    while(temp.length!==0){
                        const now_last = temp.slice(-1);
                        if(now_last==="+"||now_last==="-"||now_last==="/"||now_last==="*"||now_last==="%"){
                            break;
                        }
                        if(now_last==="."){
                            leading_zero = false;
                            decimal_point = true;
                            break;
                        }
                        if(Number(now_last)!==0){
                            leading_zero = false;
                        }
                        temp = temp.slice(0, temp.length-1);
                    }
                }
                this.setState({
                                expression:new_expression, 
                                show_prev_expression:false, 
                                leading_zero:leading_zero&&!end_with_operator,
                                end_with_operator:end_with_operator,
                                decimal_point:decimal_point
                            });
            }
        }
    }

    setExpression(expression){ 
        let leading_zero = true;
        let decimal_point = false;
        
        let temp = expression;
        while(temp.length!==0){
            const now_last = temp.slice(-1);
            if(now_last==="+"||now_last==="-"||now_last==="/"||now_last==="*"||now_last==="%"){
                break;
            }
            if(now_last==="."){
                leading_zero = false;
                decimal_point = true;
                break;
            }
            if(Number(now_last)!==0){
                leading_zero = false;
            }
            temp = temp.slice(0, temp.length-1);
        }
                    
        this.setState({
                        expression:expression, 
                        show_prev_expression:false, 
                        leading_zero:leading_zero,
                        end_with_operator:false,
                        decimal_point:decimal_point
                    });
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
                    <button className="small_button" id="answer_button" onClick={() => this.getAnswer()}>=</button>
                    <button className="small_button" onClick={() => this.appendOperator("+")}>+</button>
                    
                </div>
            </section>
        );
    }
}

export default Calculator;