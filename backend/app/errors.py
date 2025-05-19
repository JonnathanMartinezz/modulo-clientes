from fastapi import status  # Importa los códigos HTTP estándar

# Diccionario de errores personalizados, con código, mensaje y HTTP status.
class ErrorCodes:
    CLIENTE_NOT_FOUND = {
        "code": "E01",
        "message": "Cliente no encontrado",
        "http_status": status.HTTP_404_NOT_FOUND
    }
    CLIENTE_DUPLICADO = {
        "code": "E02",
        "message": "El número de identificación ya existe",
        "http_status": status.HTTP_409_CONFLICT
    }
    REQUEST_INCOMPLETO = {
        "code": "E03",
        "message": "Request incompleto",
        "http_status": status.HTTP_422_UNPROCESSABLE_ENTITY
    }

# Función para obtener la respuesta formateada según el catálogo
def get_error(error_obj):
    return {
        "error_code": error_obj["code"],
        "error_message": error_obj["message"]
    }, error_obj["http_status"]