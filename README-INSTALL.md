# Instalación en Proxmox CT con Ubuntu 24.04

## Pasos para ejecutar:

1. **Copiar el script a tu CT de Proxmox:**
   - Copia el archivo `setup-ubuntu-proxmox.sh` al CT
   - O descárgalo directamente:
     ```bash
     curl -O https://raw.githubusercontent.com/vett3x/web-guia-tarkov/main/setup-ubuntu-proxmox.sh
     ```

2. **Dar permisos de ejecución:**
   ```bash
   chmod +x setup-ubuntu-proxmox.sh
   ```

3. **Ejecutar como root:**
   ```bash
   sudo ./setup-ubuntu-proxmox.sh
   ```

## Características del script:

- ✅ Instala Node.js 20.x (LTS)
- ✅ Instala pnpm como gestor de paquetes
- ✅ Clona el repositorio de GitHub
- ✅ Configura variables de entorno automáticamente
- ✅ Construye la aplicación de producción
- ✅ Configura servicio systemd para auto-inicio
- ✅ Configura Nginx como proxy inverso (opcional)
- ✅ Abre puertos necesarios en el firewall

## Solución de problemas:

Si encuentras errores durante la instalación:

1. **Verificar logs del servicio:**
   ```bash
   journalctl -u guia-tarkov -f
   ```

2. **Reiniciar servicios:**
   ```bash
   systemctl restart guia-tarkov
   systemctl restart nginx
   ```

3. **Verificar que la aplicación esté corriendo:**
   ```bash
   curl http://localhost:3000
   ```

## Variables de entorno configuradas:

El script automáticamente configura:
- `NEXT_PUBLIC_SUPABASE_URL`: URL de tu proyecto Supabase
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Clave anónima de Supabase  
- `SUPABASE_SERVICE_ROLE_KEY`: Clave de servicio para operaciones administrativas

## Acceso después de la instalación:

- La aplicación estará disponible en `http://tu-ip:80`
- El servidor de desarrollo estará en `http://tu-ip:3000`
- Puedes ver el estado con: `systemctl status guia-tarkov`

## Actualizar la aplicación:

Para actualizar a la última versión:

```bash
cd /opt/web-guia-tarkov
git pull
pnpm install
pnpm run build
systemctl restart guia-tarkov