import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ConfigProvider } from 'antd'
import App from './App.tsx'
import './styles/global.css' // Import Tailwind and global styles

// Premium Restaurant Theme matches the Noto Sans/Noto Serif & f26c0d palette
const theme = {
  token: {
    colorPrimary: '#f26c0d', // primary orange
    colorTextBase: '#0f172a', // slate-900
    fontFamily: '"Noto Sans", sans-serif',
    borderRadius: 4,
  },
  components: {
    Button: {
      colorPrimary: '#f26c0d',
      colorPrimaryHover: '#e55a00',
      colorPrimaryActive: '#cc5000',
    }
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ConfigProvider theme={theme}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ConfigProvider>
  </StrictMode>,
)
