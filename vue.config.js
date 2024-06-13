module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
        // Permitir el paso de cookies con credenciales
        onProxyReq: (proxyReq, req, res) => {
          proxyReq.setHeader('Cookie', req.headers.cookie);
        }
      }
    }
  }
}
