from pydantic import BaseModel, EmailStr, Field, field_validator, ConfigDict   # Validaciones robustas
from typing import Optional

class ClienteBase(BaseModel):  # Esquema base, para creación/actualización
    nombre: str = Field(..., min_length=1, max_length=50)  # Campo obligatorio, tamaño mínimo/máximo
    apellido: str = Field(..., min_length=1, max_length=50)
    tipo_identificacion: str = Field(..., min_length=2, max_length=20)
    numero_identificacion: str = Field(..., min_length=5, max_length=20)
    correo: Optional[EmailStr] = None  # Valida formato de email si se envía
    edad: Optional[int] = Field(None, ge=0, le=120)  # Entre 0 y 120 años
    telefono: str = Field(..., min_length=7, max_length=20)  # Tel mínimo 7 caracteres

    # Valida que el teléfono solo tenga números.
    @field_validator("telefono")
    def validar_telefono(cls, v):
        if not v.isdigit():
            raise ValueError("El teléfono debe contener solo números")
        return v

class ClienteCreate(ClienteBase):
    pass  # Hereda todas las reglas de ClienteBase

class ClienteUpdate(ClienteBase):
    pass  # Igual, sirve para validación en actualizaciones

class ClienteOut(ClienteBase):
    id: int
    estado: bool

    model_config = ConfigDict(from_attributes=True)  # Permite usar atributos de clase como campos