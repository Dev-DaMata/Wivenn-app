import React from "react";
import Header from "../components/Header";
import Cards from "../components/Cards";

function Home() {
  const cardsData = [
    {title: 'Departamentos', text: 'Administre os seus departamentos', link: '/departments'},
    {title: 'Funcionarios', text: 'Administre os seus funcionarios', link: '/employees'},
    {title: 'Tarefas', text: 'Administre todas as suas tarefas', link: '/tasks'},
  ];

  return (
    <div className="container">
      <Header/>
      <Cards cardsData={cardsData}/>
    </div>
  );
}

export default Home;