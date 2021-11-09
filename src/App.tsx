import React, { useState } from 'react';

const App: React.FC = () => {

  // DEFAULTS
  const defaultSearchCount = 3
  const defaultWaitInterval = 1 // seconds
  // -----------

  let openedWindow: Window

  const [searchCount, setSearchCount] = useState(defaultSearchCount)

  const openWindow = () => {
    let newWindow = window.open("https://www.google.com", "_blank")
    if (newWindow) openedWindow = newWindow

    setTimeout(openedWindow.close, defaultWaitInterval * 1000)
  }

  const countChanged = (e: any) => {
    setSearchCount(e.target.value)
  }


  return (
    <div className="container mt-3">
      <div className="row my-5 d-inline-flex flex-row justify-content-start align-items-center">
        <div className="col-md-auto">
          <button className="btn btn-dark" onClick={openWindow}>START</button>
        </div>
        <div className="col">
          <label htmlFor="searchCount">Number of searches:</label>
        </div>
        <div className="col">
          <input
            id="searchCount"
            name="searchCount"
            type="number"
            value={searchCount}
            max="100"
            step="5"
            required={true}
            onChange={(e) => countChanged(e)} />
        </div>
      </div>
    </div >
  );
}

export default App;
