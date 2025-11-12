import { ChangeEvent, FormEvent } from "react";

export default function NewTransaction({
  submitForm,
  nominalChange,
  transaction,
  nominalType,
  cancelBtn,
  detailChange,
  detail,
  dateTransaction,
  dateChange,
}: {
  submitForm: (e: FormEvent<HTMLFormElement>) => void;
  nominalChange: (e: ChangeEvent<HTMLInputElement>) => void;
  transaction: string;
  nominalType: (e: ChangeEvent<HTMLSelectElement>) => void;
  detail: string;
  detailChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  dateTransaction: string;
  cancelBtn: () => void;
  dateChange: (e: ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="w-[26rem] p-6 rounded-2xl bg-[#0d1220] border border-blue-800 shadow-lg shadow-blue-900/40 backdrop-blur-md text-white">
      <h1 className="text-2xl font-bold text-center mb-4 text-blue-400">
        Tambah Transaksi
      </h1>

      <form
        onSubmit={submitForm}
        className="flex flex-col gap-4 text-blue-300"
        method="POST"
      >
        <div className="flex flex-col gap-1">
          <label htmlFor="nominal" className="text-sm font-medium text-blue-400">
            Nominal Transaksi
          </label>
          <input
            type="number"
            id="nominal"
            className="w-full p-2 rounded-lg bg-[#1c2436] border border-blue-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/40 text-blue-100 outline-none transition-all"
            onChange={nominalChange}
            value={transaction}
            min={0}
            placeholder="Masukkan nominal transaksi"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="jenis" className="text-sm font-medium text-blue-400">
            Jenis Transaksi
          </label>
          <select
            name="jenis"
            id="jenis"
            className="w-full p-2 rounded-lg bg-[#1c2436] border border-blue-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/40 text-blue-100 outline-none transition-all"
            onChange={nominalType}
          >
            <option value="">Pilih jenis transaksi...</option>
            <option value="pemasukkan">Pemasukkan</option>
            <option value="pengeluaran">Pengeluaran</option>
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="detail" className="text-sm font-medium text-blue-400">
            Detail Transaksi
          </label>
          <textarea
            id="detail"
            className="w-full h-24 p-2 rounded-lg bg-[#1c2436] border border-blue-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/40 text-blue-100 outline-none transition-all resize-none"
            onChange={detailChange}
            value={detail}
            placeholder="Tulis detail transaksi..."
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="tanggal" className="text-sm font-medium text-blue-400">
            Tanggal Transaksi
          </label>
          <input
            type="date"
            id="tanggal"
            className="w-full p-2 rounded-lg bg-[#1c2436] border border-blue-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/40 text-blue-100 outline-none transition-all"
            onChange={dateChange}
            value={dateTransaction}
          />
        </div>

        <div className="flex gap-3 mt-4 justify-center">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all shadow-md shadow-blue-800/30"
          >
            Tambahkan
          </button>
          <button
            type="button"
            onClick={cancelBtn}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg transition-all shadow-md shadow-red-800/30"
          >
            Batalkan
          </button>
        </div>
      </form>
    </div>
  );
}
