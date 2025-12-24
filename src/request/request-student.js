import { request } from "./request.js";

const BASEURL = "http://192.168.0.102:3000/mahasiswa";

export const getMahasiswa = async () =>
  await request({ url: `${BASEURL}/`, method: "get" });

export const createMahasiswa = async ({ columns, data }) => {
  return await request({
    url: `${BASEURL}/store`,
    data: {
      columns: columns,
      data: data,
    },
    method: "post",
  });
};

export const updateMahasiswa = async ({ id, columns, data }) => {
  return await request({
    url: `${BASEURL}/update`,
    params: { id: id },
    data: {
      columns: columns,
      data: data,
    },
    method: "put",
  });
};

export const destroyMahasiswa = async (id) => {
  return await request({
    url: `${BASEURL}/destroy`,
    params: { id: id },
    method: "delete",
  });
};
