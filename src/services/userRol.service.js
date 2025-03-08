import http from "../http-common";

class UserRolDataService {
  getAll() {
    return http.get("/userRol");
  }

  get(id_user, id_rol) {
    return http.get(`/userRol/${id_user}/${id_rol}`);
  }

  create(data) {
    return http.post("/userRol", data);
  }

  update(id_user, id_rol, data) {
    return http.put(`/userRol/${id_user}/${id_rol}`, data);
  }

  delete(id_user, id_rol) {
    return http.delete(`/userRol/${id_user}/${id_rol}`);
  }

}

export default new UserRolDataService();