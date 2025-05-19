from sqlalchemy.orm import Session
from . import models, schemas
from typing import List, Optional

# Retorna todos los clientes (con paginación)
def get_clientes(db: Session, skip: int = 0, limit: int = 100) -> List[models.Cliente]:
    return db.query(models.Cliente).order_by(models.Cliente.id).offset(skip).limit(limit).all()

# Retorna un solo cliente por ID
def get_cliente(db: Session, cliente_id: int) -> Optional[models.Cliente]:
    return db.query(models.Cliente).filter(models.Cliente.id == cliente_id).first()

# Crea un nuevo cliente
def create_cliente(db: Session, cliente: schemas.ClienteCreate) -> models.Cliente:
    db_cliente = models.Cliente(**cliente.model_dump()) # Desempaqueta los datos del schema en el modelo
    db.add(db_cliente)
    db.commit()
    db.refresh(db_cliente)
    return db_cliente

# Actualiza un cliente existente (solo los datos enviados)
def update_cliente(db: Session, cliente_id: int, cliente: schemas.ClienteUpdate) -> Optional[models.Cliente]:
    db_cliente = db.query(models.Cliente).filter(models.Cliente.id == cliente_id).first()
    if db_cliente:
        for key, value in cliente.model_dump(exclude_unset=True).items():
            setattr(db_cliente, key, value)  # Actualiza solo los campos enviados
        db.commit()
        db.refresh(db_cliente)
    return db_cliente

# Inactiva un cliente (no lo elimina físicamente)
def inactivate_cliente(db: Session, cliente_id: int) -> Optional[models.Cliente]:
    db_cliente = db.query(models.Cliente).filter(models.Cliente.id == cliente_id).first()
    if db_cliente:
        db_cliente.estado = False  # Marca como inactivo
        db.commit()
        db.refresh(db_cliente)
    return db_cliente