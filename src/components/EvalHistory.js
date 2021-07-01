import React from "react";

import "./EvalHistory.css";
class EvalHistory extends React.Component {
    state = {
        toggle_idx:0
    }

    toggleHistory(){
        const {toggle_idx} = this.state;
        this.setState({toggle_idx:(toggle_idx+1)%2});
    }

    render() {
        let totalHistory = [];
        const visibility = ["none", "block"];
        const {toggle_idx} = this.state; 
        const history_size = Number(window.sessionStorage.history_size);

        for (let i = 1; i <= history_size; i += 1) {
            totalHistory.push({
                expression: window.sessionStorage["expression_" + i],
                answer: window.sessionStorage["answer_" + i],
            });
        }
        
        return (
            <section className="history_container">
                <button className="history__button" onClick={() => this.toggleHistory()}>HISTORY</button>
                <ul className="histories" style={{display: visibility[toggle_idx]}}>        
                    {totalHistory.map((eval_history, idx) => (
                        <li className="histories__history" key={idx}>
                            <button className="expression_button" onClick={() => {this.toggleHistory(); this.props.callback(eval_history.expression)}}>{eval_history.expression.slice(0, 18)}{eval_history.expression.length > 18?"...":null}</button>
                            <span className="expression_text">=</span>
                            <button className="expression_button" onClick={() => {this.toggleHistory(); this.props.callback(eval_history.answer)}}>{eval_history.answer.slice(0, 18)}{eval_history.answer.length > 18?"...":null}</button></li>
                    ))}
                </ul>
            </section>
        );
    }
}

export default EvalHistory;