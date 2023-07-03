import React from 'react';

class Loading extends React.Component {
  render() {
    return (
      <div class="columns">
        <div class="column"></div>
        <div class="column box">
          <p class="subtitle">Carregando...</p>
        </div>
        <div class="column"></div>
      </div>
    );
  }
}

export default Loading;
