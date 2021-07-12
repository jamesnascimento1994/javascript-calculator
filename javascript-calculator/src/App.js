/* eslint-disable no-eval */
import React, {useState} from 'react';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import './App.css';

function App() {
	const [expression, setExpression] = useState("");
	const [answer, setAnswer] = useState(expression);

	function display(symbol) {

		setExpression((prevValue) => {
			if (
				/[+*-/]/.test(symbol) &&
				/[+*-/]/.test(prevValue[prevValue.length - 1])
			) {
				let newValue;
				if (/[-]/.test(symbol)) {
					newValue = prevValue.slice(0, prevValue.length) + symbol;
				} else {
					let count = 0;
					for (let i in prevValue) {
						if (isNaN(+prevValue[i])) {
							count++;
						} else {
							count = 0;
						}
					}
					newValue = prevValue.slice(0, prevValue.length - count) + symbol;
				}

				setExpression(newValue);
			} else {
				if (prevValue) {
					prevValue = prevValue + '';
					let valArr = prevValue.split(/[+/*-]/g);
					console.log('valArr ' + JSON.stringify(valArr));
					let lastNumber = valArr[valArr.length - 1];
					if (!isNaN(lastNumber) && /[.]/.test(lastNumber) && symbol === '.') {
						console.log('symbol = empty ');
						symbol = '';
					}
				}

				setExpression(
					(prevValue + symbol).replace(/^0/g, '').replace(/\.+/g, '.')
				);
			}
		});

		setAnswer((prevValue) =>
			(prevValue + symbol).replace(/^0/g, '').replace(/\.+/g, '.')
		);
	}

	function calculate() {
		setAnswer(eval(expression));
		setExpression(eval(expression));
	}
	function allClear() {
		setExpression('');
		setAnswer(0);
	}
	function clear() {
		setExpression((prev) => {
			setAnswer(0);
			console.log(prev);
			prev = prev + '';
			return prev
				.split('')
				.slice(0, prev.length - 1)
				.join('');
		});
	}
  return (
	  <>
	  <Header />
		<div className='container'>
			<div className='grid'>
				<div className='display'>
					<input class='expression' disabled placeholder="0" value={expression} />
					<input id="display" className="answer" disabled value={answer} />
				</div>
				<div onClick={allClear} className='padButton clear sienna' id="clear">AC</div>
				<div onClick={clear} className='padButton c sienna' id="c">C</div>
				<div onClick={() => display("/")} className='padButton divide' id="divide">/</div>
				<div onClick={() => display("*")} className='padButton multiply' id="multiply">x</div>
				<div onClick={() => display("7")} className='padButton seven rosy-brown' id="seven">7</div>
				<div onClick={() => display("8")} className='padButton eight rosy-brown' id="eight">8</div>
				<div onClick={() => display("9")} className='padButton nine rosy-brown' id="nine">9</div>
				<div onClick={() => display("-")} className='padButton subtract' id="subtract">-</div>
				<div onClick={() => display("4")} className='padButton four rosy-brown' id="four">4</div>
				<div onClick={() => display("5")} className='padButton five rosy-brown' id="five">5</div>
				<div onClick={() => display("6")} className='padButton six rosy-brown' id="six">6</div>
				<div onClick={() => display("+")} className='padButton add' id="add">+</div>
				<div onClick={() => display("1")} className='padButton 1 rosy-brown' id="one">1</div>
				<div onClick={() => display("2")} className='padButton 2 rosy-brown' id="two">2</div>
				<div onClick={() => display("3")} className='padButton 3 rosy-brown' id="three">3</div>
				<div onClick={calculate} className='padButton equals light-sea-green' id="equals">=</div>
				<div onClick={() => display("0")} className='padButton zero rosy-brown' id="zero">0</div>
				<div onClick={() => display(".")} className='padButton decimal rosy-brown' id="decimal">.</div>
			</div>
		</div>
		<Footer />
		</>
	);
}

export default App;
