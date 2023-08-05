import React from "react";
import Header from "../components/Header";
import Cards from "../components/Cards";

function Home() {
  const cardsData = [
    {title: 'Adicionar', text: 'Adicione funcionários, departamentos e Tarefas', link: '/create'},
    {title: 'Listar', text: 'Administre funcionários, departamentos e Tarefas', link: '/view'},
  ];

  return (
    <div className="container">
      <Header/>
      <Cards cardsData={cardsData}/>
    </div>
  );
}

export default Home;
