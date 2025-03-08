import http from "../http-common";

class RolDataService {
  getAll() {
    return http.get("/rol");
  }

  get(id) {
    return http.get(`/rol/${id}`);
  }

}

export default new RolDataService();