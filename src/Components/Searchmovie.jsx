import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import "./search.css"
import Image from 'react-bootstrap/Image';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

function Searchmovie() {
  const prevQueryRef = useRef();

  const [query, setQuery] = useState('');
  const [moviedata, setMovieData] = useState(null);
  const [error1, setError] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [selsugg, setSelSugg] = useState();

  const searchMoviefn = async () => {
    try {
      let response;
      if (selsugg) {
        response = await axios.get(`https://www.omdbapi.com/?t=${selsugg.Title}&apikey=778c217`);
      } else {
        response = await axios.get(`https://www.omdbapi.com/?t=${query}&apikey=778c217`);
      }
      setMovieData(response.data);
    } catch (error) {
      console.log('Error fetching data', error);
      setError(error);
      alert(error1);
    }
  };

  useEffect(() => {
    if (query.trim() !== '') {
      suggestionFetch();
    } else {
      setSuggestions([]);
    }
  }, [query]);

  useEffect(() => {
    if (selsugg) {
      setQuery(selsugg.Title);
    }
  }, [selsugg]);

  useEffect(() => {
    if (selsugg) {
      searchMoviefn(); // Call searchMoviefn when selsugg changes
      setSuggestions([]);
      setSelSugg('');
    }
  }, [selsugg]);

  const suggestionFetch = async () => {
    try {
      const res = await axios.get(`https://www.omdbapi.com/?s=${query}&apikey=778c217`);
      setSuggestions(res.data.Search);
    } catch (error) {
      console.log('error in suggestion', error);
    }
  };

  const selectSuggestion = (sel) => {
    setSelSugg(sel);
  };

  return (
    <div>
      <div className="container1 container-lg   p-2 align-items-center">
        <h1>Search Movies</h1>
        <input type="text" id="searchfield" placeholder="movie name" onChange={(e) => setQuery(e.target.value)} value={query} />
        <button onClick={() => searchMoviefn()}>Search</button>
        <div className="suggestions">
          {suggestions && (
            <>
              <div className="suggestionlist">
                {suggestions?.map((item) => (
                  
                  <button
                    className="sugg-item m-1  p-1 rounded"
                    onClick={() => selectSuggestion(item)}
                    style={{ listStyle: 'none' }}
                  >
                    {item.Title}
                    {console.log(item.Poster)}
                    <div>
                      { 
                       item.Poster!=="N/A" &&  (
                        
                        <Card.Img variant="top" src={item.Poster} style={{width:"50px"}} />
                      )}
                      </div>
                    
                  </button>

                ))}
              </div>
            </>
          )}
        </div>


        
          
          
        {
          moviedata? (<div className="moviedisplay align-item-center" >
          {moviedata && (
            <>


              <div className='maindisplay m-5 p-5 d-flex'>
                <div className="carddis">
                  <Card style={{ width: '18rem' }}>
                  <Card.Img variant="top" src={moviedata.Poster} />
                    <Card.Body>
                      <Card.Title></Card.Title>
                      <Card.Text>
                        {moviedata.Year} Movie
                      </Card.Text>
                    </Card.Body>
                    <ListGroup className="list-group-flush">
                      <ListGroup.Item> <span id='release'>Released on :</span> {moviedata.Released}</ListGroup.Item>
                      <ListGroup.Item> <h6 style={{ textDecorationLine: "underline" }}>Top Casts</h6>

                        {moviedata.Actors}</ListGroup.Item>
                      <ListGroup.Item>  <h6 style={{ textDecorationLine: "underline" }}>Ratings</h6>
                        <ul>
                          {moviedata.Ratings?.map((item) => (
                            <li key={item.Source}>
                              <span id='ratingkey' style={{ color: 'blue' }}>{item.Source}</span> :{item.Value}
                            </li>
                          ))}
                        </ul></ListGroup.Item>
                    </ListGroup>
                    <Card.Body>
                      {/* <Card.Link href="#">Card Link</Card.Link>
                      <Card.Link href="#">Another Link</Card.Link> */}
                    </Card.Body>
                  </Card>
                </div>


                <div className='titledis m-3 '>
                  <h1>{moviedata.Title}</h1>
                  <p style={{ textAlign: 'left' }}>{moviedata.Plot}</p>
                </div>
              </div>
            </>
          )}

        </div>):(<div className='moviedisplay'></div>)
        }
      </div>
    </div>
  );
}

export default Searchmovie;
