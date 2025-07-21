# 💬 Chat Bidireccional - Aurelio AI Developer

## 🌟 Descripción
Chat bidireccional en tiempo real utilizando Pusher WebSockets y Netlify Functions. Interfaz moderna y responsiva para comunicación instantánea.

## 🚀 Sitio en vivo
**URL:** https://tarta-delicada-cbd311.netlify.app

## ⚡ Características
- ✅ Chat en tiempo real con Pusher
- ✅ Interfaz responsive y moderna
- ✅ Validación de formularios
- ✅ Manejo de errores robusto
- ✅ Variables de entorno seguras
- ✅ Deploy automático con Netlify

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

