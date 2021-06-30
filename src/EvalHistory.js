import React from "react";

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
                <button onClick={() => this.toggleHistory()}>history</button>
                <ul className="histories" style={{display: visibility[toggle_idx]}}>        
                    {totalHistory.map((eval_history, idx) => (
                        <li key={idx}><button onClick={() => this.props.callback(eval_history.expression)}>{eval_history.expression}</button> = <button onClick={() => this.props.callback(eval_history.answer)}>{eval_history.answer}</button></li>
                    ))}
                </ul>
            </section>
        );
    }
}

export default EvalHistory;