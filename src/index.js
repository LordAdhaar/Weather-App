import './style.css';
import {getCoordinates} from "./apiAccess.js";
import { get } from 'lodash';
import { setWeatherDetails } from './domManipulation.js';

const searchBtn = document.getElementById("searchButton");
const celBtn = document.getElementById("metric");
const fahBtn = document.getElementById("imperial");

console.log(celBtn,fahBtn);
setWeatherDetails();
celBtn.addEventListener("click",setWeatherDetails);
fahBtn.addEventListener("click",setWeatherDetails);

searchBtn.addEventListener("click",setWeatherDetails);


console.log("hello you")