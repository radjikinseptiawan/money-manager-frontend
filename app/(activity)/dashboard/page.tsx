"use client";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import {
  setDateTransaction,
  setDetailTransaction,
  setNominalTransaction,
  setNominalType,
} from "@/app/features/newTransactionSlice";
import NewTransaction from "@/app/component/newTransaction";
import TableTransaction from "@/app/component/tableData";
import { FormEvent, useEffect, useState } from "react";
import { CartesianGrid, Legend, Line, Tooltip, XAxis, YAxis, LineChart } from "recharts";

interface TransactionItem {
  nominal_transaction: number;
  transaction_id: string;
  jenis: string;
  transaction_date: string;
  detail_transaction: string;
}

interface Transaction {
  total_pemasukkan: number | string;
  total_pengeluaran: number | string;
  rata_rata_pemasukkan: any; 
  rata_rata_pengeluaran: any;
  pemasukkan_tertinggi: number | string;
  pemasukkan_terendah: number | string;
  pengeluaran_tertinggi:number|string;
  pengeluaran_terendah:number|string;
  transaksi: TransactionItem[] | null;
}

export default function Page() {
  const dispatch = useAppDispatch();
  const nominalType = useAppSelector((s) => s.transaction.nominalType);
  const nominalTransaction = useAppSelector((s) => s.transaction.nominalTransaction);
  const detailTransaction = useAppSelector((s) => s.transaction.detailTransaction);
  const dateTransaction = useAppSelector((s) => s.transaction.dateTransaction);

  const [transaction, setTransaction] = useState<Transaction | null>(null);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  const formattedMoney = (n: any) => new Intl.NumberFormat("id-ID").format(n ?? 0);

  async function fetchData() {
    try {
      setLoading(true);
      const res = await fetch(`https://api.zeverial.online/transaction`, {
        credentials: "include",
      });
      if (!res.ok) throw new Error("Fetch failed");
      const data = await res.json();
      setTransaction(data.data ?? null);
    } catch (e) {
      console.error("fetchData error:", e);
      setTransaction(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  async function addData(e: FormEvent) {
    e.preventDefault();
    try {
      const res = await fetch(`https://api.zeverial.online/transaction`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          nominal_transaction: nominalTransaction,
          transaction_date: dateTransaction,
          jenis: nominalType,
          detail_transaction: detailTransaction,
        }),
      });

      if (res.ok) {
        await fetchData();
        setOpen(false);
        dispatch(setNominalTransaction(""));
        dispatch(setNominalType("..."));
        dispatch(setDateTransaction(""));
        dispatch(setDetailTransaction(""));
      } else {
        console.error("Add transaction failed");
      }
    } catch (e) {
      console.error(e);
    }
  }

  async function deleteTransaction(id: string) {
    try {
      const res = await fetch(`https://api.zeverial.online/transaction/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (res.ok) {
        setTransaction((prev) =>
          prev
            ? { ...prev, transaksi: prev.transaksi?.filter((t) => t.transaction_id !== id) ?? null }
            : prev
        );
        window.location.reload();
      } else {
        console.error("Delete failed");
      }
    } catch (e) {
      console.error(e);
    }
  }

  const transactionsArray: TransactionItem[] = Array.isArray(transaction?.transaksi)
    ? transaction!.transaksi!
    : [];

  const monthData = ['Januari','Febuari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember']

  // transactionsArray.sort((a,b)=>new Date(b.transaction_date).getTime() - new Date(a.transaction_date).getTime())
  const chartData = transactionsArray.length
    ? transactionsArray.slice(0, 12).map((t, i) => ({
        date:monthData[new Date(t.transaction_date).getMonth()],
        pemasukkan: t.jenis === "pemasukkan" ? t.nominal_transaction : 0,
        pengeluaran: t.jenis === "pengeluaran" ? t.nominal_transaction : 0,
      }))
    : [
        { date: "Januari", pemasukkan: 0, pengeluaran: 0 },
        { date: "Febuari", pemasukkan: 0, pengeluaran: 0 },
      ];
    
  return (
    <div className={`p-6 w-full min-h-screen bg-[#0d1117] mt-20 text-white`}>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-6">
        {[
          {
            title: "Total Aset",
            value:
              Number(transaction?.total_pemasukkan || 0) -
              Number(transaction?.total_pengeluaran || 0),
          },
          { title: "Total Pemasukkan", value: transaction?.total_pemasukkan ?? 0 },
          { title: "Total Pengeluaran", value: transaction?.total_pengeluaran ?? 0 },
          { title: "Rata-rata Pemasukkan", value: transaction?.rata_rata_pemasukkan ?? 0 },
          { title: "Rata-rata Pengeluaran", value: transaction?.rata_rata_pengeluaran ?? 0 },
        ].map((stat, i) => (
          <div
            key={i}
            className="bg-[#161b22] p-4 rounded-xl border border-blue-800 hover:border-blue-400 transition-all shadow-md hover:shadow-blue-500/10"
          >
            <p className="text-sm text-gray-400">{stat.title}</p>
            <p className="text-2xl font-semibold text-blue-400">Rp. {formattedMoney(stat.value)}</p>
          </div>
        ))}
      </div>

      <h2 className="font-bold mb-2 text-blue-800 text-xl">Statistik Keuangan</h2>
      <div className="bg-[#161b22] rounded-xl flex-col md:flex-row flex justify-center p-4 mb-6 border border-blue-800">
        <LineChart responsive height={300} data={chartData} className=" p-2 w-72 md:w-xl  rounded-md bg-[#252c36]">
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="pemasukkan" stroke="#002ae3" />
          <Line type="monotone" dataKey="pengeluaran" stroke="#e30008" />
        </LineChart>

<div className="grid grid-cols-2 md:grid-cols-2 gap-5 mx-2 my-10 items-center justify-center">
  {[
    { title: "Pemasukkan Tertinggi",jenis:"pemasukkan", value: transaction?.pemasukkan_tertinggi ?? 0},
    { title: "Pengeluaran Tertinggi",jenis:"pengeluaran", value:transaction?.pengeluaran_tertinggi ?? 0},
    { title: "Pemasukkan Terendah",jenis:"pemasukkan", value: transaction?.pemasukkan_terendah ?? 0},
    { title: "Pengeluaran Terendah",jenis:"pengeluaran", value: transaction?.pengeluaran_terendah ?? 0},
  ].map((item, idx) => (
    <div
      key={idx}
      className="bg-[#161b22] p-2 rounded-xl w-30 md:w-52 border border-blue-800 shadow-md hover:shadow-blue-500/10 transition-all"
    >
      <h1 className="text-sm text-gray-400 mb-1">{item.title}</h1>
      <p className={`text-sm md:text-xl font-semibold ${item.jenis === "pemasukkan" ? "text-green-500" : "text-red-500"}`}>Rp.{item.jenis === "pemasukkan"? "+" :"-"} {formattedMoney(item.value)}</p>
    </div>
  ))}
</div>
      </div>

      <div className="flex justify-end mb-4">
        <button
          onClick={() => setOpen(true)}
          className="bg-blue-500 hover:bg-blue-600 active:scale-95 transition-transform text-white px-5 py-2 rounded-lg font-semibold shadow-md hover:shadow-blue-500/20"
        >
          + Buat Transaksi
        </button>
      </div>

      {open && (
        <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-20">
          <NewTransaction
            cancelBtn={() => setOpen(false)}
            submitForm={addData}
            nominalChange={(e) => dispatch(setNominalTransaction(e.target.value))}
            transaction={nominalTransaction}
            nominalType={(e) => dispatch(setNominalType(e.target.value))}
            detail={detailTransaction}
            detailChange={(e) => dispatch(setDetailTransaction(e.target.value))}
            dateTransaction={dateTransaction}
            dateChange={(e) => dispatch(setDateTransaction(e.target.value))}
          />
        </div>
      )}

      <div className="bg-[#161b22] p-4 rounded-xl border border-blue-800 shadow-lg">
        <TableTransaction>
          {loading ? (
            <tr>
              <td colSpan={6} className="text-center text-gray-500 py-6">
                Loading...
              </td>
            </tr>
          ) : transactionsArray.length > 0 ? (
            transactionsArray.map((item, i) => (
              <tr
                key={item.transaction_id}
                className="hover:bg-blue-950/40 transition-all border-b border-blue-900/20"
              >
                <td className="px-6 py-4">{i + 1}</td>
                <td
                  className={`px-6 py-4 font-semibold ${
                    item.jenis === "pemasukkan" ? "text-green-400" : "text-red-400"
                  }`}
                >
                  Rp. {item.jenis === "pemasukkan" ? "+" : "-"}
                  {formattedMoney(item.nominal_transaction)}
                </td>
                <td className="px-6 py-4 capitalize">{item.jenis}</td>
                <td className="px-6 py-4">{item.transaction_date}</td>
                <td className="px-6 py-4">{item.detail_transaction}</td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => deleteTransaction(item.transaction_id)}
                    className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded-lg text-white font-semibold transition-all"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} className="text-center text-gray-500 py-6">
                Tidak ada data transaksi.
              </td>
            </tr>
          )}
        </TableTransaction>
      </div>
    </div>
  );
}
