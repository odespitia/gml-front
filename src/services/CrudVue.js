import http from "@/http-common";
import httpAxios from "@/http-common-external";

class CrudVue {

  setAuthorization(token){
    http.defaults.headers.common["Authorization"] = `Bearer ${token}`
  }

  getAll(urls) {
    return http.get(`/${urls}`);
  }

  async getToken(username) {
    return await http.post(`/login`, {'username':username});
  }

  get(urls, id) {
    return http.get(`/${urls}/${id}`);
  }

  create(urls, data, id = false) {
    if(id){
      return http.put(`/${urls}/${id}`, data);
    }
    return http.post(`/${urls}`, data);
  }

  update(urls, id, data) {
    return http.put(`/${urls}/${id}`, data);
  }

  delete(urls, id) {
    return http.delete(`/${urls}/${id}`);
  }

  deleteAll(urls) {
    return http.delete(`/${urls}`);
  }

  findByLabel(urls, dataLabel, dataValue) {
    return http.get(`/${urls}?${dataLabel}=${dataValue}`);
  }

  //Consumir api mediante GET
  GetApi(urls = '') {
    return httpAxios.get(urls);
  }

  //Consumir api mediante POST
  PostApi(urls = '', data) {
    let varData = this.DataApi(data)
    return httpAxios.post(urls, varData);
  }

  // Parametros de envio Api
  DataApi(dataAux) {
    let varData = { User: 'etraining', Password: 'explorandoando2020%' };
    return Object.assign(varData, dataAux);
  }
  
}

export default new CrudVue();