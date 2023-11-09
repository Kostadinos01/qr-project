import { useContext } from 'react';

import { QRContext } from '../context/QRContext';

export const useQR = () => useContext(QRContext);