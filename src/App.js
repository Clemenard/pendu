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
	phrase : '',
  falseCount : 0,
  start : true
}

handlePhraseUpdate = (event) => {

  this.setState({ phrase: event.target.value.toLowerCase()  })
}


computeDisplay= (phrase, usedLetters) =>{
  return phrase.replace(/\w/g,
    (letter) => (usedLetters.includes(letter) ? letter : '_')
  )
}

 addLetter= (letter) =>{
	 	const { usedLetters,falseCount,phrase } = this.state
	usedLetters.push(letter)
  var arrayPhrase= phrase.split('')
  var newCount = arrayPhrase.includes(letter) ? falseCount : falseCount+1
	this.setState({usedLetters: usedLetters})
  this.setState({falseCount: newCount})
}

startHanging = (event) => {
  event.preventDefault()
  this.setState({start: false})
}

restartHanging = (event) => {
  event.preventDefault()
  this.setState({start: true,falseCount :0, usedLetters : [] , phrase :''})
}
render() {
	const { phrase, usedLetters, falseCount,  start } = this.state
	const won = this.computeDisplay(phrase, this.state.usedLetters).indexOf('_')===-1 && phrase.length>4
  const maxFalse = 5
  const lose = (maxFalse-falseCount)<=0

  return (

<div className="pendu ">
{start &&

  <form  onSubmit={this.startHanging}>
        <p>
          <label>
            Entrez le mot mystère
            <input
             type="text"
             id="mystere"
             onChange={this.handlePhraseUpdate}
             value={this.state.phrase} />
          </label>
          <button type="submit">Valider</button>
        </p>
      </form>
}

<p id='pendu'> {this.computeDisplay(phrase, this.state.usedLetters)} </p>
<p> { (maxFalse-falseCount)>0 && !start && 'Il vous reste '+ (maxFalse-falseCount) +' essais'}</p>
<div className='row'>
<div className='col-6'>
  <img src={ 'hang'+(maxFalse-falseCount) +'.png'} alt=""/>
</div>
<div className='col-6 row'>
{
	!start &&
(  ALPHABET.map((letter, index) => (
    <Letter
      letter={letter}
      index={index}
      key={index}
      onClick={this.addLetter}
			usedLetters={usedLetters}
			disabled={usedLetters.includes(letter)}
    />
)))
}
</div>
</div>
<p>{won && 'Gagné'}{lose && 'Perdu'}</p>
{
(won || lose) && <form onSubmit={this.restartHanging}>
  <button type="submit"> Rejouer?</button>
</form>

}
</div>

  )
}}

export default App;
