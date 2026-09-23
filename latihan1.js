console.log("Jokowi Okee");
const nama = "Prabowo";
const nim = "A11.2024.00001";
const umur = 72;
const nilai = [90, 99, 100];

console.log("Nama: " + nama + ", NIM: " + nim + ", Umur: " + umur + ", Nilai: " + nilai.join(", "));
// literal output es6
console.log(`Nama: ${nama}, NIM: ${nim}, Umur: ${umur}, Nilai: ${nilai.join(", ")}`);

const data_diri = (nama, nim) => `Nama: ${nama}, NIM: ${nim}, umur: ${umur}, Nilai: ${nilai.join(", ")}`;
console.log(data_diri(nama, nim));

function penjumlahan1(bil1, bil2) {
    return bil1 + bil2;
}
const penjumlahan2 = (bil1, bil2) => bil1 + bil2;
console.log(penjumlahan1(20, 3));
console.log(penjumlahan2(20, 3));