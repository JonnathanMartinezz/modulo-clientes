import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { createCliente } from "../services/clientesService";

type Props = {
    onClienteCreado: () => void;
};

// Estado inicial para los campos del formulario.
const initialState = {
    nombre: "",
    apellido: "",
    tipo_identificacion: "",
    numero_identificacion: "",
    correo: "",
    edad: "",
    telefono: ""
};

// Definición del componente funcional ClienteForm, que recibe las props.
export const ClienteForm: React.FC<Props> = ({ onClienteCreado }) => {
    const [form, setForm] = useState(initialState);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    // Maneja cambios en los inputs, actualizando el estado del formulario.
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        // Limpiamos error y éxito para evitar mensajes anteriores al editar.
        setError(null);
        setSuccess(false);
    };
    // Función para validar los campos antes de enviar el formulario.
    const validar = () => {
        if (!form.nombre || !form.apellido || !form.tipo_identificacion || !form.numero_identificacion || !form.telefono) {
            return "Por favor, llena los campos obligatorios.";
        }
        if (form.telefono && !/^\d+$/.test(form.telefono)) {
            return "El teléfono debe contener solo números.";
        }
        if (form.edad && (!/^\d+$/.test(form.edad) || Number(form.edad) < 0 || Number(form.edad) > 120)) {
            return "Edad inválida.";
        }
        if (form.correo && !/\S+@\S+\.\S+/.test(form.correo)) {
            return "Correo inválido.";
        }
        return null;
    };
    
    // Función principal para manejar el envío del formulario.
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); // Previene que la página se recargue al enviar el formulario.
        // Ejecuta la validación antes de guardar.
        const msg = validar();
        if (msg) {
            setError(msg);
            return;
        }
        setLoading(true);
        try {
            await createCliente({
                nombre: form.nombre,
                apellido: form.apellido,
                tipo_identificacion: form.tipo_identificacion,
                numero_identificacion: form.numero_identificacion,
                correo: form.correo ? form.correo : undefined,
                edad: form.edad ? Number(form.edad) : undefined,
                telefono: form.telefono
            });
            setForm(initialState);
            setSuccess(true);
            onClienteCreado();
        } catch (err: any) {
            // Maneja distintos tipos de error según la respuesta del backend.
            if (err.response && err.response.status === 409) {
                setError("El número de identificación ya existe.");
            } else if (err.response && err.response.data && err.response.data.detail) {
                setError(err.response.data.detail);
            } else {
                setError("Error al crear el cliente.");
            }
        } finally {
            setLoading(false); // Oculta estado de carga.
        }
    };

    // Renderiza el formulario con los campos requeridos.
    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ mb: 4, p: 2, background: "#f6f8fa", borderRadius: 2 }}>
            <Typography variant="h6" mb={2}>Crear cliente</Typography>
            <Grid container spacing={2}>
                <Grid size={{ xs: 12, md: 6 }}>
                    <TextField label="Nombre" name="nombre" value={form.nombre} onChange={handleChange} required fullWidth />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <TextField label="Apellido" name="apellido" value={form.apellido} onChange={handleChange} required fullWidth />
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                    <FormControl fullWidth required>
                        <InputLabel id="tipo-identificacion-label">Tipo de Identificación</InputLabel>
                        <Select
                            labelId="tipo-identificacion-label"
                            id="tipo_identificacion"
                            name="tipo_identificacion"
                            value={form.tipo_identificacion}
                            label="Tipo de Identificación"
                            onChange={(e) => {
                                setForm({ ...form, tipo_identificacion: e.target.value });
                                setError(null);
                                setSuccess(false);
                            }}
                        >
                            <MenuItem value="">
                                <em>Seleccione...</em>
                            </MenuItem>
                            <MenuItem value="CC">Cédula de Ciudadanía</MenuItem>
                            <MenuItem value="TI">Tarjeta de Identidad</MenuItem>
                            <MenuItem value="CE">Cédula de Extranjería</MenuItem>
                            <MenuItem value="NIT">NIT</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                    <TextField label="Número de Identificación" name="numero_identificacion" value={form.numero_identificacion} onChange={handleChange} required fullWidth />
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                    <TextField label="Teléfono" name="telefono" value={form.telefono} onChange={handleChange} required fullWidth />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <TextField label="Correo" name="correo" value={form.correo} onChange={handleChange} fullWidth />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <TextField label="Edad" name="edad" value={form.edad} onChange={handleChange} fullWidth type="number" inputProps={{ min: 0, max: 120 }} />
                </Grid>
                <Grid size={{ xs: 12 }}>
                    <Button type="submit" variant="contained" color="primary" disabled={loading}>
                        {loading ? "Guardando..." : "Guardar"}
                    </Button>
                </Grid>
            </Grid>
            {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
            {success && <Alert severity="success" sx={{ mt: 2 }}>Cliente creado exitosamente.</Alert>}
        </Box>
    );
};