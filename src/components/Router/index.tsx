import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
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
      <Switch>
        <Route path="/" exact component={PandasListView} />
        <Route path="/pandas" exact component={PandasListView} />
        <Route path="/pandas/new" component={CreatePandaView} />
        <Route path="/pandas/:id/edit" component={EditPandaView} />
        <Route path="/pandas/:id" component={PandaDetailsView} />
        <Route component={NotFoundView} />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
