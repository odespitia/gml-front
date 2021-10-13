# users

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### Google Cloud Platform

  * Desde una consola establecer la configuración del proyecto: 
```
gcloud config set project explorandoando
```

  * Subir la versión del proyecto más actualizada al repositorio en GCP: 
```
gcloud builds submit --tag gcr.io/explorandoando/front_users
```

  * Desplegar en Cloud Run: 
```
gcloud run deploy --image gcr.io/explorandoando/front_users --platform managed --port 80
```
