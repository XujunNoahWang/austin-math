import { useState, useEffect } from 'react';
import { isMobileDevice, printOrSavePDF } from '../utils/deviceUtils';

export const usePrintOrSave = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // 检测设备类型
    setIsMobile(isMobileDevice());
    
    // 监听窗口大小变化
    const handleResize = () => {
      setIsMobile(isMobileDevice());
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handlePrintOrSave = async () => {
    await printOrSavePDF();
  };

  return {
    isMobile,
    handlePrintOrSave
  };
};