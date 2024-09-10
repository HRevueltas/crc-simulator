import { CrcSimulador } from './components/CrcSimulador'
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
export const Simulador = () => {
  return (
    <>
    <CrcSimulador />   
    <ToastContainer limit={3}/>
    </>
  )
}
