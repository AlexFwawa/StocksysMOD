export default function InformeFilters({

    filters,

    onChange

}) {

    return (

        <div className="content-card">

            <div className="filters-grid">

                <select
                    name="tipo"
                    value={filters.tipo}
                    onChange={onChange}
                >

                    <option value="">
                        Todos
                    </option>

                    <option value="INGRESO">
                        Ingreso
                    </option>

                    <option value="EGRESO">
                        Egreso
                    </option>

                </select>

                <input
                    type="text"
                    name="producto"
                    placeholder="Buscar producto..."
                    value={filters.producto}
                    onChange={onChange}
                />

                <input
                    type="date"
                    name="desde"
                    value={filters.desde}
                    onChange={onChange}
                />

                <input
                    type="date"
                    name="hasta"
                    value={filters.hasta}
                    onChange={onChange}
                />

            </div>

        </div>
    );
}