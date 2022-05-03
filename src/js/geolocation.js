export function getCurrentPosition() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(success, error);

    function success(position) {
      const { latitude, longitude } = position.coords;
      resolve({ latitude, longitude });
    }

    function error(err) {
      let message = "";
      switch (err.code) {
        case 1:
          message =
            "To use this feature, the site must be authorized to access the location";
          break;
        case 2:
        case 3:
        default:
          message = "Location not detected, try again";
          break;
      }

      reject(new Error(message));
    }
  });
}
