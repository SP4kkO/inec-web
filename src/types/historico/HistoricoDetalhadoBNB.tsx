// 'use client';

// import dayjs, { Dayjs } from "dayjs";
// import useStore from "context/zustand/store";

// interface HistoricoDetalhadoBNB {

//   id?: number;
//   matricula: number;
//   matriculaBnb: string;
//   nome: string;
//   codCargo: string;
//   unidade: string;
//   codSituacao: string;
//   dataInicioFuncao: string;
//   dataFimFuncao: string;
//   status: string;
//   cpfAssessor: string;
//   mensagemRetornoBanco: string;
// }

//     static getID(): Promise<HistoricoDetalhadoBNB[]>{
//         return fetch(
//             `${process.env.NEXT_BACKEND_URL}/recuperarUltimoHistoricoBnb`,
//         ).then((res)=>{
//             if(!res.ok){
//                 throw new Error("Failed to fetch data")
//             }
//             if(res.body){
//                 return res.json();
//             }else{
//                 return [];
//             }
//         }).then((data.length === 0)){
//             return
//         }
//     }
