import React from 'react';
import './Button.css';

export default props => 
    <button 
    onClick={e => props.click(props.label)} //Ao clicar no botão chame a função com o valor do label   
                                            //como parametro
    className={`
        button
        ${props.operation ? 'operation' : ''}
        ${props.double ? 'double' : ''}
        ${props.triple ? 'triple' : ''}
    `}>
        { props.label }
    </button>