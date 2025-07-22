# Chat Bidireccional - Aurelio AI

Este proyecto implementa un sistema de chat bidireccional en tiempo real con dos interfaces:

## 🎯 Sitios Implementados

### 1. **Sitio del Cliente** (`/`)
- **Archivo principal**: `index.html`
- **Propósito**: Interfaz para que los usuarios envíen mensajes
- **Características**:
  - Chat en tiempo real con Pusher
  - Formulario de envío de mensajes
  - Visualización de conversación en tiempo real
  - Estado de conexión
  - ID de cliente opcional para sesiones dirigidas

### 2. **Panel del Decorador** (`/decorador/`)
- **Archivo principal**: `decorador/index.html`
- **Propósito**: Panel de administración para responder a clientes
- **Características**:
  - Recepción en tiempo real de todos los mensajes
  - Panel de administración con estadísticas
  - Respuestas dirigidas por ID de cliente
  - Gestión de múltiples conversaciones
  - Interfaz de administrador profesional

## 🚀 Despliegue

### Opción 1: Proyecto Único
Desplegar todo el proyecto en una sola instancia de Netlify:
- Cliente accesible en: `https://tudominio.netlify.app/`
- Decorador accesible en: `https://tudominio.netlify.app/decorador/`

### Opción 2: Proyectos Separados
Desplegar cada sitio por separado:

1. **Sitio Cliente**:
   ```bash
   # Subir archivos: index.html, enviar.js, netlify.toml, package.json
   ```

2. **Sitio Decorador**:
   ```bash
   # Subir contenido de la carpeta /decorador/
   # Necesitará su propia función enviar.js en netlify/functions/
   ```

## 🔧 Configuración

### Variables de Entorno (Pusher)
```
PUSHER_APP_ID=2023897
PUSHER_KEY=46e53dfe6f8d93182aaa
PUSHER_SECRET=18cf3757c66e3beb13cd
PUSHER_CLUSTER=us2
```

### Estructura de Carpetas
```
/
├── index.html              # Sitio del cliente
├── enviar.js              # Función Netlify para mensajes
├── netlify.toml           # Configuración principal
├── package.json           # Dependencias
└── decorador/
    ├── index.html         # Panel del decorador
    ├── netlify.toml      # Configuración del decorador
    └── README.md         # Documentación específica
```

## 💡 Uso

### Para Clientes:
1. Acceder al sitio principal
2. Ingresar nombre y mensaje
3. Opcionalmente proporcionar ID de cliente
4. Enviar mensaje y ver respuestas en tiempo real

### Para Decoradores:
1. Acceder al panel de decorador
2. Ver mensajes entrantes en tiempo real
3. Seleccionar mensaje para responder
4. Enviar respuesta dirigida al cliente específico
5. Monitorear estadísticas y gestionar múltiples conversaciones

## 🛠️ Tecnologías

- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Backend**: Netlify Functions (Node.js)
- **Tiempo Real**: Pusher WebSockets
- **Hosting**: Netlify
- **Dependencias**: pusher (^5.1.3)

## 📋 Funcionalidades Implementadas

✅ Chat en tiempo real bidireccional
✅ Interfaz de cliente intuitiva
✅ Panel de administración para decorador
✅ Manejo de múltiples clientes simultáneos
✅ Sistema de IDs de cliente para sesiones dirigidas
✅ Estadísticas en tiempo real
✅ Estados de conexión visibles
✅ Diseño responsivo
✅ Manejo de errores
✅ CORS configurado
✅ Validación de datos

## 🔄 Flujo de Comunicación

1. **Cliente** envía mensaje → **Función Netlify** → **Pusher**
2. **Pusher** difunde mensaje → **Panel Decorador** recibe
3. **Decorador** responde → **Función Netlify** → **Pusher**
4. **Pusher** envía respuesta → **Cliente** recibe

Ambos sitios están completamente funcionales y listos para desplegar en Netlify.
