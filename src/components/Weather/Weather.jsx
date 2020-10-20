import React, {useState, useEffect} from "react";
import {Form, Button, Card, InputGroup, FormControl} from "react-bootstrap";
import Conditions from "../Conditions/Conditions";

const APPID = `6f3ca02d8abf9a12b70a9bd3cc92a416`;

const Weather = () => {
  const [responseObj, setResponseObj] = useState({});
  const [unit, setUnit] = useState(`metric`);

  const [isShowInput, setIsShowInput] = useState(false);
  const [btnText, setBtnText] = useState(`Получить прогноз`);
  const [isCustomCity, setIsCustomCity] = useState(false);
  const [city, setСity] = useState(`Ульяновск`);

  useEffect(() => {
    getWeatherHandler();
  }, []);

  const fetchingWeather = (params) => {
    setBtnText(`Загрузка данных...`);
    fetch(`https://api.openweathermap.org/data/2.5/weather?${params.city ? `q=${params.city}` : `lat=${params.lat}&lon=${params.lon}`}&units=${unit}&lang=ru&appid=${APPID}`)
    .then(response => response.json())
    .then(response => {
      if (response.cod !== 200) {
        alert(`Город или ваше местоположение не были найдены. Проверьте правильность ввода и попробуйте еще раз.`)
        throw Error();
      }

      setResponseObj(response);
      setBtnText(`Обновить`);
      setСity(`${response.name}`);
      setIsShowInput(false);
      if(params.city) {
        setIsCustomCity(true);
      }
    });
  }
  const _success = (position) => {
    fetchingWeather({lat: position.coords.latitude, lon: position.coords.longitude})
  }

  const _error = () => {
    setIsCustomCity(true);
    alert(`Невозможно определить ваше местоположение. Введите название региона в ручную.`);
  }

  const getWeatherHandler = () => {
    if(!navigator.geolocation) {
      fetchCustomCity();
      alert(`Ваш браузер не поддерживает определение местопложения`);
    } else {
      navigator.geolocation.getCurrentPosition(_success, _error, { enableHighAccuracy: true, timeout : 5000 });
    }
  }

  const fetchCustomCity = () => {
    fetchingWeather({city: city});
  }

  const clickUpdateHandler = () => {
    if (isCustomCity) {
      fetchCustomCity();
    } else {
      getWeatherHandler();
    }
  }

  const clickShowInputrHandler = (evt) => {
    evt.preventDefault();
    setIsShowInput(!isShowInput);
  }

  const submitHandler = (evt) => {
    evt.preventDefault();
    fetchCustomCity();
  }

  return (
    <Card className="mb-2">
      <Card.Header className="text-center">
        Погода в регионе {city}
          <span className="pl-1">
            (<a href="#" onClick={clickShowInputrHandler} variant="outline-secondary">другой регион</a>)
          </span>
        <br />
        {isShowInput ?
          <Form onSubmit={submitHandler}>
            <InputGroup className="my-3 offset-4 col-4">
              <FormControl value={city} onChange={e => setСity(e.target.value)} />
              <InputGroup.Prepend>
                <Button variant="outline-secondary" type="submit">Найти</Button>
              </InputGroup.Prepend>
            </InputGroup>
          </Form>
          : null
        }
      </Card.Header>
      <Card.Body className="text-center">
        <Conditions responseObj={responseObj} />
        <Button onClick={clickUpdateHandler}>{btnText}</Button>
      </Card.Body>
    </Card>
  )
}

export default Weather;
