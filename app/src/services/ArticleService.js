/* eslint-disable import/no-anonymous-default-export */
import http from "../http-common";

const getAll = () => {
  return http.get("/articles");
};

const get = id => {
  return http.get(`/articles/${id}`);
};

const create = data => {
  return http.post("/articles", data);
};

const update = (id, data) => {
  return http.put(`/articles/${id}`, data);
};

const remove = id => {
  return http.delete(`/articles/${id}`);
};

const removeAll = () => {
  return http.delete(`/articles`);
};

const findByTitle = title => {
  return http.get(`/articles?title=${title}`);
};

const findByStatus = () => {
  return http.get("/articles/unread");
};

export default {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByTitle,
  findByStatus
};