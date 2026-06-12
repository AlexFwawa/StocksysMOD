import Sidebar from './Sidebar';

const DashboardLayout = ({ children, onLogout }) => {
  return (
    <div className="dashboard-layout">
      <Sidebar onLogout={onLogout} />
      <main className="dashboard-main">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
