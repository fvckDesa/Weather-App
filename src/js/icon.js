import * as Icons from '../assets';

function loadStaticIcon() {
    qsImage("#humidity").src = Icons.humidity;
    qsImage("#clouds").src = Icons.cloud;
    qsImage(".search").src = Icons.searchIcon;
    qsImage("#probablyPrecipitation").src = Icons.probablyPrecipitation;
    qsImage("#rain").src = Icons.rain;
    qsImage("#snow").src = Icons.snow;
    qsImage("#wind").src = Icons.wind;
}

function qsImage(child, parent = document) {
    return parent.querySelector(`${child} > img`);
}

export {
    loadStaticIcon,
}