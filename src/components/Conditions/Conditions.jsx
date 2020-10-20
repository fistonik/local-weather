/* eslint-disable react/prop-types */
import React from "react";

const Conditions = (props) => {
  return (
    <React.Fragment>
      {props.responseObj.cod === 200 ?
        <div>
          <img src={`http://openweathermap.org/img/wn/${props.responseObj.weather[0].icon}@2x.png`} />
          <p>{props.responseObj.weather[0].description}</p>
          <p>температура: {Math.round(props.responseObj.main.temp)}°</p>
          <p>ветер: {Math.round(props.responseObj.wind.speed)} м/с <br />
          влажность: {props.responseObj.main.humidity}%<br />
          давление: {props.responseObj.main.pressure} гПа</p>
        </div>
      : null
      }
    </React.Fragment>
  )
}

export default Conditions;
