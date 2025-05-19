<<<<<<< HEAD
# Módulo de Clientes – Evaluación Técnica

Aplicación Fullstack para gestión de clientes, desarrollada con **FastAPI** (Python, SQL Server) en el backend y **React + TypeScript + Material UI** en el frontend.

---

## Descripción General

Este proyecto permite realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar/Desactivar) sobre clientes en, con validaciones, mensajes amigables, filtros avanzados a través de una interfaz.

---

## Tecnologías Utilizadas

- **Backend**: Python 3, FastAPI, SQLAlchemy, SQL Server, Pydantic
- **Frontend**: React, TypeScript, Material UI (MUI)
- **Base de Datos**: SQL Server
- **Testing**: Pytest (backend), React Testing Library

---

## Estructura General del Proyecto

modulo-clientes/
│
├── backend/
│ ├── app/
│ ├── venv/
│ ├── .env
│ ├── requirements.txt
│ └── ...
│
├── frontend/
│ ├── src/
│ ├── node_modules/
│ ├── .env
│ └── ...
│
├── .gitignore
└── README.md

---

## Instalación y ejecución

### 1. Clona el repositorio

```bash
git clone https://github.com/JonnathanMartinezz/modulo-clientes.git
cd modulo-clientes

cd backend

# Crea y activa un entorno virtual (Windows)
python -m venv venv
venv\Scripts\activate

# Instala dependencias
pip install -r requirements.txt

# Configura la conexión a SQL Server en el archivo .env
# Ejemplo para autenticación de Windows:
# DATABASE_URL="mssql+pyodbc://@localhost/modulo_clientes?driver=ODBC+Driver+17+for+SQL+Server&trusted_connection=yes"
# Tener en cuenta si se tiene la versión Exprés
# Corre la app
uvicorn app.main:app --reload
```
Abre tu navegador en http://localhost:8000

```bash
cd frontend

# Instala dependencias
npm install

# Corre la aplicación en desarrollo
npm start
```
Abre tu navegador en http://localhost:3000

---

## Pruebas Unitarias

Utiliza para el Backend pruebas unitarias con TestClient.

```bash
cd backend
pytest
```

## Características

- CRUD completo sobre clientes.
- Validación y mensajes amigables en frontend y backend.
- Filtros avanzados (por nombre y número de documento).
- Tabla reactiva con polling y refresco manual.
- Uso de principios SOLID y código limpio, comentado.
- Arquitectura desacoplada: frontend y backend pueden evolucionar de forma independiente.
- Documentación y pruebas para defensa técnica y auditoría.

## Autores

- Jonnathan Martínez
=======
