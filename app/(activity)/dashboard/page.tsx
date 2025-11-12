"use client";
import Navbar from "@/app/component/navigation/navbar";
import NewTransaction from "@/app/component/newTransaction";
import TableTransaction from "@/app/component/tableData";
import { setDateTransaction, setDetailTransaction, setNominalTransaction, setNominalType } from "@/app/features/newTransactionSlice";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

interface Transaction {
  total_pemasukkan:string | number,
  total_pengeluaran:string | number,
  rata_rata_pemasukkan:string,
  rata_rata_pengeluaran:string,
  transaksi:[
    {
    nominal_transaction: number;
    transaction_id: string;
    jenis: string;
    transaction_date: string;
    detail_transaction: string;
    }
  ]
}

export default function Page() {
  const detailTransaction = useAppSelector((state) => state.transaction.detailTransaction);
  const nominalType = useAppSelector((state) => state.transaction.nominalType);
  const nominalTransaction = useAppSelector((state) => state.transaction.nominalTransaction);
  const dateTransaction = useAppSelector((state) => state.transaction.dateTransaction);
  const [transaction, setTransaction] = useState<Transaction | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [open, setOpen] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const router = useRouter()

  const formattedMoney = (digit : any)=>{
    return new Intl.NumberFormat("id-ID").format(digit)
  }

  useEffect(()=>{
    const checkAuth = async()=>{
      try{
        const res = await fetch('http://localhost:3001/api/check-auth',{
          method:"GET",
          credentials:"include"

        })
          console.log("Check auth status:", res.status)
        if(!res.ok){
          console.log("redirect...")
          router.push("/login")
        }
      }catch(e){
        router.push('/login')
      }
    }

    checkAuth()
  },[])


  const deleteTransaction = async(item : string)=>{
    try{
      const response = await fetch(`http://localhost:3000/transaction/${item}`,{
        method:"DELETE",
        credentials:"include"
      })

      if(!response.ok) console.log("Failed to delete data!")
      
      window.location.reload()
      }catch(e){
      console.error(e)
    }
  }


  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3000/transaction", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      const data = await response.json();
      setTransaction(data.data);
      setLoading(false);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  const addData = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/transaction", {
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
      await response.json();
      dispatch(setNominalType("..."));
      dispatch(setDateTransaction(""));
      dispatch(setDetailTransaction(""));
      dispatch(setNominalTransaction(""));
      setOpen(false);
      window.location.reload();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className={`p-6 w-full min-h-screen bg-[#0d1117] mt-20 text-white ${open ? "bg-black/10" : ""}`}>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-6">
        {[
          { title: "Total Aset", value: formattedMoney(Number(transaction?.total_pemasukkan) - Number(transaction?.total_pengeluaran)) },
          { title: "Total Pemasukkan", value: formattedMoney(transaction?.total_pemasukkan)  ?? 0},
          { title: "Total Pengeluaran", value: formattedMoney(transaction?.total_pengeluaran) ?? 0},
          { title: "Rata-rata Pemasukkan", value: formattedMoney(transaction?.rata_rata_pemasukkan) ?? 0 },
          { title: "Rata-rata Pengeluaran", value: formattedMoney(transaction?.rata_rata_pengeluaran) ?? 0},
        ].map((stat, i) => (
          <div
            key={i}
            className="bg-[#161b22] p-4 
            rounded-xl border border-blue-800 
            hover:border-blue-400 transition-all 
            shadow-md hover:shadow-blue-500/10"
          >
            <p className="text-sm text-gray-400">{stat.title}</p>
            <p className="text-2xl font-semibold text-blue-400">Rp. {stat.value}</p>
          </div>
        ))}
      </div>

      <div className="flex justify-end mb-4">
        <button
          onClick={() => setOpen(!open)}
          className="bg-blue-500 hover:bg-blue-600 active:scale-95 transition-transform text-white px-5 py-2 rounded-lg font-semibold shadow-md hover:shadow-blue-500/20"
        >
          + Buat Transaksi
        </button>
      </div>

      {open && (
        <div className="absolute inset-0 bg-black/70 flex justify-center items-center z-20">
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

      <div className="bg-[#161b22] p-4 h-96 rounded-xl border border-blue-800 shadow-lg">
        <TableTransaction>
          {loading
            ? Array.from({ length: 5 }).map((_, i) => (
                <tr key={i} className="animate-pulse border-b border-blue-900/20">
                  {[...Array(5)].map((__, j) => (
                    <td key={j} className="px-6 py-4">
                      <div className="h-4 w-24 bg-gray-700 rounded"></div>
                    </td>
                  ))}
                </tr>
              ))
            : (transaction?.transaksi ?? []).length > 0
            ? transaction?.transaksi.map((item, index) => (
                <tr
                  key={item.transaction_id}
                  className="hover:bg-blue-950/40 transition-all border-b border-blue-900/20"
                >
                  <td className="px-6 py-4">{index + 1}</td>
                  <td
                    className={`px-6 py-4 ${
                      item.jenis === "pemasukkan" ? "text-green-400" : "text-red-400"
                    } font-semibold`}
                  >
                    Rp. {item.jenis === "pemasukkan" ? "+" : "-"}{formattedMoney(item.nominal_transaction)}
                  </td>
                  <td className="px-6 py-4 capitalize">{item.jenis}</td>
                  <td className="px-6 py-4">{item.transaction_date}</td>
                  <td className="px-6 py-4">{item.detail_transaction}</td>
                  <td className="px-6 py-4"><button 
                  className="
                  px-4 py-2 bg-red-500 
                  hover:bg-red-600 
                  text-white font-semibold rounded-lg transition-all shadow-md 
                  shadow-red-800/30"
                  onClick={()=>deleteTransaction(item.transaction_id)}>Delete</button></td>
                </tr>
              ))
            : (
              <tr>
                <td colSpan={5} className="text-center bg-[#0f1629] text-gray-400 py-6">
                  Tidak ada data transaksi.
                </td>
              </tr>
            )}
        </TableTransaction>
      </div>
    </div>
  );
}
