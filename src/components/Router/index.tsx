import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CreatePandaView from '../../views/CreatePandaView';
import EditPandaView from '../../views/EditPandaView';
import NotFoundView from '../../views/NotFoundView';
import PandaDetailsView from '../../views/PandaDetailsView';
import PandasListView from '../../views/PandasListView';
import Header from '../Header';

const Router = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<PandasListView />} />
        <Route path="/pandas" element={<PandasListView />} />
        <Route path="/pandas/new" element={<CreatePandaView />} />
        <Route path="/pandas/:id/edit" element={<EditPandaView />} />
        <Route path="/pandas/:id" element={<PandaDetailsView />} />
        <Route element={<NotFoundView />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
