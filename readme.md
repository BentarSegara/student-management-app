# 📚 Sistem Manajemen Mahasiswa

Aplikasi mobile untuk mengelola data mahasiswa yang dibangun dengan **React Native** dan **Expo**. Aplikasi ini menyediakan fitur CRUD (Create, Read, Update, Delete) lengkap untuk manajemen data mahasiswa dengan antarmuka yang modern dan responsif.

<p>
<img src="https://img.shields.io/badge/React_Native-0.81.5-61DAFB?logo=react" alt="React Native">
<img src="https://img.shields.io/badge/Expo-54.0.29-000020?logo=expo" alt="Expo">
<img src="https://img.shields.io/badge/License-Private-red?logo=license-private" alt="License">
</p>

---

## 📋 Daftar Isi

- [Fitur](#-fitur)
- [Tech Stack](#-tech-stack)
- [Struktur Proyek](#-struktur-proyek)
- [Prasyarat](#-prasyarat)
- [Instalasi](#-instalasi)
- [Menjalankan Aplikasi](#-menjalankan-aplikasi)
- [Konfigurasi API](#-konfigurasi-api)
- [Dokumentasi Komponen](#-dokumentasi-komponen)
- [Layar Aplikasi](#-layar-aplikasi)
- [API Endpoints](#-api-endpoints)

---

## ✨ Fitur

- **Dashboard Interaktif**: Menampilkan statistik total mahasiswa dan program studi
- **Pencarian Real-time**: Mencari mahasiswa berdasarkan nama dengan filter instan
- **Tambah Mahasiswa**: Form lengkap untuk menambahkan data mahasiswa baru
- **Edit Mahasiswa**: Memperbarui informasi mahasiswa yang sudah ada
- **Hapus Mahasiswa**: Menghapus data mahasiswa dengan konfirmasi
- **Splash Screen**: Tampilan pembuka aplikasi yang menarik
- **Loading Indicator**: Indikator loading saat proses data berlangsung
- **Validasi Form**: Validasi input untuk memastikan data yang dimasukkan lengkap

---

## 🛠 Tech Stack

### Frontend (Mobile App)

| Teknologi           | Versi   | Deskripsi                                           |
| ------------------- | ------- | --------------------------------------------------- |
| React Native        | 0.81.5  | Framework utama untuk pengembangan mobile           |
| Expo                | 54.0.23 | Platform untuk mempermudah development React Native |
| React               | 19.1.0  | Library JavaScript untuk membangun UI               |
| React Navigation    | 7.x     | Navigasi antar layar aplikasi                       |
| Axios               | 1.13.2  | HTTP client untuk komunikasi dengan API             |
| Lucide React Native | 0.554.0 | Library ikon modern                                 |
| React Native Picker | 2.11.4  | Komponen dropdown picker                            |

### Backend Requirements

Aplikasi ini memerlukan backend server yang berjalan pada endpoint:

- Base URL: `http://192.168.0.102:3000`

---

## 📁 Struktur Proyek

```
student-management-app/
├── App.js                      # Entry point aplikasi & konfigurasi navigator
├── index.js                    # Registrasi aplikasi React Native
├── app.json                    # Konfigurasi Expo
├── package.json                # Dependensi proyek
├── readme.md                   # Dokumentasi proyek
│
├── assets/                     # Aset statis (icon, splash, dll)
│   ├── icon.png
│   ├── splash-icon.png
│   ├── adaptive-icon.png
│   └── favicon.png
│
├── src/                        # Source code utama
│   ├── components/             # Komponen reusable
│   │   ├── loading.js          # Komponen loading indicator
│   │   ├── studentList.js      # Komponen daftar mahasiswa (FlatList)
│   │   └── studentRow.js       # Komponen baris mahasiswa individual
│   │
│   ├── screens/                # Layar-layar aplikasi
│   │   ├── splashscreen.js     # Layar pembuka
│   │   ├── home.js             # Layar utama (dashboard)
│   │   ├── create.js           # Layar tambah mahasiswa
│   │   └── update.js           # Layar edit mahasiswa
│   │
│   └── request/                # Modul HTTP request
│       ├── request.js          # Wrapper Axios universal
│       └── request-student.js  # API calls spesifik mahasiswa
│
└── android/                    # Konfigurasi native Android
```

---

## 📌 Prasyarat

Sebelum menjalankan aplikasi, pastikan Anda memiliki:

1. **Node.js** versi 18.x atau lebih baru
2. **npm** atau **yarn** package manager
3. **Expo CLI** (opsional, bisa menggunakan npx)
4. **Android Studio** (untuk emulator Android) atau perangkat fisik
5. **Expo Go** app di perangkat mobile (untuk development)
6. **Backend Server** yang berjalan di `http://192.168.0.102:3000`

---

## 🚀 Instalasi

### 1. Clone Repository

```bash
git clone <repository-url>
cd student-management-app
```

### 2. Install Dependensi

```bash
npm install
```

### 3. Verifikasi Instalasi

```bash
npx expo doctor
```

---

## ▶ Menjalankan Aplikasi

### Development Mode

```bash
# Menjalankan dengan Expo
npm start
# atau
npx expo start

# Menjalankan di Android
npm run android
# atau
npx expo run:android

# Menjalankan di iOS (Mac only)
npm run ios

# Menjalankan di Web
npm run web
```

### Menggunakan Expo Go

1. Jalankan `npm start`
2. Scan QR code yang muncul dengan aplikasi Expo Go
3. Aplikasi akan terbuka di perangkat Anda

---

## ⚙ Konfigurasi API

Aplikasi ini terhubung ke backend server untuk operasi CRUD. Untuk mengkonfigurasi endpoint API:

### Mengubah Base URL

Lokasi file: `src/request/request-student.js`

```javascript
const BASEURL = "http://192.168.0.102:3000/mahasiswa";
```

**Catatan:** Ganti `192.168.0.102` dengan alamat IP server backend Anda.

### API Endpoints yang Digunakan

| Method | Endpoint                     | Deskripsi                      |
| ------ | ---------------------------- | ------------------------------ |
| GET    | `/mahasiswa/`                | Mengambil semua data mahasiswa |
| POST   | `/mahasiswa/store`           | Menambah mahasiswa baru        |
| PUT    | `/mahasiswa/update?id={id}`  | Memperbarui data mahasiswa     |
| DELETE | `/mahasiswa/destroy?id={id}` | Menghapus data mahasiswa       |

---

## 📦 Dokumentasi Komponen

### 1. Loading Component

**Lokasi:** `src/components/loading.js`

Komponen modal untuk menampilkan loading indicator saat proses data sedang berlangsung.

```javascript
<Loading visible={true} loadingMsg="Memuat Data..." />
```

**Props:**
| Prop | Tipe | Deskripsi |
|------|------|-----------|
| `visible` | Boolean | Menampilkan/menyembunyikan modal |
| `loadingMsg` | String | Pesan yang ditampilkan saat loading |

---

### 2. StudentList Component

**Lokasi:** `src/components/studentList.js`

Komponen FlatList untuk menampilkan daftar mahasiswa dengan performa optimal.

```javascript
<StudentList
  keyExtractor={(item) => item.id.toString()}
  data={students}
  onUpdate={handleUpdate}
  onDelete={handleDelete}
/>
```

**Props:**
| Prop | Tipe | Deskripsi |
|------|------|-----------|
| `keyExtractor` | Function | Fungsi untuk mengekstrak key unik |
| `data` | Array | Array data mahasiswa |
| `onUpdate` | Function | Callback saat tombol edit ditekan |
| `onDelete` | Function | Callback saat tombol hapus ditekan |

---

### 3. StudentRow Component

**Lokasi:** `src/components/studentRow.js`

Komponen untuk menampilkan satu baris data mahasiswa dengan tombol aksi.

```javascript
<Student
  student={studentData}
  onUpdate={handleUpdate}
  onDelete={handleDelete}
/>
```

**Props:**
| Prop | Tipe | Deskripsi |
|------|------|-----------|
| `student` | Object | Objek data mahasiswa |
| `onUpdate` | Function | Callback untuk update |
| `onDelete` | Function | Callback untuk delete |

**Struktur Object Student:**

```javascript
{
  id: Number,
  npm: String,
  nama: String,
  program_studi: String
}
```

---

## 📱 Layar Aplikasi

### 1. Splash Screen

**File:** `src/screens/splashscreen.js`

- Layar pembuka yang ditampilkan selama 1 detik
- Menampilkan judul aplikasi
- Otomatis navigasi ke Home screen

---

### 2. Home Screen (Dashboard)

**File:** `src/screens/home.js`

Layar utama aplikasi dengan fitur:

- **Header**: Judul aplikasi dengan desain menarik
- **Info Cards**: Menampilkan total mahasiswa dan jumlah program studi
- **Search Bar**: Pencarian mahasiswa berdasarkan nama
- **Add Button**: Tombol untuk menambah mahasiswa baru
- **Student Table**: Tabel daftar mahasiswa dengan aksi edit & hapus

---

### 3. Create Screen

**File:** `src/screens/create.js`

Form untuk menambahkan mahasiswa baru dengan field:

- **Nama Lengkap**: Input text untuk nama mahasiswa
- **NPM**: Input text untuk Nomor Pokok Mahasiswa
- **Program Studi**: Dropdown picker dengan pilihan:
  - Informatika
  - Sistem Informasi
  - Bisnis Digital
  - Sains Data

**Validasi:**

- Semua field wajib diisi
- NPM harus unik untuk setiap mahasiswa

---

### 4. Update Screen

**File:** `src/screens/update.js`

Form untuk memperbarui data mahasiswa yang sudah ada:

- Data mahasiswa yang dipilih akan otomatis terisi di form
- Semua field dapat diedit
- Validasi sama seperti form Create

---

## 🔧 Request Module

### Universal Request Wrapper

**File:** `src/request/request.js`

Wrapper untuk Axios yang menstandarisasi response:

```javascript
import { request } from './request';

const response = await request({
  url: 'http://api.example.com/endpoint',
  method: 'get',
  headers: { /* custom headers */ },
  params: { /* query params */ },
  data: { /* body data */ }
});

// Response structure
{
  data: Object | null,      // Response data
  statusCode: Number,       // HTTP status code
  error: String | null      // Error message if any
}
```

---

### Student API Functions

**File:** `src/request/request-student.js`

| Function                                 | Deskripsi                      |
| ---------------------------------------- | ------------------------------ |
| `getMahasiswa()`                         | Mengambil semua data mahasiswa |
| `createMahasiswa({ columns, data })`     | Membuat mahasiswa baru         |
| `updateMahasiswa({ id, columns, data })` | Memperbarui data mahasiswa     |
| `destroyMahasiswa(id)`                   | Menghapus data mahasiswa       |

---

## 🎨 Tema & Warna

Aplikasi menggunakan palet warna yang konsisten:

| Warna       | Hex Code  | Penggunaan                       |
| ----------- | --------- | -------------------------------- |
| Slate 700   | `#334155` | Header background                |
| Slate 100   | `#F1F5F9` | Background utama                 |
| Slate 50    | `#F8FAFC` | Card background                  |
| Teal 500    | `#14B8A6` | Aksen & tombol utama             |
| Emerald 500 | `#10B981` | Tombol tambah & indikator sukses |
| Rose 500    | `#F43F5E` | Tombol hapus                     |
| Slate 400   | `#94A3B8` | Placeholder text                 |

---

## 🗂 Navigasi

Aplikasi menggunakan **React Navigation Native Stack** dengan struktur:

```
NavigationContainer
└── Stack.Navigator (initialRouteName: "SplashScreen")
    ├── SplashScreen
    ├── Home
    ├── Create
    └── Update
```

**Konfigurasi:**

- Header tersembunyi (`headerShown: false`)
- Transisi default native stack

---

## 📝 Catatan Pengembangan

### Menambah Program Studi Baru

Edit array `prodis` di file `src/screens/create.js` dan `src/screens/update.js`:

```javascript
const prodis = [
  { label: "Pilih Program Prodi", value: "" },
  { label: "Informatika", value: "Informatika" },
  { label: "Sistem Informasi", value: "Sistem Informasi" },
  // Tambahkan prodi baru di sini
  { label: "Prodi Baru", value: "Prodi Baru" },
];
```

### Testing API

Gunakan modul `nodejs-app/test.js` untuk testing koneksi API:

```bash
cd nodejs-app
npm install
node test.js
```

---

## 🤝 Kontribusi

1. Fork repository ini
2. Buat branch fitur baru (`git checkout -b feature/AmazingFeature`)
3. Commit perubahan (`git commit -m 'Add some AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Buat Pull Request

---

## 📄 Lisensi

Proyek ini bersifat **Private** dan tidak untuk distribusi publik.

---

## 📞 Kontak

Jika Anda memiliki pertanyaan atau saran, silakan buat Issue di repository ini.

