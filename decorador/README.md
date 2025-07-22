# Panel Decorador - Aurelio AI

Este es el panel de administración para el decorador que responde a los clientes en el chat de Aurelio AI.

## Características

- **Recepción en tiempo real**: Recibe todos los mensajes de los clientes instantáneamente
- **Panel de administración**: Interfaz limpia y organizada para gestionar conversaciones
- **Estadísticas**: Visualiza métricas como mensajes recibidos, clientes activos y respuestas enviadas
- **Respuestas dirigidas**: Responde específicamente a clientes individuales usando su ID
- **Estado de conexión**: Monitoreo del estado de la conexión en tiempo real

## Uso

1. Abre el panel en tu navegador
2. Espera a que se establezca la conexión (estado "Conectado")
3. Los mensajes de los clientes aparecerán automáticamente en el panel izquierdo
4. Haz clic en cualquier mensaje para seleccionarlo
5. Escribe tu respuesta en el panel derecho
6. Envía la respuesta y será entregada al cliente específico

## Tecnologías

- HTML5, CSS3, JavaScript (Vanilla)
- Pusher para comunicación en tiempo real
- Netlify Functions para el backend
- Diseño responsivo

## Despliegue

Este sitio puede desplegarse en Netlify como un sitio estático independiente. Solo necesita acceso a las mismas credenciales de Pusher que el sitio principal del cliente.
