## Información del proyecto

El proyecto esta desarrollado con el framework NextJS

El proyecto usa TailwindCSS como framework css complementado con el plugin DaisyUI

Se utiliza Prisma como el ORM con la base de datos `PostgreSQL`

La carpeta `lib` contien los ficheros de configuración de las librerias utilizadas

### App router
- La carpet `app` contiene las rutas del sitio
  - La carpeta `landing` contiene las rutas del sitio principal
  - La carpeta `auth` contiene la ruta de login del panel administrador
  - La carpeta `panel-admin` contiene las rutas del panel administrador
  - La carpeta `api` contiene las rutas de la API

### Pages router
* La carpeta `pages` contiene las rutas de configuración
  - El fichero `api/init.ts` contiene la ruta de incialización de los datos (usuario administrado, galerías, salmo semanal)

### Carpeta de imagenes
La carpeta `public/galleries` contiene las imagenes guardadas por la aplicación

### Variables de entorno

El proyecto necesita un archivo `.env` con las siguientes variables de entorno:

```json
// Secret Key para la creación de JWT
SECRET_KEY

// URL del sitio web para uso de la libreria NextAuth
NEXTAUTH_URL

// Variable Secret para uso de la libreria NextAuth
NEXTAUTH_SECRET

// Email del gmail, que recibira los correos de la organización
EMAIL

// Contraseña de la cuenta, es necesario que sea una contraseña de aplicación (vea el siguient link)
// https://support.google.com/accounts/answer/185833?hl=es
PASSWORD

// Número telefonico de contacto whatsapp
NUMBER

// Variables de la base de datos PostgreSQL
POSTGRES_URL
POSTGRES_PRISMA_URL
POSTGRES_URL_NON_POOLING
POSTGRES_USER
POSTGRES_HOST
POSTGRES_PASSWORD
POSTGRES_DATABASE

// Variable API KEY de la libreria TinyMCE (Configurar los dominios permitidos)
// https://www.tiny.cloud/
TINYMCE_API_KEY
```

Para ejecutar el proyecto en un entorno de desarrollo, ejecute el comando:

```bash
npm run dev
```

Una vez iniciado el servidor de desarrollo, abrir [http://localhost:3000](http://localhost:3000)

## Rutas de la API

### /api/events

```ts
  GET // Ruta pública

  POST // Necesario un next auth session token
  {
    title: string;
    description: string;
    ubication: string;
    startDate: string;
    endDate: string;
  }
```

### /api/events/[id]

```ts
  GET // Necesario un next auth session token

  PUT // Necesario un next auth session token
  {
    title: string;
    description: string;
    ubication: string;
    startDate: string;
    endDate: string;
  }

  DELETE // Necesario un next auth session token
```

### /api/events/all

```ts
GET; // Necesario un next auth session token
```

---

### /api/images

```ts
  GET // Ruta pública

  POST // Necesario un next auth session token
  FormData: {
    gallery_id: string;
    images: FileList | Blob[];
  }
```

### /api/images/[id]

```ts
GET; // Necesario un next auth session token

DELETE; // Necesario un next auth session token
```

---

### /api/announcements

```ts
  GET // Ruta pública

  POST // Necesario un next auth session token
  {
    title: string;
    announcementDate: string;
    announcementDescription: string;
    isImportant: boolean;
  }
```

### /api/announcements/[id]

```ts
  GET // Necesario un next auth session token

  PUT // Necesario un next auth session token
  {
    title: string;
    announcementDate: string;
    announcementDescription: string;
    isImportant: boolean;
  }

  DELETE // Necesario un next auth session token
```

---

### /api/users

```ts
  GET // Necesario un next auth session token

  POST // Necesario un next auth session token
  {
    email: string;
    userName: string;
    password: string;
  }
```

### /api/users/[id]

```ts
  GET // Necesario un next auth session token

  PUT // Necesario un next auth session token
  {
    email: string;
    userName: string;
    password: string;
  }

  DELETE

  PATCH // Necesario un next auth session token
  {
    newPassword: string;
    confirmPassword: string;
  }
```

---

### /api/week-psalms

```ts
  GET // Ruta pública
```

### /api/week-psalms/[id]

```ts
  PUT // Necesario un next auth session token
  {
    content: string;
  }
```

---

### /api/login

```ts
  POST // Ruta pública (ruta complementaria de NextAuth)
  {
    email: string;
    password: string;
  }
```

---

### /api/contact

```ts
  POST // Ruta pública
  {
    email: string;
    name: string;
    subject: string;
    message: string;
  }
```

---

### /api/galleries

```ts
  GET // Ruta pública

  POST // Necesario un next auth session token
  {
    name: string;
  }
```

### /api/galleries/[id]

```ts
  GET // Necesario un next auth session token

  PUT // Necesario un next auth session token
  {
    name: string;
  }

  DELETE
```