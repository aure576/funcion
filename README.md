# 💬 Chat Bidireccional - Aurelio AI Developer

## 🌟 Descripción
Sistema de chat bidireccional en tiempo real con dos interfaces: una para clientes y otra para decoradores (administradores). Utiliza Pusher WebSockets y Netlify Functions para comunicación instantánea.

## 🚀 Sitios en vivo
- **Cliente:** https://tarta-delicada-cbd311.netlify.app
- **Decorador:** https://tarta-delicada-cbd311.netlify.app/decorador/

## ⚡ Características

### Chat del Cliente
- ✅ Interfaz intuitiva para envío de mensajes
- ✅ Chat en tiempo real con WebSockets
- ✅ Visualización de conversación completa
- ✅ Estado de conexión visible
- ✅ Soporte para IDs de cliente

### Panel del Decorador
- ✅ Recepción instantánea de mensajes
- ✅ Panel de administración profesional
- ✅ Estadísticas en tiempo real
- ✅ Respuestas dirigidas por cliente
- ✅ Gestión de múltiples conversaciones

## 🛠️ Tecnologías
- **Frontend:** HTML5, CSS3, JavaScript vanilla
- **Backend:** Netlify Functions (Node.js)
- **WebSockets:** Pusher
- **Deploy:** Netlify
- **Control de versiones:** Git/GitHub

## 📁 Estructura del proyecto
```
/
├── index.html              # Página principal con interfaz de chat
├── .netlify/functions/     # Funciones serverless
│   └── enviar.js          # Función para enviar mensajes via Pusher
├── netlify.toml           # Configuración de Netlify
├── package.json           # Dependencias y scripts
├── .env.example           # Variables de entorno de ejemplo
└── test-function.js       # Script de prueba para funciones
```

## 🔧 Configuración

### Variables de entorno requeridas
En el panel de Netlify → Site settings → Environment variables:

```
PUSHER_APP_ID=tu_app_id
PUSHER_KEY=tu_key
PUSHER_SECRET=tu_secret
PUSHER_CLUSTER=us2
```

### Instalación local
```bash
# Clonar repositorio
git clone https://github.com/aure576/funcion.git
cd funcion

# Instalar dependencias
npm install

# Desarrollo local
npm run dev
```

## 🧪 Pruebas
```bash
# Probar función localmente
npm test
```

## 📝 Uso
1. Abre el sitio web
2. Ingresa tu nombre
3. Escribe un mensaje
4. ¡Envía y ve la magia del tiempo real!

## 📈 Deploy
El sitio se autodespliega en cada push a `main` branch.

## 🔒 Seguridad
- Variables sensibles protegidas con variables de entorno
- CORS configurado correctamente
- Validación de datos en frontend y backend

## 👨‍💻 Desarrollado por
**Aurelio AI Developer** - Especialista en soluciones web modernas

---

⭐ Si te gusta este proyecto, ¡dale una estrella!

