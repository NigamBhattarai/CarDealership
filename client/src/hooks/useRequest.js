import axios from "axios";

function useRequest(url, data, type, success, failure) {
  switch (type) {
    case "get":
      axios
        .get("http://localhost:3000/" + url, { data })
        .then((res) => {
          success(res);
        })
        .catch((error) => {
          failure(error);
        });
      break;
    case "post":
      axios
        .post(url, { data })
        .then((res) => {
          success(res);
        })
        .catch((error) => {
          failure(error);
        });
      break;
    default:
      break;
  }
}

export default useRequest;
