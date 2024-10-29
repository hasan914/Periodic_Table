import React, { useState, useEffect } from 'react';
import gif from '../images/reaction-output-gif.gif';

const ReactionOutput = ({ inputValue, closeReactionOutput }) => {

  const [showImage, setShowImage] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowImage(false); // Hide the image after 2 seconds
    }, 5000);
    return () => clearTimeout(timer); // Clear the timer if the component unmounts
  }, [])

  const chemicalEquationBalancer = 'http://localhost/chemicalequationbalancer/chemical-balancer.html';

  return (
    <>

      <div className="reaction-output">

        {showImage && (
          <img src={gif} alt="Reaction Gif" style={{width: "80%", margin: "0 auto"}}/>
        )}

        {!showImage && (
          <>
            <i className="reaction-output-icon fa-solid fa-flask"></i>
            <div onClick={closeReactionOutput} className="reaction-output-close-button" title="Close Reaction Output">&times;</div>
            {/* <div className="reaction-input-value"><h4>Input Interpretation: &nbsp;</h4> <p>{inputValue}</p></div> */}

            <iframe src={chemicalEquationBalancer} width="100%" style={{border: "none"}}></iframe>

          </>
        )}

      </div>

    </>
  )
}

export default ReactionOutput