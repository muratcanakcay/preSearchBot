import React, { useState } from 'react';
import { dataset } from './Dataset';

// You must allow pop-ups from localhost:3000

const App: React.FC = () => {

    // DEFAULTS
    const defaultSearchCountTarget = 50
    const defaultWaitBeforeClose = 10 // seconds
    const defaultWaitBetweenSearches = 15 // seconds 
    // -----------

    let openedWindow: Window
    
    let intervalId: any
    let totalSearchCount: number = 0

    const [searchCountTarget, setSearchCountTarget] = useState(defaultSearchCountTarget)
    const [searchesConducted, setSearchesConducted] = useState(0)
    const [stackOverflow, setStackOverflow] = useState(false)

    const countChanged = (e: any) => {
        setSearchCountTarget(e.target.value)
    }

    const stackChanged = (e: any) => {
        setStackOverflow(!stackOverflow)
    }

    const openWindow = () => {

        let newWindow = window.open("https://engine.presearch.org/search?q=" + dataset[(Math.floor(Math.random() * dataset.length))])

        if (newWindow) {
            setSearchesConducted(++totalSearchCount)            

            console.log(totalSearchCount.valueOf() + "   " + searchCountTarget.valueOf())

            if (totalSearchCount.valueOf() >= searchCountTarget.valueOf()) {
                console.log("Ending searches")
                clearInterval(intervalId)
                if(stackOverflow) {                    
                    window.open("https://www.stackoverflow.com/")
                }
            }

            openedWindow = newWindow
            setTimeout(closeWindow, defaultWaitBeforeClose * 1000)
        }
    }

    const closeWindow = () => {
        openedWindow.close()
    }

    const startSearches = () => {
        openWindow()
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
            <div className="row">
                <div className="col">
                    <input 
                        id="stackOverflow"
                        name="stackOverflow"
                        type="checkbox"                        
                        checked={stackOverflow}
                        onChange={(e) => stackChanged(e)}
                    />
                    <span>Open stack exchange at finish</span>
                </div>
            </div>
            
        </div >
    );
}

export default App;
