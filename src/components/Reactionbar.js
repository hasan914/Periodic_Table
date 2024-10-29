import React, {useState, useEffect} from 'react';
import ReactionOutput from './ReactionOutput';

const ReactionBar = ({ inputValue, setInputValue, closeInfo }) => {

  const [reactionOutputVisible, setreactionOutputVisible] = useState(false)

  // const handleKeyDown = (event) => {
  //   if (inputValue !== "" && event.key === 'Enter') {
  //     setreactionOutputVisible(true);
  //   }
  // };

  const openReactionOutput = () => {
      setreactionOutputVisible(true);
  };

  const closeReactionOutput = () => {
    setreactionOutputVisible(false);
  }

  // useEffect(() => {
  //   closeReactionOutput();
  //   // closeInfo();
  // }, [inputValue]);


  return (
    <>
      <div className="reaction-bar">
        {/* <input type="text" className='reaction-bar-input' placeholder="Balance an Equation" value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyDown={handleKeyDown}/> */}
        {/* <i className="reaction-bar-icon fa-solid fa-flask"></i> */}

        <button className='btn reaction-bar-button' onClick={openReactionOutput}>Balance Chemical Equation</button>

      </div>

      {reactionOutputVisible && <ReactionOutput inputValue={inputValue} closeReactionOutput={closeReactionOutput}/>}

    </>
  );
};

export default ReactionBar;