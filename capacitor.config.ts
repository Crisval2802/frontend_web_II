import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.crisval.web',
  appName: 'Administrador de Ingresos y Gastos',
  webDir: 'dist/frontend_proyecto',
  server: {
    androidScheme: 'https'
  }
};

export default config;
