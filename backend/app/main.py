from fastapi import FastAPI, Depends, HTTPException  # FastAPI
from sqlalchemy.orm import Session  # Para la base de datos
from fastapi.middleware.cors import CORSMiddleware  # Para permitir acceso desde el frontend
from . import models, schemas, crud, database, errors  # Importa todos los módulos internos

# Crea las tablas en la base de datos si no existen (auto-migración básica)
models.Base.metadata.create_all(bind=database.engine)

# Crea la instancia principal de la app
app = FastAPI(
    title="API Modulo Clientes",
    description="Gestión de clientes CRUD",
    version="1.0.0"
)

# Configuración CORS para permitir acceso del frontend (React) al backend (FastAPI)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Permite cualquier origen
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dependencia para obtener la sesión de base de datos en cada petición
def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Endpoint: Lista todos los clientes (GET)
@app.get("/clientes", response_model=list[schemas.ClienteOut])
def listar_clientes(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return crud.get_clientes(db, skip=skip, limit=limit)

# Endpoint: Obtiene un cliente por ID (GET)
@app.get("/clientes/{cliente_id}", response_model=schemas.ClienteOut)
def obtener_cliente(cliente_id: int, db: Session = Depends(get_db)):
    cliente = crud.get_cliente(db, cliente_id)
    if not cliente:
        raise HTTPException(
            status_code=errors.ErrorCodes.CLIENTE_NOT_FOUND["http_status"],
            detail=errors.get_error(errors.ErrorCodes.CLIENTE_NOT_FOUND)[0]
        )
    return cliente

# Endpoint: Crea un cliente (POST)
@app.post("/clientes", response_model=schemas.ClienteOut, status_code=201)
def crear_cliente(cliente: schemas.ClienteCreate, db: Session = Depends(get_db)):
    existe = db.query(models.Cliente).filter(
        models.Cliente.numero_identificacion == cliente.numero_identificacion
    ).first()
    if existe:
        raise HTTPException(
            status_code=errors.ErrorCodes.CLIENTE_DUPLICADO["http_status"],
            detail=errors.get_error(errors.ErrorCodes.CLIENTE_DUPLICADO)[0]
        )
    # Validación de campos obligatorios
    if not cliente.nombre:
        error, status_code = errors.get_error(errors.ErrorCodes.REQUEST_INCOMPLETO, detail="El campo 'nombre' es obligatorio")
        raise HTTPException(status_code=status_code, detail=error)
    return crud.create_cliente(db, cliente)

# Endpoint: Actualiza un cliente (PUT)
@app.put("/clientes/{cliente_id}", response_model=schemas.ClienteOut)
def actualizar_cliente(cliente_id: int, cliente: schemas.ClienteUpdate, db: Session = Depends(get_db)):
    db_cliente = crud.update_cliente(db, cliente_id, cliente)
    if not db_cliente:
        raise HTTPException(
            status_code=errors.ErrorCodes.CLIENTE_NOT_FOUND["http_status"],
            detail=errors.get_error(errors.ErrorCodes.CLIENTE_NOT_FOUND)[0]
        )
    return db_cliente

# Endpoint: Inactiva un cliente (DELETE)
@app.delete("/clientes/{cliente_id}", response_model=schemas.ClienteOut)
def inactivar_cliente(cliente_id: int, db: Session = Depends(get_db)):
    db_cliente = crud.inactivate_cliente(db, cliente_id)
    if not db_cliente:
        raise HTTPException(
            status_code=errors.ErrorCodes.CLIENTE_NOT_FOUND["http_status"],
            detail=errors.get_error(errors.ErrorCodes.CLIENTE_NOT_FOUND)[0]
        )
    return db_cliente