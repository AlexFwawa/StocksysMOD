import { useState, useMemo, useRef } from 'react';
import Pagination from '../ui/Pagination';
import ConfirmDialog from '../ui/ConfirmDialog';
import ProductForm from './ProductForm';
import { useCategories } from '../../hooks/useCategories';
import { useSettings } from '../../context/SettingsContext';

const PER_PAGE_OPTIONS = [15, 25, 50, 100];

const ProductTable = ({ products, loading, onAdd, onEdit, onDelete, onIngreso, onEgreso, lowStockOnly }) => {
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(15);
  const [editingProduct, setEditingProduct] = useState(null);
  const [deletingProduct, setDeletingProduct] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'asc' });
  const searchRef = useRef(null);

  const { categories } = useCategories();
  const { lowStockThreshold } = useSettings();

  // Ordenar por columna
  const handleSort = (key) => {
    setSortConfig(prev => {
      if (prev.key === key) {
        return { key, direction: prev.direction === 'asc' ? 'desc' : 'asc' };
      }
      return { key, direction: 'asc' };
    });
    setCurrentPage(1);
  };

  // Icono de dirección de ordenamiento
  const SortIcon = ({ columnKey }) => {
    if (sortConfig.key !== columnKey) {
      return <span style={{ opacity: 0.3, marginLeft: '4px', fontSize: '0.75rem' }}>⇅</span>;
    }
    return (
      <span style={{ marginLeft: '4px', fontSize: '0.75rem' }}>
        {sortConfig.direction === 'asc' ? '↑' : '↓'}
      </span>
    );
  };

  // Filtrar y ordenar productos
  const filtered = useMemo(() => {
    let result = [...products];

    if (categoryFilter) {
      result = result.filter(p => p.categoria === categoryFilter || p.tipo === categoryFilter);
    }

    if (lowStockOnly) {
      result = result.filter(p => p.cantidad < lowStockThreshold);
    }

    if (search.trim()) {
      const q = search.toLowerCase().trim();
      result = result.filter(p =>
        p.nombre.toLowerCase().includes(q) ||
        p.codigo?.toLowerCase().includes(q) ||
        String(p.id).includes(q) ||
        String(p.cantidad).includes(q) ||
        (p.tipo && p.tipo.toLowerCase().includes(q))
      );
    }

    // Ordenar
    result.sort((a, b) => {
      const dir = sortConfig.direction === 'asc' ? 1 : -1;
      const key = sortConfig.key;

      let valA, valB;

      if (key === 'id') {
        valA = a.id;
        valB = b.id;
      } else if (key === 'nombre') {
        valA = (a.nombre || '').toLowerCase();
        valB = (b.nombre || '').toLowerCase();
      } else if (key === 'codigo') {
        valA = (a.codigo || '').toLowerCase();
        valB = (b.codigo || '').toLowerCase();
      } else if (key === 'tipo') {
        valA = (a.tipo || '').toLowerCase();
        valB = (b.tipo || '').toLowerCase();
      } else if (key === 'cantidad') {
        valA = a.cantidad;
        valB = b.cantidad;
      } else {
        valA = a[key];
        valB = b[key];
      }

      if (valA < valB) return -1 * dir;
      if (valA > valB) return 1 * dir;
      return 0;
    });

    return result;
  }, [products, search, categoryFilter, lowStockOnly, lowStockThreshold, sortConfig]);

  // Paginación:
  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const safePage = Math.min(currentPage, totalPages);
  const paginated = filtered.slice((safePage - 1) * perPage, safePage * perPage);

  // Restablecer pagina cuando cambia la busqueda o el valor de perPage:
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  const handlePerPageChange = (e) => {
    setPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  // Editar:
  const handleEditClick = (product) => {
    setEditingProduct({
      id: product.id,
      nombre: product.nombre,
      tipo: product.tipo,
      descripcion: product.descripcion,
      cantidad: product.cantidad,
    });
  };

  const handleEditSubmit = async (data) => {
    await onEdit(editingProduct.id, data);
    setEditingProduct(null);
  };

  // Eliminar
  const handleDeleteClick = (product) => {
    setDeletingProduct(product);
  };

  //Ingresar
  const handleIngresoClick = (product) => {
    onIngreso(product);
  };

  //Egresar
  const handleEgresoClick = (product) => {
    onEgreso(product);
  };

  const handleDeleteConfirm = async () => {
    setDeleteLoading(true);
    try {
      await onDelete(deletingProduct.id);
      setDeletingProduct(null);
    } catch {
      // Error manejado por hook
    } finally {
      setDeleteLoading(false);
    }
  };

  // Mostrar la búsqueda de enfoque para el atajo de teclado:
  ProductTable.focusSearch = () => searchRef.current?.focus();

  // Estilos para cabeceras ordenables
  const thStyle = {
    cursor: 'pointer',
    userSelect: 'none',
    whiteSpace: 'nowrap',
  };

  return (
    <div className="content-card">
      {/* Toolbar */}
      <div className="table-toolbar">
        <div className="table-toolbar-left">
          <div className="table-search">
            <div className="table-search-icon">
              <svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
            </div>
            <input
              ref={searchRef}
              type="text"
              placeholder="Buscar por nombre, ID, código, categoría o cantidad..."
              value={search}
              onChange={handleSearchChange}
              id="product-search"
            />
          </div>
          <div className="table-filters" style={{ display: 'flex', gap: '10px' }}>
            <select 
              value={categoryFilter} 
              onChange={(e) => { setCategoryFilter(e.target.value); setCurrentPage(1); }}
              className="table-select"
              style={{ padding: '8px', borderRadius: '4px', border: '1px solid var(--border)' }}
            >
              <option value="">Todas las categorías</option>
              {categories.map(c => (
                <option key={c.idCat} value={c.nombre}>{c.nombre}</option>
              ))}
            </select>
          </div>
          <div className="table-per-page">
            <span>Mostrar</span>
            <select value={perPage} onChange={handlePerPageChange} id="per-page-select">
              {PER_PAGE_OPTIONS.map(n => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      {loading ? (
        <div className="table-empty">
          <p>Cargando productos...</p>
        </div>
      ) : paginated.length === 0 ? (
        <div className="table-empty">
          <svg viewBox="0 0 24 24"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 002 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0022 16z" /><polyline points="3.27 6.96 12 12.01 20.73 6.96" /><line x1="12" y1="22.08" x2="12" y2="12" /></svg>
          <p>{search || lowStockOnly ? 'No se encontraron productos' : 'No hay productos registrados'}</p>
          <span>{search ? 'Intenta con otro término de búsqueda' : lowStockOnly ? 'No hay productos con stock bajo' : 'Agrega tu primer producto para comenzar'}</span>
        </div>
      ) : (
        <table className="data-table">
          <thead>
            <tr>
              <th style={thStyle} onClick={() => handleSort('id')}>
                ID <SortIcon columnKey="id" />
              </th>
              <th style={thStyle} onClick={() => handleSort('codigo')}>
                Código <SortIcon columnKey="codigo" />
              </th>
              <th style={thStyle} onClick={() => handleSort('nombre')}>
                Nombre <SortIcon columnKey="nombre" />
              </th>
              <th>Descripción</th>
              <th style={thStyle} onClick={() => handleSort('tipo')}>
                Rubro <SortIcon columnKey="tipo" />
              </th>
              <th style={thStyle} onClick={() => handleSort('cantidad')}>
                Cantidad <SortIcon columnKey="cantidad" />
              </th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {paginated.map((prod, index) => (
              <tr key={prod.id}>
                <td>{prod.id}</td>
                <td><code style={{ fontSize: '0.8rem', background: 'var(--accent-light)', color: 'var(--accent)', padding: '2px 8px', borderRadius: '4px' }}>{prod.codigo}</code></td>
                <td style={{ fontWeight: 500 }}>{prod.nombre}</td>
                <td style={{
                  maxWidth: '250px',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  color: 'var(--text-secondary)',
                  fontSize: '0.9rem'
                }}
                  title={prod.descripcion}>
                  {prod.descripcion}
                </td>
                <td>
                  <span style={{ fontSize: '0.8rem', background: 'var(--bg-hover)', padding: '3px 10px', borderRadius: '12px', color: 'var(--text-secondary)' }}>
                    {prod.tipo}
                  </span>
                </td>
                <td>{prod.cantidad}</td>
                <td>
                  <div className="table-actions">
                    <button
                      className="table-action-btn edit"
                      onClick={() => handleEditClick(prod)}
                      title="Editar producto"
                      aria-label={`Editar ${prod.nombre}`}
                    >✏️
                    </button>
                    <button
                      className="table-action-btn"
                      onClick={() => handleIngresoClick(prod)}
                      title="Ingresar stock"
                    >📦
                    </button>

                    <button
                      className="table-action-btn"
                      onClick={() => handleEgresoClick(prod)}
                      title="Retirar stock"
                    >📤
                    </button>
                    <button
                      className="table-action-btn delete"
                      onClick={() => handleDeleteClick(prod)}
                      title="Eliminar producto"
                      aria-label={`Eliminar ${prod.nombre}`}
                    >🗑️
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Paginación */}
      <Pagination
        currentPage={safePage}
        totalPages={totalPages}
        totalItems={filtered.length}
        itemsPerPage={perPage}
        onPageChange={setCurrentPage}
      />

      {/* Editar Modal */}
      <ProductForm
        isOpen={editingProduct !== null}
        onClose={() => setEditingProduct(null)}
        onSubmit={handleEditSubmit}
        editData={editingProduct}
      />

      {/* Delete Confirmación */}
      <ConfirmDialog
        isOpen={deletingProduct !== null}
        onClose={() => setDeletingProduct(null)}
        onConfirm={handleDeleteConfirm}
        itemName={deletingProduct?.nombre}
        loading={deleteLoading}
      />
    </div>
  );
};

export default ProductTable;
