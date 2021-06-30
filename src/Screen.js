import React from "react";

import "./Screen.css";

function Screen({expression, show_prev_expression}){
    const history_size = Number(window.sessionStorage.history_size);
    const prev_expression = (history_size===0||isNaN(history_size))?null:(show_prev_expression?window.sessionStorage["expression_"+history_size]:"Ans");
    const prev_answer = history_size===0?null:window.sessionStorage["answer_"+history_size];

    const total_prev = prev_expression?(prev_expression+" = "+prev_answer):null;
    const now_expression = expression===undefined?"0":expression;
    return (
        <div className="screen">
            <span className="prev_expression">{total_prev}</span>
            <span className="now_expression">{now_expression}</span>
        </div>
    );
}

export default Screen;