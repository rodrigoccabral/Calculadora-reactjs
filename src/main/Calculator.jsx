import React, { Component } from 'react';
import './Calculator.css';
import Button from '../components/Button';
import Display from './Display';

    const initialState = {
        displayValue: '0',
        clearDisplay: false,
        operation: null,
        values: [0, 0],
        current: 0
    }

export default class Calculator extends Component {

    state = { ...initialState }  //Criamos um clone do objeto initialState no state

    constructor(props) {
        super(props)

        this.clearMemory = this.clearMemory.bind(this)
        this.setOperation = this.setOperation.bind(this)
        this.addDigit = this.addDigit.bind(this)
    }

    clearMemory() {
        this.setState({ ...initialState })
    }

    setOperation(operation) {
        if(this.state.current === 0) {
            this.setState({ operation, current: 1, clearDisplay: true, displayValue: operation == '=' ? this.state.displayValue : operation })    //O clearDisplay marcado                                                            
        } else {                                                            //como true serve para indicar que um novo numero esta sendo inserido apos clicarmos no botao de operacao                                      
            const equals = operation === '='
            const currentOperation = this.state.operation

            const values = [...this.state.values]
            try {
                values[0] = eval(`${values[0]} ${currentOperation} ${values[1]}`)   //O resultado da operação é passado para o primeiro indice do array values
            } catch(e) {
                values[0] = this.state.values[0]    
            }

            values[1] = 0   //O segundo indice do array values é zerado

            this.setState({
                displayValue: equals ? values[0] : operation,
                operation: equals ? null : operation,
                current: equals ? 0 : 1,
                clearDisplay: !equals,
                values
            })
        }
    }

    addDigit(n) {
    if(this.state.displayValue.length < 10) {
        if(n === '.' && this.state.displayValue.toString().includes('.')) { //Regra para impedir que o display 
                                                                //apresente mais de um ponto
            return; //Se o valor digitado (n) for ponto e o display ja apresentar um ponto, de um return
        }           //e saia da função

        const clearDisplay = this.state.displayValue === '0' || this.state.clearDisplay
        const currentValue = clearDisplay ? '' : this.state.displayValue
        const displayValue = currentValue + n
        this.setState({ displayValue, clearDisplay: false })

        if(n !== '.') {
            const i = this.state.current    //Current indica o indice do array o qual o numero esta sendo adicionado
            const newValue = parseFloat(displayValue)   //Passando o novo valor concatenado no display
            const values = [...this.state.values]   //Clonando o array values
            values[i] = newValue        //Passando o novo valor para o indice atual do array values
            this.setState({ values })
            console.log(values)
        }
    } else {
        return
    }
    }
    render() {
        return(
            <div className="calculator">
                <Display value={this.state.displayValue} />
                <Button label="AC" click={this.clearMemory} triple/>
                <Button label="/" click={this.setOperation} operation/>
                <Button label="7" click={this.addDigit}/>
                <Button label="8" click={this.addDigit}/>
                <Button label="9" click={this.addDigit}/>
                <Button label="*" click={this.setOperation} operation/>
                <Button label="4" click={this.addDigit}/>
                <Button label="5" click={this.addDigit}/>
                <Button label="6" click={this.addDigit}/>
                <Button label="-" click={this.setOperation} operation/>
                <Button label="1" click={this.addDigit}/>
                <Button label="2" click={this.addDigit}/>
                <Button label="3" click={this.addDigit}/>
                <Button label="+" click={this.setOperation} operation/>
                <Button label="0" click={this.addDigit} double/>
                <Button label="." click={this.addDigit}/>
                <Button label="=" click={this.setOperation} operation/>

            </div>
        )
    }
}