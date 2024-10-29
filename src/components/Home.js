import React, { useState, Fragment, useEffect } from "react";
import { elements } from "../_data";
import Element from "../Element";
import Navbar from "./Navbar";
import SearchBar from "./Searchbar";
import ReactionBar from "./Reactionbar";
import ElementsColorDesc from "./ElementsColorDesc";
import { useNavigate } from 'react-router-dom';

const Home = () => {

  let navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      
    } else {
      navigate("/login");
    }
    // eslint-disable-next-line
  }, []);

  const [element, setElement] = useState({});
  const [showInfo, setShowInfo] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const showInfoHandler = (num) => {
    setShowInfo(true);
    setElement(elements[num]);
  };

  const closeInfoHandler = () => {
    setShowInfo(false);
  };

  const getElement = (element) => {
    showInfoHandler(element.number);
    // sendToReaction(element.symbol);
  };

  // const sendToReaction = (elementSymbol) => {
  //   setInputValue((prevValue) => {
  //     if (prevValue === "") {
  //       return `${elementSymbol}`;
  //     } else {
  //       return `${prevValue} + ${elementSymbol}`;
  //     }
  //   });
  // };

  const populateElements = (start, end) => {
    let items = [];
    for (let i = start; i <= end; i++) {
      items.push(<Element getElement={getElement} num={i} />);
    }
    return items;
  };

  return (
    <>

      <Navbar />

      <div className="container">
        <SearchBar getElement={getElement} closeInfo={closeInfoHandler} />
        <ReactionBar inputValue={inputValue} setInputValue={setInputValue} closeInfo={closeInfoHandler} />
      </div>

      <div className="container elements-color-desc">
        <ElementsColorDesc />
      </div>

      {/* Element Info Section */}
      <div className="container info-section">
        {showInfo && (
          <Fragment>
            <div id="element-box" className={`${element.category}`}>
              <div className="number">{element.number}</div>
              <div className="symbol">{element.symbol}</div>
              <div className="element-name">{element.name}</div>
            </div>
            <div id="information">
              <div onClick={closeInfoHandler} className="close-button" title="Close Info" style={{ fontSize: "18px" }}>
                &times;
              </div>
              <div>
                <h1 className="big_title">{element.name}</h1>
                <span className={`cat_name ${element.category}`}>{element.category}</span>
                {element.appearance && (
                  <div className="appearance">
                    <strong>Appearance:</strong> {element.appearance}
                  </div>
                )}
                <div className="atom_info">
                  <span>Atomic Mass: {element.atomic_mass} | </span>
                  <span>Density: {element.density}</span>
                  {element.molar_heat && <span> | Molar Heat: {element.molar_heat}</span>}
                  {element.melt && <span> | Melt: {element.melt}K</span>}
                  {element.boil && <span> | Boil: {element.boil}K</span>}
                </div>
                <div>
                  {/* {element.summary} ... <a target="_blank" href={element.source} rel="noreferrer">Source</a> */}
                  {element.summary}
                </div>
              </div>
            </div>
          </Fragment>
        )}
      </div>

      {/* PERIODIC TABLE */}
      <div className="wrapper">
        <div id="table">
          {/* Elements 1-4 */}
          {populateElements(1, 4)}
          {/* Populating elements from 5-57 */}
          {populateElements(5, 57)}
          {/* Lanthanoids split 72-89 */}
          {populateElements(72, 89)}
          {/* Actinoids split 104-119*/}
          {populateElements(104, 118)}
          {/* Lanthenoids 58-71*/}
          {populateElements(58, 71)}
          {/* Actionoids 90-103 */}
          {populateElements(90, 103)}
        </div>
      </div>

    </>
  );

}

export default Home