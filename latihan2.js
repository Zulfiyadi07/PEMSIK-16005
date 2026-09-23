//Array
const nilai = [90, 99, 100];
//destructuring array
const nilai2 = nilai[1];
console.log(`Nilai ke 2 dari array: ${nilai2}`);
//spread array
const nilai_new = [98];
const array_nilai_tambah = [...nilai_new,...nilai];
const tambah_dibelakang = [...nilai,...nilai_new];
console.log(`tambah belakang ${tambah_dibelakang.join(', ')}`);
console.log(`kumpulan array nilai baru: ${array_nilai_tambah.join(', ')}`);
//Object
const mhs = {
    nama: "Prabowo",
    umur: 72, 
    nilai: [90, 99, 100],    
}; 
//destructuring object
const nama_kuuu = mhs.nama; //ambil value dari key nama. dari object mhs
const { nama: namaku, umur: umurku, nilai: nilaiku } = mhs; //langsung buat banyak dari banyak key

console.log(`Nama: ${namaku}, umur: ${umurku}, nilai: ${nilaiku}`);
//spread object
const nimku = { nim: "A11.2024.00001" };
const new_mhs = { ...mhs, ...nimku }; //gabungkan object mhs dan nimku
//array of object = kumpulan object dalam array
const list_mhs = [
    {
        nama: "Prabowo",
        umur: 72,
        nilai: [90, 99, 100],
    },
    {
        nama: "Jokowi",
        umur: 68,
        nilai: [80, 90, 100],
    },
];

//destructuring array of object
const mhs_kedua = list_mhs[1].nama; //ambil object ke 2 dari array list_mhs

console.log(mhs_kedua);

//spread, tambah object baru ke array of object
const mhs_baru = {
    nama: "Ganjar",
    umur: 55,
    nilai: [70, 80, 90],
};
const list_mhs_baru = [...list_mhs, mhs_baru];