import React from 'react';
import Form from './components/Form';
import Card from './components/Card';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      cardName: '',
      cardDescription: '',
      cardAttr1: '0',
      cardAttr2: '0',
      cardAttr3: '0',
      cardImage: '',
      cardRare: 'Normal',
      cardTrunfo: false,
      isSaveButtonDisabled: true,
      hasTrunfo: false,
      savedCards: [],
      filter: '',
      rarity: 'todas',
    };
  }

  handleChange = ({ target }) => {
    const { name } = target;
    const value = (target.type === 'checkbox') ? target.checked : target.value;
    this.setState({
      [name]: value,
    }, this.validateSaveButton);
  };

  validateSaveButton = () => {
    const {
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardName,
      cardDescription,
      cardImage,
      cardRare,
    } = this.state;

    const fakeArray = [];
    const maxAttr = 90;
    const maxSumAttr = 210;
    const attr1 = Number(cardAttr1);
    const attr2 = Number(cardAttr2);
    const attr3 = Number(cardAttr3);

    if (
      cardName === ''
    || cardDescription === ''
    || cardImage === ''
    || cardRare === '') {
      fakeArray.push(false);
    }

    if ((attr1 + attr2 + attr3) > maxSumAttr) {
      fakeArray.push(false);
    }

    if (attr1 > maxAttr || attr1 < 0) {
      fakeArray.push(false);
    }

    if (attr2 < 0 || attr2 > maxAttr) {
      fakeArray.push(false);
    }

    if (attr3 < 0 || attr3 > maxAttr) {
      fakeArray.push(false);
    }

    if (fakeArray.length > 0) {
      this.setState({
        isSaveButtonDisabled: true,
      });
    } else {
      this.setState({
        isSaveButtonDisabled: false,
      });
    }
  };

  saveButton = (event) => {
    event.preventDefault();
    const {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
    } = this.state;

    const cardObject = {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
    };

    this.setState((prev) => ({
      savedCards: [...prev.savedCards, cardObject],
      cardName: '',
      cardDescription: '',
      cardAttr1: '0',
      cardAttr2: '0',
      cardAttr3: '0',
      cardImage: '',
      cardRare: 'Normal',
      cardTrunfo: false,
    }));

    if (cardTrunfo === true) {
      this.setState({
        hasTrunfo: true,
      });
    }
  };

  deleteCard = (clickedCard) => {
    const { savedCards } = this.state;
    const newList = savedCards.filter((card) => (card !== clickedCard));
    this.setState({
      savedCards: newList,
    });

    if (clickedCard.cardTrunfo === true) {
      this.setState({
        hasTrunfo: false,
      });
    }
  };

  render() {
    const { savedCards, filter, rarity } = this.state;
    let arrAux = savedCards;
    if (rarity !== 'todas') {
      arrAux = arrAux.filter((carta) => carta.cardRare === rarity);
    }

    return (
      <div>
        <h1>Tryunfo</h1>
        <Form
          { ...this.state }
          onInputChange={ this.handleChange }
          onSaveButtonClick={ this.saveButton }
        />
        <Card
          { ...this.state }
        />
        <div>
          <h2>Minhas Cartas</h2>
          <input
            name="filter"
            type="text"
            data-testid="name-filter"
            onChange={ this.handleChange }
          />
          <select
            name="rarity"
            data-testid="rare-filter"
            onChange={ this.handleChange }
          >
            <option value="todas">todas</option>
            <option value="normal">normal</option>
            <option value="raro">raro</option>
            <option value="muito raro">muito raro</option>
          </select>

          { arrAux.filter((carta) => carta.cardName.includes(filter))
            .map((card) => (
              <div key={ card.cardName }>
                <Card { ...card } />
                <button
                  type="button"
                  data-testid="delete-button"
                  onClick={ () => this.deleteCard(card) }
                >
                  Excluir
                </button>
              </div>)) }
        </div>
      </div>
    );
  }
}

export default App;
