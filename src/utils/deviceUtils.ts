// 检测移动设备
export const isMobileDevice = (): boolean => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
         (window.innerWidth <= 768);
};

// 检测是否支持现代打印API
export const supportsPrintToPDF = (): boolean => {
  return 'showSaveFilePicker' in window;
};

// 生成PDF文件名
export const generatePDFFilename = (): string => {
  const now = new Date();
  const dateStr = now.toISOString().split('T')[0]; // YYYY-MM-DD
  const timeStr = now.toTimeString().split(' ')[0].replace(/:/g, '-'); // HH-MM-SS
  return `austin-math-${dateStr}-${timeStr}.pdf`;
};

// 打印或保存PDF
export const printOrSavePDF = async (): Promise<void> => {
  const isMobile = isMobileDevice();
  
  if (isMobile) {
    // 移动端：引导用户保存为PDF
    // 大多数移动浏览器在打印时会自动提供"保存为PDF"选项
    try {
      // 在移动端，添加一个CSS类来优化移动端PDF布局
      document.body.classList.add('mobile-pdf-mode');
      
      // 使用打印API，移动端浏览器通常会提供保存为PDF的选项
      window.print();
      
      // 移除CSS类
      setTimeout(() => {
        document.body.classList.remove('mobile-pdf-mode');
      }, 1000);
      
    } catch (error) {
      console.error('PDF save failed:', error);
      // 降级到普通打印
      window.print();
    }
  } else {
    // PC端：普通打印
    window.print();
  }
};