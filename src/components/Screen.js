import React from "react";

import "./Screen.css";

function Screen({expression, show_prev_expression}){
    const history_size = Number(window.sessionStorage.history_size);
    const latest_answer = (history_size===0||isNaN(history_size))?null:window.sessionStorage["answer_"+history_size];
    const prev_expression = (history_size===0||isNaN(history_size))?null:(show_prev_expression?(window.sessionStorage["expression_"+history_size] + " = "):("Ans = "+latest_answer));
    
    const now_expression =show_prev_expression?latest_answer:(expression===undefined?"0":expression);
    return (
        <div className="screen">
            <span className="prev_expression">{prev_expression}</span>
            <span className="now_expression">{now_expression}</span>
        </div>
    );
}

export default Screen;