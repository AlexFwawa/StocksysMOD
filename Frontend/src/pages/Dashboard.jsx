import { useState, useMemo, useCallback } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import ProductTable from '../components/products/ProductTable';
import ProductForm from '../components/products/ProductForm';
import { useProducts } from '../hooks/useProducts';
import { useKeyboardShortcuts } from '../hooks/useKeyboardShortcuts';
import StockMovementModal from '../components/products/StockMovementModal';
import { registrarIngreso, registrarEgreso } from "../services/movimientoService";
import { useToast } from "../hooks/useToast";
import { useSettings } from "../context/SettingsContext";


const Dashboard = ({ onLogout }) => {
  const {
    products,
    loading,
    addProduct,
    editProduct,
    removeProduct,
    cargarProductos
  } = useProducts();

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [lowStockOnly, setLowStockOnly] = useState(false);

  //Constantes para movimiento de producto:
  const [movementProduct, setMovementProduct] = useState(null);

  const [movementType, setMovementType] = useState(null);

  const { lowStockThreshold } = useSettings();

  // Stats calculadas
  const stats = useMemo(() => {
    const totalProducts = products.length;
    const totalStock = products.reduce((sum, p) => sum + p.cantidad, 0);
    const lowStock = products.filter(p => p.cantidad < lowStockThreshold).length;
    return { totalProducts, totalStock, lowStock };
  }, [products, lowStockThreshold]);

  // Keyboard shortcuts
  const shortcuts = useMemo(() => ({
    c: () => setShowCreateForm(true),
    s: () => ProductTable.focusSearch?.(),
  }), []);

  useKeyboardShortcuts(shortcuts);

  const handleCreateSubmit = useCallback(async (data) => {
    await addProduct(data);
  }, [addProduct]);

  //Manejo de movimiento de productos:
  const handleIngreso = (product) => {

    setMovementProduct(product);

    setMovementType("INGRESO");
  };

  const handleEgreso = (product) => {

    setMovementProduct(product);

    setMovementType("EGRESO");
  };

  const { showToast } = useToast();

  const handleMovementSubmit = async (data) => {

    try {
      if (movementType === "INGRESO") {

        await registrarIngreso(data);
        showToast("Ingreso registrado con éxito", "success");

      } else {

        await registrarEgreso(data);
        showToast("Egreso registrado con éxito", "success");
      }

      await cargarProductos();

    } catch (error) {
        showToast(`Error al registrar ${movementType.toLowerCase()}`, "error");
    } finally {
      setMovementProduct(null);

      setMovementType(null);
    }
  };

  return (
    <DashboardLayout onLogout={onLogout}>
      {/* Header */}
      <div className="dashboard-header">
        <div className="dashboard-header-left">
          <h1>Stock Principal</h1>
          <p>Gestión de inventario y productos</p>
        </div>
        <div className="dashboard-header-actions">
          <button className="btn-primary" onClick={() => setShowCreateForm(true)} id="btn-new-product">
            <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
            Nuevo Producto
            <span className="shortcut-hint"><kbd>Shift</kbd><kbd>C</kbd></span>
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-card-icon accent">
            <svg viewBox="0 0 24 24"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 002 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0022 16z" /></svg>
          </div>
          <div className="stat-card-label">Total Productos</div>
          <div className="stat-card-value">{stats.totalProducts}</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-icon success">
            <svg viewBox="0 0 24 24"><line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" /></svg>
          </div>
          <div className="stat-card-label">Stock Total</div>
          <div className="stat-card-value">{stats.totalStock.toLocaleString()}</div>
        </div>
        <div 
          className="stat-card" 
          onClick={() => setLowStockOnly(!lowStockOnly)} 
          style={{ cursor: 'pointer', outline: lowStockOnly ? '2px solid var(--warning)' : 'none', borderRadius: 'var(--radius-lg)' }}
          title="Haz clic para filtrar productos con stock bajo"
        >
          <div className="stat-card-icon warning">
            <svg viewBox="0 0 24 24"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg>
          </div>
          <div className="stat-card-label">{lowStockOnly ? '⚠️ Filtrando Stock Bajo' : 'Stock Bajo'}</div>
          <div className="stat-card-value">{stats.lowStock}</div>
        </div>
      </div>

      {/* Tabla de Productos: */}
      <ProductTable
        products={products}
        loading={loading}
        onAdd={addProduct}
        onEdit={editProduct}
        onDelete={removeProduct}
        onIngreso={handleIngreso}
        onEgreso={handleEgreso}
        lowStockOnly={lowStockOnly}
      />

      {/* Formulario para crear productos (Create Product Modal): */}
      <ProductForm
        isOpen={showCreateForm}
        onClose={() => setShowCreateForm(false)}
        onSubmit={handleCreateSubmit}
      />
      {/* modal Stock movimientos: */}
      <StockMovementModal

        isOpen={movementProduct !== null}

        onClose={() => {
          setMovementProduct(null);
          setMovementType(null);
        }}

        product={movementProduct}

        type={movementType}

        onSubmit={handleMovementSubmit}
      />
    </DashboardLayout>
  );
};

export default Dashboard;