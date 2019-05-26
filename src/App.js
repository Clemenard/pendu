import React, { Component } from 'react'
 import PropTypes from 'prop-types'
import './App.css';


const Letter = ({ index, letter, onClick, usedLetters, disabled }) => (
  <div className={`letter`} onClick={() => onClick(letter, usedLetters)}>
  {  disabled ||
		<button >
      {letter}
    </button>
	}
  </div>
)
Letter.propTypes = {
  letter: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
	usedLetters: PropTypes.array.isRequired,
	disabled: PropTypes.bool.isRequired,
}

const ALPHABET = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']


class App extends Component {

state = {
	usedLetters : [],
	phrase : 'pendu'
}



computeDisplay= (phrase, usedLetters) =>{
  return phrase.replace(/\w/g,
    (letter) => (usedLetters.includes(letter) ? letter : '_')
  )
}

 addLetter= (letter) =>{
	 	const { usedLetters } = this.state
	usedLetters.push(letter)
	console.log(usedLetters)
	this.setState({usedLetters: usedLetters});


}



render() {
	const { phrase, usedLetters } = this.state
	const won = usedLetters.length === 5
  return (

<div className="pendu ">
<p id='pendu'> {this.computeDisplay(phrase, this.state.usedLetters)} </p>
<div className='row'>
{
	ALPHABET.map((letter, index) => (
    <Letter
      letter={letter}
      index={index}
      key={index}
      onClick={this.addLetter}
			usedLetters={usedLetters}
			disabled={usedLetters.includes(letter)}
    />
))
}
</div>
<p>{won && 'Gagné'}</p>
</div>

  )
}}

export default App;
