import { useMockData } from '../utils/mockData';

const MainPage = () => {
  const { error, initialize, progress, status } = useMockData();

  const handleClick = () => {
    initialize();
  };

  return (
    <div className='container mt-5'>
      <h2>Main Page</h2>
      <h3>Firebase - save mock data</h3>
      <ul>
        <li>Status: {status}</li>
        <li>Progress: {progress}</li>
        {error && <li>Error: {error}</li>}
      </ul>
      <button className='btn-primary' onClick={handleClick}>
        Save data
      </button>
    </div>
  );
};

export default MainPage;
