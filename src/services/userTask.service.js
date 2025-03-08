import http from "../http-common-tasks";

class UserTaskDataService {
  getAll() {
    return http.get("/userTask");
  }

  get(id_user, id_task) {
    return http.get(`/userTask/${id_user}/${id_task}`);
  }

  create(data) {
    return http.post("/userTask", data);
  }

  update(id_user, id_task, data) {
    return http.put(`/userTask/${id_user}/${id_task}`, data);
  }

  delete(id_user, id_task) {
    return http.delete(`/userTask/${id_user}/${id_task}`);
  }

}

export default new UserTaskDataService();