import pytest
from fastapi.testclient import TestClient
from app.main import app
import random

client = TestClient(app)

# Fixture para limpiar la tabla antes de cada test (solo para pruebas, no en producción)
from app.database import SessionLocal
from app import models

@pytest.fixture(autouse=True)
def limpiar_clientes():
    db = SessionLocal()
    db.query(models.Cliente).delete()
    db.commit()
    db.close()

def cliente_data():
    """Genera datos de cliente únicos para cada test"""
    sufijo = random.randint(1000, 9999)
    return {
        "nombre": "Juan",
        "apellido": "Pérez",
        "tipo_identificacion": "CC",
        "numero_identificacion": f"12345{sufijo}",
        "correo": f"juan{sufijo}@example.com",
        "edad": 30,
        "telefono": f"3201234{sufijo}"
    }

def test_crear_cliente():
    datos = cliente_data()
    response = client.post("/clientes", json=datos)
    assert response.status_code == 201, response.text  # Muestra el error si falla
    data = response.json()
    assert "id" in data
    assert data["nombre"] == datos["nombre"]
    assert data["estado"] == True

def test_obtener_cliente_por_id():
    datos = cliente_data()
    # Crea un cliente primero
    response = client.post("/clientes", json=datos)
    assert response.status_code == 201, response.text
    data = response.json()
    cliente_id = data["id"]

    # Ahora consultamos por ID
    response = client.get(f"/clientes/{cliente_id}")
    assert response.status_code == 200, response.text
    data = response.json()
    assert data["id"] == cliente_id

def test_actualizar_cliente():
    datos = cliente_data()
    response = client.post("/clientes", json=datos)
    assert response.status_code == 201, response.text
    data = response.json()
    cliente_id = data["id"]

    # Actualizamos el cliente
    datos_actualizados = datos.copy()
    datos_actualizados["edad"] = 40

    response = client.put(f"/clientes/{cliente_id}", json=datos_actualizados)
    assert response.status_code == 200, response.text
    data = response.json()
    assert data["edad"] == 40

def test_inactivar_cliente():
    datos = cliente_data()
    response = client.post("/clientes", json=datos)
    assert response.status_code == 201, response.text
    data = response.json()
    cliente_id = data["id"]

    response = client.delete(f"/clientes/{cliente_id}")
    assert response.status_code == 200, response.text
    data = response.json()
    assert data["estado"] == False