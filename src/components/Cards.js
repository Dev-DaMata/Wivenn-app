import React from "react";
import { useNavigate } from 'react-router-dom';
import '../styles/Cards.css'


function Cards(props) {
  let { cardsData } = props;
  const navigate = useNavigate();

  return (
    <div className="cards-container">
      {
        cardsData && cardsData.map((card, index) => {
          return(
              <div className="card-body" key={index}>
                <h5 className="card-title">{card.title ? card.title : ''}</h5>
                <p className="card-text">{card.text ? card.text : ''}</p>
                <button className="card-btn" onClick={()=>{navigate(card.link)}}>Botao</button>
              </div>
          )
        })
      }
    </div>
  );
}

export default Cards;
