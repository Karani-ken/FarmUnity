import React from 'react';
import { Link, Outlet, Route, Routes } from 'react-router-dom';
import Profile from './DashboardComponents/Profile';
import Cart from './DashboardComponents/Cart';
import Products from './DashboardComponents/Products';
import Posts from './DashboardComponents/Posts';
import Sales from './DashboardComponents/Sales';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <div className="sidebar">
        <ul>
          <li><Link to="profile">Profile</Link></li>
          <li><Link to="cart">Cart</Link></li>
          <li><Link to="products">Products</Link></li>
          <li><Link to="posts">Posts</Link></li>
          <li><Link to="sales">Sales</Link></li>
        </ul>
      </div>
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};

const DashboardRoutes = () => {
  return (
    <Routes>
      <Route path="profile" element={<Profile />} />
      <Route path="cart" element={<Cart />} />
      <Route path="products" element={<Products />} />
      <Route path="posts" element={<Posts />} />
      <Route path="sales" element={<Sales />} />
    </Routes>
  );
};

export { Dashboard, DashboardRoutes };
