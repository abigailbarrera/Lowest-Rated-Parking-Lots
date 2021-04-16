import React, { useState } from 'react';
import axios from 'axios';
import './App.css';


const apiKey = "fvEKECm35FgEIOwJxiU7XegYyR8QVTdD-L8BdRwjSrlY7BORJDlFOo-hlcbZ164YIbCoyttiFEcdkhnHbFg1EEnZFiF_8le57swIdeL4nzxXNoWIFF-6Ekgvcx95YHYx";

function App() {
  const [location, setLocation] = useState("");
  const [data, setData] = useState([]);

  const fetchData = async () => {
    await axios.get(`${'https://cors-anywhere.herokuapp.com/'}https://api.yelp.com/v3/businesses/search?location=${location}`, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
      params: {
        categories: 'parking',
      },
    })
    .then((res) => {
      setData(res.data.businesses);
    })
    .catch((err) => {
      console.log("err", err);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData();
  }

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <h1>Lowest Rated Parking Lots</h1>

        <label>
          Enter Location:
          <input 
            type="text"
            value={location}
            onChange={e => {setLocation(e.target.value)}}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>

      <div>
        {data.length > 0 && (
          data.map((parkingLot) => {
            const address = parkingLot.location.display_address[0] + " " + parkingLot.location.display_address[1];
            const score = Math.round(( parkingLot.review_count * parkingLot.rating ) / (parkingLot.review_count + 1));
            console.log("score", score);

            return (
              <div className="ParkingLot" key={parkingLot.id}>
                <h3>{parkingLot.name}</h3>
                <img 
                  src={parkingLot.image_url}
                  alt="parking"
                  width="300" 
                  height="300"
                  className="Image"
                />
                <ul className="ParkingLotInfo">
                  <p>Address: {address}</p>
                  <p>Score: {score}</p>
                  <p> Rating: {parkingLot.rating}</p>
                  <p>Review Count: {parkingLot.review_count}</p>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      window.location.href=parkingLot.url;
                      }}
                  > Link to Yelp Page</button>
                </ul>
              </div>
            )
          })
        )}
      </div>

    </div>
  );
}

export default App;
