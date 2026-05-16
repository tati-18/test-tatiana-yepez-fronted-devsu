# Bank App

Una aplicación bancaria moderna construida con **Angular 20** y **TypeScript**, que proporciona funcionalidades de gestión bancaria con soporte para múltiples idiomas (i18n) y Server-Side Rendering (SSR).

---

## 📋 Tabla de Contenidos

- [Características](#características)
- [Requisitos Previos](#requisitos-previos)
- [Instalación](#instalación)
- [Ejecución](#ejecución)
- [Construcción](#construcción)
- [Pruebas](#pruebas)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Configuración](#configuración)
- [Tecnologías](#tecnologías)
- [Scripts Disponibles](#scripts-disponibles)
- [Debugging](#debugging)
- [Solución de Problemas](#solución-de-problemas)

---

## ✨ Características

- ✅ Interfaz de usuario moderna con Angular 20
- ✅ Soporte multiidioma (ngx-translate)
- ✅ Server-Side Rendering (SSR) para mejor SEO
- ✅ Tipado fuerte con TypeScript
- ✅ Componentes reutilizables
- ✅ Gestión de rutas con Angular Router
- ✅ Pruebas automatizadas con Jasmine/Karma
- ✅ Estilos SCSS modular
- ✅ Interpolación de datos reactiva con RxJS

---

## 🔧 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** (v20.0.0 o superior)
- **npm** (v10.0.0 o superior) o **yarn**
- **Angular CLI** (v20.3.13 o superior)

### Verificar Instalación

```bash
node --version
npm --version
ng version
```

Si no tienes Angular CLI instalado globalmente:

```bash
npm install -g @angular/cli@20.3.13
```

---

## 📦 Instalación

### 1. Clonar el Repositorio

```bash
git clone https://github.com/tati-18/test-tatiana-yepez-fronted-devsu.git
cd agents-estructura-readme-ejecucion-proyecto/bank-app
```

### 2. Instalar Dependencias

```bash
npm install
```

Esto descargará todas las dependencias del proyecto, incluyendo Angular framework, ngx-translate, Express y herramientas de desarrollo.

---

## 🚀 Ejecución

### Servidor de Desarrollo Local

Para ejecutar la aplicación en modo desarrollo con recarga automática en caliente:

```bash
npm start
```

O equivalentemente:

```bash
ng serve
```

La aplicación estará disponible en: **http://localhost:4200**

### Modo Observador (Watch)

Para ejecutar la compilación en modo observador sin iniciar el servidor:

```bash
npm run watch
```

---

## 🏗️ Construcción

### Compilación para Producción

Para compilar la aplicación optimizada para producción:

```bash
npm run build
```

Los archivos compilados se generarán en la carpeta `dist/bank-app/`. Estos archivos están optimizados, minificados y listos para deploying.

### Server-Side Rendering (SSR)

Para servir la aplicación con SSR en producción:

```bash
npm run serve:ssr:bank-app
```

Esto ejecutará el servidor Node.js con la aplicación renderizada en servidor, mejorando el SEO y la velocidad de carga inicial.

---

## 🧪 Pruebas

### Ejecutar Pruebas Unitarias

```bash
npm test
```

Ejecuta las pruebas con [Karma](https://karma-runner.github.io) y [Jasmine](https://jasmine.github.io/). Las pruebas se ejecutarán en Chrome en modo observador.

### Generar Reporte de Cobertura

```bash
ng test --code-coverage
```

El reporte de cobertura se generará en la carpeta `coverage/`.

---

## 📁 Estructura del Proyecto

```
bank-app/
├── src/
│   ├── app/                    # Componentes y servicios de la aplicación
│   ├── assets/                 # Recursos estáticos (imágenes, fuentes)
│   ├── environments/           # Configuraciones por ambiente
│   ├── interceptors/           # Interceptores HTTP
│   ├── index.html              # Archivo HTML principal
│   ├── styles.scss             # Estilos globales
│   ├── main.ts                 # Punto de entrada de la app
│   ├── main.server.ts          # Punto de entrada del servidor SSR
│   └── server.ts               # Configuración del servidor Express
│
├── dist/                       # Archivos compilados (generados)
├── coverage/                   # Reportes de cobertura de tests (generados)
├── angular.json                # Configuración de Angular
├── tsconfig.json               # Configuración de TypeScript
├── tsconfig.app.json           # Configuración TypeScript para la app
├── tsconfig.spec.json          # Configuración TypeScript para tests
├── karma.conf.js               # Configuración de Karma
├── package.json                # Dependencias y scripts
├── .editorconfig               # Configuración del editor
├── .gitignore                  # Archivos ignorados por Git
├── .vscode/                    # Configuración de VS Code
└── README.md                   # Este archivo
```

---

## ⚙️ Configuración

### Configuración por Ambiente

Las configuraciones específicas por ambiente se encuentran en `src/environments/`:

- **`environment.ts`** - Configuración para desarrollo
- **`environment.prod.ts`** - Configuración para producción

### Internacionalización (i18n)

La aplicación usa **ngx-translate** para soporte multiidioma.

**Archivos de traducciones:** `src/assets/i18n/`

**Uso en componentes:**

```typescript
import { TranslateService } from '@ngx-translate/core';

constructor(private translate: TranslateService) {
  this.translate.setDefaultLanguage('es');
}
```

**En plantillas HTML:**

```html
<h1>{{ 'home.title' | translate }}</h1>
```

### Interceptores HTTP

Los interceptores personalizados se encuentran en `src/interceptors/` y se utilizan para:

- Autenticación (inyectar tokens)
- Manejo global de errores
- Añadir encabezados comunes
- Logging de solicitudes

---

## 💻 Tecnologías

| Tecnología    | Versión | Descripción              |
| ------------- | ------- | ------------------------ |
| Angular       | 20.3.0  | Framework principal      |
| Angular CLI   | 20.3.13 | Herramienta CLI          |
| Angular SSR   | 20.3.13 | Server-side rendering    |
| TypeScript    | 5.9.2   | Lenguaje de programación |
| RxJS          | 7.8.0   | Programación reactiva    |
| ngx-translate | 17.0.0  | Internacionalización     |
| SCSS          | -       | Preprocesador CSS        |

---

## 📝 Scripts Disponibles

```bash
npm start                    # Inicia servidor de desarrollo (ng serve)
npm run build                # Compila para producción
npm run watch                # Compilación en modo observador
npm test                     # Ejecuta pruebas unitarias
npm run ng                   # Ejecuta comandos ng directamente
npm run serve:ssr:bank-app   # Sirve aplicación con SSR

# Ejemplos de generación de código
ng generate component component-name       # Crear nuevo componente
ng generate service service-name           # Crear nuevo servicio
ng generate module module-name             # Crear nuevo módulo
```

---

## 🔍 Debugging

### En Visual Studio Code

1. Crea o edita `.vscode/launch.json`:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "ng serve",
      "type": "chrome",
      "request": "launch",
      "url": "http://localhost:4200",
      "webRoot": "${workspaceRoot}",
      "sourceMap": true,
      "preLaunchTask": "npm: start"
    }
  ]
}
```

2. Ejecuta `npm start` en una terminal
3. Presiona **F5** o ve a Run > Start Debugging para iniciar el debugger

### Console del Navegador

Abre las DevTools del navegador (F12) para inspeccionar:

- Elementos del DOM
- Estado del navegador
- Errores y warnings
- Red HTTP

---

## 📚 Generación de Componentes y Servicios

### Generar Componente

```bash
ng generate component components/my-component
```

Crea:

- `my-component.component.ts` - Lógica del componente
- `my-component.component.html` - Template
- `my-component.component.scss` - Estilos
- `my-component.component.spec.ts` - Tests

### Generar Servicio

```bash
ng generate service services/my-service
```

Crea:

- `my-service.service.ts` - Lógica del servicio
- `my-service.service.spec.ts` - Tests

### Listar Todos los Schematics Disponibles

```bash
ng generate --help
```

---

## 🐛 Solución de Problemas

### Puerto 4200 ya está en uso

```bash
ng serve --port 4300
```

### Limpiar cache de npm

```bash
npm cache clean --force
```

### Reinstalar todas las dependencias

```bash
rm -rf node_modules package-lock.json
npm install
```

### Errores de compilación de TypeScript

Verifica que todas las versiones sean correctas:

```bash
npm install
ng version
npm run build
```

### Módulo no encontrado

Intenta reinstalar node_modules:

```bash
npm install --legacy-peer-deps
```

### Puerto 4200 no responde

Mata los procesos existentes de Node:


---

## 📄 Documentación Adicional

- [Angular Documentation](https://angular.io/docs)
- [Angular CLI](https://angular.dev/tools/cli)
- [ngx-translate GitHub](https://github.com/ngx-translate/core)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [RxJS Documentation](https://rxjs.dev/)

---

## 👨‍💻 Autor

**Desarrollado por:** Tatiana Yepez

---
