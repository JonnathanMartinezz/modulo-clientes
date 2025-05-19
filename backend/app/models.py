from sqlalchemy import Column, Integer, String, Boolean  # Importar los tipos de columnas
from . database import Base  # Importa la base de modelos

class Cliente(Base):  # Clase que representa la tabla 'clientes'
    __tablename__ = "clientes"  # Nombre de la tabla en SQL Server

    id = Column(Integer, primary_key=True, index=True)  # PK, autoincremental
    nombre = Column(String(50), nullable=False)         # Nombre (obligatorio)
    apellido = Column(String(50), nullable=False)       # Apellido (obligatorio)
    tipo_identificacion = Column(String(20), nullable=False)  # Tipo doc (obligatorio)
    numero_identificacion = Column(String(20), unique=True, nullable=False)  # Número único (obligatorio)
    correo = Column(String(100), nullable=True)         # Correo (opcional)
    edad = Column(Integer, nullable=True)               # Edad (opcional)
    telefono = Column(String(20), nullable=False)       # Teléfono (obligatorio)
    estado = Column(Boolean, default=True)              # Estado (activo/inactivo)