import React from 'react';

class Form extends React.Component {
  render() {
    return (
      <div>
        <form>
          <div>
            <input type="text" data-testid="name-input" />
            <textarea data-testid="description-input" />
            <input type="number" data-testid="attr1-input" />
            <input type="number" data-testid="attr2-input" />
            <input type="number" data-testid="attr3-input" />
            <input type="text" data-testid="image-input" />
            <select type="select" data-testid="rare-input">
              <option vale="normal">normal</option>
              <option vale="raro">raro</option>
              <option vale="muito raro">muito raro</option>
            </select>
            <input type="checkbox" data-testid="trunfo-input" />
            <button type="button" data-testid="save-button">Salvar</button>
          </div>
        </form>
      </div>
    );
  }
}

export default Form;
