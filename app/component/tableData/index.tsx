import { ReactNode } from "react";

export default function TableTransaction({ children }: { children: ReactNode }) {
  return (
    <div className="relative overflow-x-auto rounded-xl border border-blue-800 shadow-md shadow-blue-900/20">
      <table className="w-full text-sm text-left text-blue-100">
        <thead className="bg-[#10182b] text-blue-300 uppercase tracking-wide text-xs border-b border-blue-700">
          <tr>
            <th scope="col" className="px-6 py-3 font-semibold">No</th>
            <th scope="col" className="px-6 py-3 font-semibold">Nominal Transaksi</th>
            <th scope="col" className="px-6 py-3 font-semibold">Jenis Transaksi</th>
            <th scope="col" className="px-6 py-3 font-semibold">Tanggal Transaksi</th>
            <th scope="col" className="px-6 py-3 font-semibold">Detail Transaksi</th>
            <th scope="col" className="px-6 py-3 font-semibold">Aksi</th>
          </tr>
        </thead>

        <tbody className="bg-[#0f1629] divide-y divide-blue-900/30">
          {children}
        </tbody>
      </table>
    </div>
  );
}
