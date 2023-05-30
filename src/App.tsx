import moment from 'moment';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { Header } from './components/Header';
import { Layout } from './components/Layout';
import { MainPage } from './pages/MainPage';
import { StatPage } from './pages/StatPage';
import { addNewItem } from './redux/slices/statSlice';
import { RootState } from './redux/store';

function App() {
  const statList = useSelector((state: RootState) => state.stat) 
  const currentDay = moment().format('YYYY.MM.DD')
  const dispatch = useDispatch()

  useEffect(() => {
    if (!statList.find(item => item.date === currentDay)) dispatch(addNewItem(currentDay))
  }, [currentDay])

  return (
    <Layout>
      <Header />
      <Routes >
        <Route path='/' element={<MainPage />} />
        <Route path='/stat' element={<StatPage />} />
      </Routes>
    </Layout>
  );
}

export default App;
