import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UserListPage from './pages/UserListPage';
import UserDetailPage from './pages/UserDetailPage';
import CreateUserPage from './pages/CreateUserPage';
import EditUserPage from './pages/EditUserPage';
import UserListWithPagination from './pages/UserListWithPagination';

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='*' element={<UserListPage/>}/>
        <Route path="/users" element={<UserListPage />} />
        <Route path="/users/pagination" element={<UserListWithPagination/>} />

        <Route path="/users/:id" element={<UserDetailPage />} />
        <Route path="/users/new" element={<CreateUserPage />} />
        <Route path="/users/:id/edit" element={<EditUserPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
