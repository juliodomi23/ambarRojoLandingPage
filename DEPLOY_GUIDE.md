# Guía de Deploy — Ambar Rojo Studios Landing Page

## Stack
- **Frontend:** React 19 + Tailwind CSS + Framer Motion
- **Build tool:** CRACO (Create React App Config Override)
- **Package manager:** Yarn 1.22.22
- **Deploy:** EasyPanel + Nixpacks (Docker)
- **Servidor estático:** `npx serve -s build -l 80`

---

## Comandos del proyecto

```bash
# Instalar dependencias
cd frontend
yarn install --ignore-engines

# Desarrollo local
yarn start

# Build de producción
yarn build
```

---

## Estructura del repositorio

```
ambarRojoLandingPage/
├── frontend/               ← Proyecto React (aquí trabaja EasyPanel)
│   ├── src/
│   │   ├── App.js          ← Componente principal (toda la landing)
│   │   ├── App.css         ← Estilos de componentes custom
│   │   ├── index.css       ← Variables CSS globales y Tailwind
│   │   ├── icono-somos.png ← Logo PNG (transparente, importado en App.js)
│   │   └── LOGO_NVO.jpg    ← Logo completo JPG (referencia)
│   ├── public/
│   │   └── index.html
│   ├── package.json
│   ├── yarn.lock           ← NO borrar. Fija versiones que funcionan.
│   ├── tailwind.config.js
│   ├── craco.config.js
│   └── .env                ← Variables de entorno
└── DEPLOY_GUIDE.md
```

---

## Variables de entorno (`frontend/.env`)

```env
REACT_APP_BACKEND_URL=https://ambar-dev-studio.preview.emergentagent.com
WDS_SOCKET_PORT=443
ENABLE_HEALTH_CHECK=false
SKIP_PREFLIGHT_CHECK=true    # Evita bloqueos de CRA por peer deps
GENERATE_SOURCEMAP=false     # Más rápido en Docker, menos memoria
```

---

## Configuración en EasyPanel

| Campo           | Valor                     |
|----------------|---------------------------|
| Install Command | `yarn install --ignore-engines` |
| Build Command   | `yarn build`              |
| Start Command   | `npx serve -s build -l 80` |
| Root Directory  | `frontend`                |
| Node version    | 18.x                      |

---

## Reglas críticas para no romper el build

### 1. NUNCA borrar `yarn.lock`
El lockfile fija las versiones exactas de dependencias que son compatibles entre sí.
Borrarlo hace que yarn resuelva versiones nuevas que rompen el build de `react-scripts@5`.

### 2. NUNCA agregar `resolutions` de `ajv` o `schema-utils`
`react-scripts@5` depende de versiones específicas de estas librerías internamente.
Forzar versiones con `resolutions` causa errores como:
- `TypeError: validateOptions is not a function`
- `Cannot find module 'ajv/dist/compile/codegen'`

### 3. `SKIP_PREFLIGHT_CHECK=true` es obligatorio
Sin este flag, CRACO puede bloquear el build por conflictos de peer deps
que en realidad no afectan el funcionamiento.

### 4. Imágenes: usar `import` en React, no rutas `/public`
```js
// ✅ Correcto — webpack resuelve la ruta garantizado
import iconoSomos from "./icono-somos.png";

// ❌ Evitar — puede fallar si el dev server no está corriendo
<img src="/icono-somos.png" />
```

---

## Errores comunes y soluciones

| Error | Causa | Solución |
|-------|-------|----------|
| `Cannot find module 'ajv/dist/compile/codegen'` | yarn.lock borrado o resolución de ajv incorrecta | Restaurar yarn.lock desde git: `git checkout <commit> -- frontend/yarn.lock` |
| `TypeError: validateOptions is not a function` | `schema-utils` forzado a versión incorrecta | Quitar `resolutions.schema-utils` del package.json |
| `TypeError: Cannot read properties of undefined (reading 'date')` | `ajv-keywords` con versión incompatible de `ajv` | Quitar `resolutions.ajv` del package.json |
| Logo no carga (muestra alt text) | Imagen en `public/` no encontrada en rutas relativas | Mover imagen a `src/` e importarla con `import` |

### Restaurar a estado funcional
```bash
# Ver commits anteriores
git log --oneline

# Restaurar yarn.lock y package.json al último commit funcional
git checkout <commit-hash> -- frontend/yarn.lock frontend/package.json
```

---

## Flujo de trabajo recomendado

1. Hacer cambios en `frontend/src/`
2. Probar localmente con `yarn start`
3. Commit y push a `main`
4. EasyPanel detecta el push y hace deploy automático
5. Revisar logs en EasyPanel si hay error de build

---

## Contacto WhatsApp (botón flotante)
Número configurado en `App.js`: `https://wa.me/529612680529`
Para cambiar: buscar `wa.me` en `App.js` y actualizar el número.

---

## Paleta de colores (Pantone AR)

| Color | Hex | Pantone | Uso |
|-------|-----|---------|-----|
| Crimson principal | `#900024` | 187C | Accents, glows, nav underline |
| Rojo brillante | `#FF0040` | 805C | CTAs hover, partículas |
| Maroon profundo | `#540115` | 1815C | Cards, overlays |
| Carbón | `#333333` | Black C | Texto secundario |
