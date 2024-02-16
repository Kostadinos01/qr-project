import { useContext } from 'react';
import { QRContext } from '../context/QRContext';

export const useAuth = () => useContext(QRContext);