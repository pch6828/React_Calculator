import React from "react";

function Screen({expression, show_prev_expression}){
    const history_size = Number(window.sessionStorage.history_size);
    const prev_expression = history_size===0?null:(show_prev_expression?window.sessionStorage["expression_"+history_size]:"Ans");
    const prev_answer = history_size===0?null:window.sessionStorage["answer_"+history_size];

    const total_prev = prev_expression?prev_expression+" = "+prev_answer:null;
    const now_expression = expression===undefined?"0":expression;
    return (
        <div className="screen">
            <h3>{total_prev}</h3>
            <h1>{now_expression}</h1>
        </div>
    );
}

export default Screen;