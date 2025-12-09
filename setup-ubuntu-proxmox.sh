#!/bin/bash

# Script de instalación para Guía Tarkov en Ubuntu 24.04 (Proxmox CT)
# Autor: Sistema de automatización

set -e

echo "============================================="
echo "Instalación de Guía Tarkov en Ubuntu 24.04"
echo "============================================="

# Actualizar sistema
echo "⏳ Actualizando sistema..."
apt-get update && apt-get upgrade -y

# Instalar dependencias del sistema
echo "⏳ Instalando dependencias del sistema..."
apt-get install -y curl wget git build-essential

# Instalar Node.js 20.x (LTS)
echo "⏳ Instalando Node.js 20.x..."
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt-get install -y nodejs

# Verificar instalaciones
echo "✅ Node.js instalado: $(node --version)"
echo "✅ npm instalado: $(npm --version)"

# Instalar pnpm globalmente (si se prefiere sobre npm)
echo "⏳ Instalando pnpm..."
npm install -g pnpm

# Clonar repositorio
echo "⏳ Clonando repositorio..."
cd /opt
git clone https://github.com/vett3x/web-guia-tarkov.git
cd web-guia-tarkov

# Configurar variables de entorno
echo "⏳ Configurando variables de entorno..."
cat > .env.local << 'EOF'
NEXT_PUBLIC_SUPABASE_URL=https://hfjtksfqcmuebxfmbxgq.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhmanRrc2ZxY211ZWJ4Zm1ieGdxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUyODYzNTksImV4cCI6MjA4MDg2MjM1OX0.38pVqlfbWYMjHfgwn_MKk6d6_Sa6SGMkwuYjtNbOmfU
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhmanRrc2ZxY211ZWJ4Zm1ieGdxIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NTI4NjM1OSwiZXhwIjoyMDgwODYyMzU5fQ.Nm_9uf4YAZe0mqATRnt1SNLqO71pPcehJ1mZ6l4zq6o
EOF

# Instalar dependencias del proyecto
echo "⏳ Instalando dependencias del proyecto..."
pnpm install

# Construir aplicación
echo "⏳ Construyendo aplicación..."
pnpm run build

# Crear servicio systemd para mantener la aplicación corriendo
echo "⏳ Configurando servicio systemd..."
cat > /etc/systemd/system/guia-tarkov.service << 'EOF'
[Unit]
Description=Guía Tarkov Web Application
After=network.target

[Service]
Type=simple
User=root
WorkingDirectory=/opt/web-guia-tarkov
Environment=PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
Environment=NODE_ENV=production
ExecStart=/usr/bin/pnpm start
Restart=on-failure
RestartSec=10
StandardOutput=journal
StandardError=journal
SyslogIdentifier=guia-tarkov

[Install]
WantedBy=multi-user.target
EOF

# Recargar systemd y habilitar servicio
systemctl daemon-reload
systemctl enable guia-tarkov.service

# Configurar firewall (si está instalado ufw)
if command -v ufw &> /dev/null; then
    echo "⏳ Configurando firewall..."
    ufw allow 3000/tcp
    ufw reload
fi

# Instalar y configurar Nginx como proxy inverso (opcional)
echo "⏳ Instalando y configurando Nginx..."
apt-get install -y nginx

cat > /etc/nginx/sites-available/guia-tarkov << 'EOF'
server {
    listen 80;
    server_name _;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
    
    # Cache estático
    location /_next/static {
        proxy_cache static_cache;
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
EOF

# Habilitar sitio en Nginx
ln -sf /etc/nginx/sites-available/guia-tarkov /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default

# Configurar caché en Nginx
cat > /etc/nginx/conf.d/cache.conf << 'EOF'
proxy_cache_path /var/cache/nginx levels=1:2 keys_zone=static_cache:10m inactive=60m use_temp_path=off;
proxy_cache_key "$scheme$request_method$host$request_uri";
proxy_cache_valid 200 302 60m;
proxy_cache_valid 404 1m;
EOF

# Probar configuración de Nginx
nginx -t

# Reiniciar servicios
echo "⏳ Reiniciando servicios..."
systemctl restart nginx
systemctl start guia-tarkov.service

echo ""
echo "============================================="
echo "✅ INSTALACIÓN COMPLETADA"
echo "============================================="
echo ""
echo "La aplicación está ahora corriendo en:"
echo "- http://tu-ip:3000 (servidor de desarrollo)"
echo "- http://tu-ip:80 (a través de Nginx)"
echo ""
echo "Comandos útiles:"
echo "  Ver estado: systemctl status guia-tarkov"
echo "  Ver logs:   journalctl -u guia-tarkov -f"
echo "  Reiniciar:  systemctl restart guia-tarkov"
echo "  Detener:    systemctl stop guia-tarkov"
echo ""
echo "============================================="

# Mostrar IPs disponibles
echo "📡 IPs disponibles en el sistema:"
ip -4 addr show | grep -oP '(?<=inet\s)\d+(\.\d+){3}' | grep -v "127.0.0.1"
echo "============================================="