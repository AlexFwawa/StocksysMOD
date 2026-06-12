import { useState, useEffect } from 'react';
import Modal from '../ui/Modal';
import { useCategories } from '../../hooks/useCategories';

const emptyForm = {
  nombre: '',
  descripcion: '',
  categoriaId: ''
};

const ProductForm = ({ isOpen, onClose, onSubmit, editData = null }) => {
  const [form, setForm] = useState(emptyForm);
  const [submitting, setSubmitting] = useState(false);
  const isEditing = Boolean(editData);
  const { categories, loading: categoriesLoading } = useCategories();

  const resetForm = () => setForm({ ...emptyForm, categoriaId: categories.length > 0 ? categories[0].idCat : '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    if (!form.nombre.trim()) return 'El nombre del producto es obligatorio';
    if (!form.categoriaId) return 'Selecciona una categoría';
    return null;
  };

  const handleSubmit = async (closeAfter) => {
    const error = validate();
    if (error) return alert(error);

    setSubmitting(true);
    try {
      await onSubmit({
        nombre: form.nombre.trim(),
        descripcion: form.descripcion.trim(),
        categoriaId: form.categoriaId,
      });

      if (closeAfter) {
        resetForm();
        onClose();
      } else {
        resetForm();
      }
    } catch {
      // Error ya manejado por useProducts con toast
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  // Resetear form cuando cambia editData o categorias
  useEffect(() => {
    if (editData) {
      // Buscar ID de categoría basado en el nombre string
      const cat = categories.find(c => c.nombre === editData.tipo);
      setForm({
        nombre: editData.nombre,
        descripcion: editData.descripcion || '',
        categoriaId: cat ? cat.idCat : (categories.length > 0 ? categories[0].idCat : '')
      });
    } else {
      resetForm();
    }
  }, [editData, categories]);

  const footer = isEditing ? (
    <>
      <button className="btn-secondary" onClick={handleClose} disabled={submitting}>Cancelar</button>
      <button className="btn-primary" onClick={() => handleSubmit(true)} disabled={submitting}>
        {submitting ? 'Guardando...' : 'Guardar cambios'}
      </button>
    </>
  ) : (
    <>
      <button className="btn-secondary" onClick={() => handleSubmit(false)} disabled={submitting}>
        {submitting ? 'Agregando...' : 'Agregar producto'}
      </button>
      <button className="btn-primary" onClick={() => handleSubmit(true)} disabled={submitting}>
        {submitting ? 'Agregando...' : 'Agregar y cerrar'}
      </button>
    </>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={isEditing ? 'Editar Producto' : 'Nuevo Producto'}
      footer={footer}
    >
      <div className="form-group">
        <label htmlFor="prod-nombre">Nombre del producto</label>
        <input
          id="prod-nombre"
          type="text"
          name="nombre"
          placeholder="Ej: Tornillo Hexagonal M8"
          value={form.nombre}
          onChange={handleChange}
          autoFocus
        />
      </div>

      <div className="form-group">
        <label htmlFor="prod-descripcion">
          Descripción
        </label>
        <textarea
          id="prod-descripcion"
          name="descripcion"
          placeholder="Descripción del producto"
          value={form.descripcion}
          onChange={handleChange}
          rows="3"
        />
      </div>

      <div className="form-group">
        <label htmlFor="prod-categoria">Categoría</label>
        <select id="prod-categoria" name="categoriaId" value={form.categoriaId} onChange={handleChange} disabled={categoriesLoading}>
          {categoriesLoading ? <option>Cargando categorías...</option> : null}
          {!categoriesLoading && categories.map(cat => (
            <option
              key={cat.idCat}
              value={cat.idCat}
            >
              {cat.nombre}
            </option>
          ))}
        </select>
      </div>

    </Modal>
  );
};

export default ProductForm;
