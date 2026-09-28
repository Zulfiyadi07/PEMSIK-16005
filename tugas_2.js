const mataKuliahList = {
	mataKuliah: [
		{ kode: "MK001", nama: "Pemograman Sisi Klien", sks: 3 },
	],
};

const mahasiswaList = {
	mahasiswa: [
		{
			nim: "A11.2024.16000",
			nama: "Prapto",
			status: true,
			matkul: [
				{ matkulId: "MK001", tugas: 90, uts: 85, uas: 95 },
			],
		},
		{
			nim: "A11.2024.16001",
			nama: "Budiono",
			status: false,
			matkul: [
				{ matkulId: "MK001", tugas: 70, uts: 75, uas: 80 },
			],
		},
		{
			nim: "A11.2024.16002",
			nama: "Prajoko",
			status: true,
			matkul: [
				{ matkulId: "MK001", tugas: 80, uts: 90, uas: 85 },
			],
		},
	],
};

const cariMataKuliah = (kode) =>
	mataKuliahList.mataKuliah.find((mataKuliah) => mataKuliah.kode === kode);

const show = () => {
	const tabelMahasiswa = [];

	mahasiswaList.mahasiswa.forEach((mhs) => {
		if (mhs.matkul.length === 0) {
			tabelMahasiswa.push({
				NIM: mhs.nim,
				Nama: mhs.nama,
				Status: mhs.status ? "Aktif" : "Tidak Aktif",
				MataKuliah: "Belum ada mata kuliah",
				SKS: "-",
				Tugas: "-",
				UTS: "-",
				UAS: "-",
			});
		}

		mhs.matkul.forEach((mk) => {
			const mataKuliah = cariMataKuliah(mk.matkulId);
			tabelMahasiswa.push({
				NIM: mhs.nim,
				Nama: mhs.nama,
				Status: mhs.status ? "Aktif" : "Tidak Aktif",
				MataKuliah: mataKuliah ? mataKuliah.nama : "Mata kuliah tidak ditemukan",
				SKS: mataKuliah ? mataKuliah.sks : "-",
				Tugas: mk.tugas,
				UTS: mk.uts,
				UAS: mk.uas,
			});
		});
	});

	console.table(tabelMahasiswa);
	return tabelMahasiswa;
};

const add = (mahasiswaBaru) => {
	if (mahasiswaList.mahasiswa.some((mhs) => mhs.nim === mahasiswaBaru.nim)) {
		return "NIM sudah terdaftar";
	}
	mahasiswaList.mahasiswa.push(mahasiswaBaru);
	return mahasiswaBaru;
};

const update = (nim, dataBaru) => {
	mahasiswaList.mahasiswa = mahasiswaList.mahasiswa.map((mhs) =>
		mhs.nim === nim ? { ...mhs, ...dataBaru } : mhs
	);
};

const deleteById = (nim) => {
	mahasiswaList.mahasiswa = mahasiswaList.mahasiswa.filter((mhs) => mhs.nim !== nim);
};

const totalNilai = (nim) => {
	const mhs = mahasiswaList.mahasiswa.find((mahasiswa) => mahasiswa.nim === nim);
	if (!mhs) return "Mahasiswa tidak ditemukan";

	return mhs.matkul.map((mk) => ({
		matkulId: mk.matkulId,
		total: mk.tugas + mk.uts + mk.uas,
	}));
};

const kategoriNilai = (nilai) => {
	if (nilai >= 85) return "A";
	if (nilai >= 75) return "B";
	if (nilai >= 65) return "C";
	if (nilai >= 50) return "D";
	return "E";
};

const IPS = (nim) => {
	const mhs = mahasiswaList.mahasiswa.find((mahasiswa) => mahasiswa.nim === nim);
	if (!mhs) return "Mahasiswa tidak ditemukan";
	if (mhs.matkul.length === 0) return "Belum ada mata kuliah";

	let totalSks = 0;
	let totalNilaiBerbobot = 0;

	mhs.matkul.forEach((mk) => {
		const mataKuliah = cariMataKuliah(mk.matkulId);
		if (!mataKuliah) return;

		const nilaiAkhir = mk.tugas * 0.3 + mk.uts * 0.3 + mk.uas * 0.4;
		totalSks += mataKuliah.sks;
		totalNilaiBerbobot += nilaiAkhir * mataKuliah.sks;
	});

	if (totalSks === 0) return "Data SKS mata kuliah tidak ditemukan";
	return (totalNilaiBerbobot / totalSks).toFixed(2);
};

const jumlahMahasiswa = () => mahasiswaList.mahasiswa.length;

const sortByNIM = () =>
	mahasiswaList.mahasiswa.sort((a, b) => a.nim.localeCompare(b.nim));

const sortByStatus = () =>
	mahasiswaList.mahasiswa.sort((a, b) => Number(b.status) - Number(a.status));

const jumlahAktifTidak = () => ({
	aktif: mahasiswaList.mahasiswa.filter((mhs) => mhs.status).length,
	tidakAktif: mahasiswaList.mahasiswa.filter((mhs) => !mhs.status).length,
});

const clear = () => {
	mahasiswaList.mahasiswa.length = 0;
};

const clearArray = () => {
	mahasiswaList.mahasiswa.length = 0;
};

console.log("Tambah mahasiswa:", add({
	nim: "A11.2024.16003",
	nama: "Andi Setiawan",
	status: true,
	matkul: [{ matkulId: "MK001", tugas: 88, uts: 85, uas: 90 }],
}));

update("A11.2024.16000", { status: false });
console.log("Tabel mahasiswa setelah update:");
show();

const totalNilaiPrapto = totalNilai("A11.2024.16000");
console.table(totalNilaiPrapto.map((hasil) => {
	const mataKuliah = cariMataKuliah(hasil.matkulId);
	return {
		MataKuliah: mataKuliah ? mataKuliah.nama : hasil.matkulId,
		TotalNilai: hasil.total,
	};
}));
console.log(
	"Total nilai keseluruhan Prapto:",
	totalNilaiPrapto.reduce((total, hasil) => total + hasil.total, 0)
);
console.log("Kategori nilai 88:", kategoriNilai(88));
console.log("Kategori nilai 72:", kategoriNilai(72));
console.log(`IPS mahasiswa A11.2024.16000: ${IPS("A11.2024.16000")}`);
console.log(`Jumlah mahasiswa: ${jumlahMahasiswa()}`);

sortByNIM();
console.log("Urut berdasarkan NIM:", mahasiswaList.mahasiswa.map((mhs) => mhs.nim));

sortByStatus();
console.log("Urut berdasarkan status:", mahasiswaList.mahasiswa.map((mhs) => ({
	nama: mhs.nama,
	status: mhs.status ? "Aktif" : "Tidak Aktif",
})));
console.log("Jumlah aktif dan tidak aktif:", jumlahAktifTidak());

deleteById("A11.2024.16001");
console.log("Jumlah setelah deleteById:", jumlahMahasiswa());

clear();
console.log("Jumlah setelah clear:", jumlahMahasiswa());

add({
	nim: "A11.2024.16004",
	nama: "Contoh Clear Array",
	status: true,
	matkul: [],
});
clearArray();
console.log("Jumlah setelah clearArray:", jumlahMahasiswa());