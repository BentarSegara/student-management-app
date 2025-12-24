import { request } from "./request.js";

try {
  const id = 13;
  const data = {
    columns: ["npm", "nama", "program_studi"],
    new_data: ["21010013", "Udin", "Sistem Informasi"],
  };
  const response = await request({
    url: "http://192.168.0.102:3000/mahasiswa/detail",
    method: "get",
  });

  const statusCode = response.statusCode;
  console.log(response.data);
  if (statusCode != 200) {
    throw new Error(`Gagal mengambil data, status code: ${statusCode}`);
  }
} catch (err) {
  console.error(err);
}
