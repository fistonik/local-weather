import React, {useState} from "react";
import {Button, Card} from "react-bootstrap";
import Conditions from "../Conditions/Conditions";

const APPID = `6f3ca02d8abf9a12b70a9bd3cc92a416`;

const Weather = () => {
  const [responseObj, setResponseObj] = useState({});
  const [unit, setUnit] = useState(`metric`);
  const [btnText, setBtnText] = useState(`Получить прогноз`);
  const [region, setRegion] = useState(`вашем регионе`);

  const _success = (position) => {
    const latitude  = position.coords.latitude;
    const longitude = position.coords.longitude;

    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${unit}&lang=ru&appid=${APPID}`)
      .then(response => response.json())
      .then(response => {
        if (response.cod !== 200) {
          throw new Error()
        }
        setResponseObj(response);
        setBtnText(`Обновить`);
        setRegion(`${response.name}`);
      });
  }

  const _error = () => {
    alert(`Невозможно определить ваше местоположение`);
  }

  const getWeatherHandler = () => {
    if(!navigator.geolocation) {
      alert(`Ваш браузер не поддреживает определение местопложения`);
    } else {
      setBtnText(`Загрузка данных...`);
      navigator.geolocation.getCurrentPosition(_success, _error, { enableHighAccuracy: true , timeout : 5000 });
    }
  }

  return (
    <Card className="mb-2">
      <Card.Header className="text-center">Погода в {region}</Card.Header>
      <Card.Body>
        <Card.Text className="text-center">
          <Conditions responseObj={responseObj} />
          <Button onClick={getWeatherHandler}>{btnText}</Button>
        </Card.Text>
      </Card.Body>
    </Card>
  )
}

export default Weather;
