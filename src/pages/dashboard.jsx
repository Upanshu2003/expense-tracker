import DashboardHero from '../components/DashboardHeroSection/dashboardHero';
import Actions from '../components/Actions/actions';

const Dashboard = () => {
    return (
      <div className="min-h-screen">
        <DashboardHero />
        <Actions />
      </div>
    );
  };
  
  export default Dashboard;