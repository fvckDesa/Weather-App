function createForecast() {
    const listEl = [];
    for(let i = 0; i < 15; i++) {
        const el = document.querySelector("[forecast]").content.cloneNode(true);
        listEl.push(el);
    }
    return listEl;
}

export {
    createForecast,
}