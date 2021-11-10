import React, { useState } from 'react';

// You must allow pop-ups from localhost:3000

const App: React.FC = () => {

    // DEFAULTS
    const defaultSearchCountTarget = 2
    const defaultWaitBeforeClose = 2 // seconds
    const defaultWaitBetweenSearches = 5 // seconds (must be greater than defaultWaitBeforeClose)
    // -----------

    let openedWindow: Window
    let intervalId: any
    let totalSearchCount: number = 0

    const [searchCountTarget, setSearchCountTarget] = useState(defaultSearchCountTarget)
    const [searchesConducted, setSearchesConducted] = useState(0)

    const countChanged = (e: any) => {
        setSearchCountTarget(e.target.value)
    }

    const openWindow = () => {
        console.log("Trying to open")

        let newWindow = window.open("https://www.google.com")

        if (newWindow) {
            setSearchesConducted(++totalSearchCount)
            if (totalSearchCount == searchCountTarget)
                clearInterval(intervalId)

            openedWindow = newWindow
            setTimeout(closeWindow, defaultWaitBeforeClose * 1000)
        }
    }

    const closeWindow = () => {
        console.log("Trying to close")
        openedWindow.close()
    }

    const startSearches = () => {
        intervalId = setInterval(openWindow, defaultWaitBetweenSearches * 1000)
    }


    return (
        <div className="container mt-3">
            <div className="row my-5 d-inline-flex flex-row justify-content-start align-items-center">
                <div className="col-md-auto">
                    <button className="btn btn-dark" onClick={startSearches}>START</button>
                </div>
                <div className="col">
                    <label htmlFor="searchCount">Number of searches:</label>
                </div>
                <div className="col-auto">
                    <input
                        id="searchCount"
                        name="searchCount"
                        type="number"
                        value={searchCountTarget}
                        max="100"
                        step="5"
                        required={true}
                        onChange={(e) => countChanged(e)}
                    />
                    Searches conducted: {searchesConducted}
                </div>
            </div>
        </div >
    );
}

export default App;
